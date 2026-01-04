import { PublicCourseDetailPage } from '@/components/courses';
import type { Metadata } from 'next';
import { API_BASE_URL } from '@/constants';
import type { CourseMetadataResponse } from '@/types/course';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  try {
    const res = await fetch(`${API_BASE_URL}/api/course/slug/${slug}`, {
      next: { revalidate: 3600 },
    });
    const data: CourseMetadataResponse = await res.json();
    const course = data.result;
    if (!course) throw new Error('Course not found');
    return {
      title: course.title || 'Chi tiết khóa học',
      description: course.description?.slice(0, 160) || `Khóa học ${course.title} trên C2VN`,
      openGraph: {
        title: course.title,
        description: course.description?.slice(0, 160),
        images: course.thumbnail ? [{ url: course.thumbnail }] : [],
      },
    };
  } catch {
    return {
      title: 'Chi tiết khóa học',
    };
  }
}

export default function Page() {
  return <PublicCourseDetailPage />;
}

