'use client';

import { memo, useState, useCallback } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button, Input, PasswordInput } from '@/components/ui';
import { REGISTER } from '@/constants/register';
import { ROUTES } from '@/constants/navigation';
import {
  AUTH_FORM_TITLE,
  AUTH_FORM_SUBTITLE,
  AUTH_FORM_HEADER_LG,
  AUTH_FORM_FIELD,
  AUTH_FORM_LABEL,
  AUTH_FOOTER,
  AUTH_FOOTER_TEXT,
  AUTH_FOOTER_LINK,
} from './auth.styles';

function RegisterFormComponent() {
  const router = useRouter();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    router.push(`${ROUTES.VERIFY_EMAIL}?email=${encodeURIComponent(email)}`);
  }, [router, email]);

  return (
    <>
      <div className={AUTH_FORM_HEADER_LG}>
        <h1 className={AUTH_FORM_TITLE}>{REGISTER.title}</h1>
        <p className={AUTH_FORM_SUBTITLE}>{REGISTER.subtitle}</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className={AUTH_FORM_FIELD}>
          <label className={AUTH_FORM_LABEL}>Họ và tên</label>
          <Input
            type="text"
            placeholder={REGISTER.fullNamePlaceholder}
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            variant="minimal"
            size="md"
            required
          />
        </div>
        <div className={AUTH_FORM_FIELD}>
          <label className={AUTH_FORM_LABEL}>Email</label>
          <Input
            type="email"
            placeholder={REGISTER.emailPlaceholder}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            variant="minimal"
            size="md"
            required
          />
        </div>
        <div className={AUTH_FORM_FIELD}>
          <label className={AUTH_FORM_LABEL}>Mật khẩu</label>
          <PasswordInput
            placeholder={REGISTER.passwordPlaceholder}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            variant="minimal"
            size="md"
            required
          />
        </div>
        <div className={AUTH_FORM_FIELD}>
          <label className={AUTH_FORM_LABEL}>Xác nhận mật khẩu</label>
          <PasswordInput
            placeholder={REGISTER.confirmPasswordPlaceholder}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            variant="minimal"
            size="md"
            required
          />
        </div>
        <Button type="submit" variant="primary" size="lg" className="w-full mt-8">
          {REGISTER.submitText}
        </Button>
      </form>

      <div className={AUTH_FOOTER}>
        <p className={AUTH_FOOTER_TEXT}>
          {REGISTER.hasAccount}{' '}
          <Link href={ROUTES.LOGIN} className={AUTH_FOOTER_LINK}>
            {REGISTER.loginLink}
          </Link>
        </p>
      </div>
    </>
  );
}

export const RegisterForm = memo(RegisterFormComponent);
