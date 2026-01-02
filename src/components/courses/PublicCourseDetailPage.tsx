'use client';

import { useEffect, useState, useCallback } from 'react';
import { useParams } from 'next/navigation';
import { Header, Footer, Dialog, useToast } from '@/components/ui';
import { CourseDetail } from './CourseDetail';
import { HEADER_SPACER } from '@/components/ui/ui.styles';
import type { Course } from '@/types/course';
import type { Review, ReviewFormData, ReviewStats } from '@/types/review';
import { courseService, getMyEnrollments, getFeedbacks, addFeedback, addReply, reactToFeedback, deleteFeedback } from '@/services/course';
import { useAuth } from '@/hooks';
import { 
  mapApiToCourse, 
  DEFAULT_REVIEW_STATS, 
  mapFeedbacksToReviews, 
  calculateReviewStats 
} from '@/utils/course-mapper';
import { getUserAvatar } from '@/utils/avatar';

const DELETE_DIALOG = {
  title: 'Xác nhận thu hồi',
  message: 'Bạn có chắc chắn muốn thu hồi nội dung này? Hành động này không thể hoàn tác.',
  primaryText: 'Thu hồi',
  secondaryText: 'Hủy',
};

export function PublicCourseDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const { user, isAuthenticated } = useAuth();
  const toast = useToast();
  const [course, setCourse] = useState<Course | null>(null);
  const [notFoundError, setNotFoundError] = useState(false);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [reviewStats, setReviewStats] = useState<ReviewStats>(DEFAULT_REVIEW_STATS);
  const [isSubmittingReview, setIsSubmittingReview] = useState(false);
  const [instructorId, setInstructorId] = useState<string | undefined>();
  const [hasReviewed, setHasReviewed] = useState(false);
  const [deleteModalId, setDeleteModalId] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) return;

    const fetchCourse = async () => {
      try {
        const data = await courseService.getCourseBySlug(slug, user?.id) as Record<string, unknown>;
        const courseId = String(data.id || '');
        const instId = data.instructorId ? String(data.instructorId) : undefined;
        setInstructorId(instId);

        if (isAuthenticated && courseId) {
          try {
            const enrollments = await getMyEnrollments();
            const enrollment = enrollments.find(e => e.courseId === courseId);
            if (enrollment) {
              setIsEnrolled(true);
              setProgress(enrollment.progressPercent || 0);
            }
          } catch {}
        }

        if (courseId) {
          try {
            const feedbacks = await getFeedbacks(courseId);
            const mappedReviews = mapFeedbacksToReviews(feedbacks, instId, user);
            setReviews(mappedReviews);
            setReviewStats(calculateReviewStats(mappedReviews));
            
            if (user?.id) {
              setHasReviewed(mappedReviews.some(r => r.userId === user.id));
            }
          } catch {}
        }

        setCourse(mapApiToCourse(data));
      } catch {
        setNotFoundError(true);
      }
    };

    fetchCourse();
  }, [slug, user?.id, isAuthenticated]);

  const handleSubmitReview = useCallback(async (data: ReviewFormData) => {
    if (!course?.id) return;
    
    setIsSubmittingReview(true);
    try {
      const response = await addFeedback(course.id, {
        rate: data.rating,
        content: data.content,
      });

      const newReview: Review = {
        id: String(response.id),
        odaId: response.id,
        userId: response.userId,
        userName: response.fullName,
        userAvatar: getUserAvatar(user),
        rating: response.rate || 0,
        content: response.content,
        createdAt: response.createdAt,
        helpful: 0,
        notHelpful: 0,
        replies: [],
      };

      setReviews(prev => [newReview, ...prev]);
      setReviewStats(calculateReviewStats([newReview, ...reviews]));
      setHasReviewed(true);
    } catch {
      toast.error('Gửi đánh giá thất bại');
    } finally {
      setIsSubmittingReview(false);
    }
  }, [course?.id, reviews]);

  const handleReply = useCallback(async (reviewId: string, content: string) => {
    if (!course?.id) return;

    try {
      const response = await addReply(course.id, Number(reviewId), content);
      
      setReviews(prev => prev.map(review => {
        if (review.id === reviewId) {
          return {
            ...review,
            replies: [
              ...(review.replies || []),
              {
                id: String(response.id),
                userId: response.userId,
                userName: response.fullName,
                userAvatar: getUserAvatar(user),
                content: response.content,
                createdAt: response.createdAt,
                isInstructor: response.userId === instructorId,
                helpful: 0,
                notHelpful: 0,
              }
            ]
          };
        }
        return review;
      }));
    } catch {
      toast.error('Gửi phản hồi thất bại');
    }
  }, [course?.id, instructorId, toast]);

  const handleVote = useCallback(async (feedbackId: string, vote: 'up' | 'down') => {
    if (!isAuthenticated) {
      toast.warning('Vui lòng đăng nhập để bày tỏ cảm xúc');
      return;
    }

    try {
      const reactionType = vote === 'up' ? 'LIKE' : 'DISLIKE';
      const response = await reactToFeedback(Number(feedbackId), reactionType);
      
      const userVote: 'up' | 'down' | null = response.userReaction === 'LIKE' ? 'up' 
        : response.userReaction === 'DISLIKE' ? 'down' 
        : null;

      setReviews(prev => prev.map(review => {
        if (String(review.id) === feedbackId) {
          return {
            ...review,
            helpful: response.likeCount || 0,
            notHelpful: response.dislikeCount || 0,
            userVote,
          };
        }
        
        if (review.replies) {
          const updatedReplies = review.replies.map(reply => {
            if (String(reply.id) === feedbackId) {
              return {
                ...reply,
                helpful: response.likeCount || 0,
                notHelpful: response.dislikeCount || 0,
                userVote,
              };
            }
            return reply;
          });
          return { ...review, replies: updatedReplies };
        }
        
        return review;
      }));
    } catch {
      toast.error('Thao tác thất bại');
    }
  }, [isAuthenticated, toast]);

  const handleDeleteClick = useCallback((feedbackId: string) => {
    if (!isAuthenticated) {
      toast.warning('Vui lòng đăng nhập');
      return;
    }
    setDeleteModalId(feedbackId);
  }, [isAuthenticated, toast]);

  const handleDeleteConfirm = useCallback(async () => {
    if (!deleteModalId) return;

    try {
      await deleteFeedback(Number(deleteModalId));
      
      const deletedReview = reviews.find(r => r.id === deleteModalId);
      const isOwnReview = deletedReview && deletedReview.userId === user?.id;
      
      setReviews(prev => {
        const filtered = prev.filter(review => review.id !== deleteModalId);
        
        const updated = filtered.map(review => {
          if (review.replies) {
            const filteredReplies = review.replies.filter(reply => reply.id !== deleteModalId);
            return { ...review, replies: filteredReplies };
          }
          return review;
        });
        
        setReviewStats(calculateReviewStats(updated));
        
        return updated;
      });
      
      if (isOwnReview) {
        setHasReviewed(false);
      }
      
      toast.success('Đã thu hồi thành công');
    } catch {
      toast.error('Không thể thu hồi');
    } finally {
      setDeleteModalId(null);
    }
  }, [deleteModalId, toast, reviews, user?.id]);

  const handleDeleteCancel = useCallback(() => {
    setDeleteModalId(null);
  }, []);

  if (notFoundError || !course) {
    return (
      <>
        <Header />
        <div className={HEADER_SPACER} />
        <main className="min-h-screen flex items-center justify-center">
          <p className="text-[var(--text)]/50">Không tìm thấy khóa học</p>
        </main>
        <Footer />
      </>
    );
  }

  const canReview = isEnrolled && !hasReviewed;

  return (
    <>
      <Header />
      <div className={HEADER_SPACER} />
      <main>
        <CourseDetail
          course={course}
          reviews={reviews}
          reviewStats={reviewStats}
          isEnrolled={isEnrolled}
          progress={progress}
          canReview={canReview}
          currentUserId={user?.id}
          instructorId={instructorId}
          onSubmitReview={handleSubmitReview}
          onReply={handleReply}
          onVote={handleVote}
          onDelete={handleDeleteClick}
          isSubmittingReview={isSubmittingReview}
        />
      </main>
      <Footer />
      <Dialog
        isOpen={deleteModalId !== null}
        title={DELETE_DIALOG.title}
        message={DELETE_DIALOG.message}
        primaryText={DELETE_DIALOG.primaryText}
        secondaryText={DELETE_DIALOG.secondaryText}
        danger
        onPrimary={handleDeleteConfirm}
        onSecondary={handleDeleteCancel}
      />
    </>
  );
}
