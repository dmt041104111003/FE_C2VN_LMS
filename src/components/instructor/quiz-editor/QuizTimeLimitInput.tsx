'use client';

import { memo, useCallback } from 'react';
import { COURSE_CREATE_STYLES as S } from '@/constants/course-create';
import { QUIZ_LABELS as L, QUIZ_CONFIG, parseTimeLimit } from '@/constants/quiz.constants';

interface QuizTimeLimitInputProps {
  value: number;
  onChange: (value: number) => void;
  disabled?: boolean;
}

export const QuizTimeLimitInput = memo(function QuizTimeLimitInput({ value, onChange, disabled }: QuizTimeLimitInputProps) {
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => onChange(parseTimeLimit(e.target.value)),
    [onChange]
  );

  return (
    <div className={S.FORM_GROUP}>
      <label className={S.LABEL}>{L.timeLimit}</label>
      <div className="relative">
        <input
          type="number"
          min={QUIZ_CONFIG.TIME_LIMIT.MIN}
          max={QUIZ_CONFIG.TIME_LIMIT.MAX}
          value={value}
          onChange={handleChange}
          placeholder="30"
          className={`${S.INPUT} pr-12`}
          disabled={disabled}
        />
        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--text)]/50 pointer-events-none">phút</span>
      </div>
      <p className="text-xs text-[var(--text)]/50 mt-1">{L.timeLimitHint}</p>
    </div>
  );
});

