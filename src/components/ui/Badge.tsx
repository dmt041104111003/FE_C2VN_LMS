import { memo } from 'react';
import { BadgeProps } from './ui.types';
import {
  BADGE_BASE,
  BADGE_VARIANTS,
} from './ui.styles';

function BadgeComponent({
  children,
  variant = 'default',
  className = '',
}: BadgeProps) {
  const combined = [
    BADGE_BASE,
    BADGE_VARIANTS[variant],
    className,
  ].join(' ');

  return (
    <span className={combined}>
      {children}
    </span>
  );
}

export const Badge = memo(BadgeComponent);
