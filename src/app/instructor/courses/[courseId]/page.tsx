import { CourseDetailPage } from '@/components/instructor/CourseDetailPage';
import type { CourseIdPageProps } from '@/types/page';

export default function Page({ params }: CourseIdPageProps) {
  return <CourseDetailPage courseId={params.courseId} />;
}
