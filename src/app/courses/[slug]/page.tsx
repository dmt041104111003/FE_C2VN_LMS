import { PublicCourseDetailPage } from '@/components/courses';
import type { Metadata } from 'next';
import { getCourseBySlug } from '@/services/course';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  try {
    const course = await getCourseBySlug(slug);
    return {
      title: course.title,
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

