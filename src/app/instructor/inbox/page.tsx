'use client';

import { AuthGuard } from '@/components/auth';
import { InboxPage } from '@/components/instructor/InboxPage';
import { ROLE } from '@/constants/auth';

export default function Page() {
  return (
    <AuthGuard allowedRoles={ROLE.INSTRUCTOR}>
      <InboxPage />
    </AuthGuard>
  );
}
