'use client';

import { memo } from 'react';
import Link from 'next/link';
import { SearchIcon } from './icons';
import { Card } from './Card';
import { Input } from './Input';
import {
  SEARCH_PLACEHOLDER,
  SEARCH_LABELS,
  POPULAR_COURSES,
  TRENDING_SEARCHES,
  ROUTES,
} from '@/constants';
import {
  SEARCH_OVERLAY,
  SEARCH_MODAL,
  SEARCH_INPUT_WRAPPER,
  SEARCH_INPUT_BTN,
  SEARCH_CONTENT,
  SEARCH_SECTION,
  SEARCH_SECTION_TITLE,
  SEARCH_TREND_ITEM,
  SEARCH_FOOTER,
  SEARCH_FOOTER_TEXT,
  SEARCH_FOOTER_LINK,
  ICON_SM,
  ICON_MD,
} from './ui.styles';

interface SearchModalProps {
  onClose: () => void;
}

function SearchModalComponent({ onClose }: SearchModalProps) {
  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className={SEARCH_OVERLAY}
      onClick={handleOverlayClick}
    >
      <div className={SEARCH_MODAL}>
        <div className={SEARCH_INPUT_WRAPPER}>
          <Input
            type="text"
            placeholder={SEARCH_PLACEHOLDER}
            variant="search"
            size="lg"
            className="flex-1 py-4"
            autoFocus
          />
          <button className={SEARCH_INPUT_BTN}>
            <SearchIcon className={ICON_MD} />
          </button>
        </div>

        <div className={SEARCH_CONTENT}>
          <div className={SEARCH_SECTION}>
            <h3 className={SEARCH_SECTION_TITLE}>
              {SEARCH_LABELS.popularTitle}
            </h3>
            {POPULAR_COURSES.map((course) => (
              <Card
                key={course.title}
                title={course.title}
                subtitle={course.provider}
                image={course.image}
                variant="horizontal"
                size="sm"
                href={ROUTES.COURSES}
                onClick={onClose}
              />
            ))}
          </div>

          <div className={SEARCH_SECTION}>
            <h3 className={SEARCH_SECTION_TITLE}>
              {SEARCH_LABELS.trendingTitle}
            </h3>
            {TRENDING_SEARCHES.map((term) => (
              <Link
                key={term}
                href={`${ROUTES.COURSES}?q=${term}`}
                className={SEARCH_TREND_ITEM}
                onClick={onClose}
              >
                <SearchIcon className={ICON_SM} />
                {term}
              </Link>
            ))}
          </div>
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

