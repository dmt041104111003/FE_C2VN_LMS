'use client';

import { memo } from 'react';
import type { ProgressBarProps } from './ui.types';
import { PROGRESS_BAR } from './ui.styles';

function ProgressBarComponent({
  value,
  max = 100,
  size = 'sm',
  showLabel = false,
  className = '',
}: ProgressBarProps) {
  const percentage = Math.min(100, Math.max(0, (value / max) * 100));

  return (
    <div className={className}>
      <div className={PROGRESS_BAR.TRACK[size]}>
        <div
          className={PROGRESS_BAR.FILL}
          style={{ width: `${percentage}%` }}
        />
      </div>
      {showLabel && (
        <div className={PROGRESS_BAR.LABEL[size]}>
          {Math.round(percentage)}%
        </div>
      )}
    </div>
  );
}

export const ProgressBar = memo(ProgressBarComponent);



