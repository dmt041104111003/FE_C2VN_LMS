'use client';

import { memo, useState, useMemo, useCallback } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { SearchIcon } from './icons';
import { Card } from './Card';
import { SearchInput } from './SearchInput';
import { SearchModalProps, SearchSuggestionItem } from './ui.types';
import {
  SEARCH_PLACEHOLDER,
  SEARCH_LABELS,
  SEARCH_SUGGESTIONS,
  ROUTES,
} from '@/constants';
import type { Course } from '@/types/course';

const COURSES: Course[] = [];
import {
  SEARCH_OVERLAY,
  SEARCH_MODAL,
  SEARCH_MODAL_INPUT_WRAPPER,
  SEARCH_MODAL_EMPTY,
  SEARCH_CONTENT,
  SEARCH_SECTION,
  SEARCH_SECTION_TITLE,
  SEARCH_TREND_ITEM,
  SEARCH_FOOTER,
  SEARCH_FOOTER_TEXT,
  SEARCH_FOOTER_LINK,
  ICON_SM,
} from './ui.styles';

function SearchModalComponent({ onClose }: SearchModalProps) {
  const router = useRouter();
  const [searchValue, setSearchValue] = useState('');

  const newestCourses = useMemo(() => {
    return [...COURSES]
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, 3);
  }, []);

  const trendingSearches = useMemo(() => {
    return [...COURSES]
      .sort((a, b) => b.totalStudents - a.totalStudents)
      .slice(0, 4)
      .map((c) => c.title);
  }, []);

  const handleOverlayClick = useCallback((e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  }, [onClose]);

  const handleSelect = useCallback((suggestion: SearchSuggestionItem) => {
    router.push(`${ROUTES.COURSES}?q=${encodeURIComponent(suggestion.text)}`);
    onClose();
  }, [router, onClose]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && searchValue.trim()) {
      router.push(`${ROUTES.COURSES}?q=${encodeURIComponent(searchValue)}`);
      onClose();
    }
  }, [router, searchValue, onClose]);

  return (
    <div className={SEARCH_OVERLAY} onClick={handleOverlayClick}>
      <div className={SEARCH_MODAL}>
        <div className={SEARCH_MODAL_INPUT_WRAPPER} onKeyDown={handleKeyDown}>
          <SearchInput
            value={searchValue}
            onChange={setSearchValue}
            onSelect={handleSelect}
            suggestions={SEARCH_SUGGESTIONS}
            placeholder={SEARCH_PLACEHOLDER}
            autoFocus
            showIcon
          />
        </div>

        <div className={SEARCH_CONTENT}>
          {!searchValue ? (
            <>
              <div className={SEARCH_SECTION}>
                <h3 className={SEARCH_SECTION_TITLE}>{SEARCH_LABELS.newestTitle}</h3>
                {newestCourses.map((course) => (
                  <Card
                    key={course.id}
                    title={course.title}
                    subtitle={course.instructorName}
                    variant="compact"
                    size="sm"
                    href={`${ROUTES.COURSES}/${course.id}`}
                    onClick={onClose}
                  />
                ))}
              </div>

              <div className={SEARCH_SECTION}>
                <h3 className={SEARCH_SECTION_TITLE}>{SEARCH_LABELS.trendingTitle}</h3>
                {trendingSearches.map((term) => (
                  <Link
                    key={term}
                    href={`${ROUTES.COURSES}?q=${encodeURIComponent(term)}`}
                    className={SEARCH_TREND_ITEM}
                    onClick={onClose}
                  >
                    <SearchIcon className={ICON_SM} />
                    {term}
                  </Link>
                ))}
              </div>
            </>
          ) : (
            <div className={SEARCH_MODAL_EMPTY}>
              Nhấn Enter để tìm kiếm "{searchValue}"
            </div>
          )}
        </div>

        <div className={SEARCH_FOOTER}>
          <p className={SEARCH_FOOTER_TEXT}>{SEARCH_LABELS.footerText}</p>
          <Link href={ROUTES.COURSES} className={SEARCH_FOOTER_LINK} onClick={onClose}>
            {SEARCH_LABELS.footerLink}
          </Link>
        </div>
      </div>
    </div>
  );
}

export const SearchModal = memo(SearchModalComponent);
