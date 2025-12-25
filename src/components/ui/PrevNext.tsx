'use client';

import { memo } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from './icons';
import { PrevNextProps } from './ui.types';
import { PREV_NEXT } from './ui.styles';

function PrevNextComponent({
  onPrev,
  onNext,
  hasPrev = true,
  hasNext = true,
  prevLabel,
  nextLabel,
  className = '',
}: PrevNextProps) {
  return (
    <div className={`${PREV_NEXT.CONTAINER} ${className}`}>
      <button className={PREV_NEXT.BTN} onClick={onPrev} disabled={!hasPrev}>
        <ChevronLeftIcon className={PREV_NEXT.ICON} />
        {prevLabel && <span>{prevLabel}</span>}
      </button>
      <button className={PREV_NEXT.BTN} onClick={onNext} disabled={!hasNext}>
        {nextLabel && <span>{nextLabel}</span>}
        <ChevronRightIcon className={PREV_NEXT.ICON} />
      </button>
    </div>
  );
}

export const PrevNext = memo(PrevNextComponent);
