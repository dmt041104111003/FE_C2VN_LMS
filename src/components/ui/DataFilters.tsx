'use client';

import { memo, useCallback, ReactNode } from 'react';
import { SearchIcon, ChevronDownIcon } from './icons';
import type { SearchFilterProps, SelectFilterProps } from './ui.types';
import { FILTERS } from './ui.styles';

export const SearchFilter = memo(function SearchFilter({ value, onChange, placeholder, onSearch }: SearchFilterProps) {
  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && onSearch) onSearch();
  }, [onSearch]);

  return (
    <div className={FILTERS.SEARCH_WRAPPER}>
      <SearchIcon className={FILTERS.SEARCH_ICON} />
      <input
        type="text"
        value={value}
        onChange={e => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        className={FILTERS.SEARCH_INPUT}
      />
    </div>
  );
});

export const SelectFilter = memo(function SelectFilter({ value, onChange, options }: SelectFilterProps) {
  return (
    <div className={FILTERS.SELECT_WRAPPER}>
      <select
        value={value}
        onChange={e => onChange(e.target.value)}
        className={FILTERS.SELECT}
      >
        {options.map(opt => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
      <ChevronDownIcon className={FILTERS.SELECT_ICON} />
    </div>
  );
});

export const FiltersBar = memo(function FiltersBar({ children }: { children: ReactNode }) {
  return <div className={FILTERS.BAR}>{children}</div>;
});

