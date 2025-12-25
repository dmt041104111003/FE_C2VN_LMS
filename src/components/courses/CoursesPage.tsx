'use client';

import { memo, useState, useMemo, useEffect, useCallback } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { Header, Footer, Pagination, Filter, PriceRange, RatingFilterType } from '@/components/ui';
import { CourseCard } from './CourseCard';
import { COURSE_PAGE, COURSE_GRID, MOCK_COURSES } from '@/constants/course';
import { SYSTEM_CONFIG } from '@/constants/config';

const GRID_CLASSES_MAP = [
  COURSE_GRID.CLASSES_1,
  COURSE_GRID.CLASSES_2,
  COURSE_GRID.CLASSES_3,
  COURSE_GRID.CLASSES_4,
  COURSE_GRID.CLASSES_5,
  COURSE_GRID.CLASSES_6,
  COURSE_GRID.CLASSES_7,
] as const;

const getGridClasses = (count: number): readonly string[] => {
  const index = Math.min(Math.max(count - 1, 0), 6);
  return GRID_CLASSES_MAP[index];
};

const getGridContainerClass = (count: number): string => {
  if (count <= 1) return 'grid grid-cols-1 gap-4';
  if (count <= 3) return 'grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-2';
  return 'grid grid-cols-1 gap-4 sm:grid-cols-3 sm:grid-rows-[repeat(7,1fr)] sm:gap-2';
};

const getCardVariants = (index: number, count: number) => ({
  featured: index === 0 || (count === 2 && index === 1),
  tall: count >= 4 && count <= 6 && ((count === 4 && index === 2) || (count >= 5 && index === 3)),
  wide: (count === 5 && index === 4) || (count === 4 && (index === 1 || index === 3)),
});

function CoursesPageComponent() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const priceParam = searchParams.get('price');

  const [search, setSearch] = useState('');
  const [tagFilter, setTagFilter] = useState('all');
  const [ratingFilter, setRatingFilter] = useState<RatingFilterType>(0);
  const [currentPage, setCurrentPage] = useState(1);

  const maxPrice = useMemo(() => Math.max(...MOCK_COURSES.map(c => c.price)), []);

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
    for (const course of MOCK_COURSES) {
      course.tags?.forEach(tag => tags.add(tag));
    }
    return Array.from(tags).sort();
  }, []);

  const searchSuggestions = useMemo(() => {
    const seen = new Set<string>();
    const suggestions: { text: string; type: 'course' | 'instructor' | 'tag' }[] = [];

    for (const course of MOCK_COURSES) {
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
  }, [allTags]);

  const filteredCourses = useMemo(() => {
    const searchLower = search.toLowerCase();
    
    return MOCK_COURSES.filter(course => {
      const matchSearch = !search || 
        course.title.toLowerCase().includes(searchLower) ||
        course.instructorName.toLowerCase().includes(searchLower);
      
      const matchPrice = course.price >= priceRange.min && course.price <= priceRange.max;
      const matchTag = tagFilter === 'all' || course.tags?.includes(tagFilter);
      const matchRating = ratingFilter === 0 || (course.rating ?? 0) >= ratingFilter;
      
      return matchSearch && matchPrice && matchTag && matchRating;
    });
  }, [search, priceRange, tagFilter, ratingFilter]);

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
  const containerClass = getGridContainerClass(paginatedCourses.length);

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
    <div className="min-h-screen bg-[var(--bg)]">
      <Header />

      <main className="pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <header className="mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold text-[var(--text)] mb-2">
              {COURSE_PAGE.title}
            </h1>
            <p className="text-[var(--text)]/60">{COURSE_PAGE.subtitle}</p>
          </header>

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
            className="mb-8"
          />

          {paginatedCourses.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-[var(--text)]/50">{COURSE_PAGE.emptyText}</p>
            </div>
          ) : (
            <>
              <div className={containerClass}>
                {paginatedCourses.map((course, index) => {
                  const variants = getCardVariants(index, paginatedCourses.length);
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
        </div>
      </main>

      <Footer />
    </div>
  );
}

export const CoursesPage = memo(CoursesPageComponent);
