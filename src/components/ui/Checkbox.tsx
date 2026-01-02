'use client';

import { memo } from 'react';
import { CheckCircleIcon } from './icons';
import type { CheckboxProps } from './ui.types';
import { CHECKBOX } from './ui.styles';

function CheckboxComponent({ checked, onChange, disabled, className = '' }: CheckboxProps) {
  const baseClass = `${CHECKBOX.BASE} ${checked ? CHECKBOX.CHECKED : ''} ${disabled ? CHECKBOX.DISABLED : ''} ${className}`;

  return (
    <div className={baseClass} onClick={disabled ? undefined : onChange}>
      {checked && <CheckCircleIcon className={CHECKBOX.CHECK_ICON} />}
    </div>
  );
}

export const Checkbox = memo(CheckboxComponent);























