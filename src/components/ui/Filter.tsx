'use client';

import { memo } from 'react';
import { SearchInput } from './SearchInput';
import { FilterProps } from './ui.types';

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
  className = '',
}: FilterProps) {
  return (
    <div className={`space-y-8 ${className}`}>
      <SearchInput
        value={search}
        onChange={onSearchChange}
        suggestions={searchSuggestions}
        placeholder={searchPlaceholder}
        showIcon
      />

      <div className="flex flex-col sm:flex-row gap-8 sm:gap-12">
        <div className="flex-1 space-y-1">
          <label className="text-xs text-[var(--text)]/40 uppercase tracking-wider pl-1">Chủ đề</label>
          <select
            value={tagFilter}
            onChange={(e) => onTagFilterChange(e.target.value)}
            className="w-full py-2 pl-1 bg-transparent text-sm text-[var(--text)] border-b border-[var(--text)]/10 focus:border-[var(--accent)]/50 focus:outline-none transition-colors cursor-pointer"
          >
            {tagOptions.map((option) => (
              <option key={option.value} value={option.value} className="py-2">
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div className="flex-1 space-y-1">
          <label className="text-xs text-[var(--text)]/40 uppercase tracking-wider pl-1">Đánh giá</label>
          <select
            value={ratingFilter}
            onChange={(e) => onRatingFilterChange(Number(e.target.value) as 0 | 4 | 4.5)}
            className="w-full py-2 pl-1 bg-transparent text-sm text-[var(--text)] border-b border-[var(--text)]/10 focus:border-[var(--accent)]/50 focus:outline-none transition-colors cursor-pointer"
          >
            {ratingOptions.map((option) => (
              <option key={option.value} value={option.value} className="py-2">
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div className="flex-1 space-y-1">
          <label className="text-xs text-[var(--text)]/40 uppercase tracking-wider pl-1">
            Giá: {priceRange.min}{currency} — {priceRange.max >= maxPrice ? `${maxPrice}+` : priceRange.max}{currency}
          </label>
          <div className="flex items-center gap-4 py-2">
            <input
              type="range"
              min={0}
              max={maxPrice}
              value={priceRange.min}
              onChange={(e) => {
                const newMin = Number(e.target.value);
                if (newMin <= priceRange.max) {
                  onPriceRangeChange({ ...priceRange, min: newMin });
                }
              }}
              className="flex-1 h-[1px] bg-[var(--text)]/10 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[var(--accent)]"
            />
            <span className="text-[var(--text)]/15 text-xs">—</span>
            <input
              type="range"
              min={0}
              max={maxPrice}
              value={priceRange.max}
              onChange={(e) => {
                const newMax = Number(e.target.value);
                if (newMax >= priceRange.min) {
                  onPriceRangeChange({ ...priceRange, max: newMax });
                }
              }}
              className="flex-1 h-[1px] bg-[var(--text)]/10 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[var(--accent)]"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export const Filter = memo(FilterComponent);

