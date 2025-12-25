'use client';

import { memo, useMemo, useCallback } from 'react';
import { PaginationProps } from './ui.types';
import {
  PAGINATION_CONTAINER,
  PAGINATION_BTN,
  PAGINATION_BTN_ACTIVE,
  PAGINATION_BTN_INACTIVE,
  PAGINATION_BTN_NAV,
  PAGINATION_BTN_DISABLED,
  PAGINATION_DOTS,
} from './ui.styles';

function PaginationComponent({
  currentPage,
  totalPages,
  onPageChange,
  className = '',
}: PaginationProps) {
  const handlePrev = useCallback(() => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  }, [currentPage, onPageChange]);

  const handleNext = useCallback(() => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  }, [currentPage, totalPages, onPageChange]);

  const pageNumbers = useMemo(() => {
    const pages: (number | string)[] = [];

    if (totalPages <= 3) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);

      if (currentPage <= 2) {
        pages.push(2);
        pages.push('...');
      } else if (currentPage >= totalPages - 1) {
        pages.push('...');
        pages.push(totalPages - 1);
      } else {
        pages.push('...');
        pages.push(currentPage);
        pages.push('...');
      }

      pages.push(totalPages);
    }

    return pages;
  }, [currentPage, totalPages]);

  if (totalPages <= 1) return null;

  const prevBtnClass = `${PAGINATION_BTN} ${PAGINATION_BTN_NAV} ${currentPage === 1 ? PAGINATION_BTN_DISABLED : ''}`;
  const nextBtnClass = `${PAGINATION_BTN} ${PAGINATION_BTN_NAV} ${currentPage === totalPages ? PAGINATION_BTN_DISABLED : ''}`;

  return (
    <div className={`${PAGINATION_CONTAINER} ${className}`}>
      <button onClick={handlePrev} disabled={currentPage === 1} className={prevBtnClass}>
        ←
      </button>

      {pageNumbers.map((page, index) =>
        page === '...' ? (
          <span key={`dots-${index}`} className={PAGINATION_DOTS}>...</span>
        ) : (
          <button
            key={page}
            onClick={() => onPageChange(page as number)}
            className={`${PAGINATION_BTN} ${currentPage === page ? PAGINATION_BTN_ACTIVE : PAGINATION_BTN_INACTIVE}`}
          >
            {page}
          </button>
        )
      )}

      <button onClick={handleNext} disabled={currentPage === totalPages} className={nextBtnClass}>
        →
      </button>
    </div>
  );
}

export const Pagination = memo(PaginationComponent);
