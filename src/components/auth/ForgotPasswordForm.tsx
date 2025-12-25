'use client';

import { memo, useState, useCallback } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button, Input } from '@/components/ui';
import { FORGOT_PASSWORD } from '@/constants/auth';
import { ROUTES } from '@/constants/navigation';
import {
  AUTH_FORM_TITLE,
  AUTH_FORM_SUBTITLE,
  AUTH_FORM_HEADER_LG,
  AUTH_FORM_FIELD,
  AUTH_FORM_LABEL,
  AUTH_FOOTER,
  AUTH_BACK_LINK,
  AUTH_RESEND_BTN,
} from './auth.styles';

function ForgotPasswordFormComponent() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  }, []);

  const handleResend = useCallback(() => {
    console.log('Resend code to:', email);
  }, [email]);

  const handleContinue = useCallback(() => {
    router.push(`${ROUTES.RESET_PASSWORD}?email=${encodeURIComponent(email)}`);
  }, [router, email]);

  if (sent) {
    return (
      <>
        <div className={AUTH_FORM_HEADER_LG}>
          <h1 className={AUTH_FORM_TITLE}>{FORGOT_PASSWORD.title}</h1>
          <p className={AUTH_FORM_SUBTITLE}>{FORGOT_PASSWORD.successMessage}</p>
        </div>

        <div className="space-y-4">
          <Button onClick={handleContinue} variant="primary" size="lg" className="w-full">
            Tiếp tục
          </Button>
          <div className="text-center">
            <button type="button" onClick={handleResend} className={AUTH_RESEND_BTN}>
              Gửi lại mã
            </button>
          </div>
        </div>

        <div className={AUTH_FOOTER}>
          <Link href={ROUTES.LOGIN} className={AUTH_BACK_LINK}>
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
          />
        </div>
        <Button type="submit" variant="primary" size="lg" className="w-full mt-8">
          {FORGOT_PASSWORD.submitText}
        </Button>
      </form>

      <div className={AUTH_FOOTER}>
        <Link href={ROUTES.LOGIN} className={AUTH_BACK_LINK}>
          ← {FORGOT_PASSWORD.backToLogin}
        </Link>
      </div>
    </>
  );
}

export const ForgotPasswordForm = memo(ForgotPasswordFormComponent);
