'use client';

import { memo, useState, useCallback, useMemo } from 'react';
import { Review, ReviewReply, ReviewListProps, VoteType } from '@/types/review';
import { Rating, ShowMore } from '@/components/ui';
import { ThumbsUpIcon, ThumbsDownIcon } from '@/components/ui/icons';
import { getAvatarFromName } from '@/utils';
import { formatDate, getRelativeTime } from '@/constants';
import { REVIEW_LIST, REVIEW_CARD, REVIEW_REPLY } from './review.styles';
import { REVIEW_LABELS } from '@/constants/review';

interface ReviewItemInternalProps {
  review: Review;
  onVote?: (reviewId: string, vote: 'up' | 'down') => void;
  onReport?: (reviewId: string) => void;
}

interface ReplyItemProps {
  reply: ReviewReply;
}

const ReplyItem = memo(function ReplyItem({ reply }: ReplyItemProps) {
  const avatarSrc = useMemo(
    () => reply.userAvatar || getAvatarFromName(reply.userName),
    [reply.userAvatar, reply.userName]
  );

  return (
    <div className={REVIEW_REPLY.CARD}>
      <div className={REVIEW_REPLY.HEADER}>
        <img src={avatarSrc} alt={reply.userName} className={REVIEW_REPLY.AVATAR} />
        <span className={REVIEW_REPLY.NAME}>{reply.userName}</span>
        {reply.isInstructor && (
          <span className={REVIEW_REPLY.BADGE}>{REVIEW_LABELS.instructorBadge}</span>
        )}
        <span className={REVIEW_REPLY.DATE}>{getRelativeTime(reply.createdAt)}</span>
      </div>
      <p className={REVIEW_REPLY.CONTENT}>{reply.content}</p>
    </div>
  );
});

const ReviewItemInternal = memo(function ReviewItemInternal({
  review,
  onVote,
  onReport,
}: ReviewItemInternalProps) {
  const [localVote, setLocalVote] = useState<VoteType>(review.userVote ?? null);
  const [localHelpful, setLocalHelpful] = useState(review.helpful);
  const [localNotHelpful, setLocalNotHelpful] = useState(review.notHelpful);

  const avatarSrc = useMemo(
    () => review.userAvatar || getAvatarFromName(review.userName),
    [review.userAvatar, review.userName]
  );

  const handleVote = useCallback((vote: 'up' | 'down') => {
    const updateCounts = (prevVote: VoteType, newVote: VoteType) => {
      if (prevVote === 'up') setLocalHelpful((v) => v - 1);
      if (prevVote === 'down') setLocalNotHelpful((v) => v - 1);
      if (newVote === 'up') setLocalHelpful((v) => v + 1);
      if (newVote === 'down') setLocalNotHelpful((v) => v + 1);
    };

    const newVote = localVote === vote ? null : vote;
    updateCounts(localVote, newVote);
    setLocalVote(newVote);
    onVote?.(review.id, vote);
  }, [localVote, review.id, onVote]);

  const getActionBtnClass = (isActive: boolean): string => {
    return `${REVIEW_CARD.ACTION_BTN} ${isActive ? REVIEW_CARD.ACTION_BTN_ACTIVE : ''}`;
  };

  return (
    <div className={REVIEW_CARD.CONTAINER}>
      <div className={REVIEW_CARD.HEADER}>
        <div className={REVIEW_CARD.USER}>
          <img src={avatarSrc} alt={review.userName} className={REVIEW_CARD.AVATAR} />
          <div className={REVIEW_CARD.USER_INFO}>
            <span className={REVIEW_CARD.NAME}>{review.userName}</span>
            <span className={REVIEW_CARD.DATE} title={formatDate(review.createdAt)}>
              {getRelativeTime(review.createdAt)}
            </span>
          </div>
        </div>
        <Rating value={review.rating} size="sm" showValue={false} showCount={false} />
      </div>

      <p className={REVIEW_CARD.CONTENT}>{review.content}</p>

      <div className={REVIEW_CARD.FOOTER}>
        <div className={REVIEW_CARD.ACTIONS}>
          <button onClick={() => handleVote('up')} className={getActionBtnClass(localVote === 'up')}>
            <ThumbsUpIcon className="w-4 h-4" />
            <span className={REVIEW_CARD.ACTION_COUNT}>{localHelpful}</span>
          </button>
          <button onClick={() => handleVote('down')} className={getActionBtnClass(localVote === 'down')}>
            <ThumbsDownIcon className="w-4 h-4" />
            <span className={REVIEW_CARD.ACTION_COUNT}>{localNotHelpful}</span>
          </button>
        </div>
      </div>

      {review.replies && review.replies.length > 0 && (
        <div className={REVIEW_REPLY.CONTAINER}>
          {review.replies.map((reply) => (
            <ReplyItem key={reply.id} reply={reply} />
          ))}
        </div>
      )}
    </div>
  );
});

const INITIAL_REVIEW_COUNT = 2;
const INCREMENT_REVIEW_COUNT = 10;

function ReviewListComponent({ reviews, onVote, onReport, className = '' }: ReviewListProps) {
  if (reviews.length === 0) {
    return <div className={REVIEW_LIST.EMPTY}>{REVIEW_LABELS.emptyText}</div>;
  }

  return (
    <ShowMore
      initialCount={INITIAL_REVIEW_COUNT}
      incrementCount={INCREMENT_REVIEW_COUNT}
      showText="Xem thêm đánh giá"
      hideText="Thu gọn"
      className={`${REVIEW_LIST.CONTAINER} ${className}`}
    >
      {reviews.map((review) => (
        <ReviewItemInternal
          key={review.id}
          review={review}
          onVote={onVote}
          onReport={onReport}
        />
      ))}
    </ShowMore>
  );
}

export const ReviewList = memo(ReviewListComponent);
