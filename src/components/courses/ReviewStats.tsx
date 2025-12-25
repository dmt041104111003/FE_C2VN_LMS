'use client';

import { memo, useMemo } from 'react';
import { Rating } from '@/components/ui';
import { ReviewStatsProps } from '@/types/review';
import { REVIEW_STATS } from './review.styles';
import { REVIEW_LABELS, REVIEW_CONFIG } from '@/constants/review';

function ReviewStatsComponent({ stats, className = '' }: ReviewStatsProps) {
  const maxCount = useMemo(() => {
    return Math.max(...Object.values(stats.distribution), 1);
  }, [stats.distribution]);

  return (
    <div className={`${REVIEW_STATS.CONTAINER} ${className}`}>
      <div className={REVIEW_STATS.SUMMARY}>
        <span className={REVIEW_STATS.AVERAGE}>{stats.average.toFixed(1)}</span>
        <Rating value={stats.average} size="md" showValue={false} showCount={false} />
        <span className={REVIEW_STATS.TOTAL}>
          {stats.total.toLocaleString()} {REVIEW_LABELS.reviewsText}
        </span>
      </div>

      <div className={REVIEW_STATS.DISTRIBUTION}>
        {REVIEW_CONFIG.STAR_ORDER.map((star) => {
          const count = stats.distribution[star];
          const percentage = (count / maxCount) * 100;

          return (
            <div key={star} className={REVIEW_STATS.BAR_ROW}>
              <span className={REVIEW_STATS.BAR_LABEL}>{star} {REVIEW_LABELS.starText}</span>
              <div className={REVIEW_STATS.BAR_CONTAINER}>
                <div className={REVIEW_STATS.BAR_FILL} style={{ width: `${percentage}%` }} />
              </div>
              <span className={REVIEW_STATS.BAR_COUNT}>{count}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export const ReviewStats = memo(ReviewStatsComponent);
