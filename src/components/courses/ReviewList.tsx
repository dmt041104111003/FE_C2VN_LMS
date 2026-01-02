'use client';

import { memo, useState, useCallback, useMemo, useEffect } from 'react';
import type { ReviewListProps, ReplyItemProps, ReplyFormProps, ReviewItemProps } from '@/types/review';
import { Rating, ShowMore, Button } from '@/components/ui';
import { RatingInput } from '@/components/ui/RatingInput';
import { ThumbsUpIcon, ThumbsDownIcon, TrashIcon, EditIcon } from '@/components/ui';
import { TipTapEditor, TipTapPreview } from '@/components/editor';
import { getUserAvatar } from '@/utils';
import { formatDate, getRelativeTime } from '@/constants';
import { REVIEW_LIST, REVIEW_CARD, REVIEW_REPLY, REPLY_FORM, getActionBtnClass } from './review.styles';
import { REVIEW_LABELS, REVIEW_CONFIG, canUserReply } from '@/constants/review';

const stripHtml = (html: string) => html.replace(/<[^>]*>/g, '').trim();
const hasContent = (html: string) => stripHtml(html).length > 0;

const canDelete = (currentUserId?: string, ownerId?: string, instructorId?: string): boolean => {
  if (!currentUserId) return false;
  const isOwner = currentUserId === ownerId;
  const isInstructor = currentUserId === instructorId;
  return isOwner || isInstructor;
};

const canEdit = (currentUserId?: string, ownerId?: string): boolean => {
  if (!currentUserId) return false;
  return currentUserId === ownerId;
};

const ReplyForm = memo(function ReplyForm({ onSubmit, onCancel }: ReplyFormProps) {
  const [content, setContent] = useState('');

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (hasContent(content)) {
      onSubmit(content);
      setContent('');
    }
  }, [content, onSubmit]);

  const isDisabled = !hasContent(content);

  return (
    <form onSubmit={handleSubmit} className={REPLY_FORM.CONTAINER}>
      <TipTapEditor
        content={content}
        onChange={setContent}
        placeholder={REVIEW_LABELS.replyPlaceholder}
        minHeight="80px"
      />
      <div className={REPLY_FORM.ACTIONS}>
        <Button type="button" variant="ghost" size="sm" onClick={onCancel}>
          {REVIEW_LABELS.cancelBtn}
        </Button>
        <Button type="submit" variant="primary" size="sm" disabled={isDisabled}>
          {REVIEW_LABELS.sendBtn}
        </Button>
      </div>
    </form>
  );
});

const DEFAULT_AVATAR = '/loading.png';

interface ExtendedReplyItemProps extends ReplyItemProps {
  showReplyButton?: boolean;
  onShowReplyForm?: () => void;
}

const ReplyItem = memo(function ReplyItem({ reply, currentUserId, instructorId, onVote, onDelete, onEdit, showReplyButton, onShowReplyForm }: ExtendedReplyItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(reply.content);
  const avatarSrc = useMemo(() => {
    if (reply.userAvatar) return reply.userAvatar;
    if (reply.userWalletAddress || reply.userEmail || reply.userName) {
      return getUserAvatar({
        walletAddress: reply.userWalletAddress,
        email: reply.userEmail,
        fullName: reply.userName,
      });
    }
    return DEFAULT_AVATAR;
  }, [reply.userAvatar, reply.userWalletAddress, reply.userEmail, reply.userName]);

  const relativeTime = getRelativeTime(reply.createdAt);
  const isUpVoted = reply.userVote === 'up';
  const isDownVoted = reply.userVote === 'down';
  const showDelete = canDelete(currentUserId, reply.userId, instructorId);
  const showEdit = canEdit(currentUserId, reply.userId);

  const handleUpVote = useCallback(() => onVote?.(reply.id, 'up'), [reply.id, onVote]);
  const handleDownVote = useCallback(() => onVote?.(reply.id, 'down'), [reply.id, onVote]);
  const handleDelete = useCallback(() => onDelete?.(reply.id), [reply.id, onDelete]);
  const handleStartEdit = useCallback(() => {
    setEditContent(reply.content);
    setIsEditing(true);
  }, [reply.content]);
  const handleCancelEdit = useCallback(() => setIsEditing(false), []);
  const handleSaveEdit = useCallback(() => {
    if (hasContent(editContent)) {
      onEdit?.(reply.id, editContent);
      setIsEditing(false);
    }
  }, [reply.id, editContent, onEdit]);

  return (
    <div id={`review-${reply.id}`} className={REVIEW_REPLY.CARD}>
      <div className={REVIEW_REPLY.HEADER}>
        <img src={avatarSrc} alt={reply.userName} className={REVIEW_REPLY.AVATAR} />
        <span className={REVIEW_REPLY.NAME}>{reply.userName}</span>
        {reply.isInstructor && (
          <span className={REVIEW_REPLY.BADGE}>{REVIEW_LABELS.instructorBadge}</span>
        )}
        <span className={REVIEW_REPLY.DATE}>{relativeTime}</span>
      </div>
      {isEditing ? (
        <div className="mt-2 space-y-2">
          <TipTapEditor
            content={editContent}
            onChange={setEditContent}
            placeholder={REVIEW_LABELS.replyPlaceholder}
            minHeight="80px"
          />
          <div className="flex gap-2 justify-end">
            <Button type="button" variant="ghost" size="sm" onClick={handleCancelEdit}>
              {REVIEW_LABELS.cancelBtn}
            </Button>
            <Button type="button" variant="primary" size="sm" onClick={handleSaveEdit} disabled={!hasContent(editContent)}>
              {REVIEW_LABELS.saveBtn}
            </Button>
          </div>
        </div>
      ) : (
        <TipTapPreview content={reply.content} compact inheritColor className={REVIEW_REPLY.CONTENT} />
      )}
      {!isEditing && (
        <div className="flex items-center gap-3 mt-2">
          <button onClick={handleUpVote} className={getActionBtnClass(isUpVoted)}>
            <ThumbsUpIcon className="w-3.5 h-3.5" />
            <span className="text-xs">{reply.helpful}</span>
          </button>
          <button onClick={handleDownVote} className={getActionBtnClass(isDownVoted)}>
            <ThumbsDownIcon className="w-3.5 h-3.5" />
            <span className="text-xs">{reply.notHelpful}</span>
          </button>
          {showEdit && (
            <button onClick={handleStartEdit} className="text-blue-500 hover:text-blue-600 transition-colors" title={REVIEW_LABELS.editBtn}>
              <EditIcon className="w-3.5 h-3.5" />
            </button>
          )}
          {showDelete && (
            <button onClick={handleDelete} className="text-red-500 hover:text-red-600 transition-colors" title={REVIEW_LABELS.deleteBtn}>
              <TrashIcon className="w-3.5 h-3.5" />
            </button>
          )}
          {showReplyButton && (
            <button onClick={onShowReplyForm} className={REPLY_FORM.REPLY_LINK}>
              {REVIEW_LABELS.replyBtn}
            </button>
          )}
        </div>
      )}
    </div>
  );
});

