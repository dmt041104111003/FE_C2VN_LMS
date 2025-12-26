import type { InstructorCourse, CourseStatus, InstructorModalType } from '@/types/instructor';
import type { StatusBadgeVariant } from '@/components/ui';
import type { ModalConfig } from '@/types/common';

export const INSTRUCTOR_LABELS = {
  title: 'Giảng viên',
  logout: 'Đăng xuất',
  courses: {
    title: 'Khóa học của tôi',
    empty: 'Chưa có khóa học nào',
    create: 'Tạo khóa học mới',
    total: 'Tổng cộng',
    coursesUnit: 'khóa học',
    searchPlaceholder: 'Tìm theo tên khóa học...',
    filterStatus: 'Trạng thái',
    allStatus: 'Tất cả trạng thái',
  },
  common: {
    confirm: 'Xác nhận',
    cancel: 'Hủy',
    save: 'Lưu',
    loading: 'Đang tải...',
  },
} as const;

export const COURSE_STATUS_OPTIONS: { value: CourseStatus | ''; label: string }[] = [
  { value: '', label: 'Tất cả trạng thái' },
  { value: 'draft', label: 'Nháp' },
  { value: 'published', label: 'Đã xuất bản' },
  { value: 'archived', label: 'Đã lưu trữ' },
];

export const INSTRUCTOR_SIDEBAR_ITEMS = [
  { id: 'courses', title: 'Khóa học của tôi', href: '/instructor' },
] as const;

export const COURSE_TABLE = {
  headers: ['STT', 'Mã KH', 'Khóa học', 'Học viên', 'Doanh thu', 'Trạng thái', 'Cập nhật', 'Thao tác'],
  actions: {
    edit: 'Chỉnh sửa',
    delete: 'Xóa',
    publish: 'Xuất bản',
    unpublish: 'Ẩn khóa học',
    archive: 'Lưu trữ',
  },
} as const;

export const COURSE_MODAL_CONFIG: Record<NonNullable<InstructorModalType>, ModalConfig> = {
  delete: {
    title: 'Xóa khóa học',
    message: 'Bạn có chắc muốn xóa khóa học này? Hành động không thể hoàn tác.',
    danger: true,
  },
  publish: {
    title: 'Xuất bản khóa học',
    message: 'Khóa học sẽ được hiển thị công khai cho học viên.',
    danger: false,
  },
  unpublish: {
    title: 'Ẩn khóa học',
    message: 'Khóa học sẽ không còn hiển thị cho học viên mới.',
    danger: false,
  },
};

export const COURSE_STATUS_LABELS: Record<CourseStatus, string> = {
  draft: 'Nháp',
  published: 'Đã xuất bản',
  archived: 'Đã lưu trữ',
};

export const COURSE_STATUS_VARIANT: Record<CourseStatus, StatusBadgeVariant> = {
  draft: 'warning',
  published: 'success',
  archived: 'default',
};

export const MOCK_INSTRUCTOR_COURSES: InstructorCourse[] = [
  { id: '1', title: 'Lập trình Web với React & Next.js', students: 1234, revenue: 45000000, status: 'published', createdAt: '2024-01-15T10:00:00Z', updatedAt: '2024-12-20T14:30:00Z' },
  { id: '2', title: 'NodeJS Backend Development', students: 856, revenue: 28500000, status: 'published', createdAt: '2024-03-10T09:00:00Z', updatedAt: '2024-12-18T11:00:00Z' },
  { id: '3', title: 'TypeScript từ cơ bản đến nâng cao', students: 0, revenue: 0, status: 'draft', createdAt: '2024-12-01T08:00:00Z', updatedAt: '2024-12-25T16:00:00Z' },
  { id: '4', title: 'Database Design & PostgreSQL', students: 423, revenue: 12800000, status: 'archived', createdAt: '2023-06-20T10:00:00Z', updatedAt: '2024-06-15T09:00:00Z' },
  { id: '5', title: 'Python cho Data Science', students: 2150, revenue: 68000000, status: 'published', createdAt: '2024-02-10T09:00:00Z', updatedAt: '2024-12-15T10:00:00Z' },
  { id: '6', title: 'Docker & Kubernetes', students: 567, revenue: 18500000, status: 'published', createdAt: '2024-04-05T14:00:00Z', updatedAt: '2024-12-10T08:00:00Z' },
  { id: '7', title: 'AWS Cloud Practitioner', students: 0, revenue: 0, status: 'draft', createdAt: '2024-11-20T11:00:00Z', updatedAt: '2024-12-22T15:00:00Z' },
  { id: '8', title: 'GraphQL API Development', students: 312, revenue: 9800000, status: 'published', createdAt: '2024-05-15T10:00:00Z', updatedAt: '2024-11-30T14:00:00Z' },
  { id: '9', title: 'Machine Learning cơ bản', students: 1890, revenue: 58000000, status: 'published', createdAt: '2024-03-01T08:00:00Z', updatedAt: '2024-12-05T09:00:00Z' },
  { id: '10', title: 'Vue.js 3 Complete Guide', students: 445, revenue: 14200000, status: 'published', createdAt: '2024-06-10T13:00:00Z', updatedAt: '2024-11-25T11:00:00Z' },
  { id: '11', title: 'Redis & Caching Strategies', students: 234, revenue: 7500000, status: 'published', createdAt: '2024-07-20T09:00:00Z', updatedAt: '2024-11-15T16:00:00Z' },
  { id: '12', title: 'CI/CD với GitHub Actions', students: 0, revenue: 0, status: 'draft', createdAt: '2024-12-10T14:00:00Z', updatedAt: '2024-12-24T10:00:00Z' },
  { id: '13', title: 'MongoDB cho Developers', students: 678, revenue: 21500000, status: 'published', createdAt: '2024-04-25T11:00:00Z', updatedAt: '2024-10-20T13:00:00Z' },
  { id: '14', title: 'Testing với Jest & Cypress', students: 189, revenue: 6200000, status: 'archived', createdAt: '2023-09-15T10:00:00Z', updatedAt: '2024-05-10T15:00:00Z' },
  { id: '15', title: 'Microservices Architecture', students: 890, revenue: 32000000, status: 'published', createdAt: '2024-02-28T08:00:00Z', updatedAt: '2024-12-01T12:00:00Z' },
];
