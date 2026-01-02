'use client';

import { memo, useState, useMemo, useEffect, useCallback, Suspense } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { Header, Footer, Pagination, Filter, SearchInput, PriceRange, RatingFilterType } from '@/components/ui';
import { CourseCard } from './CourseCard';
import { COURSE_PAGE, COURSE_GRID } from '@/constants/course';
import type { Course } from '@/types/course';
import { courseService } from '@/services/course';
import { SYSTEM_CONFIG } from '@/constants/config';
import { getUserAvatar } from '@/utils/avatar';
import {
  COURSES_PAGE,
  COURSES_PAGE_MAIN,
  COURSES_PAGE_CONTAINER,
  COURSES_PAGE_HEADER,
  COURSES_PAGE_TITLE,
  COURSES_PAGE_SUBTITLE,
  COURSES_PAGE_EMPTY,
  COURSES_PAGE_EMPTY_TEXT,
  getGridClasses,
  getGridContainerClass,
  getCardVariants,
} from './courses.styles';

function CoursesPageInner() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const priceParam = searchParams.get('price');

  const [courses, setCourses] = useState<Course[]>([]);
  const [search, setSearch] = useState('');
  const [tagFilter, setTagFilter] = useState('all');
  const [ratingFilter, setRatingFilter] = useState<RatingFilterType>(0);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const data = await courseService.getPublishedCourses();
        const mapped: Course[] = ((data || []) as Record<string, unknown>[]).map(c => {
          const instructorEmail = c.instructorEmail ? String(c.instructorEmail) : undefined;
          const instructorWalletAddress = c.instructorWalletAddress ? String(c.instructorWalletAddress) : undefined;
          const instructorName = String(c.instructorName || '');
          
          const instructorAvatar = (instructorWalletAddress || instructorEmail || instructorName)
            ? getUserAvatar({ walletAddress: instructorWalletAddress, email: instructorEmail, fullName: instructorName })
            : '/loading.png';

          return {
            id: String(c.id || c.slug || ''),
            slug: String(c.slug || ''),
            title: String(c.title || ''),
            description: String(c.shortDescription || c.description || ''),
            thumbnail: c.imageUrl ? String(c.imageUrl) : undefined,
            price: Number(c.price) || 0,
            currency: 'ADA',
            discount: c.discount != null ? Number(c.discount) : undefined,
            discountEndTime: c.discountEndTime ? String(c.discountEndTime) : undefined,
            instructorName,
            instructorAvatar,
            totalLessons: Number(c.numOfLessons) || 0,
            totalStudents: Number(c.numOfStudents) || 0,
            rating: c.rating != null ? Number(c.rating) : undefined,
            tags: Array.isArray(c.courseTags) 
              ? (c.courseTags as { name?: string }[]).map(t => String(t.name || ''))
              : [],
            status: c.draft ? 'DRAFT' : 'PUBLISHED',
            createdAt: String(c.createdAt || ''),
          };
        });
        setCourses(mapped);
      } catch {
        setCourses([]);
      }
    };
    fetchCourses();
  }, []);

  const maxPrice = useMemo(() => Math.max(...courses.map(c => c.price), 0), [courses]);

  const parsePriceParam = useCallback((param: string | null, max: number): PriceRange => {
    if (param === 'free') return { min: 0, max: 0 };
    if (param === 'paid') return { min: 1, max };
    return { min: 0, max };
  }, []);

  const [priceRange, setPriceRange] = useState<PriceRange>(() => parsePriceParam(priceParam, maxPrice));

  const updateUrlWithPrice = useCallback((range: PriceRange) => {
    const params = new URLSearchParams(searchParams.toString());
    
    const priceType = range.min === 0 && range.max === 0 ? 'free'
      : range.min > 0 && range.max >= maxPrice ? 'paid'
      : null;
    
    priceType ? params.set('price', priceType) : params.delete('price');
    
    const newUrl = params.toString() ? `${pathname}?${params.toString()}` : pathname;
    router.replace(newUrl, { scroll: false });
  }, [searchParams, pathname, router, maxPrice]);

  useEffect(() => {
    setPriceRange(parsePriceParam(priceParam, maxPrice));
  }, [priceParam, maxPrice, parsePriceParam]);

  const allTags = useMemo(() => {
    const tags = new Set<string>();
    for (const course of courses) {
      course.tags?.forEach(tag => tags.add(tag));
    }
    return Array.from(tags).sort();
  }, [courses]);

  const searchSuggestions = useMemo(() => {
    const seen = new Set<string>();
    const suggestions: { text: string; type: 'course' | 'instructor' | 'tag' }[] = [];

    for (const course of courses) {
      if (!seen.has(course.title)) {
        suggestions.push({ text: course.title, type: 'course' });
        seen.add(course.title);
      }
      if (!seen.has(course.instructorName)) {
        suggestions.push({ text: course.instructorName, type: 'instructor' });
        seen.add(course.instructorName);
      }
    }

    for (const tag of allTags) {
      if (!seen.has(tag)) {
        suggestions.push({ text: tag, type: 'tag' });
        seen.add(tag);
      }
    }

    return suggestions;
  }, [courses, allTags]);

  const filteredCourses = useMemo(() => {
    const searchLower = search.toLowerCase();
    
    return courses.filter(course => {
      const matchSearch = !search || 
        course.title.toLowerCase().includes(searchLower) ||
        course.instructorName.toLowerCase().includes(searchLower) ||
        course.tags?.some(tag => tag.toLowerCase().includes(searchLower));
      
      const matchPrice = course.price >= priceRange.min && course.price <= priceRange.max;
      const matchTag = tagFilter === 'all' || course.tags?.includes(tagFilter);
      const matchRating = ratingFilter === 0 || (course.rating ?? 0) >= ratingFilter;
      
      return matchSearch && matchPrice && matchTag && matchRating;
    });
  }, [courses, search, priceRange, tagFilter, ratingFilter]);

  const { paginatedCourses, totalPages } = useMemo(() => {
    const total = filteredCourses.length;
    const { FIRST_PAGE_SIZE, OTHER_PAGE_SIZE } = COURSE_GRID;

    if (total <= FIRST_PAGE_SIZE) {
      return { paginatedCourses: filteredCourses, totalPages: 1 };
    }

    const pages = 1 + Math.ceil((total - FIRST_PAGE_SIZE) / OTHER_PAGE_SIZE);
    
    const start = currentPage === 1 
      ? 0 
      : FIRST_PAGE_SIZE + (currentPage - 2) * OTHER_PAGE_SIZE;
    const end = currentPage === 1 
      ? FIRST_PAGE_SIZE 
      : start + OTHER_PAGE_SIZE;

    return {
      paginatedCourses: filteredCourses.slice(start, end),
      totalPages: pages,
    };
  }, [filteredCourses, currentPage]);

  const gridClasses = getGridClasses(paginatedCourses.length);
  const containerClass = getGridContainerClass();

  const handleSearchChange = useCallback((value: string) => {
    setSearch(value);
    setCurrentPage(1);
  }, []);

  const handlePriceChange = useCallback((range: PriceRange) => {
    setPriceRange(range);
    setCurrentPage(1);
    updateUrlWithPrice(range);
  }, [updateUrlWithPrice]);

  const handleTagChange = useCallback((value: string) => {
    setTagFilter(value);
    setCurrentPage(1);
  }, []);

  const handleRatingChange = useCallback((value: RatingFilterType) => {
    setRatingFilter(value);
    setCurrentPage(1);
  }, []);

  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const tagOptions = useMemo(() => [
    { value: 'all', label: COURSE_PAGE.filterTagAll },
    ...allTags.map(tag => ({ value: tag, label: tag })),
  ], [allTags]);

  const ratingOptions = useMemo(() => [
    { value: 0 as const, label: COURSE_PAGE.filterRatingAll },
    { value: 4 as const, label: COURSE_PAGE.filterRating4 },
    { value: 4.5 as const, label: COURSE_PAGE.filterRating45 },
  ], []);

  return (
    <div className={COURSES_PAGE}>
      <Header />

      <main className={COURSES_PAGE_MAIN}>
        <div className={COURSES_PAGE_CONTAINER}>
          <header className={COURSES_PAGE_HEADER}>
            <h1 className={COURSES_PAGE_TITLE}>{COURSE_PAGE.title}</h1>
            <p className={COURSES_PAGE_SUBTITLE}>{COURSE_PAGE.subtitle}</p>
          </header>

          <SearchInput
            value={search}
            onChange={handleSearchChange}
            suggestions={searchSuggestions}
            placeholder={COURSE_PAGE.searchPlaceholder}
            showIcon
            className="mb-8"
          />

          <div className="flex flex-col lg:flex-row gap-8">
            <aside className="lg:w-[280px] flex-shrink-0">
              <div className="lg:sticky lg:top-24">
                <Filter
                  search={search}
                  onSearchChange={handleSearchChange}
                  searchPlaceholder={COURSE_PAGE.searchPlaceholder}
                  searchSuggestions={searchSuggestions}
                  priceRange={priceRange}
                  onPriceRangeChange={handlePriceChange}
                  maxPrice={maxPrice}
                  currency={SYSTEM_CONFIG.DEFAULT_CURRENCY}
                  tagFilter={tagFilter}
                  onTagFilterChange={handleTagChange}
                  tagOptions={tagOptions}
                  ratingFilter={ratingFilter}
                  onRatingFilterChange={handleRatingChange}
                  ratingOptions={ratingOptions}
                  vertical
                  hideSearch
                />
              </div>
            </aside>

            <main className="flex-1 min-w-0">
              {paginatedCourses.length === 0 ? (
                <div className={COURSES_PAGE_EMPTY}>
                  <p className={COURSES_PAGE_EMPTY_TEXT}>{COURSE_PAGE.emptyText}</p>
                </div>
              ) : (
                <>
                  <div className={containerClass}>
                    {paginatedCourses.map((course, index) => {
                      const variants = getCardVariants();
                      return (
                        <CourseCard
                          key={course.id}
                          course={course}
                          {...variants}
                          className={gridClasses[index] || ''}
                        />
                      );
                    })}
                  </div>

                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                    className="mt-12"
                  />
                </>
              )}
            </main>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

const CoursesPageMemo = memo(CoursesPageInner);

function CoursesPageFallback() {
  return (
    <div className={COURSES_PAGE}>
      <Header />
      <main className={COURSES_PAGE_MAIN}>
        <div className={COURSES_PAGE_CONTAINER}>
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-[var(--text)]/10 rounded w-1/3" />
            <div className="h-4 bg-[var(--text)]/10 rounded w-1/2" />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export function CoursesPage() {
  return (
    <Suspense fallback={<CoursesPageFallback />}>
      <CoursesPageMemo />
    </Suspense>
  );
}
