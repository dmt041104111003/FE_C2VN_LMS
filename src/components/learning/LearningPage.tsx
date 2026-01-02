'use client';

import { memo, useMemo, useCallback } from 'react';
import { SidebarLayout } from '@/components/ui';
import { LearningSidebar } from './LearningSidebar';
import { QuizSection } from './QuizSection';
import { VideoLessonContent, ReadingLessonContent, LockedLessonContent } from './LessonContent';
import type { LearningPageProps } from '@/types/learning';
import {
  useProgressState,
  useLessonNavigation,
  useLectureProgress,
  useCompleteLesson,
  flattenChaptersToLessons,
} from '@/hooks';
import { LESSON_STATUS, LESSON_TYPE } from './learning.constants';

function LearningPageComponent({ 
  courseId, 
  userId, 
  chapters, 
  progress: initialProgress,
  upgradeInfo,
  isUpgrading,
  onUpgrade,
  enrollmentId,
  enableFaceProctor,
}: LearningPageProps) {
  const allLessons = useMemo(() => flattenChaptersToLessons(chapters), [chapters]);
  const [progress, setProgress] = useProgressState(allLessons, initialProgress);

  const { currentLessonIndex, handleSelectLesson, handlePrev, handleNext, hasPrev, hasNext } = 
    useLessonNavigation(allLessons, progress, setProgress);

  const currentLessonData = allLessons[currentLessonIndex];
  const currentLesson = currentLessonData?.lesson;
  const currentChapterTitle = currentLessonData?.chapterTitle || '';
  const currentLessonProgress = progress.lessonProgress[currentLesson?.id || ''];
  const lessonStatus = currentLessonProgress?.status;
  const isCompleted = lessonStatus === LESSON_STATUS.COMPLETED;
  const isLocked = lessonStatus === LESSON_STATUS.LOCKED;

  useLectureProgress({
    userId,
    courseId,
    currentLesson,
    isCompleted,
    isLocked,
    allLessons,
    setProgress,
  });

  const handleCompleteLesson = useCompleteLesson({
    userId,
    courseId,
    currentLesson,
    currentLessonIndex,
    allLessons,
    setProgress,
  });

  const handleQuizComplete = useCallback((passed: boolean, score?: number) => {
    if (passed) handleCompleteLesson(score);
  }, [handleCompleteLesson]);

  const renderLessonContent = () => {
    if (isLocked) return <LockedLessonContent />;
    if (!currentLesson) return null;

    const commonProps = {
      lesson: currentLesson,
      isCompleted,
      onComplete: handleCompleteLesson,
      onNext: handleNext,
      hasNext,
    };

    switch (currentLesson.type) {
      case LESSON_TYPE.VIDEO:
        return <VideoLessonContent {...commonProps} />;
      case LESSON_TYPE.READING:
        return <ReadingLessonContent {...commonProps} />;
      case LESSON_TYPE.QUIZ:
        return currentLesson.quiz ? (
          <QuizSection
            quiz={currentLesson.quiz}
            courseId={courseId}
            userId={userId}
            isAlreadyPassed={isCompleted}
            onComplete={handleQuizComplete}
            enrollmentId={enrollmentId}
            enableFaceProctor={enableFaceProctor}
          />
        ) : null;
      default:
        return null;
    }
  };

  return (
    <SidebarLayout
      sidebar={
        <LearningSidebar
          chapters={chapters}
          currentLessonId={progress.currentLessonId}
          progress={progress.lessonProgress}
          onSelectLesson={handleSelectLesson}
          courseId={courseId}
          upgradeInfo={upgradeInfo ?? undefined}
          onUpgrade={onUpgrade}
          isUpgrading={isUpgrading}
        />
      }
      header={{
        title: currentLesson?.title || '',
        subtitle: currentChapterTitle,
        onPrev: handlePrev,
        onNext: handleNext,
        hasPrev,
        hasNext,
      }}
    >
      {renderLessonContent()}
    </SidebarLayout>
  );
}

export const LearningPage = memo(LearningPageComponent);
