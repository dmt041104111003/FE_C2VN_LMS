'use client';

import { memo, useState, useCallback, useEffect, useMemo } from 'react';
import { Button, Dialog, useToast, ShowMore, Loading } from '@/components/ui';
import { ThumbsUpIcon, ThumbsDownIcon, TrashIcon, EditIcon } from '@/components/ui';
import { TipTapEditor, TipTapPreview } from '@/components/editor';
import { getUserAvatar } from '@/utils';
import { useAuth } from '@/hooks';
import { getRelativeTime } from '@/constants';
import {
  getLectureQna,
  createLectureQuestion,
  replyToComment,
  updateComment,
  deleteComment,
  likeComment,
  dislikeComment,
} from '@/services/lecture-qna';
import type { LectureQna, LectureQnaReply, LectureCommentsProps } from '@/types/learning';
import { REVIEW_CARD, REVIEW_REPLY, REVIEW_LIST, REVIEW_FORM, REPLY_FORM, getActionBtnClass } from '@/components/courses/review.styles';

const LABELS = {
  TITLE: 'Hỏi đáp',
  PLACEHOLDER: 'Viết câu hỏi hoặc bình luận...',
  REPLY_PLACEHOLDER: 'Viết phản hồi...',
  SEND: 'Gửi',
  SAVE: 'Lưu',
  CANCEL: 'Hủy',
  REPLY: 'Trả lời',
  EDIT: 'Chỉnh sửa',
  DELETE: 'Thu hồi',
  EMPTY: 'Chưa có câu hỏi nào. Hãy là người đầu tiên đặt câu hỏi!',
  HIDDEN: '[Bình luận đã bị ẩn]',
  LOGIN_REQUIRED: 'Vui lòng đăng nhập để bình luận',
  DELETE_CONFIRM_TITLE: 'Xác nhận xóa',
  DELETE_CONFIRM_MSG: 'Bạn có chắc chắn muốn xóa bình luận này?',
  DELETE_SUCCESS: 'Đã xóa bình luận',
  SEND_SUCCESS: 'Đã gửi bình luận',
  EDIT_SUCCESS: 'Đã cập nhật bình luận',
  ERROR: 'Vui lòng nâng cấp khóa học để đặt câu hỏi và thảo luận thêm',
  SHOW_MORE: 'Xem thêm câu hỏi',
  SHOW_LESS: 'Thu gọn',
} as const;

const DEFAULT_AVATAR = '/loading.png';
const INITIAL_DISPLAY = 2;
const INCREMENT_COUNT = 10;

const stripHtml = (html: string) => html.replace(/<[^>]*>/g, '').trim();
const hasContent = (html: string) => stripHtml(html).length > 0;

interface CommentItemProps {
  comment: LectureQna | LectureQnaReply;
  currentUserId?: string;
  onReply: (commentId: number) => void;
  onDelete: (commentId: number) => void;
  onEdit: (commentId: number, content: string) => void;
  onReact: (commentId: number, type: 'like' | 'dislike') => void;
  replyingTo: number | null;
  replyContent: string;
  onReplyChange: (content: string) => void;
  onSubmitReply: () => void;
  onCancelReply: () => void;
  isNested?: boolean;
  showReplyButton?: boolean;
  canDeleteAll?: boolean; 
}

