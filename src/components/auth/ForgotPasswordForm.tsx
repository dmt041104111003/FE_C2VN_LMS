'use client';

import { memo, useState, useCallback, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button, Input, ButtonSpinner } from '@/components/ui';
import { useToast } from '@/components/ui/Toast';
import { FORGOT_PASSWORD } from '@/constants/login';
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
  AUTH_FOOTER,
  AUTH_BACK_LINK,
  AUTH_RESEND_BTN,
  AUTH_ERROR_MSG,
} from './auth.styles';

function ForgotPasswordFormComponent() {
  const router = useRouter();
  const { forgotPassword, isLoading, isAuthenticated } = useAuth();
  const toast = useToast();
  
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email) {
      setError('Vui lòng nhập email');
      return;
    }

    try {
      await forgotPassword(email);
      setSent(true);
      toast.success(FORGOT_PASSWORD.successMessage);
    } catch (err) {
      const errorMsg = err instanceof ApiException 
        ? translateError(err.message) 
        : 'Gửi yêu cầu thất bại. Vui lòng thử lại.';
      toast.error(errorMsg);
      setError(errorMsg);
    }
  }, [email, forgotPassword, toast]);

  const handleResend = useCallback(async () => {
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

  const handleContinue = useCallback(() => {
    router.push(`${ROUTES.RESET_PASSWORD}?email=${encodeURIComponent(email)}`);
  }, [router, email]);

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      router.replace(ROUTES.HOME);
    }
  }, [isAuthenticated, isLoading, router]);

  if (sent) {
    return (
      <>
        <div className={AUTH_FORM_HEADER_LG}>
          <h1 className={AUTH_FORM_TITLE}>{FORGOT_PASSWORD.title}</h1>
          <p className={AUTH_FORM_SUBTITLE}>{FORGOT_PASSWORD.successMessage}</p>
        </div>

        {error && <p className={AUTH_ERROR_MSG}>{error}</p>}

        <div className="space-y-4">
          <Button 
            onClick={handleContinue} 
            variant="primary" 
            size="lg" 
            className="w-full"
            disabled={isLoading}
          >
            Tiếp tục
          </Button>
          <div className="text-center">
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
          </div>
        </div>

        <div className={AUTH_FOOTER}>
          <Link href={ROUTES.LOGIN} className={`${AUTH_BACK_LINK} ${isLoading ? 'pointer-events-none opacity-50' : ''}`}>
            ← {FORGOT_PASSWORD.backToLogin}
          </Link>
        </div>
      </>
    );
  }

  return (
    <>
      <div className={AUTH_FORM_HEADER_LG}>
        <h1 className={AUTH_FORM_TITLE}>{FORGOT_PASSWORD.title}</h1>
        <p className={AUTH_FORM_SUBTITLE}>{FORGOT_PASSWORD.subtitle}</p>
      </div>

      {error && <p className={AUTH_ERROR_MSG}>{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className={AUTH_FORM_FIELD}>
          <label className={AUTH_FORM_LABEL}>Email</label>
          <Input
            type="email"
            placeholder={FORGOT_PASSWORD.emailPlaceholder}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
          {isLoading ? <ButtonSpinner size="sm" /> : FORGOT_PASSWORD.submitText}
        </Button>
      </form>

      <div className={AUTH_FOOTER}>
        <Link href={ROUTES.LOGIN} className={`${AUTH_BACK_LINK} ${isLoading ? 'pointer-events-none opacity-50' : ''}`}>
          ← {FORGOT_PASSWORD.backToLogin}
        </Link>
      </div>
    </>
  );
}

export const ForgotPasswordForm = memo(ForgotPasswordFormComponent);
