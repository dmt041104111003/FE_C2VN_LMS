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

