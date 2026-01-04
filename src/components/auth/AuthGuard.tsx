'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts';
import { ROUTES } from '@/constants/navigation';
import { hasRole } from '@/constants/auth';
import { PageLoading } from '@/components/ui';
import type { AuthGuardProps } from '@/types/auth';
import type { UserRole } from '@/types/user';

export function AuthGuard({ children, allowedRoles, redirectTo = ROUTES.LOGIN }: AuthGuardProps) {
  const router = useRouter();
  const { user, isAuthenticated, isLoading } = useAuth();
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    if (isLoading) return;

    if (!isAuthenticated) {
      router.replace(redirectTo);
      return;
    }

    if (allowedRoles && allowedRoles.length > 0) {
      if (!hasRole(user?.role, allowedRoles)) {
        router.replace(ROUTES.HOME);
        return;
      }
    }

    setIsAuthorized(true);
  }, [isLoading, isAuthenticated, user, allowedRoles, router, redirectTo]);

  if (isLoading) {
    return <PageLoading text="Đang xác thực..." />;
  }

  if (!isAuthorized) {
    return <PageLoading text="Đang chuyển hướng..." />;
  }

  return <>{children}</>;
}

export function withAuth<P extends object>(
  Component: React.ComponentType<P>,
  allowedRoles?: UserRole[]
) {
  return function ProtectedComponent(props: P) {
    return (
      <AuthGuard allowedRoles={allowedRoles}>
        <Component {...props} />
      </AuthGuard>
    );
  };
}
