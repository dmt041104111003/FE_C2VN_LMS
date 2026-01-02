'use client';

import { AuthGuard } from '@/components/auth/AuthGuard';
import { TagManagementPage } from '@/components/instructor/TagManagementPage';
import { ROLE } from '@/constants/auth';

export default function Page() {
  return (
    <AuthGuard allowedRoles={ROLE.INSTRUCTOR}>
      <TagManagementPage />
    </AuthGuard>
  );
}

