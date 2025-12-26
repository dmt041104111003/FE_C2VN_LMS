'use client';

import { memo } from 'react';
import { SearchInput } from '@/components/ui';
import { INSTRUCTOR_LABELS, COURSE_STATUS_OPTIONS } from '@/constants/instructor';
import type { CourseFiltersProps, CourseStatus } from '@/types/instructor';
import {
  FILTER_WRAPPER,
  FILTER_ROW,
  FILTER_COL,
  FILTER_LABEL,
  FILTER_SELECT,
} from '@/components/ui/ui.styles';

const LABELS = INSTRUCTOR_LABELS.courses;

export const CourseFilters = memo(function CourseFilters({
  keyword,
  statusFilter,
  searchSuggestions,
  onKeywordChange,
  onStatusChange,
}: CourseFiltersProps) {
  return (
    <div className={`${FILTER_WRAPPER} mb-8`}>
      <SearchInput
        value={keyword}
        onChange={onKeywordChange}
        suggestions={searchSuggestions}
        placeholder={LABELS.searchPlaceholder}
        showIcon
      />

      <div className={FILTER_ROW}>
        <div className={FILTER_COL}>
          <label className={FILTER_LABEL}>{LABELS.filterStatus}</label>
          <select
            value={statusFilter}
            onChange={e => onStatusChange(e.target.value as CourseStatus | '')}
            className={FILTER_SELECT}
          >
            {COURSE_STATUS_OPTIONS.map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
});