const ReviewItem = memo(function ReviewItem({
  review,
  currentUserId,
  instructorId,
  onVote,
  onReply,
  onDelete,
  onEdit,
}: ReviewItemProps) {
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(review.content);
  const [editRating, setEditRating] = useState(review.rating);

  const avatarSrc = useMemo(() => {
    if (review.userAvatar) return review.userAvatar;
    if (review.userWalletAddress || review.userEmail || review.userName) {
      return getUserAvatar({
        walletAddress: review.userWalletAddress,
        email: review.userEmail,
        fullName: review.userName,
      });
    }
    return DEFAULT_AVATAR;
  }, [review.userAvatar, review.userWalletAddress, review.userEmail, review.userName]);

  const hasInstructorReply = useMemo(
    () => review.replies?.some(r => r.isInstructor) ?? false,
    [review.replies]
  );

  const isReplyAllowed = useMemo(
    () => Boolean(onReply) && canUserReply(currentUserId, review.userId, instructorId, hasInstructorReply),
    [currentUserId, instructorId, review.userId, onReply, hasInstructorReply]
  );

  const showDeleteReview = canDelete(currentUserId, review.userId, instructorId);
  const showEditReview = canEdit(currentUserId, review.userId);

  const handleUpVote = useCallback(() => onVote?.(review.id, 'up'), [review.id, onVote]);
  const handleDownVote = useCallback(() => onVote?.(review.id, 'down'), [review.id, onVote]);
  const handleDeleteReview = useCallback(() => onDelete?.(review.id), [review.id, onDelete]);
  
  const handleStartEdit = useCallback(() => {
    setEditContent(review.content);
    setEditRating(review.rating);
    setIsEditing(true);
  }, [review.content, review.rating]);
  const handleCancelEdit = useCallback(() => setIsEditing(false), []);
  const handleSaveEdit = useCallback(() => {
    if (hasContent(editContent) && editRating > 0) {
      onEdit?.(review.id, editContent, editRating);
      setIsEditing(false);
    }
  }, [review.id, editContent, editRating, onEdit]);

  const handleReplySubmit = useCallback((content: string) => {
    onReply?.(review.id, content);
    setShowReplyForm(false);
  }, [review.id, onReply]);

  const handleShowReplyForm = useCallback(() => setShowReplyForm(true), []);
  const handleHideReplyForm = useCallback(() => setShowReplyForm(false), []);

  const formattedDate = formatDate(review.createdAt);
  const relativeTime = getRelativeTime(review.createdAt);
  const hasReplies = review.replies && review.replies.length > 0;
  const isUpVoted = review.userVote === 'up';
  const isDownVoted = review.userVote === 'down';

  return (
    <div id={`review-${review.id}`} className={REVIEW_CARD.CONTAINER}>
      <div className={REVIEW_CARD.HEADER}>
        <div className={REVIEW_CARD.USER}>
          <img src={avatarSrc} alt={review.userName} className={REVIEW_CARD.AVATAR} />
          <div className={REVIEW_CARD.USER_INFO}>
            <span className={REVIEW_CARD.NAME}>{review.userName}</span>
            <span className={REVIEW_CARD.DATE} title={formattedDate}>
              {relativeTime}
            </span>
          </div>
        </div>
        {!isEditing && <Rating value={review.rating} size="sm" showValue={false} showCount={false} />}
      </div>

      {isEditing ? (
        <div className="mt-3 space-y-3">
          <RatingInput value={editRating} onChange={setEditRating} size="md" />
          <TipTapEditor
            content={editContent}
            onChange={setEditContent}
            placeholder={REVIEW_LABELS.reviewPlaceholder}
            minHeight="100px"
          />
          <div className="flex gap-2 justify-end">
            <Button type="button" variant="ghost" size="sm" onClick={handleCancelEdit}>
              {REVIEW_LABELS.cancelBtn}
            </Button>
            <Button type="button" variant="primary" size="sm" onClick={handleSaveEdit} disabled={!hasContent(editContent) || editRating === 0}>
              {REVIEW_LABELS.saveBtn}
            </Button>
          </div>
        </div>
      ) : (
        <>
          <TipTapPreview content={review.content} compact inheritColor className={REVIEW_CARD.CONTENT} />

          <div className={REVIEW_CARD.FOOTER}>
            <div className={REVIEW_CARD.ACTIONS}>
              <button onClick={handleUpVote} className={getActionBtnClass(isUpVoted)}>
                <ThumbsUpIcon className="w-4 h-4" />
                <span className={REVIEW_CARD.ACTION_COUNT}>{review.helpful}</span>
              </button>
              <button onClick={handleDownVote} className={getActionBtnClass(isDownVoted)}>
                <ThumbsDownIcon className="w-4 h-4" />
                <span className={REVIEW_CARD.ACTION_COUNT}>{review.notHelpful}</span>
              </button>
              {showEditReview && (
                <button onClick={handleStartEdit} className="text-blue-500 hover:text-blue-600 transition-colors ml-2" title={REVIEW_LABELS.editBtn}>
                  <EditIcon className="w-4 h-4" />
                </button>
              )}
              {showDeleteReview && (
                <button onClick={handleDeleteReview} className="text-red-500 hover:text-red-600 transition-colors ml-2" title={REVIEW_LABELS.deleteBtn}>
                  <TrashIcon className="w-4 h-4" />
                </button>
              )}
              {isReplyAllowed && !showReplyForm && !hasReplies && (
                <button onClick={handleShowReplyForm} className={`${REPLY_FORM.REPLY_LINK} ml-2`}>
                  {REVIEW_LABELS.replyBtn}
                </button>
              )}
            </div>
          </div>
        </>
      )}

      {!isEditing && hasReplies && (
        <div className={REVIEW_REPLY.CONTAINER}>
          {review.replies!.map((reply, idx) => (
            <ReplyItem
              key={reply.id}
              reply={reply}
              currentUserId={currentUserId}
              instructorId={instructorId}
              onVote={onVote}
              onDelete={onDelete}
              onEdit={onEdit}
              showReplyButton={idx === review.replies!.length - 1 && isReplyAllowed && !showReplyForm}
              onShowReplyForm={handleShowReplyForm}
            />
          ))}
        </div>
      )}

      {!isEditing && showReplyForm && (
        <ReplyForm onSubmit={handleReplySubmit} onCancel={handleHideReplyForm} />
      )}
    </div>
  );
});

