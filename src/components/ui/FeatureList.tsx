'use client';

import { memo } from 'react';
import { CheckCircleIcon } from './icons';
import { FeatureListProps } from './ui.types';
import { FEATURE_SIZES } from './ui.styles';

function FeatureListComponent({
  features,
  size = 'sm',
  columns = 1,
  className = '',
}: FeatureListProps) {
  const styles = FEATURE_SIZES[size];
  const columnClass = columns === 2 ? 'flex flex-wrap gap-x-3 gap-y-0.5' : 'space-y-1';

  return (
    <div className={`${styles.text} text-[var(--text)]/60 ${columnClass} ${className}`}>
      {features.map((feature, index) => (
        <div key={index} className={`flex items-center ${styles.gap}`}>
          <CheckCircleIcon className={`${styles.icon} text-[var(--accent)]`} />
          <span>{feature}</span>
        </div>
      ))}
    </div>
  );
}

export const FeatureList = memo(FeatureListComponent);

