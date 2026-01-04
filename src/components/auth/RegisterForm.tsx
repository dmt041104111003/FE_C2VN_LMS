'use client';

import { memo, useState, useCallback, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button, Input, PasswordInput, ButtonSpinner } from '@/components/ui';
import { useToast } from '@/components/ui/Toast';
import { REGISTER } from '@/constants/register';
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
  AUTH_FOOTER_TEXT,
  AUTH_FOOTER_LINK,
  AUTH_ERROR_MSG,
} from './auth.styles';

function RegisterFormComponent() {
  const router = useRouter();
  const { register, isLoading, isAuthenticated, user } = useAuth();
  const toast = useToast();
  
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!fullName || !email || !password || !confirmPassword) {
      setError('Vui lòng điền đầy đủ thông tin');
      return;
    }

    if (password.length < 6) {
      setError('Mật khẩu phải có ít nhất 6 ký tự');
      return;
    }

    if (password !== confirmPassword) {
      setError('Mật khẩu xác nhận không khớp');
      return;
    }

    try {
      await register(email, password, fullName);
      toast.success('Đăng ký thành công! Vui lòng kiểm tra email để xác thực.');
    } catch (err) {
      const errorMsg = err instanceof ApiException 
        ? translateError(err.message) 
        : 'Đăng ký thất bại. Vui lòng thử lại.';
      toast.error(errorMsg);
      setError(errorMsg);
    }
  }, [fullName, email, password, confirmPassword, register, toast]);

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      router.replace(ROUTES.HOME);
    }
  }, [isAuthenticated, isLoading, router]);

  return (
    <>
      <div className={AUTH_FORM_HEADER_LG}>
        <h1 className={AUTH_FORM_TITLE}>{REGISTER.title}</h1>
        <p className={AUTH_FORM_SUBTITLE}>{REGISTER.subtitle}</p>
      </div>

      {error && <p className={AUTH_ERROR_MSG}>{error}</p>}

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
            disabled={isLoading}
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
            disabled={isLoading}
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
            disabled={isLoading}
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
          {isLoading ? <ButtonSpinner size="sm" /> : REGISTER.submitText}
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
