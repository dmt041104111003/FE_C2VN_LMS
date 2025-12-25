import { notFound } from 'next/navigation';
import { Header, Footer } from '@/components/ui';
import { CourseDetail } from '@/components/courses';
import { getMockCourseDetail, MOCK_REVIEWS, MOCK_REVIEW_STATS } from '@/constants/course';
import { HEADER_SPACER } from '@/components/ui/ui.styles';

interface CourseDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function CourseDetailPage({ params }: CourseDetailPageProps) {
  const { id } = await params;
  const course = getMockCourseDetail(id);

  if (!course) {
    notFound();
  }

  return (
    <>
      <Header />
      <div className={HEADER_SPACER} />
      <main>
        <CourseDetail course={course} reviews={MOCK_REVIEWS} reviewStats={MOCK_REVIEW_STATS} />
      </main>
      <Footer />
    </>
  );
}

export async function generateStaticParams() {
  return [
    { id: '1' },
    { id: '2' },
    { id: '3' },
    { id: '4' },
    { id: '5' },
  ];
}

