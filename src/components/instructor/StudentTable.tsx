'use client';

import { memo } from 'react';
import { DataTable, Pagination, Panel } from '@/components/ui';
import { STUDENTS_LABELS, STUDENT_TABLE_HEADERS } from '@/constants/course-students';
import type { StudentTableProps } from '@/types/course-students';
import { StudentRow } from './StudentRow';
import { StudentFilters } from './StudentFilters';

const LABELS = STUDENTS_LABELS;

export const StudentTable = memo(function StudentTable({
  students,
  totalCount,
  currentPage,
  totalPages,
  startIndex,
  keyword,
  statusFilter,
  searchSuggestions,
  courseTitle,
  onKeywordChange,
  onStatusChange,
  onPageChange,
  onEdit,
  onRemove,
  onBack,
}: StudentTableProps) {
  return (
    <>
      <StudentFilters
        keyword={keyword}
        statusFilter={statusFilter}
        searchSuggestions={searchSuggestions}
        onKeywordChange={onKeywordChange}
        onStatusChange={onStatusChange}
        onBack={onBack}
      />

      <Panel
        title={courseTitle}
        footer={
          <div className="flex items-center justify-between">
            <span className="text-sm text-[var(--text)]/50">
              {LABELS.total}: {totalCount} {LABELS.studentsUnit}
            </span>
            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={onPageChange} />
          </div>
        }
      >
        <DataTable
          headers={[...STUDENT_TABLE_HEADERS]}
          isEmpty={students.length === 0}
          emptyMessage={LABELS.empty}
        >
          {students.map((student, idx) => (
            <StudentRow
              key={student.id}
              index={startIndex + idx + 1}
              student={student}
              onEdit={onEdit}
              onRemove={onRemove}
            />
          ))}
        </DataTable>
      </Panel>
    </>
  );
});

