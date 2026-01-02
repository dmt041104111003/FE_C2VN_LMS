'use client';

import { memo, useMemo } from 'react';
import { ChapterItemProps } from '@/types/course';
import { ChevronDownIcon, QuizIcon } from '@/components/ui/icons';
import { formatDuration } from '@/constants/config';
import { COURSE_DETAIL } from '@/constants/course';
import { LectureItem } from './LectureItem';
import * as S from '../courses.styles';

export const ChapterItem = memo(function ChapterItem({ chapter, isExpanded, onToggle, onPreview }: ChapterItemProps) {
  const duration = useMemo(
    () => chapter.lectures.reduce((acc, l) => acc + l.duration, 0),
    [chapter.lectures]
  );

  const testCount = chapter.tests?.length || 0;

  return (
    <div className={S.COURSE_DETAIL_CHAPTER}>
      <button className={S.COURSE_DETAIL_CHAPTER_HEADER} onClick={onToggle}>
        <div>
          <h3 className={S.COURSE_DETAIL_CHAPTER_TITLE}>{chapter.title}</h3>
          <p className={S.COURSE_DETAIL_CHAPTER_META}>
            {chapter.lectures.length} {COURSE_DETAIL.lecturesText}
            {testCount > 0 && ` • ${testCount} bài kiểm tra`}
            {' • '}{formatDuration(duration)}
          </p>
        </div>
        <ChevronDownIcon
          className={`${S.COURSE_DETAIL_CHAPTER_ICON} ${isExpanded ? S.COURSE_DETAIL_CHAPTER_ICON_OPEN : ''}`}
        />
      </button>
      {isExpanded && (
        <div className={S.COURSE_DETAIL_LECTURES}>
          {chapter.lectures.map(lecture => (
            <LectureItem key={lecture.id} lecture={lecture} onPreview={onPreview} />
          ))}
          {chapter.tests?.map(test => (
            <div key={test.id} className={`${S.COURSE_DETAIL_LECTURE} opacity-60`}>
              <div className={S.COURSE_DETAIL_LECTURE_TITLE}>
                <QuizIcon className="w-3 h-3 text-[var(--warning)]" />
                <span>{test.title}</span>
                <span className="text-xs text-[var(--text)]/40 ml-2">
                  {test.questionCount} câu hỏi
                  {test.passScore != null && test.passScore > 0 && ` • Điểm đạt: ${test.passScore}%`}
                </span>
              </div>
              {test.durationMinutes != null && test.durationMinutes > 0 && (
                <span className={S.COURSE_DETAIL_LECTURE_DURATION}>{test.durationMinutes} phút</span>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
});

