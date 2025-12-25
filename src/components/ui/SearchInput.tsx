'use client';

import { memo, useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { SearchIcon } from './icons';
import { SearchInputProps, SearchSuggestionItem } from './ui.types';
import {
  SEARCH_AUTOCOMPLETE_WRAPPER,
  SEARCH_AUTOCOMPLETE_ICON,
  SEARCH_AUTOCOMPLETE_FIELD,
  SEARCH_AUTOCOMPLETE_FIELD_ICON,
  SEARCH_SUGGESTION_LIST,
  SEARCH_SUGGESTION_ITEM,
  SEARCH_SUGGESTION_ITEM_ACTIVE,
  SEARCH_SUGGESTION_ICON,
  SEARCH_SUGGESTION_HIGHLIGHT,
  SEARCH_SUGGESTION_TYPE,
} from './ui.styles';

const TYPE_LABELS: Record<string, string> = {
  course: 'Khóa học',
  instructor: 'Giảng viên',
  tag: 'Chủ đề',
  history: 'Gần đây',
};

function SearchInputComponent({
  value,
  onChange,
  onSelect,
  suggestions = [],
  placeholder = '',
  className = '',
  autoFocus = false,
  showIcon = true,
}: SearchInputProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  const filteredSuggestions = useMemo(
    () => suggestions.filter(s => s.text.toLowerCase().includes(value.toLowerCase())),
    [suggestions, value]
  );

  const showSuggestions = isOpen && value.length > 0 && filteredSuggestions.length > 0;

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
    setIsOpen(true);
    setActiveIndex(-1);
  }, [onChange]);

  const handleSelect = useCallback((suggestion: SearchSuggestionItem) => {
    onChange(suggestion.text);
    onSelect?.(suggestion);
    setIsOpen(false);
    setActiveIndex(-1);
  }, [onChange, onSelect]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (!showSuggestions) return;

    const handlers: Record<string, () => void> = {
      ArrowDown: () => setActiveIndex(prev => (prev < filteredSuggestions.length - 1 ? prev + 1 : 0)),
      ArrowUp: () => setActiveIndex(prev => (prev > 0 ? prev - 1 : filteredSuggestions.length - 1)),
      Enter: () => {
        if (activeIndex >= 0 && activeIndex < filteredSuggestions.length) {
          handleSelect(filteredSuggestions[activeIndex]);
        }
      },
      Escape: () => {
        setIsOpen(false);
        setActiveIndex(-1);
      },
    };

    if (handlers[e.key]) {
      e.preventDefault();
      handlers[e.key]();
    }
  }, [showSuggestions, activeIndex, filteredSuggestions, handleSelect]);

  const highlightMatch = useCallback((text: string, query: string) => {
    if (!query) return text;
    const parts = text.split(new RegExp(`(${query})`, 'gi'));
    return parts.map((part, i) =>
      part.toLowerCase() === query.toLowerCase()
        ? <span key={i} className={SEARCH_SUGGESTION_HIGHLIGHT}>{part}</span>
        : part
    );
  }, []);

  useEffect(() => {
    if (activeIndex >= 0 && listRef.current) {
      const activeItem = listRef.current.children[activeIndex] as HTMLElement;
      activeItem?.scrollIntoView({ block: 'nearest' });
    }
  }, [activeIndex]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (inputRef.current && !inputRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className={`${SEARCH_AUTOCOMPLETE_WRAPPER} ${className}`} ref={inputRef}>
      <div className="relative">
        {showIcon && <SearchIcon className={SEARCH_AUTOCOMPLETE_ICON} />}
        <input
          type="search"
          value={value}
          onChange={handleInputChange}
          onFocus={() => setIsOpen(true)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          autoFocus={autoFocus}
          className={showIcon ? SEARCH_AUTOCOMPLETE_FIELD_ICON : SEARCH_AUTOCOMPLETE_FIELD}
        />
      </div>

      {showSuggestions && (
        <ul ref={listRef} className={SEARCH_SUGGESTION_LIST}>
          {filteredSuggestions.map((suggestion, index) => (
            <li
              key={`${suggestion.text}-${index}`}
              onClick={() => handleSelect(suggestion)}
              className={index === activeIndex ? SEARCH_SUGGESTION_ITEM_ACTIVE : SEARCH_SUGGESTION_ITEM}
            >
              <div className="flex items-center gap-3">
                <SearchIcon className={SEARCH_SUGGESTION_ICON} />
                <span>{highlightMatch(suggestion.text, value)}</span>
              </div>
              {suggestion.type && (
                <span className={SEARCH_SUGGESTION_TYPE}>
                  {TYPE_LABELS[suggestion.type] || ''}
                </span>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export const SearchInput = memo(SearchInputComponent);
