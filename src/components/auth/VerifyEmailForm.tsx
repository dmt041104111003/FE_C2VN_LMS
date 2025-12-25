'use client';

import { memo, useState, useCallback } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button, Input } from '@/components/ui';
import { VERIFY_EMAIL } from '@/constants/auth';
import { ROUTES } from '@/constants/navigation';
import {
  AUTH_FORM_TITLE,
  AUTH_FORM_SUBTITLE,
  AUTH_FORM_HEADER_LG,
  AUTH_FORM_FIELD,
  AUTH_FORM_LABEL,
  AUTH_FOOTER,
  AUTH_EMAIL_HIGHLIGHT,
  AUTH_RESEND_BTN,
} from './auth.styles';

function VerifyEmailFormComponent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get('email') || '';
  const [code, setCode] = useState('');

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    router.push(ROUTES.LOGIN);
  }, [router]);

  const handleResend = useCallback(() => {
    console.log('Resend code to:', email);
  }, [email]);

  return (
    <>
      <div className={AUTH_FORM_HEADER_LG}>
        <h1 className={AUTH_FORM_TITLE}>{VERIFY_EMAIL.title}</h1>
        <p className={AUTH_FORM_SUBTITLE}>{VERIFY_EMAIL.subtitle}</p>
        {email && <p className={AUTH_EMAIL_HIGHLIGHT}>{email}</p>}
      </div>

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
          />
        </div>
        <Button type="submit" variant="primary" size="lg" className="w-full mt-8">
          {VERIFY_EMAIL.submitText}
        </Button>
      </form>

      <div className={AUTH_FOOTER}>
        <button type="button" onClick={handleResend} className={AUTH_RESEND_BTN}>
          {VERIFY_EMAIL.resendText}
        </button>
      </div>
    </>
  );
}

export const VerifyEmailForm = memo(VerifyEmailFormComponent);
