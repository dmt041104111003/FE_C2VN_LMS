'use client';

import { memo, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button, Input } from '@/components/ui';
import { VERIFY_EMAIL } from '@/constants/auth';
import { ROUTES } from '@/constants/navigation';

function VerifyEmailFormComponent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get('email') || '';
  const [code, setCode] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(ROUTES.LOGIN);
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
        {email && (
          <p className="text-sm text-[var(--accent)] mt-2">
            {email}
          </p>
        )}
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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
