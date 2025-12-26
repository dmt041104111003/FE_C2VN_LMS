'use client';

import { useState, useCallback, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { Dialog, useToast, FormModal } from '@/components/ui';
import { PAGE } from '@/components/ui/ui.styles';
import { DEFAULT_PAGE_SIZE } from '@/constants/config';
import {
  STUDENTS_LABELS,
  STUDENT_MODAL_CONFIG,
  MOCK_COURSE_STUDENTS,
  INITIAL_STUDENT_MODAL,
  INITIAL_EDIT_STUDENT_MODAL,
} from '@/constants/course-students';
import {
  MOCK_INSTRUCTOR_COURSES,
  ADD_STUDENT_FIELDS,
  ADD_STUDENT_LABELS,
  ADD_STUDENT_INITIAL_DATA,
  ADD_STUDENT_DRAFT_KEY,
  EDIT_STUDENT_LABELS,
  EDIT_STUDENT_DRAFT_KEY,
} from '@/constants/instructor';
import { DEFAULT_MODAL_CONFIG } from '@/types/common';
import type {
  CourseStudent,
  StudentStatus,
  StudentModalState,
  EditStudentModalState,
  CourseStudentsPageProps,
  SearchSuggestion,
} from '@/types/course-students';
import { InstructorLayout } from './InstructorLayout';
import { StudentTable } from './StudentTable';

const LABELS = STUDENTS_LABELS;
const TOAST = LABELS.toast;

const isFormEmpty = (data: Record<string, unknown>): boolean => {
  const fullName = ((data.fullName as string) || '').trim();
  const contactValue = ((data.contactValue as string) || '').trim();
  return !fullName && !contactValue;
};

const isFormValid = (data: Record<string, unknown>): boolean => {
  const fullName = ((data.fullName as string) || '').trim();
  const contactValue = ((data.contactValue as string) || '').trim();
  return Boolean(fullName && contactValue);
};

export function CourseStudentsPage({ courseId }: CourseStudentsPageProps) {
  const router = useRouter();
  const toast = useToast();

  const course = useMemo(() => {
    return MOCK_INSTRUCTOR_COURSES.find(c => c.id === courseId);
  }, [courseId]);

  const [students, setStudents] = useState<CourseStudent[]>(
    () => MOCK_COURSE_STUDENTS[courseId] || []
  );
  const [keyword, setKeyword] = useState('');
  const [statusFilter, setStatusFilter] = useState<StudentStatus | ''>('');
  const [page, setPage] = useState(1);
  const [modal, setModal] = useState<StudentModalState>(INITIAL_STUDENT_MODAL);
  const [editModal, setEditModal] = useState<EditStudentModalState>(INITIAL_EDIT_STUDENT_MODAL);
  const [showAddModal, setShowAddModal] = useState(false);

  const studentsMap = useMemo(
    () => new Map(students.map(s => [s.id, s])),
    [students]
  );

  const filteredStudents = useMemo(() => {
    if (!keyword && !statusFilter) return students;
    const lowerKeyword = keyword.toLowerCase();
    return students.filter(s => {
      const matchesKeyword = !keyword ||
        s.fullName.toLowerCase().includes(lowerKeyword) ||
        s.email.toLowerCase().includes(lowerKeyword);
      const matchesStatus = !statusFilter || s.status === statusFilter;
      return matchesKeyword && matchesStatus;
    });
  }, [students, keyword, statusFilter]);

  const searchSuggestions = useMemo(() => {
    const seen = new Set<string>();
    const result: SearchSuggestion[] = [];
    for (const s of students) {
      if (!seen.has(s.fullName)) {
        result.push({ text: s.fullName, type: 'instructor' });
        seen.add(s.fullName);
      }
      if (!seen.has(s.email)) {
        result.push({ text: s.email, type: 'tag' });
        seen.add(s.email);
      }
    }
    return result;
  }, [students]);

  const pendingCertificateCount = useMemo(() => {
    return students.filter(s => 
      s.status === 'completed' && s.certificateStatus !== 'issued'
    ).length;
  }, [students]);

  const totalPages = Math.ceil(filteredStudents.length / DEFAULT_PAGE_SIZE);
  const startIndex = (page - 1) * DEFAULT_PAGE_SIZE;
  const paginatedStudents = filteredStudents.slice(startIndex, startIndex + DEFAULT_PAGE_SIZE);

  const closeModal = useCallback(() => setModal(INITIAL_STUDENT_MODAL), []);

  const handleEdit = useCallback((studentId: string) => {
    const student = studentsMap.get(studentId);
    if (!student) return;

    const hasWallet = Boolean(student.walletAddress);
    setEditModal({
      isOpen: true,
      studentId,
      initialData: {
        fullName: student.fullName,
        contactType: hasWallet ? 'wallet' : 'email',
        contactValue: hasWallet ? (student.walletAddress || '') : student.email,
      },
    });
  }, [studentsMap]);

  const handleRemoveClick = useCallback((studentId: string) => {
    setModal({ type: 'remove', studentId });
  }, []);

  const handleIssueCertificateClick = useCallback((studentId: string) => {
    setModal({ type: 'issueCertificate', studentId });
  }, []);

  const handleIssueAllCertificatesClick = useCallback(() => {
    setModal({ type: 'issueAllCertificates', studentId: null });
  }, []);

  const handleConfirm = useCallback(() => {
    const { studentId, type } = modal;
    if (!type) return;

    if (type === 'remove' && studentId) {
      setStudents(prev => prev.filter(s => s.id !== studentId));
      toast.success(TOAST.removeSuccess);
    } else if (type === 'issueCertificate' && studentId) {
      setStudents(prev => prev.map(s =>
        s.id === studentId ? { ...s, certificateStatus: 'issued' as const } : s
      ));
      toast.success(TOAST.certificateSuccess);
    } else if (type === 'issueAllCertificates') {
      setStudents(prev => prev.map(s =>
        s.status === 'completed' && s.certificateStatus !== 'issued'
          ? { ...s, certificateStatus: 'issued' as const }
          : s
      ));
      toast.success(TOAST.allCertificatesSuccess);
    }

    closeModal();
  }, [modal, closeModal, toast]);

  const handleBack = useCallback(() => router.push('/instructor'), [router]);

  const handleAddStudentClick = useCallback(() => setShowAddModal(true), []);
  const handleCloseAddModal = useCallback(() => setShowAddModal(false), []);

  const handleAddStudentSubmit = useCallback((data: Record<string, unknown>) => {
    const fullName = data.fullName as string;
    const contactType = data.contactType as string;
    const contactValue = data.contactValue as string;
    const isEmail = contactType === 'email';

    const newStudent: CourseStudent = {
      id: `new-${Date.now()}`,
      fullName,
      email: isEmail ? contactValue : '',
      walletAddress: isEmail ? undefined : contactValue,
      enrolledAt: new Date().toISOString(),
      status: 'active',
    };

    setStudents(prev => [newStudent, ...prev]);
    setShowAddModal(false);
    toast.success(TOAST.addSuccess);
  }, [toast]);

  const handleCloseEditModal = useCallback(() => {
    setEditModal(INITIAL_EDIT_STUDENT_MODAL);
  }, []);

  const handleEditSubmit = useCallback((data: Record<string, unknown>) => {
    const { studentId } = editModal;
    if (!studentId) return;

    const fullName = data.fullName as string;
    const contactType = data.contactType as string;
    const contactValue = data.contactValue as string;
    const isEmail = contactType === 'email';

    setStudents(prev => prev.map(s =>
      s.id === studentId
        ? {
            ...s,
            fullName,
            email: isEmail ? contactValue : s.email,
            walletAddress: isEmail ? s.walletAddress : contactValue,
          }
        : s
    ));

    setEditModal(INITIAL_EDIT_STUDENT_MODAL);
    toast.success(TOAST.editSuccess);
  }, [editModal, toast]);

  const modalConfig = modal.type ? STUDENT_MODAL_CONFIG[modal.type] : DEFAULT_MODAL_CONFIG;
  const pageTitle = course ? `${LABELS.title} - ${course.title}` : LABELS.title;
  const editStorageKey = editModal.studentId
    ? `${EDIT_STUDENT_DRAFT_KEY}_${editModal.studentId}`
    : EDIT_STUDENT_DRAFT_KEY;

  return (
    <InstructorLayout activeId="courses" title={pageTitle}>
      <div className={PAGE.CONTAINER}>
        <StudentTable
          students={paginatedStudents}
          totalCount={filteredStudents.length}
          currentPage={page}
          totalPages={totalPages}
          startIndex={startIndex}
          keyword={keyword}
          statusFilter={statusFilter}
          searchSuggestions={searchSuggestions}
          courseTitle={course?.title || LABELS.title}
          pendingCertificateCount={pendingCertificateCount}
          onKeywordChange={setKeyword}
          onStatusChange={setStatusFilter}
          onPageChange={setPage}
          onEdit={handleEdit}
          onRemove={handleRemoveClick}
          onIssueCertificate={handleIssueCertificateClick}
          onIssueAllCertificates={handleIssueAllCertificatesClick}
          onAddStudent={handleAddStudentClick}
          onBack={handleBack}
        />

        <Dialog
          isOpen={modal.type !== null}
          title={modalConfig.title}
          message={modalConfig.message}
          danger={modalConfig.danger}
          onPrimary={handleConfirm}
          onSecondary={closeModal}
        />

        <FormModal
          isOpen={showAddModal}
          labels={{
            ...ADD_STUDENT_LABELS,
            subtitle: course?.title,
          }}
          fields={ADD_STUDENT_FIELDS}
          storageKey={`${ADD_STUDENT_DRAFT_KEY}_${courseId}`}
          initialData={ADD_STUDENT_INITIAL_DATA}
          isEmpty={isFormEmpty}
          isValid={isFormValid}
          onClose={handleCloseAddModal}
          onSubmit={handleAddStudentSubmit}
        />

        <FormModal
          isOpen={editModal.isOpen}
          labels={EDIT_STUDENT_LABELS}
          fields={ADD_STUDENT_FIELDS}
          storageKey={editStorageKey}
          initialData={editModal.initialData}
          isEmpty={isFormEmpty}
          isValid={isFormValid}
          onClose={handleCloseEditModal}
          onSubmit={handleEditSubmit}
        />
      </div>
    </InstructorLayout>
  );
}
