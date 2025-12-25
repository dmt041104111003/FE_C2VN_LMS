import type { AdminUser, UserRole, UserStatus } from '@/types/admin';

export const ADMIN_LABELS = {
  title: 'Quản trị hệ thống',
  users: {
    title: 'Quản lý người dùng',
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
      view: 'Xem chi tiết',
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

export const ROLE_OPTIONS: { value: UserRole | ''; label: string }[] = [
  { value: '', label: ADMIN_LABELS.users.allRoles },
  { value: 'USER', label: 'Học viên' },
  { value: 'INSTRUCTOR', label: 'Giảng viên' },
  { value: 'ADMIN', label: 'Quản trị viên' },
];

export const STATUS_OPTIONS: { value: UserStatus | ''; label: string }[] = [
  { value: '', label: ADMIN_LABELS.users.allStatus },
  { value: 'ACTIVE', label: 'Hoạt động' },
  { value: 'BANNED', label: 'Đã khóa' },
];

export const ROLE_LABELS: Record<UserRole, string> = {
  USER: 'Học viên',
  INSTRUCTOR: 'Giảng viên',
  ADMIN: 'Quản trị viên',
};

export const STATUS_LABELS: Record<UserStatus, string> = {
  ACTIVE: 'Hoạt động',
  BANNED: 'Đã khóa',
};

export const MOCK_USERS: AdminUser[] = [
  {
    id: '1',
    email: 'nguyenvana@gmail.com',
    fullName: 'Nguyễn Văn A',
    role: 'USER',
    status: 'ACTIVE',
    createdAt: '2024-01-15T10:00:00Z',
    lastLogin: '2024-12-25T08:30:00Z',
  },
  {
    id: '2',
    email: 'tranthib@gmail.com',
    fullName: 'Trần Thị B',
    role: 'INSTRUCTOR',
    status: 'ACTIVE',
    createdAt: '2024-02-20T14:00:00Z',
    lastLogin: '2024-12-24T16:45:00Z',
  },
  {
    id: '3',
    email: 'levanc@gmail.com',
    fullName: 'Lê Văn C',
    role: 'USER',
    status: 'BANNED',
    createdAt: '2024-03-10T09:00:00Z',
    lastLogin: '2024-11-15T12:00:00Z',
  },
  {
    id: '4',
    email: 'phamthid@gmail.com',
    fullName: 'Phạm Thị D',
    role: 'ADMIN',
    status: 'ACTIVE',
    createdAt: '2024-01-01T08:00:00Z',
    lastLogin: '2024-12-26T07:00:00Z',
  },
  {
    id: '5',
    email: 'hoangvane@gmail.com',
    fullName: 'Hoàng Văn E',
    role: 'USER',
    status: 'ACTIVE',
    createdAt: '2024-06-15T11:00:00Z',
    lastLogin: '2024-12-20T14:30:00Z',
  },
  {
    id: '6',
    email: 'vuthif@gmail.com',
    fullName: 'Vũ Thị F',
    role: 'INSTRUCTOR',
    status: 'ACTIVE',
    createdAt: '2024-04-22T10:30:00Z',
    lastLogin: '2024-12-23T09:15:00Z',
  },
  {
    id: '7',
    email: 'dangvang@gmail.com',
    fullName: 'Đặng Văn G',
    role: 'USER',
    status: 'ACTIVE',
    createdAt: '2024-08-05T15:00:00Z',
  },
  {
    id: '8',
    email: 'buithih@gmail.com',
    fullName: 'Bùi Thị H',
    role: 'USER',
    status: 'BANNED',
    createdAt: '2024-05-18T13:00:00Z',
    lastLogin: '2024-10-01T10:00:00Z',
  },
];

export const DEFAULT_PAGE_SIZE = 10;

export const TABLE_HEADERS = [
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

export const formatDate = (dateString: string) =>
  new Date(dateString).toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' });

export const ADMIN_SIDEBAR_ITEMS = [
  { id: 'users', title: 'Quản lý người dùng', href: '/admin' },
  { id: 'courses', title: 'Quản lý khóa học', href: '/admin/courses' },
  { id: 'settings', title: 'Cài đặt hệ thống', href: '/admin/settings' },
];

