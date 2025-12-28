'use client';

import { AuthGuard } from '@/components/auth';
import { CourseCreatePage } from '@/components/instructor/CourseCreatePage';
import { ROLE } from '@/constants/auth';

export default function Page() {
  return (
    <AuthGuard allowedRoles={ROLE.INSTRUCTOR}>
      <CourseCreatePage />
    </AuthGuard>
  );
}
