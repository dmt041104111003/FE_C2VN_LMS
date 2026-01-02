import type { UserRole } from '@/types/user';

export const ROLE = {
  USER: ['USER'] as UserRole[],
  INSTRUCTOR: ['INSTRUCTOR'] as UserRole[],
  ADMIN: ['ADMIN'] as UserRole[],
} as const;

export const hasRole = (userRole: string | undefined, allowed: UserRole[]): boolean =>
  !!userRole && allowed.includes(userRole as UserRole);

const ERROR_MAP = new Map<string, string>([
  ['User existed', 'Email này đã được sử dụng. Vui lòng đăng nhập hoặc dùng email khác.'],
  ['User not existed', 'Tài khoản không tồn tại.'],
  ['Unauthenticated', 'Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.'],
  ['You do not have permission', 'Bạn không có quyền thực hiện thao tác này.'],
  ['Login method not supported', 'Tài khoản này không hỗ trợ đăng nhập bằng mật khẩu. Vui lòng đăng nhập bằng Google/GitHub.'],
  ['Please verify your email before login', 'Vui lòng xác thực email trước khi đăng nhập.'],
  ['Missing credential', 'Vui lòng nhập đầy đủ thông tin đăng nhập.'],
  ['This code not exactly', 'Mã xác thực không chính xác.'],
  ['Not found', 'Không tìm thấy dữ liệu.'],
  ['Your account has been baned by admin', 'Tài khoản của bạn đã bị khóa.'],
  ['Email has been used by another people', 'Email này đã được sử dụng bởi tài khoản khác.'],
  ['Invalid password', 'Mật khẩu không chính xác.'],
  ['Course title already exists', 'Tên khóa học đã tồn tại. Vui lòng chọn tên khác.'],
  ['Course not found', 'Không tìm thấy khóa học.'],
  ['Unexpected server error. Please try again later.', 'Lỗi hệ thống. Vui lòng thử lại sau.'],
  ['Nội dung quá dài. Vui lòng rút ngắn nội dung bài giảng.', 'Nội dung quá dài. Vui lòng rút ngắn nội dung bài giảng.'],
  ['Lỗi lưu dữ liệu', 'Lỗi lưu dữ liệu. Vui lòng kiểm tra lại thông tin.'],
  ['Dữ liệu đã tồn tại. Vui lòng kiểm tra lại.', 'Dữ liệu đã tồn tại. Vui lòng kiểm tra lại.'],
  ['You are instructor of this course', 'Bạn không thể đăng ký khóa học do chính bạn tạo.'],
  ['You has been join this course ', 'Bạn đã đăng ký khóa học này rồi.'],
  ['Payment not verified on Cardano blockchain!', 'Giao dịch thanh toán không hợp lệ trên Cardano.'],
  ['Invalid payment amount', 'Số tiền thanh toán không đúng.'],
  ['This course not have this method', 'Khóa học không hỗ trợ phương thức thanh toán này.'],
  ['You are not enrolled in this course', 'Bạn chưa đăng ký khóa học này. Vui lòng đăng ký trước khi học.'],
  ['Previous lesson not completed', 'Vui lòng hoàn thành bài học trước để tiếp tục.'],
  ['user declined sign tx', 'Bạn đã hủy giao dịch.'],
  ['User declined to sign the transaction', 'Bạn đã hủy giao dịch.'],
  ['user declined tx', 'Bạn đã hủy giao dịch.'],
  ['User rejected', 'Bạn đã từ chối yêu cầu.'],
  ['User cancelled', 'Bạn đã hủy thao tác.'],
  ['Không thể kết nối ví', 'Không thể kết nối ví. Vui lòng thử lại.'],
  ['Không thể lấy địa chỉ ví', 'Không thể lấy địa chỉ ví. Vui lòng thử lại.'],
]);

export const ERROR_MESSAGES: Record<string, string> = Object.fromEntries(ERROR_MAP);

export const translateError = (message: string): string => ERROR_MAP.get(message) || message;

export const LOGIN_METHOD = {
  EMAIL_PASSWORD: 'EMAIL_PASSWORD',
  WALLET: 'WALLET',
  GOOGLE: 'GOOGLE',
  GITHUB: 'GITHUB',
} as const;

export type LoginMethodType = keyof typeof LOGIN_METHOD;

export const LOGIN = {
  title: 'Đăng nhập',
  subtitle: 'Chào mừng trở lại',
  emailPlaceholder: 'Email',
  passwordPlaceholder: 'Mật khẩu',
  submitText: 'Đăng nhập',
  forgotPassword: 'Quên mật khẩu?',
  noAccount: 'Chưa có tài khoản?',
  registerLink: 'Đăng ký ngay',
  orText: 'hoặc',
  googleText: 'Đăng nhập với Google',
  githubText: 'Đăng nhập với GitHub',
  walletText: 'Đăng nhập với Cardano',
  connectWallet: 'Kết nối ví',
  noWalletText: 'Không tìm thấy ví. Vui lòng cài đặt ví Cardano.',
} as const;

export const REGISTER = {
  title: 'Đăng ký',
  subtitle: 'Tạo tài khoản mới',
  fullNamePlaceholder: 'Họ và tên',
  emailPlaceholder: 'Email',
  passwordPlaceholder: 'Mật khẩu',
  confirmPasswordPlaceholder: 'Xác nhận mật khẩu',
  submitText: 'Đăng ký',
  hasAccount: 'Đã có tài khoản?',
  loginLink: 'Đăng nhập',
} as const;