const CommentItem = memo(function CommentItem({
  comment,
  currentUserId,
  onReply,
  onDelete,
  onEdit,
  onReact,
  replyingTo,
  replyContent,
  onReplyChange,
  onSubmitReply,
  onCancelReply,
  isNested = false,
  showReplyButton = false,
  canDeleteAll = false,
}: CommentItemProps) {
  const isOwner = currentUserId === comment.userId;
  const canDelete = isOwner || canDeleteAll;
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(comment.content);
  
  const avatarSrc = useMemo(() => {
    if (comment.userWalletAddress || comment.userEmail || comment.userName) {
      return getUserAvatar({
        walletAddress: comment.userWalletAddress,
        email: comment.userEmail,
        fullName: comment.userName,
      });
    }
    return DEFAULT_AVATAR;
  }, [comment.userWalletAddress, comment.userEmail, comment.userName]);

  const isHidden = 'visible' in comment && !comment.visible;
  const relativeTime = getRelativeTime(comment.createdAt);
  const likeCount = 'likeCount' in comment ? (comment.likeCount || 0) : 0;
  const dislikeCount = 'dislikeCount' in comment ? (comment.dislikeCount || 0) : 0;
  const userVote = 'userVote' in comment ? comment.userVote : null;
  const isLiked = userVote === 'LIKE';
  const isDisliked = userVote === 'DISLIKE';

  const handleLike = useCallback(() => onReact(comment.id, 'like'), [comment.id, onReact]);
  const handleDislike = useCallback(() => onReact(comment.id, 'dislike'), [comment.id, onReact]);
  const handleStartEdit = useCallback(() => {
    setEditContent(comment.content);
    setIsEditing(true);
  }, [comment.content]);
  const handleCancelEdit = useCallback(() => setIsEditing(false), []);
  const handleSaveEdit = useCallback(() => {
    if (hasContent(editContent)) {
      onEdit(comment.id, editContent);
      setIsEditing(false);
    }
  }, [comment.id, editContent, onEdit]);

  const replies = 'replies' in comment ? comment.replies : [];

  const containerClass = isNested ? REVIEW_REPLY.CARD : REVIEW_CARD.CONTAINER;
  const avatarClass = isNested ? REVIEW_REPLY.AVATAR : REVIEW_CARD.AVATAR;
  const nameClass = isNested ? REVIEW_REPLY.NAME : REVIEW_CARD.NAME;
  const dateClass = isNested ? REVIEW_REPLY.DATE : REVIEW_CARD.DATE;
  const contentClass = isNested ? REVIEW_REPLY.CONTENT : REVIEW_CARD.CONTENT;

  return (
    <div id={`comment-${comment.id}`} className={containerClass}>
      <div className={isNested ? REVIEW_REPLY.HEADER : REVIEW_CARD.HEADER}>
        <div className={REVIEW_CARD.USER}>
          <img src={avatarSrc} alt={comment.userName} className={avatarClass} />
          <div className={REVIEW_CARD.USER_INFO}>
            <span className={nameClass}>{comment.userName}</span>
            <span className={dateClass}>{relativeTime}</span>
          </div>
        </div>
      </div>
      
      {isEditing ? (
        <div className="mt-2 space-y-2">
          <TipTapEditor
            content={editContent}
            onChange={setEditContent}
            placeholder={LABELS.PLACEHOLDER}
            minHeight="80px"
          />
          <div className="flex gap-2 justify-end">
            <Button variant="ghost" size="sm" onClick={handleCancelEdit}>
              {LABELS.CANCEL}
            </Button>
            <Button size="sm" onClick={handleSaveEdit} disabled={!hasContent(editContent)}>
              {LABELS.SAVE}
            </Button>
          </div>
        </div>
      ) : isHidden ? (
        <p className={`${contentClass} italic opacity-50`}>{LABELS.HIDDEN}</p>
      ) : (
        <TipTapPreview content={comment.content} compact inheritColor className={contentClass} />
      )}

      {!isEditing && (
        <div className={isNested ? 'flex items-center gap-3 mt-2' : REVIEW_CARD.ACTIONS}>
          <button onClick={handleLike} className={getActionBtnClass(isLiked)}>
            <ThumbsUpIcon className={isNested ? 'w-3.5 h-3.5' : 'w-4 h-4'} />
            <span className={isNested ? 'text-xs' : REVIEW_CARD.ACTION_COUNT}>{likeCount}</span>
          </button>
          <button onClick={handleDislike} className={getActionBtnClass(isDisliked)}>
            <ThumbsDownIcon className={isNested ? 'w-3.5 h-3.5' : 'w-4 h-4'} />
            <span className={isNested ? 'text-xs' : REVIEW_CARD.ACTION_COUNT}>{dislikeCount}</span>
          </button>

          {isOwner && (
            <button onClick={handleStartEdit} className="text-blue-500 hover:text-blue-600 transition-colors" title={LABELS.EDIT}>
              <EditIcon className={isNested ? 'w-3.5 h-3.5' : 'w-4 h-4'} />
            </button>
          )}

          {canDelete && (
            <button onClick={() => onDelete(comment.id)} className="text-red-500 hover:text-red-600 transition-colors" title={LABELS.DELETE}>
              <TrashIcon className={isNested ? 'w-3.5 h-3.5' : 'w-4 h-4'} />
            </button>
          )}

          {showReplyButton && currentUserId && (
            <button onClick={() => onReply(comment.id)} className={REPLY_FORM.REPLY_LINK}>
              {LABELS.REPLY}
            </button>
          )}
        </div>
      )}

      {replyingTo === comment.id && (
        <div className={REPLY_FORM.CONTAINER}>
          <TipTapEditor
            content={replyContent}
            onChange={onReplyChange}
            placeholder={LABELS.REPLY_PLACEHOLDER}
            minHeight="80px"
          />
          <div className={REPLY_FORM.ACTIONS}>
            <Button variant="ghost" size="sm" onClick={onCancelReply}>
              {LABELS.CANCEL}
            </Button>
            <Button size="sm" onClick={onSubmitReply} disabled={!hasContent(replyContent)}>
              {LABELS.SEND}
            </Button>
          </div>
        </div>
      )}

      {!isEditing && replies && replies.length > 0 && (
        <div className={REVIEW_REPLY.CONTAINER}>
          {replies.map((reply, idx) => (
            <CommentItem
              key={reply.id}
              comment={reply}
              currentUserId={currentUserId}
              onReply={onReply}
              onDelete={onDelete}
              onEdit={onEdit}
              onReact={onReact}
              replyingTo={replyingTo}
              replyContent={replyContent}
              onReplyChange={onReplyChange}
              onSubmitReply={onSubmitReply}
              onCancelReply={onCancelReply}
              isNested
              showReplyButton={idx === replies.length - 1}
              canDeleteAll={canDeleteAll}
            />
          ))}
        </div>
      )}
    </div>
  );
});

