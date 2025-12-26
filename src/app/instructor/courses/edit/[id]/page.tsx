'use client';

import { CourseCreatePage } from '@/components/instructor/CourseCreatePage';
import type { CourseEditPageProps } from '@/types/instructor';

export default function EditCoursePage({ params }: CourseEditPageProps) {
  return <CourseCreatePage courseId={params.id} />;
}
