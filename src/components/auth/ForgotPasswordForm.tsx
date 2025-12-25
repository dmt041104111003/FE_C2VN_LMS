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
        <div className="mb-12">
          <h1 className="text-2xl sm:text-3xl font-light text-[var(--text)] mb-3 tracking-wide">
            {FORGOT_PASSWORD.title}
          </h1>
          <p className="text-sm text-[var(--text)]/50">
            {FORGOT_PASSWORD.successMessage}
          </p>
        </div>

        <div className="space-y-4">
          <Button onClick={handleContinue} variant="primary" size="lg" className="w-full">
            Tiếp tục
          </Button>
          <div className="text-center">
            <button
              type="button"
              onClick={handleResend}
              className="text-xs text-[var(--text)]/50 hover:text-[var(--accent)] uppercase tracking-wider transition-colors"
            >
              Gửi lại mã
            </button>
          </div>
        </div>

        <div className="text-center mt-10">
          <Link href={ROUTES.LOGIN} className="text-xs text-[var(--text)]/40 hover:text-[var(--accent)] transition-colors">
            ← {FORGOT_PASSWORD.backToLogin}
          </Link>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="mb-12">
        <h1 className="text-2xl sm:text-3xl font-light text-[var(--text)] mb-3 tracking-wide">
          {FORGOT_PASSWORD.title}
        </h1>
        <p className="text-sm text-[var(--text)]/50">
          {FORGOT_PASSWORD.subtitle}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-1">
          <label className="text-xs text-[var(--text)]/40 uppercase tracking-wider">Email</label>
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

      <div className="text-center mt-10">
        <Link href={ROUTES.LOGIN} className="text-xs text-[var(--text)]/40 hover:text-[var(--accent)] transition-colors">
          ← {FORGOT_PASSWORD.backToLogin}
        </Link>
      </div>
    </>
  );
}

export const ForgotPasswordForm = memo(ForgotPasswordFormComponent);
