import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    template: '%s | C2VN',
    default: 'Xác thực',
  },
  description: 'Đăng nhập hoặc đăng ký tài khoản C2VN.',
};

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return children;
}

