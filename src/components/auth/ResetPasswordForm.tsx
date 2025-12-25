'use client';

import { memo, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Button, Input } from '@/components/ui';
import { RESET_PASSWORD } from '@/constants/auth';
import { ROUTES } from '@/constants/navigation';

function ResetPasswordFormComponent() {
  const searchParams = useSearchParams();
  const email = searchParams.get('email') || '';
  const [code, setCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  const handleResend = () => {
    console.log('Resend code to:', email);
  };

  return (
    <>
      <div className="mb-12">
        <h1 className="text-2xl sm:text-3xl font-light text-[var(--text)] mb-3 tracking-wide">
          {RESET_PASSWORD.title}
        </h1>
        <p className="text-sm text-[var(--text)]/50">
          {RESET_PASSWORD.subtitle}
        </p>
        {email && (
          <p className="text-sm text-[var(--accent)] mt-3">
            {email}
          </p>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-1">
          <label className="text-xs text-[var(--text)]/40 uppercase tracking-wider">Mã xác thực</label>
          <Input
            type="text"
            placeholder={RESET_PASSWORD.codePlaceholder}
            value={code}
            onChange={(e) => setCode(e.target.value)}
            variant="minimal"
            size="md"
            required
          />
        </div>
        <div className="space-y-1">
          <label className="text-xs text-[var(--text)]/40 uppercase tracking-wider">Mật khẩu mới</label>
          <Input
            type="password"
            placeholder={RESET_PASSWORD.newPasswordPlaceholder}
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            variant="minimal"
            size="md"
            required
          />
        </div>
        <div className="space-y-1">
          <label className="text-xs text-[var(--text)]/40 uppercase tracking-wider">Xác nhận mật khẩu</label>
          <Input
            type="password"
            placeholder={RESET_PASSWORD.confirmPasswordPlaceholder}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            variant="minimal"
            size="md"
            required
          />
        </div>
        <Button type="submit" variant="primary" size="lg" className="w-full mt-8">
          {RESET_PASSWORD.submitText}
        </Button>
      </form>

      <div className="flex items-center justify-between mt-10">
        <button
          type="button"
          onClick={handleResend}
          className="text-xs text-[var(--text)]/50 hover:text-[var(--accent)] uppercase tracking-wider transition-colors"
        >
          Gửi lại mã
        </button>
        <Link href={ROUTES.LOGIN} className="text-xs text-[var(--text)]/40 hover:text-[var(--accent)] transition-colors">
          {RESET_PASSWORD.backToLogin}
        </Link>
      </div>
    </>
  );
}

export const ResetPasswordForm = memo(ResetPasswordFormComponent);
