import type { User } from '@/types/auth';
import type { UserRole, LoginMethod, StatsKey, UserProfile, UserStats } from '@/types/user';
import type { UserStatus, AdminModalType } from '@/types/admin';
import type { CourseStatus, InstructorModalType, AddStudentModalState } from '@/types/instructor';
import type { StatusBadgeVariant } from '@/components/ui';
import type { ModalConfig } from '@/types/core.types';
import {
  GoogleIcon,
  GitHubIcon,
  WalletIcon,
  MailIcon,
} from '@/components/ui/icons';

export const USER_LABELS = {
  profileTitle: 'Hồ sơ cá nhân',
  editProfile: 'Chỉnh sửa',
  editProfileTitle: 'Chỉnh sửa hồ sơ',
  editProfileSubtitle: 'Cập nhật thông tin cá nhân của bạn',
  fullNameLabel: 'Họ và tên',
  fullNamePlaceholder: 'Nhập họ và tên',
  bioLabel: 'Giới thiệu bản thân',
  bioPlaceholder: 'Viết vài dòng giới thiệu về bản thân...',
  avatarLabel: 'Ảnh đại diện',
  saveChanges: 'Lưu thay đổi',
  cancel: 'Hủy',
  statsTitle: 'Thống kê học tập',
  coursesTitle: 'Khóa học đã đăng ký',
  certificatesTitle: 'Chứng chỉ NFT',
  inbox: 'Hòm thư',
  enrolledCourses: 'Khóa học',
  completedCourses: 'Hoàn thành',
  certificates: 'Chứng chỉ',
  totalLearningHours: 'Bài học',
  progress: 'Tiến độ',
  viewCourse: 'Tiếp tục học',
  viewCertificate: 'Xem chứng chỉ',
  completedText: 'Đã hoàn thành',
  enrolledAt: 'Đăng ký',
  issuedAt: 'Cấp ngày',
  noCourses: 'Chưa đăng ký khóa học nào',
  noCertificates: 'Chưa có chứng chỉ nào',
  memberSince: 'Thành viên từ',
  walletConnected: 'Ví đã kết nối',
  showMore: 'Xem thêm',
  showLess: 'Thu gọn',
} as const;

export const USER_CONFIG = {
  INITIAL_COURSES_COUNT: 2,
  INCREMENT_COURSES_COUNT: 10,
  INITIAL_CERTIFICATES_COUNT: 2,
  INCREMENT_CERTIFICATES_COUNT: 10,
  WALLET_SLICE_START: 8,
  WALLET_SLICE_END: 6,
  PROGRESS_COMPLETE: 100,
  DEFAULT_COURSE_IMAGE: '/loading.png',
  DEFAULT_CERTIFICATE_IMAGE: '/background.png',
} as const;

export const DEFAULT_USER_STATS: UserStats = {
  enrolledCourses: 0,
  completedCourses: 0,
  certificates: 0,
  totalLearningHours: 0,
};

export const STATS_ITEMS: { key: StatsKey; label: string }[] = [
  { key: 'enrolledCourses', label: USER_LABELS.enrolledCourses },
  { key: 'completedCourses', label: USER_LABELS.completedCourses },
  { key: 'certificates', label: USER_LABELS.certificates },
  { key: 'totalLearningHours', label: USER_LABELS.totalLearningHours },
];

export const ROLE_LABELS: Record<UserRole, string> = {
  USER: 'Học viên',
  INSTRUCTOR: 'Giảng viên',
  ADMIN: 'Quản trị viên',
};

export const LOGIN_METHOD_ICONS: Record<LoginMethod, React.FC<{ className?: string }>> = {
  WALLET: WalletIcon,
  GOOGLE: GoogleIcon,
  GITHUB: GitHubIcon,
  EMAIL_PASSWORD: MailIcon,
};

export const LOGIN_METHOD_LABELS: Record<LoginMethod, string> = {
  WALLET: 'Ví Cardano',
  GOOGLE: 'Google',
  GITHUB: 'GitHub',
  EMAIL_PASSWORD: 'Email',
};

