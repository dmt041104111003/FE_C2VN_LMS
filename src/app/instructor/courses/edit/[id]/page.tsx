'use client';

import { AuthGuard } from '@/components/auth';
import { CourseCreatePage } from '@/components/instructor/CourseCreatePage';
import { ROLE } from '@/constants/auth';

interface PageProps {
  params: { id: string };
}

export default function EditCoursePage({ params }: PageProps) {
  return (
    <AuthGuard allowedRoles={ROLE.INSTRUCTOR}>
      <CourseCreatePage courseId={params.id} />
    </AuthGuard>
  );
}
