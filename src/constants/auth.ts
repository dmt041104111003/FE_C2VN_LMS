export const VERIFY_EMAIL = {
  title: 'Xác thực email',
  subtitle: 'Nhập mã xác thực đã gửi đến email của bạn',
  emailPlaceholder: 'Email',
  codePlaceholder: 'Mã xác thực',
  submitText: 'Xác thực',
  resendText: 'Gửi lại mã',
  resendSuccess: 'Đã gửi lại mã xác thực',
} as const;

export const FORGOT_PASSWORD = {
  title: 'Quên mật khẩu',
  subtitle: 'Nhập email để nhận mã đặt lại mật khẩu',
  emailPlaceholder: 'Email',
  submitText: 'Gửi mã',
  backToLogin: 'Quay lại đăng nhập',
  successMessage: 'Đã gửi mã đặt lại mật khẩu đến email của bạn',
} as const;

export const RESET_PASSWORD = {
  title: 'Đặt lại mật khẩu',
  subtitle: 'Nhập mã và mật khẩu mới',
  codePlaceholder: 'Mã đặt lại',
  newPasswordPlaceholder: 'Mật khẩu mới',
  confirmPasswordPlaceholder: 'Xác nhận mật khẩu mới',
  submitText: 'Đặt lại mật khẩu',
  backToLogin: 'Quay lại đăng nhập',
} as const;

export const CHANGE_PASSWORD = {
  title: 'Đổi mật khẩu',
  subtitle: 'Nhập mật khẩu hiện tại và mật khẩu mới',
  currentPasswordPlaceholder: 'Mật khẩu hiện tại',
  newPasswordPlaceholder: 'Mật khẩu mới',
  confirmPasswordPlaceholder: 'Xác nhận mật khẩu mới',
  submitText: 'Đổi mật khẩu',
} as const;

export interface VerifyEmailRequest {
  email: string;
  code: string;
}

export interface ResendCodeRequest {
  email: string;
}

export interface ForgotPasswordRequest {
  email: string;
}

export interface ResetPasswordRequest {
  email: string;
  code: string;
  newPassword: string;
}

export interface ChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
}

