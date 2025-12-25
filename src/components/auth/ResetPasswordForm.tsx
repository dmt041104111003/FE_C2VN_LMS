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
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-[var(--text)] mb-2">
          {RESET_PASSWORD.title}
        </h1>
        <p className="text-sm text-[var(--text)]/60">
          {RESET_PASSWORD.subtitle}
        </p>
        {email && (
          <p className="text-sm text-[var(--accent)] mt-2">
            {email}
          </p>
        )}
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <Input
          type="text"
          placeholder={RESET_PASSWORD.codePlaceholder}
          value={code}
          onChange={(e) => setCode(e.target.value)}
          required
        />
        <Input
          type="password"
          placeholder={RESET_PASSWORD.newPasswordPlaceholder}
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />
        <Input
          type="password"
          placeholder={RESET_PASSWORD.confirmPasswordPlaceholder}
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <Button type="submit" variant="primary" size="lg" className="w-full mt-2">
          {RESET_PASSWORD.submitText}
        </Button>
      </form>

      <div className="flex items-center justify-between mt-6">
        <button
          type="button"
          onClick={handleResend}
          className="text-sm text-[var(--link)] font-medium"
        >
          Gửi lại mã
        </button>
        <Link href={ROUTES.LOGIN} className="text-sm text-[var(--link)] font-medium">
          {RESET_PASSWORD.backToLogin}
        </Link>
      </div>
    </>
  );
}

export const ResetPasswordForm = memo(ResetPasswordFormComponent);
