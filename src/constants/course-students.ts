import type {
  StudentStatus,
  StudentModalType,
  StudentModalState,
  StudentFormData,
  CertificateStatus,
} from '@/types/course-students';
import type { StatusBadgeVariant } from '@/components/ui';
import type { ModalConfig } from '@/types/common';

export const INITIAL_STUDENT_FORM: StudentFormData = {
  fullName: '',
  contactType: 'email',
  contactValue: '',
};

export const INITIAL_STUDENT_MODAL: StudentModalState = {
  type: null,
  studentId: null,
};

export const STUDENTS_LABELS = {
  title: 'Danh sách học viên',
  backToCourses: 'Quay lại',
  addStudent: 'Thêm học viên',
  empty: 'Chưa có học viên nào',
  total: 'Tổng cộng',
  studentsUnit: 'học viên',
  searchPlaceholder: 'Tìm theo tên hoặc email...',
  filterStatus: 'Trạng thái',
  issueAllCertificates: 'Cấp chứng chỉ',
  pendingCount: 'chờ cấp',
  toast: {
    addSuccess: 'Đã thêm học viên vào khóa học',
    editSuccess: 'Đã cập nhật thông tin học viên',
    removeSuccess: 'Đã xóa học viên khỏi khóa học',
    certificateSuccess: 'Đã cấp chứng chỉ cho học viên',
    allCertificatesSuccess: 'Đã cấp chứng chỉ cho tất cả học viên',
  },
} as const;

export const STUDENT_TABLE_HEADERS = [
  'STT',
  'Mã HV',
  'Họ tên',
  'Liên hệ',
  'Ngày đăng ký',
  'Trạng thái',
  'Chứng chỉ',
  'Thao tác',
] as const;

export const STUDENT_ACTIONS = {
  edit: 'Chỉnh sửa',
  remove: 'Xóa khỏi khóa học',
  issueCertificate: 'Cấp chứng chỉ',
} as const;

export const STUDENT_STATUS_OPTIONS: { value: StudentStatus | ''; label: string }[] = [
  { value: '', label: 'Tất cả trạng thái' },
  { value: 'active', label: 'Đang học' },
  { value: 'completed', label: 'Hoàn thành' },
];

export const STUDENT_STATUS_LABELS: Record<StudentStatus, string> = {
  active: 'Đang học',
  completed: 'Hoàn thành',
};

export const STUDENT_STATUS_VARIANT: Record<StudentStatus, StatusBadgeVariant> = {
  active: 'info',
  completed: 'success',
};

export const CERTIFICATE_STATUS_LABELS: Record<CertificateStatus, string> = {
  pending: 'Chưa cấp',
  issued: 'Đã cấp',
};

export const CERTIFICATE_STATUS_VARIANT: Record<CertificateStatus, StatusBadgeVariant> = {
  pending: 'warning',
  issued: 'success',
};

export const STUDENT_MODAL_CONFIG: Record<NonNullable<StudentModalType>, ModalConfig> = {
  remove: {
    title: 'Xóa học viên',
    message: 'Học viên sẽ bị xóa khỏi khóa học này. Hành động không thể hoàn tác.',
    danger: true,
  },
  issueCertificate: {
    title: 'Cấp chứng chỉ',
    message: 'Xác nhận cấp chứng chỉ hoàn thành khóa học cho học viên này?',
    danger: false,
  },
  issueAllCertificates: {
    title: 'Cấp chứng chỉ hàng loạt',
    message: 'Xác nhận cấp chứng chỉ cho tất cả học viên đã hoàn thành nhưng chưa được cấp?',
    danger: false,
  },
};

export const STUDENT_CODE_PREFIX = 'HV';