function LectureCommentsComponent({ lectureId, isInstructor = false }: LectureCommentsProps) {
  const { user, isAuthenticated } = useAuth();
  const toast = useToast();
  const [comments, setComments] = useState<LectureQna[]>([]);
  const [loading, setLoading] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [replyingTo, setReplyingTo] = useState<number | null>(null);
  const [replyContent, setReplyContent] = useState('');
  const [deleteTarget, setDeleteTarget] = useState<number | null>(null);

  const fetchComments = useCallback(async () => {
    if (!lectureId) return;
    setLoading(true);
    try {
      const data = await getLectureQna(lectureId);
      setComments(data);
    } catch {
      
    } finally {
      setLoading(false);
    }
  }, [lectureId]);

  useEffect(() => {
    fetchComments();
  }, [fetchComments]);

  
  const targetId = useMemo(() => {
    if (typeof window === 'undefined') return undefined;
    const hash = window.location.hash;
    if (!hash || !hash.startsWith('#comment-')) return undefined;
    return hash.slice(1); 
  }, []);

  const handleSubmitComment = useCallback(async () => {
    if (!hasContent(newComment) || !isAuthenticated) {
      if (!isAuthenticated) toast.error(LABELS.LOGIN_REQUIRED);
      return;
    }
    try {
      const created = await createLectureQuestion(lectureId, newComment);
      setComments((prev) => [...prev, created]);
      setNewComment('');
      toast.success(LABELS.SEND_SUCCESS);
    } catch {
      toast.error(LABELS.ERROR);
    }
  }, [newComment, isAuthenticated, lectureId, toast]);

  const handleReply = useCallback((commentId: number) => {
    setReplyingTo(commentId);
    setReplyContent('');
  }, []);

  const handleCancelReply = useCallback(() => {
    setReplyingTo(null);
    setReplyContent('');
  }, []);

  const handleSubmitReply = useCallback(async () => {
    if (!replyingTo || !hasContent(replyContent)) return;
    try {
      const reply = await replyToComment(replyingTo, replyContent);
      setComments((prev) =>
        prev.map((c) =>
          c.id === replyingTo ? { ...c, replies: [...(c.replies || []), reply] } : c
        )
      );
      handleCancelReply();
      toast.success(LABELS.SEND_SUCCESS);
    } catch {
      toast.error(LABELS.ERROR);
    }
  }, [replyingTo, replyContent, toast, handleCancelReply]);

  const handleDeleteConfirm = useCallback(async () => {
    if (!deleteTarget) return;
    try {
      await deleteComment(deleteTarget);
      setComments((prev) => {
        const filterReplies = (list: LectureQna[]): LectureQna[] =>
          list
            .filter((c) => c.id !== deleteTarget)
            .map((c) => ({
              ...c,
              replies: c.replies?.filter((r) => r.id !== deleteTarget) || [],
            }));
        return filterReplies(prev);
      });
      toast.success(LABELS.DELETE_SUCCESS);
    } catch {
      toast.error(LABELS.ERROR);
    } finally {
      setDeleteTarget(null);
    }
  }, [deleteTarget, toast]);

  const handleEdit = useCallback(async (commentId: number, content: string) => {
    try {
      const updated = await updateComment(commentId, content);
      setComments((prev) =>
        prev.map((c) => {
          if (c.id === commentId) {
            return { ...c, content: updated.content };
          }
          if (c.replies) {
            const updatedReplies = c.replies.map((r) =>
              r.id === commentId ? { ...r, content: updated.content } : r
            );
            return { ...c, replies: updatedReplies };
          }
          return c;
        })
      );
      toast.success(LABELS.EDIT_SUCCESS);
    } catch {
      toast.error(LABELS.ERROR);
    }
  }, [toast]);

  const updateReaction = useCallback((
    comments: LectureQna[],
    commentId: number,
    type: 'like' | 'dislike',
    currentVote: 'LIKE' | 'DISLIKE' | null
  ): LectureQna[] => {
    const newVote: 'LIKE' | 'DISLIKE' = type === 'like' ? 'LIKE' : 'DISLIKE';
    const isSameVote = currentVote === newVote;
    
    return comments.map((c) => {
      if (c.id === commentId) {
        let likeCount = c.likeCount || 0;
        let dislikeCount = c.dislikeCount || 0;
        
        
        if (currentVote === 'LIKE') likeCount--;
        if (currentVote === 'DISLIKE') dislikeCount--;
        
        
        if (!isSameVote) {
          if (type === 'like') likeCount++;
          if (type === 'dislike') dislikeCount++;
        }
        
        return {
          ...c,
          likeCount: Math.max(0, likeCount),
          dislikeCount: Math.max(0, dislikeCount),
          userVote: isSameVote ? null : newVote,
        };
      }
      if (c.replies) {
        const updatedReplies = c.replies.map((r) => {
          if (r.id === commentId) {
            let likeCount = r.likeCount || 0;
            let dislikeCount = r.dislikeCount || 0;
            
            if (currentVote === 'LIKE') likeCount--;
            if (currentVote === 'DISLIKE') dislikeCount--;
            
            if (!isSameVote) {
              if (type === 'like') likeCount++;
              if (type === 'dislike') dislikeCount++;
            }
            
            return {
              ...r,
              likeCount: Math.max(0, likeCount),
              dislikeCount: Math.max(0, dislikeCount),
              userVote: isSameVote ? null : newVote,
            };
          }
          return r;
        });
        return { ...c, replies: updatedReplies };
      }
      return c;
    });
  }, []);

  const handleReact = useCallback(async (commentId: number, type: 'like' | 'dislike') => {
    
    let currentVote: 'LIKE' | 'DISLIKE' | null = null;
    for (const c of comments) {
      if (c.id === commentId) {
        currentVote = c.userVote || null;
        break;
      }
      const reply = c.replies?.find((r) => r.id === commentId);
      if (reply) {
        currentVote = reply.userVote || null;
        break;
      }
    }
    
    
    setComments((prev) => updateReaction(prev, commentId, type, currentVote));
    
    try {
      if (type === 'like') {
        await likeComment(commentId);
      } else {
        await dislikeComment(commentId);
      }
    } catch {
      
      const reverseType = type === 'like' ? 'dislike' : 'like';
      setComments((prev) => updateReaction(prev, commentId, reverseType, currentVote === null ? (type === 'like' ? 'LIKE' : 'DISLIKE') : null));
    }
  }, [comments, updateReaction]);

  const userAvatar = useMemo(() => getUserAvatar({
    walletAddress: user?.walletAddress,
    email: user?.email,
    fullName: user?.fullName,
  }), [user?.walletAddress, user?.email, user?.fullName]);

  const totalCount = comments.reduce((sum, c) => sum + 1 + (c.replies?.length || 0), 0);


  return (
    <div className="space-y-3 sm:space-y-4">
      <div className="flex items-center gap-2">
        <h3 className="text-sm sm:text-base font-semibold text-[var(--text)]">{LABELS.TITLE}</h3>
        <span className="text-xs sm:text-sm text-[var(--text)]/50">({totalCount})</span>
      </div>

      {isAuthenticated && (
        <div className={REVIEW_FORM.CONTAINER}>
          <div className="flex gap-2 sm:gap-3">
            <img src={userAvatar} alt="Avatar" className={REVIEW_CARD.AVATAR} />
            <div className="flex-1 space-y-2 sm:space-y-3 min-w-0">
              <TipTapEditor
                content={newComment}
                onChange={setNewComment}
                placeholder={LABELS.PLACEHOLDER}
                minHeight="80px"
              />
              <div className="flex justify-end">
                <Button 
                  size="sm" 
                  onClick={handleSubmitComment} 
                  disabled={!hasContent(newComment)}
                  className="px-6 rounded"
                >
                  {LABELS.SEND}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {loading ? (
        <div className="py-8">
          <Loading size="md" text="Đang tải bình luận..." />
        </div>
      ) : comments.length === 0 ? (
        <div className={REVIEW_LIST.EMPTY}>{LABELS.EMPTY}</div>
      ) : (
        <ShowMore
          initialCount={INITIAL_DISPLAY}
          incrementCount={INCREMENT_COUNT}
          showText={LABELS.SHOW_MORE}
          hideText={LABELS.SHOW_LESS}
          className={REVIEW_LIST.CONTAINER}
          targetId={targetId}
        >
          {comments.map((comment) => (
            <CommentItem
              key={comment.id}
              comment={comment}
              currentUserId={user?.id}
              onReply={handleReply}
              onDelete={setDeleteTarget}
              onEdit={handleEdit}
              onReact={handleReact}
              replyingTo={replyingTo}
              replyContent={replyContent}
              onReplyChange={setReplyContent}
              onSubmitReply={handleSubmitReply}
              onCancelReply={handleCancelReply}
              showReplyButton={!comment.replies || comment.replies.length === 0}
              canDeleteAll={isInstructor}
            />
          ))}
        </ShowMore>
      )}

      <Dialog
        isOpen={!!deleteTarget}
        title={LABELS.DELETE_CONFIRM_TITLE}
        message={LABELS.DELETE_CONFIRM_MSG}
        primaryText={LABELS.DELETE}
        secondaryText={LABELS.CANCEL}
        danger
        onPrimary={handleDeleteConfirm}
        onSecondary={() => setDeleteTarget(null)}
      />
    </div>
  );
}

export const LectureComments = memo(LectureCommentsComponent);
