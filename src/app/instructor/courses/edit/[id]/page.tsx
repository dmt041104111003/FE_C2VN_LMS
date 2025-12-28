'use client';

import { use } from 'react';
import { AuthGuard } from '@/components/auth';
import { CourseCreatePage } from '@/components/instructor/CourseCreatePage';
import { ROLE } from '@/constants/auth';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function EditCoursePage({ params }: PageProps) {
  const { id } = use(params);

  return (
    <AuthGuard allowedRoles={ROLE.INSTRUCTOR}>
      <CourseCreatePage courseId={id} />
    </AuthGuard>
  );
}
