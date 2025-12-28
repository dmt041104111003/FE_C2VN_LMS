import type { UserRole } from '@/types/user';

export const ROLE = {
  INSTRUCTOR: ['INSTRUCTOR'] as UserRole[],
  ADMIN: ['ADMIN'] as UserRole[],
} as const;

export const hasRole = (userRole: string | undefined, allowed: UserRole[]): boolean => {
  return !!userRole && allowed.includes(userRole as UserRole);
};

export const ERROR_MESSAGES: Record<string, string> = {
  'User existed': 'Email này đã được sử dụng. Vui lòng đăng nhập hoặc dùng email khác.',
  'User not existed': 'Tài khoản không tồn tại.',
  'Unauthenticated': 'Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.',
  'You do not have permission': 'Bạn không có quyền thực hiện thao tác này.',
  'Login method not supported': 'Tài khoản này không hỗ trợ đăng nhập bằng mật khẩu. Vui lòng đăng nhập bằng Google/GitHub.',
  'Please verify your email before login': 'Vui lòng xác thực email trước khi đăng nhập.',
  'Missing credential': 'Vui lòng nhập đầy đủ thông tin đăng nhập.',
  'This code not exactly': 'Mã xác thực không chính xác.',
  'Not found': 'Không tìm thấy dữ liệu.',
  'Your account has been baned by admin': 'Tài khoản của bạn đã bị khóa.',
  'Email has been used by another people': 'Email này đã được sử dụng bởi tài khoản khác.',
  'Invalid password': 'Mật khẩu không chính xác.',
};

export const translateError = (message: string): string => {
  return ERROR_MESSAGES[message] || message;
};
