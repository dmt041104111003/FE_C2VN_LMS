'use client';

import { memo } from 'react';
import { LockIcon } from '@/components/ui/icons';
import { VideoPlayer } from '@/components/ui';
import { TipTapPreview } from '@/components/editor';
import { LessonFooter } from './LessonFooter';
import { LectureComments } from './LectureComments';
import type { LessonContentProps } from '@/types/learning';
import { LOCKED_CONTENT, LESSON_PREFIX } from './learning.constants';
import * as S from './learning.styles';

export type { LessonContentProps };

const extractLectureId = (lessonId: string): string => {
  return lessonId.startsWith(LESSON_PREFIX.LECTURE) 
    ? lessonId.replace(LESSON_PREFIX.LECTURE, '') 
    : lessonId;
};

export const VideoLessonContent = memo(function VideoLessonContent({ 
  lesson,
  isCompleted,
  onNext,
  hasNext,
}: LessonContentProps) {
  return (
    <div className={S.VIDEO_LESSON.CONTAINER}>
      <div className={S.VIDEO_LESSON.VIDEO_WRAPPER}>
        {lesson.videoUrl && (
          <VideoPlayer url={lesson.videoUrl} />
        )}
      </div>
      
      <div className="border-t border-[var(--border)] px-6 py-4">
        <LessonFooter
          isCompleted={isCompleted}
          hasNext={hasNext}
          onNext={onNext}
        />
      </div>
    </div>
  );
});

export const VideoLessonRightPanel = memo(function VideoLessonRightPanel({ 
  lesson,
}: Pick<LessonContentProps, 'lesson'>) {
  const lectureId = extractLectureId(lesson.id);

  return (
    <div className="h-full flex flex-col">
      {lesson.content && (
        <div className="border-b border-[var(--border)] p-4">
          <h3 className="text-sm font-medium text-[var(--text)]/80 mb-3">Nội dung bài học</h3>
          <div className="text-sm">
            <TipTapPreview content={lesson.content} />
          </div>
        </div>
      )}
      
      <div className="flex-1 p-4 overflow-y-auto">
        <LectureComments lectureId={lectureId} />
      </div>
    </div>
  );
});

export const ReadingLessonContent = memo(function ReadingLessonContent({ 
  lesson, 
  isCompleted, 
  onComplete,
  onNext,
  hasNext,
}: LessonContentProps) {
  return (
    <div className="flex flex-col h-full overflow-y-auto">
      <div className={S.READING_LESSON.CONTAINER}>
        {lesson.content && (
          <div className={S.READING_LESSON.CONTENT}>
            <TipTapPreview content={lesson.content} />
          </div>
        )}
        <div className={S.READING_LESSON.FOOTER}>
          <LessonFooter
            isCompleted={isCompleted}
            hasNext={hasNext}
            onComplete={onComplete}
            onNext={onNext}
          />
        </div>
      </div>
    </div>
  );
});

export const ReadingLessonRightPanel = memo(function ReadingLessonRightPanel({ 
  lesson,
}: Pick<LessonContentProps, 'lesson'>) {
  const lectureId = extractLectureId(lesson.id);

  return (
    <div className="h-full p-4 overflow-y-auto">
      <LectureComments lectureId={lectureId} />
    </div>
  );
});

export const LockedLessonContent = memo(function LockedLessonContent() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] text-center px-6">
      <div className="w-16 h-16 rounded-full bg-[var(--bg-alt)] flex items-center justify-center mb-4">
        <LockIcon className="w-8 h-8 text-[var(--text)]/40" />
      </div>
      <h3 className="text-lg font-semibold mb-2">{LOCKED_CONTENT.TITLE}</h3>
      <p className="text-[var(--text)]/60 max-w-md">{LOCKED_CONTENT.DESCRIPTION}</p>
    </div>
  );
});
