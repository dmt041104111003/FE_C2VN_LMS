'use client';

import { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts';
import { useToast } from '@/components/ui/Toast';
import { ROUTES } from '@/constants/navigation';

export default function LoginSuccessPage() {
  const router = useRouter();
  const { refreshUser } = useAuth();
  const toast = useToast();
  const hasRun = useRef(false);

  useEffect(() => {
    if (hasRun.current) return;
    hasRun.current = true;

    const handleOAuthSuccess = async () => {
      try {
        await refreshUser();
        toast.success('Đăng nhập thành công!');
        router.replace(ROUTES.HOME);
      } catch {
        toast.error('Đăng nhập thất bại. Vui lòng thử lại.');
        router.replace(ROUTES.LOGIN);
      }
    };

    handleOAuthSuccess();
  }, [refreshUser, router, toast]);

  return null;
}
