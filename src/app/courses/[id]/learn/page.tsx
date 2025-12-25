import { LearningPage } from '@/components/learning';
import { MOCK_LEARNING_CHAPTERS, MOCK_COURSE_PROGRESS } from '@/constants/learning';

interface LearnPageProps {
  params: Promise<{ id: string }>;
}

export default async function LearnPage({ params }: LearnPageProps) {
  const { id } = await params;

  return (
    <LearningPage
      courseId={id}
      chapters={MOCK_LEARNING_CHAPTERS}
      progress={MOCK_COURSE_PROGRESS}
    />
  );
}

export function generateStaticParams() {
  return [
    { id: 'course-1' },
    { id: 'blockchain-basics' },
    { id: 'smart-contracts' },
  ];
}


