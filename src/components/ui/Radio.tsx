'use client';

import { memo } from 'react';
import type { RadioProps } from './ui.types';
import { RADIO } from './ui.styles';

function RadioComponent({ checked, onChange, disabled, className = '' }: RadioProps) {
  const baseClass = `${RADIO.BASE} ${checked ? RADIO.CHECKED : ''} ${disabled ? RADIO.DISABLED : ''} ${className}`;

  return (
    <div className={baseClass} onClick={disabled ? undefined : onChange}>
      {checked && <div className={RADIO.DOT} />}
    </div>
  );
}

export const Radio = memo(RadioComponent);






