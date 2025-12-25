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
      <div className="mb-12">
        <h1 className="text-2xl sm:text-3xl font-light text-[var(--text)] mb-3 tracking-wide">
          {VERIFY_EMAIL.title}
        </h1>
        <p className="text-sm text-[var(--text)]/50">
          {VERIFY_EMAIL.subtitle}
        </p>
        {email && (
          <p className="text-sm text-[var(--accent)] mt-3">
            {email}
          </p>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-1">
          <label className="text-xs text-[var(--text)]/40 uppercase tracking-wider">Mã xác thực</label>
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

      <div className="text-center mt-10">
        <button
          type="button"
          onClick={handleResend}
          className="text-xs text-[var(--text)]/50 hover:text-[var(--accent)] uppercase tracking-wider transition-colors"
        >
          {VERIFY_EMAIL.resendText}
        </button>
      </div>
    </>
  );
}

export const VerifyEmailForm = memo(VerifyEmailFormComponent);
