'use client';

import { memo, useCallback } from 'react';
import { COURSE_CREATE_STYLES as S } from '@/constants/course-create';
import { QUIZ_LABELS as L, QUIZ_CONFIG, parsePassScore } from '@/constants/quiz.constants';

interface QuizPassScoreInputProps {
  value: number;
  onChange: (value: number) => void;
  disabled?: boolean;
}

export const QuizPassScoreInput = memo(function QuizPassScoreInput({ value, onChange, disabled }: QuizPassScoreInputProps) {
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => onChange(parsePassScore(e.target.value)),
    [onChange]
  );

  return (
    <div className={S.FORM_GROUP}>
      <label className={S.LABEL}>{L.passScore}</label>
      <div className="relative">
        <input
          type="number"
          min={QUIZ_CONFIG.PASS_SCORE.MIN}
          max={QUIZ_CONFIG.PASS_SCORE.MAX}
          value={value}
          onChange={handleChange}
          placeholder="70"
          className={`${S.INPUT} pr-8`}
          disabled={disabled}
        />
        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--text)]/50 pointer-events-none">%</span>
      </div>
      <p className="text-xs text-[var(--text)]/50 mt-1">{L.passScoreHint}</p>
    </div>
  );
});

