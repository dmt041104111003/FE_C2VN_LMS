import type { CourseStatus, InstructorModalType, AddStudentModalState } from '@/types/instructor';
import type { StatusBadgeVariant } from '@/components/ui';
import type { ModalConfig } from '@/types/common';

export const INSTRUCTOR_LABELS = {
  title: 'Giảng viên',
  logout: 'Đăng xuất',
  courses: {
    title: 'Khóa học của tôi',
    empty: 'Chưa có khóa học nào',
    create: 'Tạo khóa học mới',
    editTitle: 'Chỉnh sửa khóa học',
    titleLabel: 'Tên khóa học',
    titlePlaceholder: 'Nhập tên khóa học',
    total: 'Tổng cộng',
    coursesUnit: 'khóa học',
    searchPlaceholder: 'Tìm theo tên khóa học...',
    filterStatus: 'Trạng thái',
    allStatus: 'Tất cả trạng thái',
    toast: {
      deleteSuccess: 'Đã xóa khóa học',
      publishSuccess: 'Đã xuất bản khóa học',
      unpublishSuccess: 'Đã ẩn khóa học',
      editSuccess: 'Đã cập nhật khóa học',
      addStudentSuccess: 'Đã thêm học viên vào khóa học',
    },
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
  { id: 'inbox', title: 'Hòm thư', href: '/instructor/inbox' },
] as const;

export const COURSE_CODE_PREFIX = 'KH';

export const COURSE_TABLE = {
  headers: ['STT', 'Mã KH', 'Khóa học', 'Học viên', 'Doanh thu', 'Trạng thái', 'Hoàn thành', 'Thao tác'],
  pendingLabel: 'chưa cấp',
  actions: {
    viewDetails: 'Xem chi tiết',
    edit: 'Chỉnh sửa',
    delete: 'Xóa',
    publish: 'Xuất bản',
    unpublish: 'Ẩn khóa học',
    archive: 'Lưu trữ',
    addStudent: 'Thêm học viên',
    viewStudents: 'Xem học viên',
  },
} as const;

export const COURSE_MODAL_CONFIG: Record<NonNullable<InstructorModalType>, ModalConfig> = {
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

export const INITIAL_ADD_STUDENT_MODAL: AddStudentModalState = {
  isOpen: false,
  courseId: null,
  courseTitle: '',
};

export const ADD_STUDENT_DRAFT_KEY = 'add_student_draft';

export const ADD_STUDENT_INITIAL_DATA = {
  fullName: '',
  contactType: 'email',
  contactValue: '',
};

export const ADD_STUDENT_FIELDS = [
  {
    name: 'fullName',
    label: 'Họ và tên',
    type: 'text' as const,
    placeholder: 'Nhập họ và tên học viên',
    required: true,
    autoFocus: true,
  },
  {
    name: 'contactType',
    label: 'Loại liên hệ',
    type: 'select' as const,
    options: [
      { value: 'email', label: 'Email' },
      { value: 'wallet', label: 'Địa chỉ ví' },
    ],
    required: true,
  },
  {
    name: 'contactValue',
    label: 'Thông tin liên hệ',
    type: 'text' as const,
    placeholder: 'Nhập email hoặc địa chỉ ví',
    required: true,
  },
];

export const ADD_STUDENT_LABELS = {
  title: 'Thêm học viên',
  tag: 'Khóa học',
  submit: 'Thêm học viên',
  cancel: 'Hủy',
  clearForm: 'Xóa form',
  resumeDialog: {
    title: 'Tiếp tục nhập?',
    message: 'Bạn có thông tin học viên chưa lưu. Bạn muốn tiếp tục nhập hay bắt đầu mới?',
    continueText: 'Tiếp tục nhập',
    newText: 'Nhập mới',
  },
};

export const EDIT_STUDENT_DRAFT_KEY = 'edit_student_draft';

export const EDIT_STUDENT_LABELS = {
  title: 'Chỉnh sửa học viên',
  tag: 'Học viên',
  submit: 'Lưu thay đổi',
  cancel: 'Hủy',
  clearForm: 'Khôi phục',
  resumeDialog: {
    title: 'Tiếp tục chỉnh sửa?',
    message: 'Bạn có thông tin chưa lưu. Bạn muốn tiếp tục chỉnh sửa hay khôi phục dữ liệu gốc?',
    continueText: 'Tiếp tục sửa',
    newText: 'Khôi phục gốc',
  },
};

