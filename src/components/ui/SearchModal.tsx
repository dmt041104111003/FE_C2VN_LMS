'use client';

import { memo, useState, useMemo } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { SearchIcon } from './icons';
import { Card } from './Card';
import { SearchInput, SearchSuggestion } from './SearchInput';
import {
  SEARCH_PLACEHOLDER,
  SEARCH_LABELS,
  SEARCH_SUGGESTIONS,
  ROUTES,
} from '@/constants';
import { MOCK_COURSES } from '@/constants/course';
import {
  SEARCH_OVERLAY,
  SEARCH_MODAL,
  SEARCH_CONTENT,
  SEARCH_SECTION,
  SEARCH_SECTION_TITLE,
  SEARCH_TREND_ITEM,
  SEARCH_FOOTER,
  SEARCH_FOOTER_TEXT,
  SEARCH_FOOTER_LINK,
  ICON_SM,
} from './ui.styles';

interface SearchModalProps {
  onClose: () => void;
}

function SearchModalComponent({ onClose }: SearchModalProps) {
  const router = useRouter();
  const [searchValue, setSearchValue] = useState('');

  const newestCourses = useMemo(() => {
    return [...MOCK_COURSES]
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, 3);
  }, []);

  const trendingSearches = useMemo(() => {
    return [...MOCK_COURSES]
      .sort((a, b) => b.totalStudents - a.totalStudents)
      .slice(0, 4)
      .map((c) => c.title);
  }, []);

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleSelect = (suggestion: SearchSuggestion) => {
    router.push(`${ROUTES.COURSES}?q=${encodeURIComponent(suggestion.text)}`);
    onClose();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && searchValue.trim()) {
      router.push(`${ROUTES.COURSES}?q=${encodeURIComponent(searchValue)}`);
      onClose();
    }
  };

  return (
    <div
      className={SEARCH_OVERLAY}
      onClick={handleOverlayClick}
    >
      <div className={SEARCH_MODAL}>
        <div className="px-4 pt-4 relative overflow-visible" onKeyDown={handleKeyDown}>
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
                <h3 className={SEARCH_SECTION_TITLE}>
                  {SEARCH_LABELS.newestTitle}
                </h3>
                {newestCourses.map((course) => (
                  <Card
                    key={course.id}
                    title={course.title}
                    subtitle={course.instructorName}
                    image={course.thumbnail || '/loading.png'}
                    variant="horizontal"
                    size="sm"
                    href={`${ROUTES.COURSES}/${course.id}`}
                    onClick={onClose}
                  />
                ))}
              </div>

              <div className={SEARCH_SECTION}>
                <h3 className={SEARCH_SECTION_TITLE}>
                  {SEARCH_LABELS.trendingTitle}
                </h3>
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
            <div className="py-4 text-center text-sm text-[var(--text)]/50">
              Nhấn Enter để tìm kiếm "{searchValue}"
            </div>
          )}
        </div>

        <div className={SEARCH_FOOTER}>
          <p className={SEARCH_FOOTER_TEXT}>
            {SEARCH_LABELS.footerText}
          </p>
          <Link
            href={ROUTES.COURSES}
            className={SEARCH_FOOTER_LINK}
            onClick={onClose}
          >
            {SEARCH_LABELS.footerLink}
          </Link>
        </div>
      </div>
    </div>
  );
}

export const SearchModal = memo(SearchModalComponent);

