'use client';

import { memo, useState, useCallback, Suspense, useEffect } from 'react';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import { Button, Input, PasswordInput } from '@/components/ui';
import { useToast } from '@/components/ui/Toast';
import { RESET_PASSWORD } from '@/constants/login';
import { ROUTES } from '@/constants/navigation';
import { useAuth } from '@/contexts';
import { ApiException } from '@/services/api';
import { translateError } from '@/constants/auth';
import {
  AUTH_FORM_TITLE,
  AUTH_FORM_SUBTITLE,
  AUTH_FORM_HEADER_LG,
  AUTH_FORM_FIELD,
  AUTH_FORM_LABEL,
  AUTH_EMAIL_HIGHLIGHT,
  AUTH_BACK_LINK,
  AUTH_RESEND_BTN,
  AUTH_ERROR_MSG,
} from './auth.styles';

function ResetPasswordFormInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { resetPassword, forgotPassword, isLoading, isAuthenticated } = useAuth();
  const toast = useToast();
  
  const email = searchParams.get('email') || '';
  const [code, setCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!code || !newPassword || !confirmPassword) {
      setError('Vui lòng điền đầy đủ thông tin');
      return;
    }

    if (newPassword.length < 6) {
      setError('Mật khẩu phải có ít nhất 6 ký tự');
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('Mật khẩu xác nhận không khớp');
      return;
    }

    if (!email) {
      setError('Email không hợp lệ');
      return;
    }

    try {
      await resetPassword(email, code, newPassword);
      toast.success('Đặt lại mật khẩu thành công!');
    } catch (err) {
      const errorMsg = err instanceof ApiException 
        ? translateError(err.message) 
        : 'Đặt lại mật khẩu thất bại. Vui lòng thử lại.';
      toast.error(errorMsg);
      setError(errorMsg);
    }
  }, [email, code, newPassword, confirmPassword, resetPassword, toast]);

  const handleResend = useCallback(async () => {
    if (!email) {
      setError('Email không hợp lệ');
      return;
    }

    setError('');
    try {
      await forgotPassword(email);
      toast.success('Đã gửi lại mã');
    } catch (err) {
      const errorMsg = err instanceof ApiException 
        ? translateError(err.message) 
        : 'Gửi lại mã thất bại';
      toast.error(errorMsg);
      setError(errorMsg);
    }
  }, [email, forgotPassword, toast]);

  useEffect(() => {
    if (!isLoading) {
      if (isAuthenticated) {
        router.replace(ROUTES.HOME);
      } else {
        setIsCheckingAuth(false);
      }
    }
  }, [isAuthenticated, isLoading, router]);

  if (isCheckingAuth) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="w-8 h-8 animate-spin rounded-full border-2 border-[var(--accent)] border-t-transparent" />
      </div>
    );
  }

  return (
    <>
      <div className={AUTH_FORM_HEADER_LG}>
        <h1 className={AUTH_FORM_TITLE}>{RESET_PASSWORD.title}</h1>
        <p className={AUTH_FORM_SUBTITLE}>{RESET_PASSWORD.subtitle}</p>
        {email && <p className={AUTH_EMAIL_HIGHLIGHT}>{email}</p>}
      </div>

      {error && <p className={AUTH_ERROR_MSG}>{error}</p>}

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
            disabled={isLoading}
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
            disabled={isLoading}
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
            disabled={isLoading}
          />
        </div>
        <Button 
          type="submit" 
          variant="primary" 
          size="lg" 
          className="w-full mt-8"
          disabled={isLoading}
        >
          {isLoading ? 'Đang xử lý...' : RESET_PASSWORD.submitText}
        </Button>
      </form>

      <div className="flex items-center justify-between mt-10">
        <Button 
          type="button"
          variant="ghost"
          size="sm"
          onClick={handleResend}
          className={AUTH_RESEND_BTN}
          disabled={isLoading}
        >
          Gửi lại mã
        </Button>
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
