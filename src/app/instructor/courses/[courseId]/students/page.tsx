import { CourseStudentsPage } from '@/components/instructor/CourseStudentsPage';

interface PageProps {
  params: { courseId: string };
}

export default function StudentsPage({ params }: PageProps) {
  return <CourseStudentsPage courseId={params.courseId} />;
}