export const STATUS_LABELS: Record<UserStatus, string> = {
  ACTIVE: 'Hoạt động',
  BANNED: 'Đã khóa',
};

export const ROLE_BADGE_VARIANT: Record<UserRole, StatusBadgeVariant> = {
  USER: 'default',
  INSTRUCTOR: 'info',
  ADMIN: 'warning',
};

export const STATUS_BADGE_VARIANT: Record<UserStatus, StatusBadgeVariant> = {
  ACTIVE: 'success',
  BANNED: 'danger',
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

export const truncateWalletAddress = (address: string): string => {
  const { WALLET_SLICE_START, WALLET_SLICE_END } = USER_CONFIG;
  return `${address.slice(0, WALLET_SLICE_START)}...${address.slice(-WALLET_SLICE_END)}`;
};

export const mapAuthUserToProfile = (user: User): UserProfile => ({
  id: user.id,
  email: user.email || '',
  fullName: user.fullName || '',
  bio: user.bio || '',
  role: (user.role as UserRole) || 'USER',
  loginMethod: (user.loginMethod as LoginMethod) || 'EMAIL_PASSWORD',
  walletAddress: user.walletAddress,
  status: 'ACTIVE',
  createdAt: user.createdAt || '',
});

const createOptionsFromLabels = <T extends string>(
  labels: Record<T, string>,
  allLabel: string
): { value: T | ''; label: string }[] => [
  { value: '', label: allLabel },
  ...Object.entries(labels).map(([value, label]) => ({
    value: value as T,
    label: label as string,
  })),
];

export const USER_CODE_PREFIX = 'ND';

export const ADMIN_LABELS = {
  title: 'Quản trị hệ thống',
  logout: 'Đăng xuất',
  users: {
    title: 'Quản lý người dùng',
    addUser: 'Thêm người dùng',
    search: 'Tìm kiếm',
    searchPlaceholder: 'Tìm theo tên hoặc email...',
    filterRole: 'Vai trò',
    filterStatus: 'Trạng thái',
    allRoles: 'Tất cả vai trò',
    allStatus: 'Tất cả trạng thái',
    table: {
      code: 'Mã ND',
      user: 'Người dùng',
      email: 'Email',
      role: 'Vai trò',
      status: 'Trạng thái',
      createdAt: 'Ngày tạo',
      lastLogin: 'Đăng nhập gần nhất',
      actions: 'Thao tác',
    },
    actions: {
      ban: 'Khóa tài khoản',
      unban: 'Mở khóa',
      changeRole: 'Đổi vai trò',
      delete: 'Xóa',
    },
    confirm: {
      banTitle: 'Khóa tài khoản',
      banMessage: 'Bạn có chắc muốn khóa tài khoản này? Người dùng sẽ không thể đăng nhập.',
      unbanTitle: 'Mở khóa tài khoản',
      unbanMessage: 'Bạn có chắc muốn mở khóa tài khoản này?',
      deleteTitle: 'Xóa người dùng',
      deleteMessage: 'Hành động này không thể hoàn tác. Tất cả dữ liệu của người dùng sẽ bị xóa vĩnh viễn.',
      changeRoleTitle: 'Thay đổi vai trò',
      changeRoleMessage: 'Bạn có chắc muốn thay đổi vai trò của người dùng này?',
    },
    toast: {
      addSuccess: 'Đã thêm người dùng',
      banSuccess: 'Đã khóa tài khoản',
      unbanSuccess: 'Đã mở khóa tài khoản',
      deleteSuccess: 'Đã xóa người dùng',
      changeRoleSuccess: 'Đã thay đổi vai trò',
    },
    empty: 'Không tìm thấy người dùng nào',
    total: 'Tổng cộng',
    users: 'người dùng',
  },
  common: {
    confirm: 'Xác nhận',
    cancel: 'Hủy',
    save: 'Lưu',
    loading: '',
  },
} as const;

export const ROLE_OPTIONS = createOptionsFromLabels<UserRole>(ROLE_LABELS, ADMIN_LABELS.users.allRoles);
export const STATUS_OPTIONS = createOptionsFromLabels<UserStatus>(STATUS_LABELS, ADMIN_LABELS.users.allStatus);

export const TABLE_HEADERS = [
  'STT',
  'Mã ND',
  ADMIN_LABELS.users.table.user,
  ADMIN_LABELS.users.table.role,
  ADMIN_LABELS.users.table.status,
  ADMIN_LABELS.users.table.createdAt,
  ADMIN_LABELS.users.table.actions,
];

export const ADMIN_SIDEBAR_ITEMS = [
  { id: 'users', title: 'Quản lý người dùng', href: '/admin' },
];

const ADMIN_CONFIRM = ADMIN_LABELS.users.confirm;

export const ADMIN_MODAL_CONFIG: Record<NonNullable<AdminModalType>, ModalConfig> = {
  ban: { title: ADMIN_CONFIRM.banTitle, message: ADMIN_CONFIRM.banMessage, danger: true },
  unban: { title: ADMIN_CONFIRM.unbanTitle, message: ADMIN_CONFIRM.unbanMessage, danger: false },
  delete: { title: ADMIN_CONFIRM.deleteTitle, message: ADMIN_CONFIRM.deleteMessage, danger: true },
  changeRole: { title: ADMIN_CONFIRM.changeRoleTitle, message: ADMIN_CONFIRM.changeRoleMessage, danger: false },
};

export const ADD_USER_DRAFT_KEY = 'add_user_draft';

export const ADD_USER_INITIAL_DATA = {
  fullName: '',
  contactType: 'email',
  contactValue: '',
  role: 'USER',
};

export const ADD_USER_FIELDS = [
  { name: 'fullName', label: 'Họ và tên', type: 'text' as const, placeholder: 'Nhập họ và tên', required: true, autoFocus: true },
  { name: 'contactType', label: 'Loại liên hệ', type: 'select' as const, options: [{ value: 'email', label: 'Email' }, { value: 'wallet', label: 'Địa chỉ ví' }], required: true },
  { name: 'contactValue', label: 'Thông tin liên hệ', type: 'text' as const, placeholder: 'Nhập email hoặc địa chỉ ví', required: true },
  { name: 'role', label: 'Vai trò', type: 'select' as const, options: [{ value: 'USER', label: 'Người dùng' }, { value: 'INSTRUCTOR', label: 'Giảng viên' }, { value: 'ADMIN', label: 'Quản trị viên' }] },
];

export const ADD_USER_LABELS = {
  title: 'Thêm người dùng',
  submit: 'Thêm người dùng',
  cancel: 'Hủy',
  clearForm: 'Xóa form',
  resumeDialog: {
    title: 'Tiếp tục nhập?',
    message: 'Bạn có thông tin người dùng chưa lưu. Bạn muốn tiếp tục nhập hay bắt đầu mới?',
    continueText: 'Tiếp tục nhập',
    newText: 'Nhập mới',
  },
};

export const COURSE_CODE_PREFIX = 'KH';

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
    loading: '',
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
  { id: 'tags', title: 'Quản lý thẻ', href: '/instructor/tags' },
] as const;

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
  publish: { title: 'Xuất bản khóa học', message: 'Khóa học sẽ được hiển thị công khai cho học viên.', danger: false },
  unpublish: { title: 'Ẩn khóa học', message: 'Khóa học sẽ không còn hiển thị cho học viên mới.', danger: false },
};

export const INITIAL_ADD_STUDENT_MODAL: AddStudentModalState = {
  isOpen: false,
  courseId: null,
  courseTitle: '',
};

export const ADD_STUDENT_DRAFT_KEY = 'add_student_draft';

export const ADD_STUDENT_INITIAL_DATA = {
  contactType: 'email',
  contactValue: '',
};

export const ADD_STUDENT_FIELDS = [
  { name: 'contactType', label: 'Loại liên hệ', type: 'select' as const, options: [{ value: 'email', label: 'Email' }, { value: 'wallet', label: 'Địa chỉ ví' }], required: true },
  { name: 'contactValue', label: 'Thông tin liên hệ', type: 'text' as const, placeholder: 'Nhập email hoặc địa chỉ ví', required: true, autoFocus: true },
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
