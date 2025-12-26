'use client';

import { CourseCreatePage } from '@/components/instructor/CourseCreatePage';
import type { IdPageProps } from '@/types/page';

export default function EditCoursePage({ params }: IdPageProps) {
  return <CourseCreatePage courseId={params.id} />;
}
