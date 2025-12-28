'use client';

import { use } from 'react';
import { AuthGuard } from '@/components/auth';
import { LearningPage } from '@/components/learning';
import type { LearningChapter, CourseProgress } from '@/types/learning';

const CHAPTERS: LearningChapter[] = [];
const PROGRESS: CourseProgress = {
  courseId: '',
  currentLessonId: '',
  completionRate: 0,
  lastAccessedAt: new Date().toISOString(),
  lessonProgress: {},
};

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function LearnPage({ params }: PageProps) {
  const { id } = use(params);

  return (
    <AuthGuard>
      <LearningPage
        courseId={id}
        chapters={CHAPTERS}
        progress={PROGRESS}
      />
    </AuthGuard>
  );
}
