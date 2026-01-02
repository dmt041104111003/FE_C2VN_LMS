'use client';

import { memo } from 'react';
import { CheckCircleIcon } from '@/components/ui/icons';
import { LEARNING_LABELS } from '@/constants/learning';
import * as S from './learning.styles';

interface CompletedBadgeProps {
  className?: string;
}

export const CompletedBadge = memo(function CompletedBadge({ className }: CompletedBadgeProps) {
  return (
    <div className={className || S.VIDEO_LESSON.COMPLETED_BADGE}>
      <CheckCircleIcon className="w-4 h-4" />
      <span>{LEARNING_LABELS.sidebar.completed}</span>
    </div>
  );
});

interface NextButtonProps {
  onClick: () => void;
  className?: string;
}

export const NextButton = memo(function NextButton({ onClick, className }: NextButtonProps) {
  return (
    <button className={className || S.VIDEO_LESSON.NEXT_BTN} onClick={onClick}>
      {LEARNING_LABELS.lesson.next}
    </button>
  );
});

interface CompleteButtonProps {
  onClick: () => void;
  className?: string;
}

export const CompleteButton = memo(function CompleteButton({ onClick, className }: CompleteButtonProps) {
  return (
    <button className={className || S.VIDEO_LESSON.COMPLETE_BTN} onClick={onClick}>
      {LEARNING_LABELS.lesson.complete}
    </button>
  );
});

interface LessonFooterProps {
  isCompleted: boolean;
  hasNext: boolean;
  onComplete?: () => void;
  onNext: () => void;
  hint?: string;
}

export const LessonFooter = memo(function LessonFooter({
  isCompleted,
  hasNext,
  onComplete,
  onNext,
  hint,
}: LessonFooterProps) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        {isCompleted ? (
          <CompletedBadge />
        ) : onComplete ? (
          <CompleteButton onClick={onComplete} />
        ) : hint ? (
          <p className="text-sm text-[var(--text)]/60">{hint}</p>
        ) : null}
      </div>
      
      {hasNext && isCompleted && <NextButton onClick={onNext} />}
    </div>
  );
});



