'use client';

import { AuthGuard } from '@/components/auth';
import { UserInboxPage } from '@/components/user/UserInbox';

export default function Page() {
  return (
    <AuthGuard>
      <UserInboxPage />
    </AuthGuard>
  );
}
