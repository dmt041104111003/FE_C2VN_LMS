'use client';

import { memo, useCallback } from 'react';
import { TipTapEditor } from '@/components/editor/TipTapEditor';
import { COURSE_CREATE_STYLES as S } from '@/constants/course-create';
import { QUIZ_LABELS as L, getOptionLetter } from '@/constants/quiz.constants';

interface QuizOptionRowProps {
  optionIndex: number;
  value: string;
  isCorrect: boolean;
  onValueChange: (index: number, value: string) => void;
  onCorrectToggle: (index: number, checked: boolean) => void;
  disabled?: boolean;
}

export const QuizOptionRow = memo(function QuizOptionRow({
  optionIndex, value, isCorrect, onValueChange, onCorrectToggle, disabled
}: QuizOptionRowProps) {
  const handleValueChange = useCallback((v: string) => onValueChange(optionIndex, v), [optionIndex, onValueChange]);
  const handleCorrectChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => onCorrectToggle(optionIndex, e.target.checked), [optionIndex, onCorrectToggle]);

  return (
    <div className={S.OPTION_ROW}>
      <input type="checkbox" checked={isCorrect} onChange={handleCorrectChange} className={S.CHECKBOX} title={L.correctAnswer} disabled={disabled} />
      <div className={S.OPTION_CONTENT}>
        <div className={S.OPTION_LABEL}>{getOptionLetter(optionIndex)}</div>
        <TipTapEditor content={value} onChange={handleValueChange} placeholder={L.optionPlaceholder} minHeight="60px" disabled={disabled} />
      </div>
    </div>
  );
});

