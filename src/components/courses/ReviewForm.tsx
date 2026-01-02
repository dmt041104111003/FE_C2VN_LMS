'use client';

import { memo, useState, useCallback, useMemo } from 'react';
import { RatingInput } from '@/components/ui/RatingInput';
import { Button } from '@/components/ui';
import { TipTapEditor } from '@/components/editor';
import type { ReviewFormProps, RatingValue } from '@/types/review';
import { REVIEW_FORM } from './review.styles';
import { REVIEW_LABELS, RATING_LABELS, isValidRating } from '@/constants/review';

const stripHtml = (html: string) => html.replace(/<[^>]*>/g, '').trim();
const isValidContent = (html: string) => stripHtml(html).length >= 10;

function ReviewFormComponent({ onSubmit, isSubmitting = false, className = '' }: ReviewFormProps) {
  const [rating, setRating] = useState(0);
  const [content, setContent] = useState('');

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (!isValidRating(rating) || !isValidContent(content)) return;
    
    onSubmit({ rating, content });
    setRating(0);
    setContent('');
  }, [rating, content, onSubmit]);

  const textLength = useMemo(() => stripHtml(content).length, [content]);
  
  const isFormValid = useMemo(
    () => isValidRating(rating) && isValidContent(content),
    [rating, content]
  );

  const ratingLabel = isValidRating(rating) ? RATING_LABELS[rating as RatingValue] : null;

  return (
    <form onSubmit={handleSubmit} className={`${REVIEW_FORM.CONTAINER} ${className}`}>
      <div className={REVIEW_FORM.SECTION}>
        <label className={REVIEW_FORM.LABEL}>{REVIEW_LABELS.ratingLabel}</label>
        <div className="flex items-center gap-4">
          <RatingInput value={rating} onChange={setRating} size="lg" disabled={isSubmitting} />
          {ratingLabel && (
            <span className={REVIEW_FORM.RATING_DISPLAY}>{ratingLabel}</span>
          )}
        </div>
      </div>

      <div className={REVIEW_FORM.SECTION}>
        <label className={REVIEW_FORM.LABEL}>{REVIEW_LABELS.contentLabel}</label>
        <TipTapEditor
          content={content}
          onChange={setContent}
          placeholder={REVIEW_LABELS.contentPlaceholder}
          minHeight="120px"
          disabled={isSubmitting}
        />
        <p className={REVIEW_FORM.HELPER}>{REVIEW_LABELS.contentHelper}</p>
      </div>

      <div className={REVIEW_FORM.FOOTER}>
        <span className={REVIEW_FORM.HELPER}>
          {textLength} {REVIEW_LABELS.charText}
        </span>
        <Button type="submit" disabled={!isFormValid || isSubmitting}>
          {REVIEW_LABELS.submitBtn}
        </Button>
      </div>
    </form>
  );
}

export const ReviewForm = memo(ReviewFormComponent);
