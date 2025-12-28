import type { UserRole, UserStatus, AdminModalType } from '@/types/admin';
import type { ModalConfig } from '@/types/common';
import { ROLE_LABELS } from './user';

export { ROLE_LABELS };

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
    loading: 'Đang tải...',
  },
} as const;

export const STATUS_LABELS: Record<UserStatus, string> = {
  ACTIVE: 'Hoạt động',
  BANNED: 'Đã khóa',
};

const createOptionsFromLabels = <T extends string>(
  labels: Record<T, string>,
  allLabel: string
): { value: T | ''; label: string }[] => [
  { value: '', label: allLabel },
  ...Object.entries(labels).map(([value, label]) => ({ 
    value: value as T, 
    label: label as string 
  })),
];

export const ROLE_OPTIONS = createOptionsFromLabels<UserRole>(
  ROLE_LABELS,
  ADMIN_LABELS.users.allRoles
);

export const STATUS_OPTIONS = createOptionsFromLabels<UserStatus>(
  STATUS_LABELS,
  ADMIN_LABELS.users.allStatus
);

export const TABLE_HEADERS = [
  'STT',
  'Mã ND',
  ADMIN_LABELS.users.table.user,
  ADMIN_LABELS.users.table.role,
  ADMIN_LABELS.users.table.status,
  ADMIN_LABELS.users.table.createdAt,
  ADMIN_LABELS.users.table.actions,
];

export const ROLE_BADGE_VARIANT = {
  USER: 'default',
  INSTRUCTOR: 'info',
  ADMIN: 'warning',
} as const;

export const STATUS_BADGE_VARIANT = {
  ACTIVE: 'success',
  BANNED: 'danger',
} as const;

export const ADMIN_SIDEBAR_ITEMS = [
  { id: 'users', title: 'Quản lý người dùng', href: '/admin' },
];

const CONFIRM = ADMIN_LABELS.users.confirm;

export const ADMIN_MODAL_CONFIG: Record<NonNullable<AdminModalType>, ModalConfig> = {
  ban: { title: CONFIRM.banTitle, message: CONFIRM.banMessage, danger: true },
  unban: { title: CONFIRM.unbanTitle, message: CONFIRM.unbanMessage, danger: false },
  delete: { title: CONFIRM.deleteTitle, message: CONFIRM.deleteMessage, danger: true },
  changeRole: { title: CONFIRM.changeRoleTitle, message: CONFIRM.changeRoleMessage, danger: false },
};

export const ADD_USER_DRAFT_KEY = 'add_user_draft';

export const ADD_USER_INITIAL_DATA = {
  fullName: '',
  contactType: 'email',
  contactValue: '',
  role: 'USER',
};

export const ADD_USER_FIELDS = [
  {
    name: 'fullName',
    label: 'Họ và tên',
    type: 'text' as const,
    placeholder: 'Nhập họ và tên',
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
  {
    name: 'role',
    label: 'Vai trò',
    type: 'select' as const,
    options: [
      { value: 'USER', label: 'Người dùng' },
      { value: 'INSTRUCTOR', label: 'Giảng viên' },
      { value: 'ADMIN', label: 'Quản trị viên' },
    ],
  },
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

