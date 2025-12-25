'use client';

import { memo, useState, useRef, useEffect, useCallback } from 'react';
import { SearchIcon } from './icons';

export interface SearchSuggestion {
  text: string;
  type?: 'course' | 'instructor' | 'tag' | 'history';
}

export interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  onSelect?: (suggestion: SearchSuggestion) => void;
  suggestions?: SearchSuggestion[];
  placeholder?: string;
  className?: string;
  autoFocus?: boolean;
  showIcon?: boolean;
}

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

  const filteredSuggestions = suggestions.filter((s) =>
    s.text.toLowerCase().includes(value.toLowerCase())
  );

  const showSuggestions = isOpen && value.length > 0 && filteredSuggestions.length > 0;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
    setIsOpen(true);
    setActiveIndex(-1);
  };

  const handleSelect = useCallback((suggestion: SearchSuggestion) => {
    onChange(suggestion.text);
    onSelect?.(suggestion);
    setIsOpen(false);
    setActiveIndex(-1);
  }, [onChange, onSelect]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!showSuggestions) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setActiveIndex((prev) =>
          prev < filteredSuggestions.length - 1 ? prev + 1 : 0
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setActiveIndex((prev) =>
          prev > 0 ? prev - 1 : filteredSuggestions.length - 1
        );
        break;
      case 'Enter':
        e.preventDefault();
        if (activeIndex >= 0 && activeIndex < filteredSuggestions.length) {
          handleSelect(filteredSuggestions[activeIndex]);
        }
        break;
      case 'Escape':
        setIsOpen(false);
        setActiveIndex(-1);
        break;
    }
  };

  const highlightMatch = (text: string, query: string) => {
    if (!query) return text;
    const parts = text.split(new RegExp(`(${query})`, 'gi'));
    return parts.map((part, i) =>
      part.toLowerCase() === query.toLowerCase() ? (
        <span key={i} className="text-[var(--accent)] font-medium">{part}</span>
      ) : (
        part
      )
    );
  };

  const getTypeLabel = (type?: string) => {
    switch (type) {
      case 'course': return 'Khóa học';
      case 'instructor': return 'Giảng viên';
      case 'tag': return 'Chủ đề';
      case 'history': return 'Gần đây';
      default: return '';
    }
  };

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
    <div className={`relative ${className}`} ref={inputRef}>
      <div className="relative">
        {showIcon && (
          <SearchIcon className="absolute left-1 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text)]/30" />
        )}
        <input
          type="search"
          value={value}
          onChange={handleInputChange}
          onFocus={() => setIsOpen(true)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          autoFocus={autoFocus}
          className={`w-full ${showIcon ? 'pl-8' : 'pl-1'} pr-4 py-3 bg-transparent text-[var(--text)] placeholder:text-[var(--text)]/30 border-b border-[var(--text)]/10 focus:border-[var(--accent)]/50 focus:outline-none transition-colors`}
        />
      </div>

      {showSuggestions && (
        <ul
          ref={listRef}
          className="absolute left-0 right-0 top-full mt-1 bg-[var(--bg)] border border-[var(--text)]/10 rounded-lg shadow-lg max-h-64 overflow-y-auto z-[200]"
        >
          {filteredSuggestions.map((suggestion, index) => (
            <li
              key={`${suggestion.text}-${index}`}
              onClick={() => handleSelect(suggestion)}
              className={`px-4 py-2.5 cursor-pointer flex items-center justify-between text-sm transition-colors ${
                index === activeIndex
                  ? 'bg-[var(--bg-alt)] text-[var(--text)]'
                  : 'text-[var(--text)]/70 hover:bg-[var(--bg-alt)]'
              }`}
            >
              <div className="flex items-center gap-3">
                <SearchIcon className="w-3.5 h-3.5 text-[var(--text)]/30" />
                <span>{highlightMatch(suggestion.text, value)}</span>
              </div>
              {suggestion.type && (
                <span className="text-[10px] text-[var(--text)]/40 uppercase tracking-wider">
                  {getTypeLabel(suggestion.type)}
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

