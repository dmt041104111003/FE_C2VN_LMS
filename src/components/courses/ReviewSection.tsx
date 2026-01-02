'use client';

import { memo } from 'react';
import type { ReviewSectionProps } from '@/types/review';
import { ReviewStats } from './ReviewStats';
import { ReviewForm } from './ReviewForm';
import { ReviewList } from './ReviewList';
import { REVIEW_SECTION } from './review.styles';
import { REVIEW_LABELS } from '@/constants/review';

function ReviewSectionComponent({
  stats,
  reviews,
  canReview = true,
  currentUserId,
  instructorId,
  onSubmitReview,
  onVote,
  onReport,
  onReply,
  onDelete,
  isSubmitting = false,
  className = '',
}: ReviewSectionProps) {
  const showReviewForm = canReview && Boolean(onSubmitReview);

  return (
    <section className={`${REVIEW_SECTION.CONTAINER} ${className}`}>
      <div className={REVIEW_SECTION.HEADER}>
        <h2 className={REVIEW_SECTION.TITLE}>{REVIEW_LABELS.sectionTitle}</h2>
      </div>

      <ReviewStats stats={stats} />

      {showReviewForm && (
        <>
          <div className={REVIEW_SECTION.DIVIDER} />
          <ReviewForm onSubmit={onSubmitReview!} isSubmitting={isSubmitting} />
        </>
      )}

      <div className={REVIEW_SECTION.DIVIDER} />

      <ReviewList
        reviews={reviews}
        currentUserId={currentUserId}
        instructorId={instructorId}
        onVote={onVote}
        onReport={onReport}
        onReply={onReply}
        onDelete={onDelete}
      />
    </section>
  );
}

export const ReviewSection = memo(ReviewSectionComponent);
