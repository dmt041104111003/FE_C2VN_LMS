'use client';

import { useParams } from 'next/navigation';
import { AuthGuard } from '@/components/auth';
import { LearningPage } from '@/components/learning';
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
    upgradeInfo,
    isUpgrading,
    handleUpgrade,
  } = useLearnPageData({
    slug,
    userId: user?.id,
  });

  const progressKey = Object.keys(progress.lessonProgress).length;

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
