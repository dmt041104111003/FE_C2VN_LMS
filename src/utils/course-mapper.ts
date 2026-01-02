import type { ApiLecture, ApiTest, ApiChapter, Lecture, CourseTest, Chapter, Course, CoursePaymentMethod } from '@/types/course';
import type { Review, ReviewReply, ReviewStats } from '@/types/review';
import type { FeedbackResponse } from '@/services/course';
import { getUserAvatar } from './avatar';

export const EMPTY_REVIEWS: Review[] = [];

export const DEFAULT_REVIEW_STATS: ReviewStats = {
  average: 0,
  total: 0,
  distribution: { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 },
};

interface CurrentUser {
  id?: string;
  walletAddress?: string;
  email?: string;
  fullName?: string;
}

const DEFAULT_AVATAR = '/loading.png';

function getAvatarForFeedback(feedback: FeedbackResponse, currentUser?: CurrentUser | null): string {
  if (currentUser?.id && feedback.userId === currentUser.id) {
    if (currentUser.walletAddress || currentUser.email || currentUser.fullName) {
      return getUserAvatar(currentUser);
    }
    return DEFAULT_AVATAR;
  }
  if (feedback.userWalletAddress || feedback.userEmail || feedback.fullName) {
    return getUserAvatar({
      walletAddress: feedback.userWalletAddress,
      email: feedback.userEmail,
      fullName: feedback.fullName,
    });
  }
  return DEFAULT_AVATAR;
}

export function mapFeedbackToReply(
  feedback: FeedbackResponse, 
  instructorId?: string,
  currentUser?: CurrentUser | null
): ReviewReply {
  const userVote = feedback.userReaction === 'LIKE' ? 'up' 
    : feedback.userReaction === 'DISLIKE' ? 'down' 
    : undefined;

  return {
    id: String(feedback.id),
    odaId: feedback.id,
    userId: feedback.userId,
    userName: feedback.fullName,
    userEmail: feedback.userEmail,
    userWalletAddress: feedback.userWalletAddress,
    userAvatar: getAvatarForFeedback(feedback, currentUser),
    content: feedback.content,
    createdAt: feedback.createdAt,
    isInstructor: feedback.userId === instructorId,
    helpful: feedback.likeCount || 0,
    notHelpful: feedback.dislikeCount || 0,
    userVote,
  };
}

export function mapFeedbackToReview(
  feedback: FeedbackResponse, 
  instructorId?: string,
  currentUser?: CurrentUser | null
): Review {
  const userVote = feedback.userReaction === 'LIKE' ? 'up' 
    : feedback.userReaction === 'DISLIKE' ? 'down' 
    : null;

  return {
    id: String(feedback.id),
    odaId: feedback.id,
    userId: feedback.userId,
    userName: feedback.fullName,
    userEmail: feedback.userEmail,
    userWalletAddress: feedback.userWalletAddress,
    userAvatar: getAvatarForFeedback(feedback, currentUser),
    rating: feedback.rate || 0,
    content: feedback.content,
    createdAt: feedback.createdAt,
    helpful: feedback.likeCount || 0,
    notHelpful: feedback.dislikeCount || 0,
    userVote,
    replies: feedback.replies?.map(r => mapFeedbackToReply(r, instructorId, currentUser)) || [],
  };
}

export function mapFeedbacksToReviews(
  feedbacks: FeedbackResponse[], 
  instructorId?: string,
  currentUser?: CurrentUser | null
): Review[] {
  return feedbacks.map(f => mapFeedbackToReview(f, instructorId, currentUser));
}

export function calculateReviewStats(reviews: Review[]): ReviewStats {
  if (reviews.length === 0) return DEFAULT_REVIEW_STATS;

  const distribution = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
  let totalRating = 0;

  for (const review of reviews) {
    const rating = Math.min(5, Math.max(1, Math.round(review.rating)));
    distribution[rating as keyof typeof distribution]++;
    totalRating += review.rating;
  }

  return {
    average: totalRating / reviews.length,
    total: reviews.length,
    distribution,
  };
}

