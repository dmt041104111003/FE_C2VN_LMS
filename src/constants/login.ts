export const LOGIN_METHOD = {
  EMAIL_PASSWORD: 'EMAIL_PASSWORD',
  WALLET: 'WALLET',
  GOOGLE: 'GOOGLE',
  GITHUB: 'GITHUB',
} as const;

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

export const LOGIN_FIELDS = {
  email: {
    name: 'email',
    type: 'email' as const,
    placeholder: LOGIN.emailPlaceholder,
  },
  password: {
    name: 'password',
    type: 'password' as const,
    placeholder: LOGIN.passwordPlaceholder,
    minLength: 6,
  },
  address: {
    name: 'address',
    type: 'text' as const,
    placeholder: 'Địa chỉ ví',
  },
  signature: {
    name: 'signature',
    type: 'text' as const,
    placeholder: 'Chữ ký',
  },
  key: {
    name: 'key',
    type: 'text' as const,
    placeholder: 'Public key',
  },
  nonce: {
    name: 'nonce',
    type: 'text' as const,
    placeholder: 'Nonce',
  },
};

export interface LoginRequest {
  email?: string;
  password?: string;
  address?: string;
  signature?: string;
  key?: string;
  nonce?: string;
  loginMethod: keyof typeof LOGIN_METHOD;
}

export interface LoginResponse {
  token: string;
  authenticated: boolean;
}
