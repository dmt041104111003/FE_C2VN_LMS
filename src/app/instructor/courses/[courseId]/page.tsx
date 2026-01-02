'use client';

import { AuthGuard } from '@/components/auth';
import { CourseDetailPage } from '@/components/instructor/CourseDetailPage';
import { ROLE } from '@/constants/auth';

interface PageProps {
  params: { courseId: string };
}

export default function Page({ params }: PageProps) {
  return (
    <AuthGuard allowedRoles={ROLE.INSTRUCTOR}>
      <CourseDetailPage courseId={params.courseId} />
    </AuthGuard>
  );
}
