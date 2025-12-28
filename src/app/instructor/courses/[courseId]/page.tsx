'use client';

import { use } from 'react';
import { AuthGuard } from '@/components/auth';
import { CourseDetailPage } from '@/components/instructor/CourseDetailPage';
import { ROLE } from '@/constants/auth';

interface PageProps {
  params: Promise<{ courseId: string }>;
}

export default function Page({ params }: PageProps) {
  const { courseId } = use(params);

  return (
    <AuthGuard allowedRoles={ROLE.INSTRUCTOR}>
      <CourseDetailPage courseId={courseId} />
    </AuthGuard>
  );
}
