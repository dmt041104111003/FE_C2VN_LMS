'use client';

import { useParams } from 'next/navigation';
import { AuthGuard } from '@/components/auth';
import { LearningPage } from '@/components/learning';
import { PageLoading } from '@/components/ui';
import { useAuth } from '@/contexts/AuthContext';
import { useLearnPageData } from '@/hooks';

export default function LearnPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const { user } = useAuth();

  const { 
    courseId, 
    chapters, 
    progress,
    isLoading,
    upgradeInfo,
    isUpgrading,
    handleUpgrade,
  } = useLearnPageData({
    slug,
    userId: user?.id,
  });

  const progressKey = Object.keys(progress.lessonProgress).length;

  if (isLoading) {
    return (
      <AuthGuard>
        <PageLoading text="Đang tải nội dung học..." />
      </AuthGuard>
    );
  }

  return (
    <AuthGuard>
      {courseId && chapters.length > 0 && (
        <LearningPage
          key={`${courseId}-${chapters.length}-${progressKey}`}
          courseId={courseId}
          userId={user?.id || ''}
          chapters={chapters}
          progress={progress}
          upgradeInfo={upgradeInfo}
          isUpgrading={isUpgrading}
          onUpgrade={handleUpgrade}
        />
      )}
    </AuthGuard>
  );
}
