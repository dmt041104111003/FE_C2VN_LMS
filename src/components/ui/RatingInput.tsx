'use client';

import { memo, useState, useCallback } from 'react';
import { StarIcon, StarOutlineIcon } from './icons';
import type { RatingInputProps } from '@/types/review';
import { RATING_INPUT } from '@/components/courses/review.styles';
import { REVIEW_CONFIG, RATING_SIZE_MAP } from '@/constants/review';

function RatingInputComponent({
  value,
  onChange,
  size = 'md',
  disabled = false,
  className = '',
}: RatingInputProps) {
  const [hoverValue, setHoverValue] = useState<number | null>(null);

  const handleMouseEnter = useCallback((star: number) => {
    if (!disabled) setHoverValue(star);
  }, [disabled]);

  const handleMouseLeave = useCallback(() => {
    setHoverValue(null);
  }, []);

  const handleClick = useCallback((star: number) => {
    if (!disabled) onChange(star);
  }, [disabled, onChange]);

  const displayValue = hoverValue ?? value;
  const sizeClass = RATING_SIZE_MAP[size];

  const getStarClass = (star: number): string => {
    const isFilled = star <= displayValue;
    const isHovering = hoverValue !== null && star <= hoverValue;

    if (isFilled) return RATING_INPUT.STAR_FILLED;
    if (isHovering) return RATING_INPUT.STAR_HOVER;
    return RATING_INPUT.STAR_EMPTY;
  };

  return (
    <div className={`${RATING_INPUT.WRAPPER} ${className}`} onMouseLeave={handleMouseLeave}>
      {REVIEW_CONFIG.STARS.map((star) => {
        const isFilled = star <= displayValue;
        const StarComponent = isFilled ? StarIcon : StarOutlineIcon;
        const starClass = `${RATING_INPUT.STAR} ${disabled ? RATING_INPUT.STAR_DISABLED : ''} ${getStarClass(star)}`;

        return (
          <button
            key={star}
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              handleClick(star);
            }}
            onMouseEnter={() => handleMouseEnter(star)}
            className={starClass}
            disabled={disabled}
            aria-label={`${star} sao`}
          >
            <StarComponent className={`${sizeClass} pointer-events-none`} />
          </button>
        );
      })}
    </div>
  );
}

export const RatingInput = memo(RatingInputComponent);
