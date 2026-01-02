'use client';

import { AuthGuard } from '@/components/auth';
import { CourseStudentsPage } from '@/components/instructor/CourseStudentsPage';
import { ROLE } from '@/constants/auth';

interface PageProps {
  params: { courseId: string };
}

export default function StudentsPage({ params }: PageProps) {
  return (
    <AuthGuard allowedRoles={ROLE.INSTRUCTOR}>
      <CourseStudentsPage courseId={params.courseId} />
    </AuthGuard>
  );
}
