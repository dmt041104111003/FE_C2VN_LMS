'use client';

import { memo, useState, useCallback, useMemo } from 'react';
import { ChevronLeftIcon, ChevronRightIcon, MenuIcon, CheckCircleIcon } from '@/components/ui/icons';
import { VideoPlayer, ShowMore } from '@/components/ui';
import { TipTapPreview } from '@/components/editor';
import { LEARNING_LABELS } from '@/constants/learning';
import { LearningSidebar } from './LearningSidebar';
import { QuizSection } from './QuizSection';
import type { 
  LearningPageProps, 
  LearningLesson, 
  LessonHeaderProps, 
  VideoLessonContentProps, 
  ReadingLessonContentProps 
} from '@/types/learning';
import * as S from './learning.styles';

const LessonHeader = memo(function LessonHeader({
  chapterTitle,
  lessonTitle,
  onPrev,
  onNext,
  hasPrev,
  hasNext,
  onToggleSidebar,
}: LessonHeaderProps) {
  return (
    <header className={S.LESSON_HEADER.CONTAINER}>
      <div className={S.LESSON_HEADER.LEFT}>
        <button className={S.LESSON_HEADER.BACK_BTN} onClick={onToggleSidebar}>
          <MenuIcon className={S.LESSON_HEADER.NAV_ICON} />
        </button>
        <div className={S.LESSON_HEADER.INFO}>
          <span className={S.LESSON_HEADER.CHAPTER}>{chapterTitle}</span>
          <span className={S.LESSON_HEADER.TITLE}>{lessonTitle}</span>
        </div>
      </div>
      <div className={S.LESSON_HEADER.RIGHT}>
        <button className={S.LESSON_HEADER.NAV_BTN} onClick={onPrev} disabled={!hasPrev}>
          <ChevronLeftIcon className={S.LESSON_HEADER.NAV_ICON} />
        </button>
        <button className={S.LESSON_HEADER.NAV_BTN} onClick={onNext} disabled={!hasNext}>
          <ChevronRightIcon className={S.LESSON_HEADER.NAV_ICON} />
        </button>
      </div>
    </header>
  );
});

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

function LearningPageComponent({ chapters, progress: initialProgress }: LearningPageProps) {
  const [progress, setProgress] = useState(initialProgress);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const allLessons = useMemo(() => {
    const lessons: { lesson: LearningLesson; chapterTitle: string }[] = [];
    chapters.forEach(ch => {
      ch.lessons.forEach(l => lessons.push({ lesson: l, chapterTitle: ch.title }));
    });
    return lessons;
  }, [chapters]);

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
    setSidebarOpen(false);
  }, []);

  const handleCompleteLesson = useCallback(() => {
    if (!currentLesson) return;
    
    setProgress(prev => {
      const updated = { ...prev };
      updated.lessonProgress = {
        ...prev.lessonProgress,
        [currentLesson.id]: {
          ...prev.lessonProgress[currentLesson.id],
          status: 'completed',
          progress: 100,
          completedAt: new Date().toISOString(),
        },
      };

      const nextLesson = allLessons[currentLessonIndex + 1];
      if (nextLesson && prev.lessonProgress[nextLesson.lesson.id]?.status === 'locked') {
        updated.lessonProgress[nextLesson.lesson.id] = {
          ...prev.lessonProgress[nextLesson.lesson.id],
          status: 'available',
        };
      }

      const completed = Object.values(updated.lessonProgress).filter(p => p.status === 'completed').length;
      updated.completionRate = Math.round((completed / allLessons.length) * 100);

      return updated;
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

  const toggleSidebar = useCallback(() => setSidebarOpen(p => !p), []);

  const hasPrev = currentLessonIndex > 0;
  const hasNext = currentLessonIndex < allLessons.length - 1 && 
    progress.lessonProgress[allLessons[currentLessonIndex + 1]?.lesson.id]?.status !== 'locked';

  return (
    <div className={S.LEARNING_PAGE.CONTAINER}>
      <aside className={S.LEARNING_PAGE.SIDEBAR}>
        <LearningSidebar
          chapters={chapters}
          currentLessonId={progress.currentLessonId}
          progress={progress.lessonProgress}
          onSelectLesson={handleSelectLesson}
        />
      </aside>

      {sidebarOpen && (
        <div className={S.LEARNING_PAGE.SIDEBAR_MOBILE} onClick={toggleSidebar}>
          <div className={S.LEARNING_PAGE.SIDEBAR_MOBILE_CONTENT} onClick={e => e.stopPropagation()}>
            <LearningSidebar
              chapters={chapters}
              currentLessonId={progress.currentLessonId}
              progress={progress.lessonProgress}
              onSelectLesson={handleSelectLesson}
            />
          </div>
        </div>
      )}

      <main className={S.LEARNING_PAGE.MAIN}>
        <LessonHeader
          chapterTitle={currentChapterTitle}
          lessonTitle={currentLesson?.title || ''}
          onPrev={handlePrev}
          onNext={handleNext}
          hasPrev={hasPrev}
          hasNext={hasNext}
          onToggleSidebar={toggleSidebar}
        />

        <div className={S.LEARNING_PAGE.CONTENT}>
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
        </div>
      </main>
    </div>
  );
}

export const LearningPage = memo(LearningPageComponent);
