'use client';

import { memo, useState } from 'react';
import { Button, Input } from '@/components/ui';
import { VERIFY_EMAIL } from '@/constants/auth';

function VerifyEmailFormComponent() {
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  const handleResend = () => {
    console.log('Resend code to:', email);
  };

  return (
    <>
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-[var(--text)] mb-2">
          {VERIFY_EMAIL.title}
        </h1>
        <p className="text-sm text-[var(--text)]/60">
          {VERIFY_EMAIL.subtitle}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <Input
          type="email"
          placeholder={VERIFY_EMAIL.emailPlaceholder}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Input
          type="text"
          placeholder={VERIFY_EMAIL.codePlaceholder}
          value={code}
          onChange={(e) => setCode(e.target.value)}
          required
        />
        <Button type="submit" variant="primary" size="lg" className="w-full mt-2">
          {VERIFY_EMAIL.submitText}
        </Button>
      </form>

      <div className="text-center mt-6">
        <button
          type="button"
          onClick={handleResend}
          className="text-sm text-[var(--link)] font-medium"
        >
          {VERIFY_EMAIL.resendText}
        </button>
      </div>
    </>
  );
}

export const VerifyEmailForm = memo(VerifyEmailFormComponent);

