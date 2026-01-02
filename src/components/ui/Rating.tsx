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
  variant = 'default',
  className = '',
}: RatingProps) {
  const styles = RATING_SIZES[size];
  const isLight = variant === 'light';
  
  const valueColor = isLight ? 'text-yellow-400' : 'text-[var(--accent)]';
  const starFilledColor = isLight ? 'text-yellow-400' : 'text-[var(--accent)]';
  const starEmptyColor = isLight ? 'text-white/30' : 'text-[var(--text)]/20';
  const countColor = isLight ? 'text-white/70' : 'text-[var(--text)]/50';

  return (
    <div className={`flex items-center ${styles.gap} ${className}`}>
      {showValue && (
        <span className={`${styles.text} font-medium ${valueColor}`}>
          {value}
        </span>
      )}
      <div className="flex">
        {[1, 2, 3, 4, 5].map((star) =>
          star <= Math.round(value) ? (
            <StarIcon key={star} className={`${styles.star} ${starFilledColor}`} />
          ) : (
            <StarOutlineIcon key={star} className={`${styles.star} ${starEmptyColor}`} />
          )
        )}
      </div>
      {showCount && count !== undefined && (
        <span className={`${styles.text} ${countColor}`}>
          ({count})
        </span>
      )}
    </div>
  );
}

export const Rating = memo(RatingComponent);

