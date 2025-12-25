'use client';

import { memo } from 'react';
import { ReviewSectionProps } from '@/types/review';
import { ReviewStats } from './ReviewStats';
import { ReviewForm } from './ReviewForm';
import { ReviewList } from './ReviewList';
import { REVIEW_SECTION } from './review.styles';
import { REVIEW_LABELS } from '@/constants/review';

function ReviewSectionComponent({
  stats,
  reviews,
  canReview = true,
  onSubmitReview,
  onVote,
  onReport,
  isSubmitting = false,
  className = '',
}: ReviewSectionProps) {
  return (
    <section className={`${REVIEW_SECTION.CONTAINER} ${className}`}>
      <div className={REVIEW_SECTION.HEADER}>
        <h2 className={REVIEW_SECTION.TITLE}>{REVIEW_LABELS.sectionTitle}</h2>
      </div>

      <ReviewStats stats={stats} />

      {canReview && onSubmitReview && (
        <>
          <div className={REVIEW_SECTION.DIVIDER} />
          <ReviewForm onSubmit={onSubmitReview} isSubmitting={isSubmitting} />
        </>
      )}

      <div className={REVIEW_SECTION.DIVIDER} />

      <ReviewList reviews={reviews} onVote={onVote} onReport={onReport} />
    </section>
  );
}

export const ReviewSection = memo(ReviewSectionComponent);

