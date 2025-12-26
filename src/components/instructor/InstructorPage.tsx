'use client';

import { useState, useCallback, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { DataTable, Dialog, Pagination, Panel, Button, PlusIcon, useToast, FormModal } from '@/components/ui';
import { PAGE, ICON_SM } from '@/components/ui/ui.styles';
import { DEFAULT_PAGE_SIZE } from '@/constants/config';
import {
  INSTRUCTOR_LABELS,
  MOCK_INSTRUCTOR_COURSES,
  COURSE_TABLE,
  COURSE_MODAL_CONFIG,
  INITIAL_ADD_STUDENT_MODAL,
  ADD_STUDENT_FIELDS,
  ADD_STUDENT_LABELS,
  ADD_STUDENT_DRAFT_KEY,
  ADD_STUDENT_INITIAL_DATA,
} from '@/constants/instructor';
import { DEFAULT_MODAL_CONFIG } from '@/types/common';
import type { InstructorCourse, InstructorModalType, InstructorModalState, CourseStatus, SearchSuggestion, AddStudentModalState, AddStudentFormData } from '@/types/instructor';
import { InstructorLayout } from './InstructorLayout';
import { CourseFilters } from './CourseFilters';
import { CourseRow } from './CourseRow';

const LABELS = INSTRUCTOR_LABELS.courses;
const TOAST = LABELS.toast;
const INITIAL_MODAL: InstructorModalState = { type: null, courseId: null };

export function InstructorPage() {
  const router = useRouter();
  const toast = useToast();
  const [courses, setCourses] = useState<InstructorCourse[]>(MOCK_INSTRUCTOR_COURSES);
  const [keyword, setKeyword] = useState('');
  const [statusFilter, setStatusFilter] = useState<CourseStatus | ''>('');
  const [page, setPage] = useState(1);
  const [modal, setModal] = useState<InstructorModalState>(INITIAL_MODAL);
  const [addStudentModal, setAddStudentModal] = useState<AddStudentModalState>(INITIAL_ADD_STUDENT_MODAL);

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
    setModal(INITIAL_MODAL);
  }, []);

  const handleDelete = useCallback((courseId: string) => {
    setCourses(prev => prev.filter(c => c.id !== courseId));
    closeModal();
    toast.success(TOAST.deleteSuccess);
  }, [closeModal, toast]);

  const handlePublish = useCallback((courseId: string) => {
    setCourses(prev => prev.map(c => c.id === courseId ? { ...c, status: 'published' as const } : c));
    closeModal();
    toast.success(TOAST.publishSuccess);
  }, [closeModal, toast]);

  const handleUnpublish = useCallback((courseId: string) => {
    setCourses(prev => prev.map(c => c.id === courseId ? { ...c, status: 'draft' as const } : c));
    closeModal();
    toast.success(TOAST.unpublishSuccess);
  }, [closeModal, toast]);

  const handleEdit = useCallback((courseId: string) => {
    router.push(`/instructor/courses/edit/${courseId}`);
  }, [router]);

  const handleViewStudents = useCallback((courseId: string) => {
    router.push(`/instructor/courses/${courseId}/students`);
  }, [router]);

  const handleCreate = useCallback(() => {
    router.push('/instructor/courses/create');
  }, [router]);

  const handleDeleteClick = useCallback((courseId: string) => {
    openModal('delete', courseId);
  }, [openModal]);

  const handleToggleStatusClick = useCallback((courseId: string, isPublished: boolean) => {
    openModal(isPublished ? 'unpublish' : 'publish', courseId);
  }, [openModal]);

  const handleAddStudentClick = useCallback((courseId: string, courseTitle: string) => {
    setAddStudentModal({ isOpen: true, courseId, courseTitle });
  }, []);

  const handleCloseAddStudent = useCallback(() => {
    setAddStudentModal(INITIAL_ADD_STUDENT_MODAL);
  }, []);

  const handleAddStudentSubmit = useCallback((data: Record<string, unknown>) => {
    const formData = data as AddStudentFormData;
    console.log('Add student:', addStudentModal.courseId, formData);
    setCourses(prev => prev.map(c =>
      c.id === addStudentModal.courseId
        ? { ...c, students: c.students + 1 }
        : c
    ));
    handleCloseAddStudent();
    toast.success(TOAST.addStudentSuccess);
  }, [addStudentModal.courseId, handleCloseAddStudent, toast]);

  const isAddStudentFormEmpty = useCallback((data: Record<string, unknown>) => {
    const form = data as AddStudentFormData;
    return !form.fullName?.trim() && !form.contactValue?.trim();
  }, []);

  const isAddStudentFormValid = useCallback((data: Record<string, unknown>) => {
    const form = data as AddStudentFormData;
    return Boolean(form.fullName?.trim() && form.contactValue?.trim());
  }, []);

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
          action={
            <Button variant="primary" size="sm" onClick={handleCreate} className="gap-1.5">
              <PlusIcon className={ICON_SM} />
              {LABELS.create}
            </Button>
          }
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
                onAddStudent={handleAddStudentClick}
                onViewStudents={handleViewStudents}
              />
            ))}
          </DataTable>
        </Panel>
        <Dialog
          isOpen={modal.type !== null}
          title={modalConfig.title}
          message={modalConfig.message}
          danger={modalConfig.danger}
          onPrimary={handleConfirm}
          onSecondary={closeModal}
        />
        <FormModal
          isOpen={addStudentModal.isOpen}
          labels={{
            ...ADD_STUDENT_LABELS,
            subtitle: addStudentModal.courseTitle,
          }}
          fields={ADD_STUDENT_FIELDS}
          storageKey={ADD_STUDENT_DRAFT_KEY}
          initialData={ADD_STUDENT_INITIAL_DATA}
          isEmpty={isAddStudentFormEmpty}
          isValid={isAddStudentFormValid}
          onClose={handleCloseAddStudent}
          onSubmit={handleAddStudentSubmit}
        />
      </div>
    </InstructorLayout>
  );
}
