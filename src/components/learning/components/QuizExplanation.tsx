'use client';

import { memo } from 'react';
import { LEARNING_LABELS } from '@/constants/learning';
import { TipTapPreview } from '@/components/editor';
import type { QuizExplanationProps } from '@/types/learning';
import { QUESTION } from '../learning.styles';

function QuizExplanationComponent({ explanation }: QuizExplanationProps) {
  if (!explanation) return null;

  return (
    <div className={QUESTION.EXPLANATION}>
      <div className={QUESTION.EXPLANATION_TITLE}>
        {LEARNING_LABELS.quiz.explanation}
      </div>
      <TipTapPreview content={explanation} compact />
    </div>
  );
}

export const QuizExplanation = memo(QuizExplanationComponent);
