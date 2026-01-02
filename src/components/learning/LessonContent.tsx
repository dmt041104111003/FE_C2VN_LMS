'use client';

import { memo, useMemo } from 'react';
import { LockIcon } from '@/components/ui/icons';
import { VideoPlayer, ShowMore } from '@/components/ui';
import { TipTapPreview } from '@/components/editor';
import { LessonFooter } from './LessonFooter';
import { LectureComments } from './LectureComments';
import type { LessonContentProps } from '@/types/learning';
import { LOCKED_CONTENT, SHOW_MORE_TEXT, QNA_TEXT, LESSON_PREFIX } from './learning.constants';
import * as S from './learning.styles';

export type { LessonContentProps };

const extractLectureId = (lessonId: string): string => {
  return lessonId.startsWith(LESSON_PREFIX.LECTURE) 
    ? lessonId.replace(LESSON_PREFIX.LECTURE, '') 
    : lessonId;
};


const useCommentTargetId = () => useMemo(() => {
  if (typeof window === 'undefined') return undefined;
  const hash = window.location.hash;
  if (!hash || !hash.startsWith('#comment-')) return undefined;
  return 'qna-section'; 
}, []);

export const VideoLessonContent = memo(function VideoLessonContent({ 
  lesson,
  isCompleted,
  onNext,
  hasNext,
}: LessonContentProps) {
  const lectureId = extractLectureId(lesson.id);
  const qnaTargetId = useCommentTargetId();

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

      {lesson.content && (
        <div className="border-t border-[var(--border)]">
          <ShowMore 
            initialCount={0} 
            showText={SHOW_MORE_TEXT.SHOW}
            hideText={SHOW_MORE_TEXT.HIDE}
            className="px-6 py-4"
            buttonPosition="top"
          >
            {[
              <div key="content" className="pb-2">
                <TipTapPreview content={lesson.content} />
              </div>
            ]}
          </ShowMore>
        </div>
      )}

      <div className="border-t border-[var(--border)]">
        <ShowMore
          initialCount={0}
          showText={QNA_TEXT.SHOW}
          hideText={QNA_TEXT.HIDE}
          className="px-6 py-4"
          buttonPosition="top"
          targetId={qnaTargetId}
        >
          {[
            <div key="qna" id="qna-section" className="pb-2">
              <LectureComments lectureId={lectureId} />
            </div>
          ]}
        </ShowMore>
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
  const lectureId = extractLectureId(lesson.id);
  const qnaTargetId = useCommentTargetId();

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
      <div className="max-w-3xl mx-auto w-full border-t border-[var(--border)]">
        <ShowMore
          initialCount={0}
          showText={QNA_TEXT.SHOW}
          hideText={QNA_TEXT.HIDE}
          className="px-6 py-4"
          buttonPosition="top"
          targetId={qnaTargetId}
        >
          {[
            <div key="qna" id="qna-section" className="pb-2">
              <LectureComments lectureId={lectureId} />
            </div>
          ]}
        </ShowMore>
      </div>
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

