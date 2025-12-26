import { useEffect, useRef, useState, useCallback } from 'react';
import type { UseInfiniteScrollOptions, UseInfiniteScrollResult } from '@/types/hooks';

const INTERSECTION_THRESHOLD = 0.1;
const LOAD_DELAY_MS = 300;

export function useInfiniteScroll({
  itemsPerPage,
  totalItems,
}: UseInfiniteScrollOptions): UseInfiniteScrollResult {
  const [visibleCount, setVisibleCount] = useState(itemsPerPage);
  const [isLoading, setIsLoading] = useState(false);
  const loaderRef = useRef<HTMLDivElement>(null);

  const hasMore = visibleCount < totalItems;

  const resetVisibleCount = useCallback(() => {
    setVisibleCount(itemsPerPage);
  }, [itemsPerPage]);

  useEffect(() => {
    const loader = loaderRef.current;
    if (!loader || !hasMore) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isLoading) {
          setIsLoading(true);
          setTimeout(() => {
            setVisibleCount(prev => prev + itemsPerPage);
            setIsLoading(false);
          }, LOAD_DELAY_MS);
        }
      },
      { threshold: INTERSECTION_THRESHOLD }
    );

    observer.observe(loader);
    return () => observer.disconnect();
  }, [hasMore, isLoading, itemsPerPage]);

  return {
    visibleCount,
    isLoading,
    hasMore,
    loaderRef,
    resetVisibleCount,
  };
}
