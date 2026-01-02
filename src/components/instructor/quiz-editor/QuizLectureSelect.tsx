'use client';

import { memo, useCallback } from 'react';
import { COURSE_CREATE_STYLES as S } from '@/constants/course-create';
import { QUIZ_LABELS as L } from '@/constants/quiz.constants';
import type { ChapterRef } from '@/types/quiz.types';

interface QuizLectureSelectProps {
  value: string;
  chapter: ChapterRef | undefined;
  onChange: (lectureId: string) => void;
  disabled?: boolean;
}

export const QuizLectureSelect = memo(function QuizLectureSelect({ 
  value, chapter, onChange, disabled 
}: QuizLectureSelectProps) {
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => onChange(e.target.value),
    [onChange]
  );

  return (
    <div className={S.FORM_GROUP}>
      <label className={S.LABEL}>{L.selectLecture}</label>
      <select value={value} onChange={handleChange} className={S.SELECT} disabled={disabled || !chapter}>
        <option value="">{L.selectLecturePlaceholder}</option>
        {chapter?.lectures.map((l, i) => (
          <option key={l.id} value={l.id}>{L.lecturePrefix} {i + 1}: {l.title || L.untitled}</option>
        ))}
      </select>
    </div>
  );
});

