'use client';

import { memo, useState, useMemo, useCallback, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { SearchIcon } from './icons';
import { Card } from './Card';
import { SearchInput } from './SearchInput';
import { SearchModalProps, SearchSuggestionItem } from './ui.types';
import {
  SEARCH_PLACEHOLDER,
  SEARCH_LABELS,
  ROUTES,
} from '@/constants';
import { courseService } from '@/services/course';
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

interface CourseResult {
  id?: string;
  slug?: string;
  title?: string;
  instructorName?: string;
  courseTags?: { name?: string }[];
  numOfStudents?: number;
  createdAt?: string;
}

function SearchModalComponent({ onClose }: SearchModalProps) {
  const router = useRouter();
  const [searchValue, setSearchValue] = useState('');
  const [courses, setCourses] = useState<CourseResult[]>([]);
  const [suggestions, setSuggestions] = useState<SearchSuggestionItem[]>([]);

  
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const data = await courseService.getPublishedCourses() as CourseResult[];
        setCourses(data || []);
        
        
        const courseSuggestions: SearchSuggestionItem[] = (data || [])
          .filter(c => c.title)
          .map(c => ({ text: c.title!, type: 'course' as const }));
        
        const instructorSet = new Set<string>();
        const tagSet = new Set<string>();
        
        (data || []).forEach(c => {
          if (c.instructorName) instructorSet.add(c.instructorName);
          c.courseTags?.forEach(t => {
            if (t.name) tagSet.add(t.name);
          });
        });
        
        const instructorSuggestions: SearchSuggestionItem[] = Array.from(instructorSet)
          .map(name => ({ text: name, type: 'instructor' as const }));
        
        const tagSuggestions: SearchSuggestionItem[] = Array.from(tagSet)
          .map(name => ({ text: name, type: 'tag' as const }));
        
        setSuggestions([...courseSuggestions, ...instructorSuggestions, ...tagSuggestions]);
      } catch {
        setCourses([]);
        setSuggestions([]);
      }
    };
    fetchCourses();
  }, []);

  const newestCourses = useMemo(() => {
    return [...courses]
      .sort((a, b) => new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime())
      .slice(0, 3);
  }, [courses]);

  const trendingSearches = useMemo(() => {
    return [...courses]
      .sort((a, b) => (b.numOfStudents || 0) - (a.numOfStudents || 0))
      .slice(0, 4)
      .map((c) => c.title)
      .filter(Boolean) as string[];
  }, [courses]);

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
            suggestions={suggestions}
            placeholder={SEARCH_PLACEHOLDER}
            autoFocus
            showIcon
          />
        </div>

        <div className={SEARCH_CONTENT}>
          {!searchValue ? (
            <>
              {newestCourses.length > 0 && (
                <div className={SEARCH_SECTION}>
                  <h3 className={SEARCH_SECTION_TITLE}>{SEARCH_LABELS.newestTitle}</h3>
                  {newestCourses.map((course) => (
                    <Card
                      key={course.id || course.slug}
                      title={course.title || ''}
                      subtitle={course.instructorName}
                      variant="compact"
                      size="sm"
                      href={`${ROUTES.COURSES}/${course.slug || course.id}`}
                      onClick={onClose}
                    />
                  ))}
                </div>
              )}

              {trendingSearches.length > 0 && (
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
              )}

              {newestCourses.length === 0 && trendingSearches.length === 0 && (
                <div className={SEARCH_MODAL_EMPTY}>
                  Chưa có khóa học nào
                </div>
              )}
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
