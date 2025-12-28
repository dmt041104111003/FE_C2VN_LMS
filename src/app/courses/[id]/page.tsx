import { notFound } from 'next/navigation';
import { Header, Footer } from '@/components/ui';
import { CourseDetail } from '@/components/courses';
import { HEADER_SPACER } from '@/components/ui/ui.styles';
import type { AsyncIdPageProps } from '@/types/page';
import type { Review, ReviewStats } from '@/types/course';

const REVIEWS: Review[] = [];
const REVIEW_STATS: ReviewStats = { average: 0, total: 0, distribution: { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 } };

export default async function CourseDetailPage({ params }: AsyncIdPageProps) {
  const { id } = await params;
  const course = null;

  if (!course) {
    notFound();
  }

  return (
    <>
      <Header />
      <div className={HEADER_SPACER} />
      <main>
        <CourseDetail course={course} reviews={REVIEWS} reviewStats={REVIEW_STATS} />
      </main>
      <Footer />
    </>
  );
}

export async function generateStaticParams() {
  return [];
}