export const FORGOT_PASSWORD = {
  title: 'Quên mật khẩu',
  subtitle: 'Nhập email để nhận mã xác thực',
  emailPlaceholder: 'Nhập email của bạn',
  submitText: 'Gửi mã xác thực',
  successMessage: 'Mã xác thực đã được gửi đến email của bạn',
  backToLogin: 'Quay lại đăng nhập',
} as const;

export const RESET_PASSWORD = {
  title: 'Đặt lại mật khẩu',
  subtitle: 'Nhập mã xác thực và mật khẩu mới',
  codePlaceholder: 'Nhập mã xác thực',
  newPasswordPlaceholder: 'Nhập mật khẩu mới',
  confirmPasswordPlaceholder: 'Xác nhận mật khẩu',
  submitText: 'Đặt lại mật khẩu',
  backToLogin: 'Quay lại đăng nhập',
} as const;

export const VERIFY_EMAIL = {
  title: 'Xác thực email',
  subtitle: 'Nhập mã xác thực đã được gửi đến email của bạn',
  codePlaceholder: 'Nhập mã xác thực',
  submitText: 'Xác thực',
  resendText: 'Gửi lại mã',
  resendSuccess: 'Đã gửi lại mã xác thực',
} as const;

export const CHANGE_PASSWORD = {
  title: 'Đổi mật khẩu',
  subtitle: 'Nhập mật khẩu hiện tại và mật khẩu mới',
  currentPasswordPlaceholder: 'Nhập mật khẩu hiện tại',
  newPasswordPlaceholder: 'Nhập mật khẩu mới',
  confirmPasswordPlaceholder: 'Xác nhận mật khẩu mới',
  submitText: 'Đổi mật khẩu',
} as const;

export const LOGIN_FIELDS = {
  email: { name: 'email', type: 'email' as const, placeholder: LOGIN.emailPlaceholder },
  password: { name: 'password', type: 'password' as const, placeholder: LOGIN.passwordPlaceholder, minLength: 6 },
  address: { name: 'address', type: 'text' as const, placeholder: 'Địa chỉ ví' },
  signature: { name: 'signature', type: 'text' as const, placeholder: 'Chữ ký' },
  key: { name: 'key', type: 'text' as const, placeholder: 'Public key' },
  nonce: { name: 'nonce', type: 'text' as const, placeholder: 'Nonce' },
} as const;

export const VALIDATION_REGEX = {
  NAME: /^[\p{L}\s]*$/u,
  PHONE: /^[0-9]*$/,
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  NAME_FILTER: /[^a-zA-ZÀ-ỹ\s]/g,
  PHONE_FILTER: /[^0-9]/g,
} as const;

export const VALIDATION_CONFIG = {
  MIN_PHONE_LENGTH: 9,
  MIN_PASSWORD_LENGTH: 6,
} as const;

export const NAME_REGEX = VALIDATION_REGEX.NAME;
export const PHONE_REGEX = VALIDATION_REGEX.PHONE;
export const EMAIL_REGEX = VALIDATION_REGEX.EMAIL;
export const NAME_FILTER_REGEX = VALIDATION_REGEX.NAME_FILTER;
export const PHONE_FILTER_REGEX = VALIDATION_REGEX.PHONE_FILTER;
export const MIN_PHONE_LENGTH = VALIDATION_CONFIG.MIN_PHONE_LENGTH;
export const MIN_PASSWORD_LENGTH = VALIDATION_CONFIG.MIN_PASSWORD_LENGTH;

export const validateName = (value: string): boolean => {
  const trimmed = value.trim();
  return trimmed.length > 0 && VALIDATION_REGEX.NAME.test(trimmed);
};

export const validatePhone = (value: string): boolean => {
  const trimmed = value.trim();
  return VALIDATION_REGEX.PHONE.test(trimmed) && trimmed.length >= VALIDATION_CONFIG.MIN_PHONE_LENGTH;
};

export const validateEmail = (value: string): boolean => {
  const trimmed = value.trim();
  return trimmed.length > 0 && VALIDATION_REGEX.EMAIL.test(trimmed);
};

export const validatePassword = (value: string, minLength?: number): boolean => {
  return value.length >= (minLength || VALIDATION_CONFIG.MIN_PASSWORD_LENGTH);
};

const VALIDATORS = new Map<string, (value: string, minLength?: number) => boolean>([
  ['text', validateName],
  ['tel', validatePhone],
  ['email', validateEmail],
  ['password', validatePassword],
]);

export const validateByType = (type: string, value: string, minLength?: number): boolean => {
  const validator = VALIDATORS.get(type);
  return validator ? validator(value, minLength) : value.trim().length > 0;
};

export const filterName = (value: string): string => value.replace(VALIDATION_REGEX.NAME_FILTER, '');

export const filterPhone = (value: string): string => value.replace(VALIDATION_REGEX.PHONE_FILTER, '');

const FILTERS = new Map<string, (value: string) => string>([
  ['text', filterName],
  ['tel', filterPhone],
]);

export const filterByType = (type: string, value: string): string => {
  const filter = FILTERS.get(type);
  return filter ? filter(value) : value;
};

export interface LoginRequest {
  email?: string;
  password?: string;
  address?: string;
  signature?: string;
  key?: string;
  nonce?: string;
  loginMethod: LoginMethodType;
}

export interface LoginResponse {
  token: string;
  authenticated: boolean;
}

export interface RegisterRequest {
  email: string;
  password: string;
  fullName: string;
}

export interface RegisterResponse {
  id: string;
  email: string;
  fullName: string;
}
