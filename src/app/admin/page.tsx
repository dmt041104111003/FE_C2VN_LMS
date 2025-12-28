'use client';

import { AuthGuard } from '@/components/auth';
import { AdminPage } from '@/components/admin';
import { ROLE } from '@/constants/auth';

export default function Page() {
  return (
    <AuthGuard allowedRoles={ROLE.ADMIN}>
      <AdminPage />
    </AuthGuard>
  );
}
