'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts';
import { ROUTES } from '@/constants/navigation';

export default function LoginSuccessPage() {
  const router = useRouter();
  const { refreshUser } = useAuth();

  useEffect(() => {
    const handleOAuthSuccess = async () => {
      try {
        await refreshUser();
      } catch {}
      router.replace(ROUTES.HOME);
    };

    handleOAuthSuccess();
  }, [refreshUser, router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--bg)]">
      <div className="text-center">
        <div className="w-16 h-16 mx-auto mb-4 animate-spin rounded-full border-4 border-[var(--accent)] border-t-transparent" />
      </div>
    </div>
  );
}


