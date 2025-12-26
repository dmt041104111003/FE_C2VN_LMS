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
  pendingCertificateCount,
  onKeywordChange,
  onStatusChange,
  onIssueAllCertificates,
  onAddStudent,
  onBack,
}: Props) {
  const hasPending = pendingCertificateCount > 0;

  return (
    <div className={`${FILTER_WRAPPER} mb-8`}>
      <div className="flex items-center justify-between mb-4">
        <Button variant="ghost" size="sm" onClick={onBack} className="gap-1.5">
          <ChevronLeftIcon className={ICON_SM} />
          {LABELS.backToCourses}
        </Button>

        <div className="flex gap-2">
          {hasPending && (
            <Button size="sm" onClick={onIssueAllCertificates}>
              {LABELS.issueAllCertificates} ({pendingCertificateCount} {LABELS.pendingCount})
            </Button>
          )}
          <Button variant="primary" size="sm" onClick={onAddStudent} className="gap-1.5">
            <PlusIcon className={ICON_SM} />
            {LABELS.addStudent}
          </Button>
        </div>
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

