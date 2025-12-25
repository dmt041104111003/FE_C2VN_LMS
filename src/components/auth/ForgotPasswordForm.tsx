'use client';

import { memo, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button, Input } from '@/components/ui';
import { FORGOT_PASSWORD } from '@/constants/auth';
import { ROUTES } from '@/constants/navigation';

function ForgotPasswordFormComponent() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  const handleResend = () => {
    console.log('Resend code to:', email);
  };

  const handleContinue = () => {
    router.push(`${ROUTES.RESET_PASSWORD}?email=${encodeURIComponent(email)}`);
  };

  if (sent) {
    return (
      <>
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-[var(--text)] mb-2">
            {FORGOT_PASSWORD.title}
          </h1>
          <p className="text-sm text-[var(--text)]/60">
            {FORGOT_PASSWORD.successMessage}
          </p>
        </div>

        <div className="flex flex-col gap-4">
          <Button onClick={handleContinue} variant="primary" size="lg" className="w-full">
            Tiếp tục
          </Button>
          <button
            type="button"
            onClick={handleResend}
            className="text-sm text-[var(--link)] font-medium"
          >
            Gửi lại mã
          </button>
        </div>

        <div className="text-center mt-6">
          <Link href={ROUTES.LOGIN} className="text-sm text-[var(--link)] font-medium">
            ← {FORGOT_PASSWORD.backToLogin}
          </Link>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-[var(--text)] mb-2">
          {FORGOT_PASSWORD.title}
        </h1>
        <p className="text-sm text-[var(--text)]/60">
          {FORGOT_PASSWORD.subtitle}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <Input
          type="email"
          placeholder={FORGOT_PASSWORD.emailPlaceholder}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Button type="submit" variant="primary" size="lg" className="w-full mt-2">
          {FORGOT_PASSWORD.submitText}
        </Button>
      </form>

      <div className="text-center mt-6">
        <Link href={ROUTES.LOGIN} className="text-sm text-[var(--link)] font-medium">
          ← {FORGOT_PASSWORD.backToLogin}
        </Link>
      </div>
    </>
  );
}

export const ForgotPasswordForm = memo(ForgotPasswordFormComponent);
