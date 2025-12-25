'use client';

import { memo, useState, useCallback, useMemo } from 'react';
import { CheckCircleIcon } from '@/components/ui/icons';
import { VideoPlayer, ShowMore, SidebarLayout } from '@/components/ui';
import { TipTapPreview } from '@/components/editor';
import { LEARNING_LABELS } from '@/constants/learning';
import { LearningSidebar } from './LearningSidebar';
import { QuizSection } from './QuizSection';
import type { 
  LearningPageProps, 
  LearningLesson, 
  VideoLessonContentProps, 
  ReadingLessonContentProps 
} from '@/types/learning';
import * as S from './learning.styles';

const VideoLessonContent = memo(function VideoLessonContent({ 
  lesson, 
}: VideoLessonContentProps) {
  return (
    <div className={S.VIDEO_LESSON.CONTAINER}>
      <div className={S.VIDEO_LESSON.VIDEO_WRAPPER}>
        {lesson.videoUrl && <VideoPlayer url={lesson.videoUrl} />}
      </div>
      {lesson.content && (
        <div className="border-t border-[var(--border)]">
          <ShowMore 
            initialCount={0} 
            showText="Xem nội dung bài học"
            hideText="Thu gọn"
            className="px-6 py-4"
          >
            {[
              <div key="content" className="pb-2">
                <TipTapPreview content={lesson.content} />
              </div>
            ]}
          </ShowMore>
        </div>
      )}
    </div>
  );
});

const ReadingLessonContent = memo(function ReadingLessonContent({ 
  lesson, 
  isCompleted, 
  onComplete,
  onNext,
  hasNext,
}: ReadingLessonContentProps) {
  return (
    <div className={S.READING_LESSON.CONTAINER}>
      {lesson.content && (
        <div className={S.READING_LESSON.CONTENT}>
          <TipTapPreview content={lesson.content} />
        </div>
      )}
      <div className={S.READING_LESSON.FOOTER}>
        <div>
          {isCompleted ? (
            <div className={S.VIDEO_LESSON.COMPLETED_BADGE}>
              <CheckCircleIcon className="w-4 h-4" />
              <span>{LEARNING_LABELS.sidebar.completed}</span>
            </div>
          ) : (
            <button className={S.VIDEO_LESSON.COMPLETE_BTN} onClick={onComplete}>
              {LEARNING_LABELS.lesson.complete}
            </button>
          )}
        </div>
        {hasNext && (
          <button className={S.VIDEO_LESSON.NEXT_BTN} onClick={onNext}>
            {LEARNING_LABELS.lesson.next}
          </button>
        )}
      </div>
    </div>
  );
});

type LessonWithChapter = { lesson: LearningLesson; chapterTitle: string };

const flattenChaptersToLessons = (chapters: LearningPageProps['chapters']): LessonWithChapter[] => {
  const lessons: LessonWithChapter[] = [];
  chapters.forEach(ch => {
    ch.lessons.forEach(l => lessons.push({ lesson: l, chapterTitle: ch.title }));
  });
  return lessons;
};

function LearningPageComponent({ chapters, progress: initialProgress }: LearningPageProps) {
  const [progress, setProgress] = useState(initialProgress);

  const allLessons = useMemo(() => flattenChaptersToLessons(chapters), [chapters]);

  const currentLessonIndex = useMemo(
    () => allLessons.findIndex(l => l.lesson.id === progress.currentLessonId),
    [allLessons, progress.currentLessonId]
  );

  const currentLessonData = allLessons[currentLessonIndex];
  const currentLesson = currentLessonData?.lesson;
  const currentChapterTitle = currentLessonData?.chapterTitle || '';
  const lessonProgress = progress.lessonProgress[currentLesson?.id || ''];
  const isCompleted = lessonProgress?.status === 'completed';

  const handleSelectLesson = useCallback((lessonId: string) => {
    setProgress(prev => ({ ...prev, currentLessonId: lessonId }));
  }, []);

  const handleCompleteLesson = useCallback(() => {
    if (!currentLesson) return;
    
    const now = new Date().toISOString();
    const nextLesson = allLessons[currentLessonIndex + 1];
    const nextLessonId = nextLesson?.lesson.id;

    setProgress(prev => {
      const updatedLessonProgress = {
        ...prev.lessonProgress,
        [currentLesson.id]: {
          ...prev.lessonProgress[currentLesson.id],
          status: 'completed' as const,
          progress: 100,
          completedAt: now,
        },
      };

      const shouldUnlockNext = nextLessonId && prev.lessonProgress[nextLessonId]?.status === 'locked';
      if (shouldUnlockNext) {
        updatedLessonProgress[nextLessonId] = {
          ...prev.lessonProgress[nextLessonId],
          status: 'available' as const,
        };
      }

      const completedCount = Object.values(updatedLessonProgress).filter(p => p.status === 'completed').length;
      const completionRate = Math.round((completedCount / allLessons.length) * 100);

      return { ...prev, lessonProgress: updatedLessonProgress, completionRate };
    });
  }, [currentLesson, allLessons, currentLessonIndex]);

  const handleQuizSubmit = useCallback((answers: Record<string, string | string[]>) => {
    console.log('Quiz answers:', answers);
  }, []);

  const handleQuizComplete = useCallback((passed: boolean) => {
    if (passed) handleCompleteLesson();
  }, [handleCompleteLesson]);

  const handlePrev = useCallback(() => {
    if (currentLessonIndex > 0) {
      handleSelectLesson(allLessons[currentLessonIndex - 1].lesson.id);
    }
  }, [currentLessonIndex, allLessons, handleSelectLesson]);

  const handleNext = useCallback(() => {
    if (currentLessonIndex < allLessons.length - 1) {
      const nextLesson = allLessons[currentLessonIndex + 1];
      if (progress.lessonProgress[nextLesson.lesson.id]?.status !== 'locked') {
        handleSelectLesson(nextLesson.lesson.id);
      }
    }
  }, [currentLessonIndex, allLessons, progress.lessonProgress, handleSelectLesson]);

  const hasPrev = currentLessonIndex > 0;
  const hasNext = currentLessonIndex < allLessons.length - 1 && 
    progress.lessonProgress[allLessons[currentLessonIndex + 1]?.lesson.id]?.status !== 'locked';

  const sidebar = (
    <LearningSidebar
      chapters={chapters}
      currentLessonId={progress.currentLessonId}
      progress={progress.lessonProgress}
      onSelectLesson={handleSelectLesson}
    />
  );

  return (
    <SidebarLayout
      sidebar={sidebar}
      header={{
        title: currentLesson?.title || '',
        subtitle: currentChapterTitle,
        onPrev: handlePrev,
        onNext: handleNext,
        hasPrev,
        hasNext,
      }}
    >
      {currentLesson?.type === 'video' && (
        <VideoLessonContent
          lesson={currentLesson}
          isCompleted={isCompleted}
          onComplete={handleCompleteLesson}
          onNext={handleNext}
          hasNext={hasNext}
        />
      )}

      {currentLesson?.type === 'reading' && (
        <ReadingLessonContent
          lesson={currentLesson}
          isCompleted={isCompleted}
          onComplete={handleCompleteLesson}
          onNext={handleNext}
          hasNext={hasNext}
        />
      )}

      {currentLesson?.type === 'quiz' && currentLesson.quiz && (
        <QuizSection
          quiz={currentLesson.quiz}
          onSubmit={handleQuizSubmit}
          onComplete={handleQuizComplete}
        />
      )}
    </SidebarLayout>
  );
}

export const LearningPage = memo(LearningPageComponent);