function ReviewListComponent({
  reviews,
  currentUserId,
  instructorId,
  onVote,
  onReport,
  onReply,
  onDelete,
  onEdit,
  className = '',
}: ReviewListProps) {
  
  const targetId = useMemo(() => {
    if (typeof window === 'undefined') return undefined;
    const hash = window.location.hash;
    if (!hash || !hash.startsWith('#review-')) return undefined;
    return hash.slice(1); 
  }, []);

  if (reviews.length === 0) {
    return <div className={REVIEW_LIST.EMPTY}>{REVIEW_LABELS.emptyText}</div>;
  }

  return (
    <ShowMore
      initialCount={REVIEW_CONFIG.INITIAL_DISPLAY_COUNT}
      incrementCount={REVIEW_CONFIG.INCREMENT_COUNT}
      showText={REVIEW_LABELS.showMoreReviews}
      hideText={REVIEW_LABELS.hideReviews}
      className={`${REVIEW_LIST.CONTAINER} ${className}`}
      targetId={targetId}
    >
      {reviews.map((review) => (
        <ReviewItem
          key={review.id}
          review={review}
          currentUserId={currentUserId}
          instructorId={instructorId}
          onVote={onVote}
          onReport={onReport}
          onReply={onReply}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </ShowMore>
  );
}

export const ReviewList = memo(ReviewListComponent);