export function mapLecture(l: ApiLecture, idx: number): Lecture {
  return {
    id: String(l.id || idx),
    title: String(l.title || ''),
    duration: Number(l.time) || 0,
    isPreview: Boolean(l.previewFree),
    orderIndex: Number(l.orderIndex) || idx,
    videoUrl: l.videoUrl,
  };
}

export function mapTest(t: ApiTest): CourseTest {
  return {
    id: Number(t.id) || 0,
    title: String(t.title || ''),
    durationMinutes: t.durationMinutes,
    passScore: t.passScore,
    questionCount: Array.isArray(t.questions) ? t.questions.length : 0,
  };
}

export function mapChapter(ch: ApiChapter, idx: number): Chapter {
  return {
    id: String(ch.id || idx),
    title: String(ch.title || ''),
    orderIndex: Number(ch.orderIndex) || idx,
    lectures: Array.isArray(ch.lectures)
      ? ch.lectures.map((l, i) => mapLecture(l, i))
      : [],
    tests: Array.isArray(ch.tests)
      ? ch.tests.map(t => mapTest(t))
      : [],
  };
}

export function mapPaymentMethods(
  data: Array<{ id?: number | string; paymentMethod?: { name?: string }; receiverAddress?: string }> | undefined
): CoursePaymentMethod[] {
  if (!Array.isArray(data)) return [];
  return data.map(pm => ({
    id: String(pm.id || ''),
    paymentMethod: { name: String(pm.paymentMethod?.name || '') },
    receiverAddress: String(pm.receiverAddress || ''),
  }));
}

export function mapApiToCourse(data: Record<string, unknown>): Course {
  const chapters: Chapter[] = Array.isArray(data.chapters)
    ? (data.chapters as ApiChapter[]).map((ch, i) => mapChapter(ch, i))
    : [];

  const courseTests: CourseTest[] = Array.isArray(data.courseTests)
    ? (data.courseTests as ApiTest[]).map(t => mapTest(t))
    : [];

  const totalLessons = chapters.reduce((acc, ch) => acc + ch.lectures.length, 0);

  const coursePaymentMethods = mapPaymentMethods(
    data.coursePaymentMethods as Array<{ id?: number | string; paymentMethod?: { name?: string }; receiverAddress?: string }> | undefined
  );

  const instructorEmail = data.instructorEmail ? String(data.instructorEmail) : undefined;
  const instructorWalletAddress = data.instructorWalletAddress ? String(data.instructorWalletAddress) : undefined;
  const instructorName = String(data.instructorName || '');
  
  const instructorAvatar = (instructorWalletAddress || instructorEmail || instructorName)
    ? getUserAvatar({ walletAddress: instructorWalletAddress, email: instructorEmail, fullName: instructorName })
    : '/loading.png';

  return {
    id: String(data.id || data.slug || ''),
    slug: String(data.slug || ''),
    title: String(data.title || ''),
    description: String(data.description || ''),
    videoUrl: data.videoUrl ? String(data.videoUrl) : undefined,
    price: Number(data.price) || 0,
    currency: 'ADA',
    discount: data.discount != null ? Number(data.discount) : undefined,
    discountEndTime: data.discountEndTime ? String(data.discountEndTime) : undefined,
    instructorId: data.instructorId ? String(data.instructorId) : undefined,
    instructorName,
    instructorBio: data.instructorBio ? String(data.instructorBio) : undefined,
    instructorEmail,
    instructorWalletAddress,
    instructorAvatar,
    totalLessons,
    totalStudents: Number(data.numOfStudents) || 0,
    rating: data.rating != null ? Number(data.rating) : undefined,
    tags: Array.isArray(data.courseTags)
      ? (data.courseTags as { name?: string }[]).map(t => String(t.name || ''))
      : [],
    status: data.draft ? 'DRAFT' : 'PUBLISHED',
    createdAt: String(data.createdAt || ''),
    thumbnail: data.imageUrl ? String(data.imageUrl) : undefined,
    chapters,
    courseTests,
    coursePaymentMethods,
  };
}

