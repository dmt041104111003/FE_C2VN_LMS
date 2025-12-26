'use client';

import { useState, useCallback, useMemo } from 'react';
import { DataTable, ConfirmModal, Pagination, Panel } from '@/components/ui';
import { PAGE } from '@/components/ui/ui.styles';
import { DEFAULT_PAGE_SIZE } from '@/constants/config';
import {
  INSTRUCTOR_LABELS,
  MOCK_INSTRUCTOR_COURSES,
  COURSE_TABLE,
  COURSE_MODAL_CONFIG,
} from '@/constants/instructor';
import { DEFAULT_MODAL_CONFIG } from '@/types/common';
import type { InstructorCourse, InstructorModalType, InstructorModalState, CourseStatus, SearchSuggestion } from '@/types/instructor';
import { InstructorLayout } from './InstructorLayout';
import { CourseFilters } from './CourseFilters';
import { CourseRow } from './CourseRow';

const LABELS = INSTRUCTOR_LABELS.courses;

export function InstructorPage() {
  const [courses, setCourses] = useState<InstructorCourse[]>(MOCK_INSTRUCTOR_COURSES);
  const [keyword, setKeyword] = useState('');
  const [statusFilter, setStatusFilter] = useState<CourseStatus | ''>('');
  const [page, setPage] = useState(1);
  const [modal, setModal] = useState<InstructorModalState>({ type: null, courseId: null });

  const filteredCourses = useMemo(() => {
    return courses.filter(course => {
      const matchKeyword = !keyword || course.title.toLowerCase().includes(keyword.toLowerCase());
      const matchStatus = !statusFilter || course.status === statusFilter;
      return matchKeyword && matchStatus;
    });
  }, [courses, keyword, statusFilter]);

  const searchSuggestions = useMemo(() => {
    const seen = new Set<string>();
    const suggestions: SearchSuggestion[] = [];
    for (const course of courses) {
      if (!seen.has(course.title)) {
        suggestions.push({ text: course.title, type: 'course' });
        seen.add(course.title);
      }
    }
    return suggestions;
  }, [courses]);

  const totalPages = Math.ceil(filteredCourses.length / DEFAULT_PAGE_SIZE);
  const paginatedCourses = useMemo(() => {
    const start = (page - 1) * DEFAULT_PAGE_SIZE;
    return filteredCourses.slice(start, start + DEFAULT_PAGE_SIZE);
  }, [filteredCourses, page]);

  const openModal = useCallback((type: InstructorModalType, courseId: string) => {
    setModal({ type, courseId });
  }, []);

  const closeModal = useCallback(() => {
    setModal({ type: null, courseId: null });
  }, []);

  const handleDelete = useCallback((courseId: string) => {
    setCourses(prev => prev.filter(c => c.id !== courseId));
    closeModal();
  }, [closeModal]);

  const handlePublish = useCallback((courseId: string) => {
    setCourses(prev => prev.map(c => c.id === courseId ? { ...c, status: 'published' as const } : c));
    closeModal();
  }, [closeModal]);

  const handleUnpublish = useCallback((courseId: string) => {
    setCourses(prev => prev.map(c => c.id === courseId ? { ...c, status: 'draft' as const } : c));
    closeModal();
  }, [closeModal]);

  const handleEdit = useCallback((courseId: string) => {
    console.log('Edit course:', courseId);
  }, []);

  const handleDeleteClick = useCallback((courseId: string) => {
    openModal('delete', courseId);
  }, [openModal]);

  const handleToggleStatusClick = useCallback((courseId: string, isPublished: boolean) => {
    openModal(isPublished ? 'unpublish' : 'publish', courseId);
  }, [openModal]);

  const handleConfirm = useCallback(() => {
    if (!modal.courseId) return;
    const actions: Record<NonNullable<InstructorModalType>, () => void> = {
      delete: () => handleDelete(modal.courseId!),
      publish: () => handlePublish(modal.courseId!),
      unpublish: () => handleUnpublish(modal.courseId!),
    };
    modal.type && actions[modal.type]?.();
  }, [modal, handleDelete, handlePublish, handleUnpublish]);

  const modalConfig = modal.type ? COURSE_MODAL_CONFIG[modal.type] : DEFAULT_MODAL_CONFIG;

  return (
    <InstructorLayout activeId="courses" title={LABELS.title}>
      <div className={PAGE.CONTAINER}>
        <CourseFilters
          keyword={keyword}
          statusFilter={statusFilter}
          searchSuggestions={searchSuggestions}
          onKeywordChange={setKeyword}
          onStatusChange={setStatusFilter}
        />

        <Panel
          title={LABELS.title}
          footer={
            <div className="flex items-center justify-between">
              <span className="text-sm text-[var(--text)]/50">
                {LABELS.total}: {filteredCourses.length} {LABELS.coursesUnit}
              </span>
              <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
            </div>
          }
        >
          <DataTable
            headers={[...COURSE_TABLE.headers]}
            isEmpty={paginatedCourses.length === 0}
            emptyMessage={LABELS.empty}
          >
            {paginatedCourses.map((course, idx) => (
              <CourseRow
                key={course.id}
                index={(page - 1) * DEFAULT_PAGE_SIZE + idx + 1}
                course={course}
                onEdit={handleEdit}
                onDelete={handleDeleteClick}
                onToggleStatus={handleToggleStatusClick}
              />
            ))}
          </DataTable>
        </Panel>
        <ConfirmModal
          isOpen={modal.type !== null}
          title={modalConfig.title}
          message={modalConfig.message}
          danger={modalConfig.danger}
          onConfirm={handleConfirm}
          onCancel={closeModal}
        />
      </div>
    </InstructorLayout>
  );
}
