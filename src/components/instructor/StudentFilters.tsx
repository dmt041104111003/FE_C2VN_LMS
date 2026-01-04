'use client';

import { memo } from 'react';
import { SearchInput, Button, ChevronLeftIcon, PlusIcon } from '@/components/ui';
import { STUDENTS_LABELS, STUDENT_STATUS_OPTIONS } from '@/constants/course-students';
import type { StudentFiltersProps, StudentStatus } from '@/types/course-students';
import {
  FILTER_WRAPPER,
  FILTER_ROW,
  FILTER_COL,
  FILTER_LABEL,
  FILTER_SELECT,
  ICON_SM,
} from '@/components/ui/ui.styles';

const LABELS = STUDENTS_LABELS;

interface Props extends StudentFiltersProps {
  onBack: () => void;
}

export const StudentFilters = memo(function StudentFilters({
  keyword,
  statusFilter,
  searchSuggestions,
  onKeywordChange,
  onStatusChange,
  onAddStudent,
  onBack,
}: Props) {
  return (
    <div className={`${FILTER_WRAPPER} mb-8`}>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
        <Button variant="ghost" size="sm" onClick={onBack} className="gap-1.5 self-start">
          <ChevronLeftIcon className={ICON_SM} />
          {LABELS.backToCourses}
        </Button>

        <Button variant="primary" size="sm" onClick={onAddStudent} className="gap-1.5">
          <PlusIcon className={ICON_SM} />
          {LABELS.addStudent}
        </Button>
      </div>

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
            onChange={e => onStatusChange(e.target.value as StudentStatus | '')}
            className={FILTER_SELECT}
          >
            {STUDENT_STATUS_OPTIONS.map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
});

