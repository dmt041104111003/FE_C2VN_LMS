'use client';

import { use } from 'react';
import { AuthGuard } from '@/components/auth';
import { CourseStudentsPage } from '@/components/instructor/CourseStudentsPage';
import { ROLE } from '@/constants/auth';

interface PageProps {
  params: Promise<{ courseId: string }>;
}

export default function StudentsPage({ params }: PageProps) {
  const { courseId } = use(params);

  return (
    <AuthGuard allowedRoles={ROLE.INSTRUCTOR}>
      <CourseStudentsPage courseId={courseId} />
    </AuthGuard>
  );
}
