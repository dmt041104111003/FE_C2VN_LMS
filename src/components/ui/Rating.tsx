'use client';

import { memo } from 'react';
import { StarIcon, StarOutlineIcon } from './icons';
import { RatingProps } from './ui.types';
import { RATING_SIZES } from './ui.styles';

function RatingComponent({
  value,
  count,
  showValue = true,
  showCount = true,
  size = 'sm',
  className = '',
}: RatingProps) {
  const styles = RATING_SIZES[size];

  return (
    <div className={`flex items-center ${styles.gap} ${className}`}>
      {showValue && (
        <span className={`${styles.text} font-medium text-[var(--accent)]`}>
          {value}
        </span>
      )}
      <div className="flex">
        {[1, 2, 3, 4, 5].map((star) =>
          star <= Math.round(value) ? (
            <StarIcon key={star} className={`${styles.star} text-[var(--accent)]`} />
          ) : (
            <StarOutlineIcon key={star} className={`${styles.star} text-[var(--text)]/20`} />
          )
        )}
      </div>
      {showCount && count !== undefined && (
        <span className={`${styles.text} text-[var(--text)]/50`}>
          ({count})
        </span>
      )}
    </div>
  );
}

export const Rating = memo(RatingComponent);

