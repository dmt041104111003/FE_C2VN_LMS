import type {
  StudentStatus,
  StudentModalType,
  CourseStudent,
  StudentModalState,
  EditStudentModalState,
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

export const INITIAL_EDIT_STUDENT_MODAL: EditStudentModalState = {
  isOpen: false,
  studentId: null,
  initialData: INITIAL_STUDENT_FORM,
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

export const MOCK_COURSE_STUDENTS: Record<string, CourseStudent[]> = {
  '1': [
    { id: '101', fullName: 'Nguyễn Văn A', email: 'nguyenvana@gmail.com', enrolledAt: '2024-01-20T10:00:00Z', status: 'active' },
    { id: '102', fullName: 'Trần Thị B', email: 'tranthib@gmail.com', walletAddress: 'addr1qxyprqtspqzqszqgpqyqszqgpqyqszqgpqyqszqgpqyqs0v4yh7', enrolledAt: '2024-02-15T14:00:00Z', status: 'completed', certificateStatus: 'issued' },
    { id: '103', fullName: 'Lê Văn C', email: 'levanc@gmail.com', enrolledAt: '2024-03-10T09:00:00Z', status: 'active' },
    { id: '104', fullName: 'Phạm Thị D', email: 'phamthid@gmail.com', walletAddress: 'addr1qxyz1234567890abcdefghijklmnopqrstuvwxyz1234567890', enrolledAt: '2024-04-05T11:00:00Z', status: 'active' },
    { id: '105', fullName: 'Hoàng Văn E', email: 'hoangvane@gmail.com', enrolledAt: '2024-05-20T16:00:00Z', status: 'active' },
    { id: '106', fullName: 'Ngô Thị F', email: 'ngothif@gmail.com', enrolledAt: '2024-06-01T08:00:00Z', status: 'completed', certificateStatus: 'pending' },
    { id: '107', fullName: 'Vũ Văn G', email: 'vuvang@gmail.com', enrolledAt: '2024-06-15T10:30:00Z', status: 'active' },
    { id: '108', fullName: 'Đỗ Thị H', email: 'dothih@gmail.com', enrolledAt: '2024-07-01T14:00:00Z', status: 'active' },
    { id: '109', fullName: 'Bùi Văn I', email: 'buivani@gmail.com', enrolledAt: '2024-07-10T09:00:00Z', status: 'completed', certificateStatus: 'issued' },
    { id: '110', fullName: 'Trương Thị K', email: 'truongthik@gmail.com', enrolledAt: '2024-07-20T11:00:00Z', status: 'active' },
    { id: '111', fullName: 'Lý Văn L', email: 'lyvanl@gmail.com', walletAddress: 'addr1qabcdefghijklmnopqrstuvwxyz0123456789abcdefghijkl', enrolledAt: '2024-08-01T08:30:00Z', status: 'active' },
    { id: '112', fullName: 'Hồ Thị M', email: 'hothim@gmail.com', enrolledAt: '2024-08-15T15:00:00Z', status: 'completed', certificateStatus: 'pending' },
    { id: '113', fullName: 'Dương Văn N', email: 'duongvann@gmail.com', enrolledAt: '2024-09-01T10:00:00Z', status: 'active' },
    { id: '114', fullName: 'Mai Thị O', email: 'maithio@gmail.com', enrolledAt: '2024-09-10T13:00:00Z', status: 'active' },
    { id: '115', fullName: 'Đinh Văn P', email: 'dinhvanp@gmail.com', enrolledAt: '2024-10-01T09:30:00Z', status: 'completed', certificateStatus: 'pending' },
  ],
  '2': [
    { id: '201', fullName: 'Võ Thị F', email: 'vothif@gmail.com', enrolledAt: '2024-03-25T10:00:00Z', status: 'completed', certificateStatus: 'issued' },
    { id: '202', fullName: 'Đặng Văn G', email: 'dangvang@gmail.com', walletAddress: 'addr1q9876543210zyxwvutsrqponmlkjihgfedcba0987654321zy', enrolledAt: '2024-04-10T14:00:00Z', status: 'active' },
  ],
};

