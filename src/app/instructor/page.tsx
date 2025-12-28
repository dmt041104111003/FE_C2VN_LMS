'use client';

import { AuthGuard } from '@/components/auth';
import { InstructorPage } from '@/components/instructor';
import { ROLE } from '@/constants/auth';

export default function Page() {
  return (
    <AuthGuard allowedRoles={ROLE.INSTRUCTOR}>
      <InstructorPage />
    </AuthGuard>
  );
}
