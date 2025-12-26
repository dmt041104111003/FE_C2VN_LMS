import { CourseStudentsPage } from '@/components/instructor/CourseStudentsPage';
import type { CourseIdPageProps } from '@/types/page';

export default function StudentsPage({ params }: CourseIdPageProps) {
  return <CourseStudentsPage courseId={params.courseId} />;
}
