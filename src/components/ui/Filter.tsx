'use client';

import { memo, useCallback } from 'react';
import { SearchInput } from './SearchInput';
import { FilterProps, RatingFilterType } from './ui.types';
import {
  FILTER_WRAPPER,
  FILTER_ROW,
  FILTER_COL,
  FILTER_LABEL,
  FILTER_SELECT,
  FILTER_RANGE_WRAPPER,
  FILTER_RANGE_INPUT,
  FILTER_RANGE_SEPARATOR,
} from './ui.styles';

function FilterComponent({
  search,
  onSearchChange,
  searchPlaceholder = '',
  searchSuggestions = [],
  priceRange,
  onPriceRangeChange,
  maxPrice,
  currency = '₳',
  tagFilter,
  onTagFilterChange,
  tagOptions,
  ratingFilter,
  onRatingFilterChange,
  ratingOptions,
  vertical = false,
  hideSearch = false,
  className = '',
}: FilterProps & { vertical?: boolean; hideSearch?: boolean }) {
  const handleMinPriceChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const newMin = Number(e.target.value);
    if (newMin <= priceRange.max) {
      onPriceRangeChange({ ...priceRange, min: newMin });
    }
  }, [priceRange, onPriceRangeChange]);

  const handleMaxPriceChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const newMax = Number(e.target.value);
    if (newMax >= priceRange.min) {
      onPriceRangeChange({ ...priceRange, max: newMax });
    }
  }, [priceRange, onPriceRangeChange]);

  const handleRatingChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    onRatingFilterChange(Number(e.target.value) as RatingFilterType);
  }, [onRatingFilterChange]);

  const priceLabel = `Giá: ${priceRange.min}${currency} — ${priceRange.max >= maxPrice ? `${maxPrice}+` : priceRange.max}${currency}`;

  const rowClass = vertical ? 'flex flex-col gap-6' : FILTER_ROW;

  return (
    <div className={`${FILTER_WRAPPER} ${className}`}>
      {!hideSearch && (
        <SearchInput
          value={search}
          onChange={onSearchChange}
          suggestions={searchSuggestions}
          placeholder={searchPlaceholder}
          showIcon
        />
      )}

      <div className={rowClass}>
        <div className={FILTER_COL}>
          <label className={FILTER_LABEL}>Chủ đề</label>
          <select
            value={tagFilter}
            onChange={(e) => onTagFilterChange(e.target.value)}
            className={FILTER_SELECT}
          >
            {tagOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div className={FILTER_COL}>
          <label className={FILTER_LABEL}>Đánh giá</label>
          <select
            value={ratingFilter}
            onChange={handleRatingChange}
            className={FILTER_SELECT}
          >
            {ratingOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div className={FILTER_COL}>
          <label className={FILTER_LABEL}>Khoảng giá ({currency})</label>
          <div className="flex items-center gap-2 py-2">
            <input
              type="number"
              min={0}
              max={maxPrice}
              value={priceRange.min}
              onChange={handleMinPriceChange}
              placeholder="Từ"
              className="w-full px-3 py-2 bg-transparent text-sm text-[var(--text)] border border-[var(--text)]/10 rounded-lg focus:border-[var(--accent)]/50 focus:outline-none"
            />
            <span className="text-[var(--text)]/30">—</span>
            <input
              type="number"
              min={0}
              max={maxPrice}
              value={priceRange.max}
              onChange={handleMaxPriceChange}
              placeholder="Đến"
              className="w-full px-3 py-2 bg-transparent text-sm text-[var(--text)] border border-[var(--text)]/10 rounded-lg focus:border-[var(--accent)]/50 focus:outline-none"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export const Filter = memo(FilterComponent);
