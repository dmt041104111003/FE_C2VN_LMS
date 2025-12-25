'use client';

import { memo } from 'react';
import type { StatusBadgeProps, StatusBadgeVariant } from './ui.types';
import { STATUS_BADGE } from './ui.styles';

const VARIANT_STYLES: Record<StatusBadgeVariant, string> = {
  default: STATUS_BADGE.DEFAULT,
  success: STATUS_BADGE.SUCCESS,
  danger: STATUS_BADGE.DANGER,
  warning: STATUS_BADGE.WARNING,
  info: STATUS_BADGE.INFO,
};

export const StatusBadge = memo(function StatusBadge({ children, variant = 'default', className = '' }: StatusBadgeProps) {
  return (
    <span className={`${STATUS_BADGE.BASE} ${VARIANT_STYLES[variant]} ${className}`}>
      {children}
    </span>
  );
});

