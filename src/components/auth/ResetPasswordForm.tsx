'use client';

import { memo, useState, useCallback, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Button, Input, PasswordInput } from '@/components/ui';
import { RESET_PASSWORD } from '@/constants/auth';
import { ROUTES } from '@/constants/navigation';
import {
  AUTH_FORM_TITLE,
  AUTH_FORM_SUBTITLE,
  AUTH_FORM_HEADER_LG,
  AUTH_FORM_FIELD,
  AUTH_FORM_LABEL,
  AUTH_EMAIL_HIGHLIGHT,
  AUTH_BACK_LINK,
  AUTH_RESEND_BTN,
} from './auth.styles';

function ResetPasswordFormInner() {
  const searchParams = useSearchParams();
  const email = searchParams.get('email') || '';
  const [code, setCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
  }, []);

  const handleResend = useCallback(() => {
    console.log('Resend code to:', email);
  }, [email]);

  return (
    <>
      <div className={AUTH_FORM_HEADER_LG}>
        <h1 className={AUTH_FORM_TITLE}>{RESET_PASSWORD.title}</h1>
        <p className={AUTH_FORM_SUBTITLE}>{RESET_PASSWORD.subtitle}</p>
        {email && <p className={AUTH_EMAIL_HIGHLIGHT}>{email}</p>}
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className={AUTH_FORM_FIELD}>
          <label className={AUTH_FORM_LABEL}>Mã xác thực</label>
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
        <div className={AUTH_FORM_FIELD}>
          <label className={AUTH_FORM_LABEL}>Mật khẩu mới</label>
          <PasswordInput
            placeholder={RESET_PASSWORD.newPasswordPlaceholder}
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            variant="minimal"
            size="md"
            required
          />
        </div>
        <div className={AUTH_FORM_FIELD}>
          <label className={AUTH_FORM_LABEL}>Xác nhận mật khẩu</label>
          <PasswordInput
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
        <button type="button" onClick={handleResend} className={AUTH_RESEND_BTN}>
          Gửi lại mã
        </button>
        <Link href={ROUTES.LOGIN} className={AUTH_BACK_LINK}>
          {RESET_PASSWORD.backToLogin}
        </Link>
      </div>
    </>
  );
}

const ResetPasswordFormMemo = memo(ResetPasswordFormInner);

export function ResetPasswordForm() {
  return (
    <Suspense fallback={<div className="animate-pulse h-64" />}>
      <ResetPasswordFormMemo />
    </Suspense>
  );
}
