import type { AdminUser, UserRole, UserStatus, AdminModalType } from '@/types/admin';
import type { ModalConfig } from '@/types/common';

export const USER_CODE_PREFIX = 'ND';

export const ADMIN_LABELS = {
  title: 'Quản trị hệ thống',
  logout: 'Đăng xuất',
  users: {
    title: 'Quản lý người dùng',
    create: 'Thêm người dùng',
    search: 'Tìm kiếm',
    searchPlaceholder: 'Tìm theo tên hoặc email...',
    filterRole: 'Vai trò',
    filterStatus: 'Trạng thái',
    allRoles: 'Tất cả vai trò',
    allStatus: 'Tất cả trạng thái',
    table: {
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
      createSuccess: 'Thêm người dùng thành công',
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

export const ROLE_LABELS: Record<UserRole, string> = {
  USER: 'Học viên',
  INSTRUCTOR: 'Giảng viên',
  ADMIN: 'Quản trị viên',
};

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

export const MOCK_USERS: AdminUser[] = [
  { id: '1', email: 'nguyenvana@gmail.com', fullName: 'Nguyễn Văn A', role: 'USER', status: 'ACTIVE', createdAt: '2024-01-15T10:00:00Z', lastLogin: '2024-12-25T08:30:00Z' },
  { id: '2', email: 'tranthib@gmail.com', fullName: 'Trần Thị B', role: 'INSTRUCTOR', status: 'ACTIVE', createdAt: '2024-02-20T14:00:00Z', lastLogin: '2024-12-24T16:45:00Z' },
  { id: '3', email: 'levanc@gmail.com', fullName: 'Lê Văn C', role: 'USER', status: 'BANNED', createdAt: '2024-03-10T09:00:00Z', lastLogin: '2024-11-15T12:00:00Z' },
  { id: '4', email: 'phamthid@gmail.com', fullName: 'Phạm Thị D', role: 'ADMIN', status: 'ACTIVE', createdAt: '2024-01-01T08:00:00Z', lastLogin: '2024-12-26T07:00:00Z' },
  { id: '5', email: 'hoangvane@gmail.com', fullName: 'Hoàng Văn E', role: 'USER', status: 'ACTIVE', createdAt: '2024-06-15T11:00:00Z', lastLogin: '2024-12-20T14:30:00Z' },
  { id: '6', email: 'vuthif@gmail.com', fullName: 'Vũ Thị F', role: 'INSTRUCTOR', status: 'ACTIVE', createdAt: '2024-04-22T10:30:00Z', lastLogin: '2024-12-23T09:15:00Z' },
  { id: '7', email: 'dangvang@gmail.com', fullName: 'Đặng Văn G', role: 'USER', status: 'ACTIVE', createdAt: '2024-08-05T15:00:00Z' },
  { id: '8', email: 'buithih@gmail.com', fullName: 'Bùi Thị H', role: 'USER', status: 'BANNED', createdAt: '2024-05-18T13:00:00Z', lastLogin: '2024-10-01T10:00:00Z' },
  { id: '9', email: 'ngothii@gmail.com', fullName: 'Ngô Thị I', role: 'USER', status: 'ACTIVE', createdAt: '2024-07-10T09:00:00Z', lastLogin: '2024-12-22T11:00:00Z' },
  { id: '10', email: 'dovank@gmail.com', fullName: 'Đỗ Văn K', role: 'INSTRUCTOR', status: 'ACTIVE', createdAt: '2024-05-01T14:00:00Z', lastLogin: '2024-12-21T15:30:00Z' },
  { id: '11', email: 'luuthil@gmail.com', fullName: 'Lưu Thị L', role: 'USER', status: 'ACTIVE', createdAt: '2024-09-15T10:00:00Z', lastLogin: '2024-12-20T09:00:00Z' },
  { id: '12', email: 'trinhvanm@gmail.com', fullName: 'Trịnh Văn M', role: 'USER', status: 'BANNED', createdAt: '2024-04-20T11:00:00Z', lastLogin: '2024-10-15T14:00:00Z' },
  { id: '13', email: 'maithio@gmail.com', fullName: 'Mai Thị O', role: 'USER', status: 'ACTIVE', createdAt: '2024-10-01T08:00:00Z', lastLogin: '2024-12-19T16:00:00Z' },
  { id: '14', email: 'caovanp@gmail.com', fullName: 'Cao Văn P', role: 'INSTRUCTOR', status: 'ACTIVE', createdAt: '2024-03-25T13:00:00Z', lastLogin: '2024-12-18T10:00:00Z' },
  { id: '15', email: 'dinhthiq@gmail.com', fullName: 'Đinh Thị Q', role: 'USER', status: 'ACTIVE', createdAt: '2024-11-10T09:00:00Z', lastLogin: '2024-12-17T12:00:00Z' },
];

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

