'use client';

import { memo, useState, useCallback, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Button, Input, ButtonSpinner, Loading } from '@/components/ui';
import { useToast } from '@/components/ui/Toast';
import { VERIFY_EMAIL } from '@/constants/login';
import { useAuth } from '@/contexts';
import { ApiException } from '@/services/api';
import {
  AUTH_FORM_TITLE,
  AUTH_FORM_SUBTITLE,
  AUTH_FORM_HEADER_LG,
  AUTH_FORM_FIELD,
  AUTH_FORM_LABEL,
  AUTH_FOOTER,
  AUTH_EMAIL_HIGHLIGHT,
  AUTH_RESEND_BTN,
  AUTH_ERROR_MSG,
  AUTH_SUCCESS_MSG,
} from './auth.styles';

function VerifyEmailFormInner() {
  const { verifyEmail, resendCode, isLoading } = useAuth();
  const toast = useToast();
  const searchParams = useSearchParams();
  const email = searchParams.get('email') || '';
  
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [resendSuccess, setResendSuccess] = useState(false);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!code) {
      setError('Vui lòng nhập mã xác thực');
      return;
    }

    if (!email) {
      setError('Email không hợp lệ');
      return;
    }

    try {
      await verifyEmail(email, code);
      toast.success('Xác thực email thành công!');
    } catch (err) {
      if (err instanceof ApiException) {
        setError(err.message);
      } else {
        setError('Xác thực thất bại. Vui lòng thử lại.');
      }
    }
  }, [email, code, verifyEmail, toast]);

  const handleResend = useCallback(async () => {
    if (!email) {
      setError('Email không hợp lệ');
      return;
    }

    setError('');
    setResendSuccess(false);

    try {
      await resendCode(email);
      setResendSuccess(true);
      toast.success(VERIFY_EMAIL.resendSuccess);
    } catch (err) {
      if (err instanceof ApiException) {
        setError(err.message);
      } else {
        setError('Gửi lại mã thất bại. Vui lòng thử lại.');
      }
    }
  }, [email, resendCode, toast]);

  return (
    <>
      <div className={AUTH_FORM_HEADER_LG}>
        <h1 className={AUTH_FORM_TITLE}>{VERIFY_EMAIL.title}</h1>
        <p className={AUTH_FORM_SUBTITLE}>{VERIFY_EMAIL.subtitle}</p>
        {email && <p className={AUTH_EMAIL_HIGHLIGHT}>{email}</p>}
      </div>

      {error && <p className={AUTH_ERROR_MSG}>{error}</p>}
      {resendSuccess && <p className={AUTH_SUCCESS_MSG}>{VERIFY_EMAIL.resendSuccess}</p>}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className={AUTH_FORM_FIELD}>
          <label className={AUTH_FORM_LABEL}>Mã xác thực</label>
          <Input
            type="text"
            placeholder={VERIFY_EMAIL.codePlaceholder}
            value={code}
            onChange={(e) => setCode(e.target.value)}
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
          {isLoading ? <ButtonSpinner size="sm" /> : VERIFY_EMAIL.submitText}
        </Button>
      </form>

      <div className={AUTH_FOOTER}>
        <Button 
          type="button"
          variant="ghost"
          size="sm"
          onClick={handleResend}
          className={AUTH_RESEND_BTN}
          disabled={isLoading}
        >
          {VERIFY_EMAIL.resendText}
        </Button>
      </div>
    </>
  );
}

const VerifyEmailFormMemo = memo(VerifyEmailFormInner);

export function VerifyEmailForm() {
  return (
    <Suspense fallback={<Loading size="lg" text="Đang tải..." className="py-16" />}>
      <VerifyEmailFormMemo />
    </Suspense>
  );
}
