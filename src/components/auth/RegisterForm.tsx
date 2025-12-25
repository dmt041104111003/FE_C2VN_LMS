'use client';

import { memo, useState } from 'react';
import Link from 'next/link';
import { Button, Input } from '@/components/ui';
import { REGISTER } from '@/constants/register';
import { ROUTES } from '@/constants/navigation';

function RegisterFormComponent() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <>
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-[var(--text)] mb-2">
          {REGISTER.title}
        </h1>
        <p className="text-sm text-[var(--text)]/60">
          {REGISTER.subtitle}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <Input
          type="text"
          placeholder={REGISTER.fullNamePlaceholder}
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          required
        />
        <Input
          type="email"
          placeholder={REGISTER.emailPlaceholder}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Input
          type="password"
          placeholder={REGISTER.passwordPlaceholder}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Input
          type="password"
          placeholder={REGISTER.confirmPasswordPlaceholder}
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <Button type="submit" variant="primary" size="lg" className="w-full mt-2">
          {REGISTER.submitText}
        </Button>
      </form>

      <div className="text-center mt-6">
        <p className="text-sm text-[var(--text)]/60">
          {REGISTER.hasAccount}{' '}
          <Link href={ROUTES.LOGIN} className="text-[var(--link)] font-medium">
            {REGISTER.loginLink}
          </Link>
        </p>
      </div>
    </>
  );
}

export const RegisterForm = memo(RegisterFormComponent);
