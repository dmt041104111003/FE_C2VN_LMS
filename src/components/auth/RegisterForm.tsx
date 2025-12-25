'use client';

import { memo, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button, Input } from '@/components/ui';
import { REGISTER } from '@/constants/register';
import { ROUTES } from '@/constants/navigation';

function RegisterFormComponent() {
  const router = useRouter();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(`${ROUTES.VERIFY_EMAIL}?email=${encodeURIComponent(email)}`);
  };

  return (
    <>
      <div className="mb-12">
        <h1 className="text-2xl sm:text-3xl font-light text-[var(--text)] mb-3 tracking-wide">
          {REGISTER.title}
        </h1>
        <p className="text-sm text-[var(--text)]/50">
          {REGISTER.subtitle}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-1">
          <label className="text-xs text-[var(--text)]/40 uppercase tracking-wider">Họ và tên</label>
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
        <div className="space-y-1">
          <label className="text-xs text-[var(--text)]/40 uppercase tracking-wider">Email</label>
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
        <div className="space-y-1">
          <label className="text-xs text-[var(--text)]/40 uppercase tracking-wider">Mật khẩu</label>
          <Input
            type="password"
            placeholder={REGISTER.passwordPlaceholder}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            variant="minimal"
            size="md"
            required
          />
        </div>
        <div className="space-y-1">
          <label className="text-xs text-[var(--text)]/40 uppercase tracking-wider">Xác nhận mật khẩu</label>
          <Input
            type="password"
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

      <div className="text-center mt-10">
        <p className="text-sm text-[var(--text)]/40">
          {REGISTER.hasAccount}{' '}
          <Link href={ROUTES.LOGIN} className="text-[var(--accent)] hover:underline">
            {REGISTER.loginLink}
          </Link>
        </p>
      </div>
    </>
  );
}

export const RegisterForm = memo(RegisterFormComponent);
