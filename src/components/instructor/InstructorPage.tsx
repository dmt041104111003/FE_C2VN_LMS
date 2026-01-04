'use client';

import { useState, useCallback, useMemo, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { DataTable, Dialog, Pagination, Panel, useToast } from '@/components/ui';
import { PAGE } from '@/components/ui/ui.styles';
import { DEFAULT_PAGE_SIZE } from '@/constants/config';
import {
  INSTRUCTOR_LABELS,
  COURSE_TABLE,
  COURSE_MODAL_CONFIG,
} from '@/constants/instructor';
import { DEFAULT_MODAL_CONFIG } from '@/types/core.types';
import type { InstructorCourse, InstructorModalType, InstructorModalState, CourseStatus, SearchSuggestion } from '@/types/instructor';
import { InstructorLayout } from './InstructorLayout';
import { CourseFilters } from './CourseFilters';
import { CourseRow } from './CourseRow';
import { courseService, type CourseShortInfo } from '@/services/course';
import { translateError } from '@/constants/auth';

const LABELS = INSTRUCTOR_LABELS.courses;
const TOAST = LABELS.toast;
const INITIAL_MODAL: InstructorModalState = { type: null, courseId: null };

const calculateRevenue = (price: number, discount: number | undefined, enrollmentCount: number): number => {
  const effectivePrice = discount && discount > 0 ? price * (1 - discount / 100) : price;
  return effectivePrice * enrollmentCount;
};

const mapApiCourseToInstructorCourse = (course: CourseShortInfo): InstructorCourse => ({
  id: course.id,
  slug: course.slug || course.id,
  title: course.title,
  students: course.enrollmentCount || 0,
  revenue: calculateRevenue(course.price || 0, course.discount, course.enrollmentCount || 0),
  status: course.draft ? 'draft' : 'published',
  completedCount: 0,
  pendingCertificateCount: 0,
  createdAt: course.createdAt || new Date().toISOString(),
  updatedAt: course.updatedAt || new Date().toISOString(),
});

export function InstructorPage() {
  const router = useRouter();
  const toast = useToast();
  const [courses, setCourses] = useState<InstructorCourse[]>([]);
  const [keyword, setKeyword] = useState('');
  const [statusFilter, setStatusFilter] = useState<CourseStatus | ''>('');
  const [page, setPage] = useState(1);
  const [modal, setModal] = useState<InstructorModalState>(INITIAL_MODAL);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await courseService.getMyCourses(0, 100);
        setCourses(response.content.map(mapApiCourseToInstructorCourse));
      } catch (err) {
        const errorMsg = err instanceof Error ? translateError(err.message) : 'Không thể tải danh sách khóa học';
        toast.error(errorMsg);
      }
    };
    fetchCourses();
  }, [toast]);

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

  const handlePublish = useCallback(async (courseId: string) => {
    try {
      await courseService.publishCourse(courseId);
      setCourses(prev => prev.map(c => c.id === courseId ? { ...c, status: 'published' as const } : c));
      toast.success(TOAST.publishSuccess);
    } catch (err) {
      const errorMsg = err instanceof Error ? translateError(err.message) : 'Xuất bản thất bại';
      toast.error(errorMsg);
    } finally {
      closeModal();
    }
  }, [closeModal, toast]);

  const handleUnpublish = useCallback(async (courseId: string) => {
    try {
      await courseService.unpublishCourse(courseId);
      setCourses(prev => prev.map(c => c.id === courseId ? { ...c, status: 'draft' as const } : c));
      toast.success(TOAST.unpublishSuccess);
    } catch (err) {
      const errorMsg = err instanceof Error ? translateError(err.message) : 'Gỡ xuất bản thất bại';
      toast.error(errorMsg);
    } finally {
      closeModal();
    }
  }, [closeModal, toast]);

  const handleViewStudents = useCallback((slug: string) => {
    router.push(`/instructor/courses/${slug}/students`);
  }, [router]);

  const handleViewDetails = useCallback((slug: string) => {
    router.push(`/instructor/courses/${slug}`);
  }, [router]);

  const handleCreate = useCallback(() => {
    router.push('/instructor/courses/create');
  }, [router]);

  const handleToggleStatusClick = useCallback((courseId: string, isPublished: boolean) => {
    openModal(isPublished ? 'unpublish' : 'publish', courseId);
  }, [openModal]);

  const handleConfirm = useCallback(async () => {
    if (!modal.courseId) return;
    if (modal.type === 'publish') {
      await handlePublish(modal.courseId);
    } else if (modal.type === 'unpublish') {
      await handleUnpublish(modal.courseId);
    }
  }, [modal, handlePublish, handleUnpublish]);

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
          onCreateCourse={handleCreate}
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
                onViewDetails={handleViewDetails}
                onToggleStatus={handleToggleStatusClick}
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
      </div>
    </InstructorLayout>
  );
}
