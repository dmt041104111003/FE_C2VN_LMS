'use client';

import { memo, useState, useCallback } from 'react';
import { RatingInput } from '@/components/ui/RatingInput';
import { Button } from '@/components/ui';
import { ReviewFormProps } from '@/types/review';
import { REVIEW_FORM } from './review.styles';
import { REVIEW_LABELS, RATING_LABELS, REVIEW_CONFIG } from '@/constants/review';

function ReviewFormComponent({ onSubmit, isSubmitting = false, className = '' }: ReviewFormProps) {
  const [rating, setRating] = useState(0);
  const [content, setContent] = useState('');

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0 || content.trim().length < REVIEW_CONFIG.MIN_CONTENT_LENGTH) return;
    onSubmit({ rating, content: content.trim() });
    setRating(0);
    setContent('');
  }, [rating, content, onSubmit]);

  const handleContentChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  }, []);

  const isValid = rating > 0 && content.trim().length >= REVIEW_CONFIG.MIN_CONTENT_LENGTH;

  return (
    <form onSubmit={handleSubmit} className={`${REVIEW_FORM.CONTAINER} ${className}`}>
      <div className={REVIEW_FORM.SECTION}>
        <label className={REVIEW_FORM.LABEL}>{REVIEW_LABELS.ratingLabel}</label>
        <div className="flex items-center gap-4">
          <RatingInput value={rating} onChange={setRating} size="lg" disabled={isSubmitting} />
          {rating > 0 && (
            <span className={REVIEW_FORM.RATING_DISPLAY}>{RATING_LABELS[rating]}</span>
          )}
        </div>
      </div>

      <div className={REVIEW_FORM.SECTION}>
        <label className={REVIEW_FORM.LABEL}>{REVIEW_LABELS.contentLabel}</label>
        <textarea
          value={content}
          onChange={handleContentChange}
          placeholder={REVIEW_LABELS.contentPlaceholder}
          className={REVIEW_FORM.TEXTAREA}
          disabled={isSubmitting}
        />
        <p className={REVIEW_FORM.HELPER}>{REVIEW_LABELS.contentHelper}</p>
      </div>

      <div className={REVIEW_FORM.FOOTER}>
        <span className={REVIEW_FORM.HELPER}>
          {content.length} {REVIEW_LABELS.charText}
        </span>
        <Button type="submit" disabled={!isValid || isSubmitting}>
          {isSubmitting ? REVIEW_LABELS.submittingBtn : REVIEW_LABELS.submitBtn}
        </Button>
      </div>
    </form>
  );
}

export const ReviewForm = memo(ReviewFormComponent);
