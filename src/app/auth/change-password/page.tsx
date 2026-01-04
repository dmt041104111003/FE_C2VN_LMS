import Link from 'next/link';
import { ChangePasswordForm } from '@/components/auth';
import { Logo } from '@/components/ui';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Đổi mật khẩu',
  description: 'Thay đổi mật khẩu tài khoản C2VN của bạn.',
};

export default function ChangePasswordPage() {
  return (
    <div className="min-h-screen flex">
      <div className="hidden lg:flex lg:w-1/2 bg-[var(--bg-alt)] items-center justify-center p-12 relative">
        <Link href="/" className="absolute top-6 left-6 text-sm text-[var(--link)]">
          ← Về trang chủ
        </Link>
        <Logo layout="stacked" size="lg" href="/" />
      </div>
      <div className="w-full lg:w-1/2 flex items-center justify-center bg-[var(--bg)] p-6 sm:p-12 relative">
        <Link href="/" className="lg:hidden absolute top-6 left-6 text-sm text-[var(--link)]">
          ← Về trang chủ
        </Link>
        <div className="w-full max-w-md">
          <div className="lg:hidden mb-8">
            <Logo layout="inline" size="md" href="/" />
          </div>
          <ChangePasswordForm />
        </div>
      </div>
    </div>
  );
}

