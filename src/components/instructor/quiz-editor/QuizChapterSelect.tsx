'use client';

import { memo, useCallback } from 'react';
import { COURSE_CREATE_STYLES as S } from '@/constants/course-create';
import { QUIZ_LABELS as L } from '@/constants/quiz.constants';
import type { ChapterSelectProps } from '@/types/quiz.types';

export const QuizChapterSelect = memo(function QuizChapterSelect({ 
  value, chapters, onChange, disabled 
}: ChapterSelectProps) {
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => onChange(e.target.value),
    [onChange]
  );

  return (
    <div className={S.FORM_GROUP}>
      <label className={S.LABEL}>{L.selectChapter}</label>
      <select value={value} onChange={handleChange} className={S.SELECT} disabled={disabled}>
        <option value="">{L.selectChapterPlaceholder}</option>
        {chapters.map((c, i) => (
          <option key={c.id} value={c.id}>{L.chapterPrefix} {i + 1}: {c.title || L.untitled}</option>
        ))}
      </select>
    </div>
  );
});

