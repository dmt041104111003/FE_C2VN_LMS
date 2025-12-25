'use client';

import { memo } from 'react';
import { InstructorProps } from './ui.types';
import { INSTRUCTOR_SIZES } from './ui.styles';

function InstructorComponent({
  name,
  avatar,
  label,
  size = 'sm',
  className = '',
}: InstructorProps) {
  const styles = INSTRUCTOR_SIZES[size];

  return (
    <div className={`flex items-center ${styles.gap} ${className}`}>
      <img
        src={avatar || '/loading.png'}
        alt={name}
        className={`${styles.avatar} rounded-full object-cover`}
      />
      <div className={label ? 'flex flex-col' : ''}>
        <span className={`${styles.name} text-[var(--text)]/70`}>
          {label ? name : name}
        </span>
        {label && (
          <span className={`${styles.label} text-[var(--text)]/50`}>
            {label}
          </span>
        )}
      </div>
    </div>
  );
}

export const Instructor = memo(InstructorComponent);

