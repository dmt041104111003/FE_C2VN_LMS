'use client';

import { memo, useMemo } from 'react';
import { formatCountdown } from '@/constants';
import { TimerIcon } from '@/components/ui/icons';
import type { QuizProgressProps } from '@/types/learning';
import { QUIZ } from '../learning.styles';

const DANGER_THRESHOLD_SECONDS = 30;

type TimerState = 'normal' | 'warning' | 'danger';

const getTimerState = (timer: number | undefined, isWarning: boolean): TimerState => {
  if (timer === undefined) return 'normal';
  if (timer < DANGER_THRESHOLD_SECONDS) return 'danger';
  if (isWarning) return 'warning';
  return 'normal';
};

const TIMER_STATE_CLASSES: Record<TimerState, string> = {
  normal: QUIZ.TIMER,
  warning: `${QUIZ.TIMER} ${QUIZ.TIMER_WARNING}`,
  danger: `${QUIZ.TIMER} ${QUIZ.TIMER_DANGER}`,
};

function QuizProgressComponent({ 
  current, 
  total, 
  label, 
  timer, 
  isWarning = false,
}: QuizProgressProps) {
  const timerState = useMemo(() => getTimerState(timer, isWarning), [timer, isWarning]);
  const timerClass = TIMER_STATE_CLASSES[timerState];
  const displayLabel = label || `Câu ${current} / ${total}`;
  const hasActiveTimer = timer !== undefined && timer > 0;

  return (
    <div className={QUIZ.HEADER}>
      <div className={QUIZ.HEADER_INNER}>
        <div className={QUIZ.HEADER_LEFT}>
          <span className={QUIZ.HEADER_TITLE}>{displayLabel}</span>
          <div className={QUIZ.HEADER_META}>
            <span>●</span>
            <span>{total} câu hỏi</span>
          </div>
        </div>
        <div className={QUIZ.HEADER_RIGHT}>
          {hasActiveTimer && (
            <div className={timerClass}>
              <TimerIcon className={QUIZ.TIMER_ICON} />
              <span>{formatCountdown(timer)}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export const QuizProgress = memo(QuizProgressComponent);
