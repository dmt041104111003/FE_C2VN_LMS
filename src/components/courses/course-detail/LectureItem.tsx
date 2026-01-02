'use client';

import { memo, useCallback } from 'react';
import { LectureItemProps } from '@/types/course';
import { PlayIcon, LockIcon } from '@/components/ui/icons';
import { formatDuration } from '@/constants/config';
import { COURSE_DETAIL } from '@/constants/course';
import * as S from '../courses.styles';

export const LectureItem = memo(function LectureItem({ lecture, onPreview }: LectureItemProps) {
  const handlePreview = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    onPreview(lecture.id);
  }, [lecture.id, onPreview]);

  return (
    <div className={`${S.COURSE_DETAIL_LECTURE} ${!lecture.isPreview ? 'opacity-60' : ''}`}>
      <div className={S.COURSE_DETAIL_LECTURE_TITLE}>
        {lecture.isPreview ? (
          <PlayIcon className="w-3 h-3 text-[var(--accent)]" />
        ) : (
          <LockIcon className="w-3 h-3 text-[var(--text)]/40" />
        )}
        <span>{lecture.title}</span>
        {lecture.isPreview && (
          <button
            className={`${S.COURSE_DETAIL_LECTURE_PREVIEW} cursor-pointer hover:underline`}
            onClick={handlePreview}
          >
            {COURSE_DETAIL.previewText}
          </button>
        )}
      </div>
      <span className={S.COURSE_DETAIL_LECTURE_DURATION}>{formatDuration(lecture.duration)}</span>
    </div>
  );
});

