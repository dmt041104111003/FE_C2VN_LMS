'use client';

import { useState, useCallback, useMemo, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Dialog, useToast, FormModal } from '@/components/ui';
import { PAGE } from '@/components/ui/ui.styles';
import { DEFAULT_PAGE_SIZE } from '@/constants/config';
import {
  STUDENTS_LABELS,
  STUDENT_MODAL_CONFIG,
  INITIAL_STUDENT_MODAL,
} from '@/constants/course-students';
import {
  ADD_STUDENT_FIELDS,
  ADD_STUDENT_LABELS,
  ADD_STUDENT_INITIAL_DATA,
  ADD_STUDENT_DRAFT_KEY,
} from '@/constants/instructor';
import { DEFAULT_MODAL_CONFIG } from '@/types/common';
import type {
  CourseStudent,
  StudentStatus,
  StudentModalState,
  CourseStudentsPageProps,
  SearchSuggestion,
} from '@/types/course-students';
import { InstructorLayout } from './InstructorLayout';
import { StudentTable } from './StudentTable';
import { getEnrolledStudents, courseService, addStudentToCourse } from '@/services/course';

const LABELS = STUDENTS_LABELS;
const TOAST = LABELS.toast;

const isFormEmpty = (data: Record<string, unknown>): boolean => {
  const contactValue = ((data.contactValue as string) || '').trim();
  return !contactValue;
};

const isFormValid = (data: Record<string, unknown>): boolean => {
  const contactValue = ((data.contactValue as string) || '').trim();
  return Boolean(contactValue);
};

export function CourseStudentsPage({ courseId }: CourseStudentsPageProps) {
  const router = useRouter();
  const toast = useToast();

  const [courseInfo, setCourseInfo] = useState<{ title: string; id: string } | null>(null);
  const [students, setStudents] = useState<CourseStudent[]>([]);

  const fetchStudents = useCallback(async () => {
    try {
      const courseData = await courseService.getCourseBySlug(courseId) as { id: string; title: string };
      const realCourseId = courseData.id;
      
      const data = await getEnrolledStudents(realCourseId);
      setCourseInfo({ title: data.courseName || courseData.title, id: realCourseId });
      setStudents(data.enrolled.map(e => ({
        id: String(e.enrolledId),
        fullName: e.userName || 'Chưa cập nhật',
        email: e.email || '',
        walletAddress: e.walletAddress,
        enrolledAt: e.enrollAt,
        status: e.courseCompleted ? 'completed' : 'active',
        progress: e.lectureProgressPercent || 0,
        lecturesCompleted: e.lecturesCompleted || 0,
        totalLectures: e.totalLectures || 0,
        testsCompleted: e.testsCompleted || 0,
        totalTests: e.totalTests || 0,
        allLecturesCompleted: e.allLecturesCompleted || false,
        allTestsCompleted: e.allTestsCompleted || false,
      } as CourseStudent)));
    } catch {
      toast.error('Không thể tải danh sách học viên');
    }
  }, [courseId, toast]);

  useEffect(() => {
    fetchStudents();
  }, [fetchStudents]);
  const [keyword, setKeyword] = useState('');
  const [statusFilter, setStatusFilter] = useState<StudentStatus | ''>('');
  const [page, setPage] = useState(1);
  const [modal, setModal] = useState<StudentModalState>(INITIAL_STUDENT_MODAL);
  const [showAddModal, setShowAddModal] = useState(false);

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
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleAddStudentSubmit = useCallback(async (data: Record<string, unknown>) => {
    if (!courseInfo?.id) return;
    
    const contactType = data.contactType as 'email' | 'wallet';
    const contactValue = (data.contactValue as string).trim();

    setIsSubmitting(true);
    try {
      await addStudentToCourse(courseInfo.id, { contactType, contactValue });
      toast.success(TOAST.addSuccess);
      setShowAddModal(false);
      
      await fetchStudents();
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Không thể thêm học viên';
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  }, [courseInfo?.id, toast, fetchStudents]);

  const modalConfig = modal.type ? STUDENT_MODAL_CONFIG[modal.type] : DEFAULT_MODAL_CONFIG;
  const pageTitle = courseInfo ? `${LABELS.title} - ${courseInfo.title}` : LABELS.title;

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
          courseTitle={courseInfo?.title || LABELS.title}
          pendingCertificateCount={pendingCertificateCount}
          onKeywordChange={setKeyword}
          onStatusChange={setStatusFilter}
          onPageChange={setPage}
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
            subtitle: courseInfo?.title,
          }}
          fields={ADD_STUDENT_FIELDS}
          storageKey={`${ADD_STUDENT_DRAFT_KEY}_${courseId}`}
          initialData={ADD_STUDENT_INITIAL_DATA}
          isEmpty={isFormEmpty}
          isValid={isFormValid}
          onClose={handleCloseAddModal}
          onSubmit={handleAddStudentSubmit}
          disabled={isSubmitting}
        />
      </div>
    </InstructorLayout>
  );
}
