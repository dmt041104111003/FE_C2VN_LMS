'use client';

import { memo, useState, useMemo, useEffect, useCallback } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { Header, Footer, Pagination, Filter, PriceRange, RatingFilterType } from '@/components/ui';
import { CourseCard } from './CourseCard';
import { COURSE_PAGE, COURSE_GRID, MOCK_COURSES } from '@/constants/course';
import { SYSTEM_CONFIG } from '@/constants/config';

function CoursesPageComponent() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const priceParam = searchParams.get('price');

  const [search, setSearch] = useState('');
  const [tagFilter, setTagFilter] = useState<string>('all');
  const [ratingFilter, setRatingFilter] = useState<RatingFilterType>(0);
  const [currentPage, setCurrentPage] = useState(1);

  const maxPrice = useMemo(() => {
    return Math.max(...MOCK_COURSES.map((c) => c.price));
  }, []);

  const getInitialPriceRange = (): PriceRange => {
    if (priceParam === 'free') return { min: 0, max: 0 };
    if (priceParam === 'paid') return { min: 1, max: maxPrice };
    return { min: 0, max: maxPrice };
  };

  const [priceRange, setPriceRange] = useState<PriceRange>(getInitialPriceRange);

  const updateUrlWithPrice = useCallback((range: PriceRange) => {
    const params = new URLSearchParams(searchParams.toString());
    
    if (range.min === 0 && range.max === 0) {
      params.set('price', 'free');
    } else if (range.min > 0 && range.max >= maxPrice) {
      params.set('price', 'paid');
    } else {
      params.delete('price');
    }
    
    const newUrl = params.toString() ? `${pathname}?${params.toString()}` : pathname;
    router.replace(newUrl, { scroll: false });
  }, [searchParams, pathname, router, maxPrice]);

  useEffect(() => {
    if (priceParam === 'free') {
      setPriceRange({ min: 0, max: 0 });
    } else if (priceParam === 'paid') {
      setPriceRange({ min: 1, max: maxPrice });
    } else {
      setPriceRange({ min: 0, max: maxPrice });
    }
  }, [priceParam, maxPrice]);

  const allTags = useMemo(() => {
    const tags = new Set<string>();
    MOCK_COURSES.forEach((course) => {
      course.tags?.forEach((tag) => tags.add(tag));
    });
    return Array.from(tags).sort();
  }, []);

  const searchSuggestions = useMemo(() => {
    const suggestions: { text: string; type: 'course' | 'instructor' | 'tag' }[] = [];
    const seen = new Set<string>();

    MOCK_COURSES.forEach((course) => {
      if (!seen.has(course.title)) {
        suggestions.push({ text: course.title, type: 'course' });
        seen.add(course.title);
      }
      if (!seen.has(course.instructorName)) {
        suggestions.push({ text: course.instructorName, type: 'instructor' });
        seen.add(course.instructorName);
      }
    });

    allTags.forEach((tag) => {
      if (!seen.has(tag)) {
        suggestions.push({ text: tag, type: 'tag' });
        seen.add(tag);
      }
    });

    return suggestions;
  }, [allTags]);

  const filteredCourses = useMemo(() => {
    return MOCK_COURSES.filter((course) => {
      const searchLower = search.toLowerCase();
      const matchSearch = 
        course.title.toLowerCase().includes(searchLower) ||
        course.instructorName.toLowerCase().includes(searchLower);
      const matchPrice =
        course.price >= priceRange.min && course.price <= priceRange.max;
      const matchTag =
        tagFilter === 'all' ||
        course.tags?.includes(tagFilter);
      const matchRating =
        ratingFilter === 0 ||
        (course.rating && course.rating >= ratingFilter);
      return matchSearch && matchPrice && matchTag && matchRating;
    });
  }, [search, priceRange, tagFilter, ratingFilter]);

  const { paginatedCourses, totalPages } = useMemo(() => {
    const total = filteredCourses.length;
    if (total <= COURSE_GRID.FIRST_PAGE_SIZE) {
      return { paginatedCourses: filteredCourses, totalPages: 1 };
    }

    const remaining = total - COURSE_GRID.FIRST_PAGE_SIZE;
    const pages = 1 + Math.ceil(remaining / COURSE_GRID.OTHER_PAGE_SIZE);

    let start: number;
    let end: number;

    if (currentPage === 1) {
      start = 0;
      end = COURSE_GRID.FIRST_PAGE_SIZE;
    } else {
      start = COURSE_GRID.FIRST_PAGE_SIZE + (currentPage - 2) * COURSE_GRID.OTHER_PAGE_SIZE;
      end = start + COURSE_GRID.OTHER_PAGE_SIZE;
    }

    return {
      paginatedCourses: filteredCourses.slice(start, end),
      totalPages: pages,
    };
  }, [filteredCourses, currentPage]);

  const getGridClasses = (count: number) => {
    if (count <= 1) return COURSE_GRID.CLASSES_1;
    if (count <= 2) return COURSE_GRID.CLASSES_2;
    if (count <= 3) return COURSE_GRID.CLASSES_3;
    if (count <= 4) return COURSE_GRID.CLASSES_4;
    if (count <= 5) return COURSE_GRID.CLASSES_5;
    if (count <= 6) return COURSE_GRID.CLASSES_6;
    return COURSE_GRID.CLASSES_7;
  };

  const gridClasses = getGridClasses(paginatedCourses.length);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[var(--bg)]">
      <Header />

      <main className="pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold text-[var(--text)] mb-2">
              {COURSE_PAGE.title}
            </h1>
            <p className="text-[var(--text)]/60">
              {COURSE_PAGE.subtitle}
            </p>
          </div>

          <Filter
            search={search}
            onSearchChange={(value) => {
              setSearch(value);
              setCurrentPage(1);
            }}
            searchPlaceholder={COURSE_PAGE.searchPlaceholder}
            searchSuggestions={searchSuggestions}
            priceRange={priceRange}
            onPriceRangeChange={(range) => {
              setPriceRange(range);
              setCurrentPage(1);
              updateUrlWithPrice(range);
            }}
            maxPrice={maxPrice}
            currency={SYSTEM_CONFIG.DEFAULT_CURRENCY}
            tagFilter={tagFilter}
            onTagFilterChange={(value) => {
              setTagFilter(value);
              setCurrentPage(1);
            }}
            tagOptions={[
              { value: 'all', label: COURSE_PAGE.filterTagAll },
              ...allTags.map((tag) => ({ value: tag, label: tag })),
            ]}
            ratingFilter={ratingFilter}
            onRatingFilterChange={(value) => {
              setRatingFilter(value);
              setCurrentPage(1);
            }}
            ratingOptions={[
              { value: 0, label: COURSE_PAGE.filterRatingAll },
              { value: 4, label: COURSE_PAGE.filterRating4 },
              { value: 4.5, label: COURSE_PAGE.filterRating45 },
            ]}
            className="mb-8"
          />

          {paginatedCourses.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-[var(--text)]/50">{COURSE_PAGE.emptyText}</p>
            </div>
          ) : (
            <>
              <div className={
                paginatedCourses.length <= 1
                  ? 'grid grid-cols-1 gap-4'
                  : paginatedCourses.length <= 3
                    ? 'grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-2'
                    : 'grid grid-cols-1 gap-4 sm:grid-cols-3 sm:grid-rows-[repeat(7,1fr)] sm:gap-2'
              }>
                {paginatedCourses.map((course, index) => {
                  const count = paginatedCourses.length;
                  const isTall = (count <= 6 && count >= 4 && (
                    (count === 4 && index === 2) ||
                    (count >= 5 && index === 3)
                  ));
                  const isWide = (count === 5 && index === 4) || 
                    (count === 4 && (index === 1 || index === 3));
                  return (
                    <CourseCard
                      key={course.id}
                      course={course}
                      featured={index === 0 || (count === 2 && index === 1)}
                      tall={isTall}
                      wide={isWide}
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
