'use client';

import { memo } from 'react';
import { formatCountdown } from '@/constants';
import { TimerIcon } from '@/components/ui/icons';
import type { QuizProgressProps } from '@/types/learning';
import { QUIZ } from '../learning.styles';

function QuizProgressComponent({ 
  current, 
  total, 
  label, 
  timer, 
  isWarning 
}: QuizProgressProps) {
  const isDanger = timer !== undefined && timer < 30;
  
  const timerClass = [
    QUIZ.TIMER,
    isWarning && !isDanger && QUIZ.TIMER_WARNING,
    isDanger && QUIZ.TIMER_DANGER,
  ].filter(Boolean).join(' ');

  return (
    <div className={QUIZ.HEADER}>
      <div className={QUIZ.HEADER_INNER}>
        <div className={QUIZ.HEADER_LEFT}>
          <span className={QUIZ.HEADER_TITLE}>
            {label || `Câu ${current} / ${total}`}
          </span>
          <div className={QUIZ.HEADER_META}>
            <span>●</span>
            <span>{total} câu hỏi</span>
          </div>
        </div>
        
        <div className={QUIZ.HEADER_RIGHT}>
          {timer !== undefined && timer > 0 && (
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
