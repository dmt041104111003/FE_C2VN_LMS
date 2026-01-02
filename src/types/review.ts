export type VoteType = 'up' | 'down' | null;
export type RatingValue = 1 | 2 | 3 | 4 | 5;
export type RatingSize = 'sm' | 'md' | 'lg';

export interface ReviewReply {
  id: string;
  odaId?: number;
  userId: string;
  userName: string;
  userEmail?: string;
  userWalletAddress?: string;
  userAvatar?: string;
  content: string;
  createdAt: string;
  isInstructor?: boolean;
  helpful: number;
  notHelpful: number;
  userVote?: VoteType;
}

export interface Review {
  id: string;
  odaId?: number;
  userId: string;
  userName: string;
  userEmail?: string;
  userWalletAddress?: string;
  userAvatar?: string;
  rating: number;
  content: string;
  createdAt: string;
  helpful: number;
  notHelpful: number;
  userVote?: VoteType;
  replies?: ReviewReply[];
}

export interface ReviewFormData {
  rating: number;
  content: string;
}

export interface ReplyFormData {
  content: string;
}

export interface ReviewDistribution {
  5: number;
  4: number;
  3: number;
  2: number;
  1: number;
}

export interface ReviewStats {
  average: number;
  total: number;
  distribution: ReviewDistribution;
}

export interface ReviewFormProps {
  onSubmit: (data: ReviewFormData) => void;
  isSubmitting?: boolean;
  className?: string;
}

export interface ReviewStatsProps {
  stats: ReviewStats;
  className?: string;
}

export interface ReviewListProps {
  reviews: Review[];
  currentUserId?: string;
  instructorId?: string;
  onVote?: (reviewId: string, vote: 'up' | 'down') => void;
  onReport?: (reviewId: string) => void;
  onReply?: (reviewId: string, content: string) => void;
  onDelete?: (feedbackId: string) => void;
  onEdit?: (feedbackId: string, content: string, rating?: number) => void;
  className?: string;
}

export interface ReviewSectionProps {
  stats: ReviewStats;
  reviews: Review[];
  canReview?: boolean;
  currentUserId?: string;
  instructorId?: string;
  onSubmitReview?: (data: ReviewFormData) => void;
  onVote?: (reviewId: string, vote: 'up' | 'down') => void;
  onReport?: (reviewId: string) => void;
  onReply?: (reviewId: string, content: string) => void;
  onDelete?: (feedbackId: string) => void;
  onEdit?: (feedbackId: string, content: string, rating?: number) => void;
  isSubmitting?: boolean;
  className?: string;
}

export interface RatingInputProps {
  value: number;
  onChange: (value: number) => void;
  size?: RatingSize;
  disabled?: boolean;
  className?: string;
}

export interface ReplyItemProps {
  reply: ReviewReply;
  currentUserId?: string;
  instructorId?: string;
  onVote?: (replyId: string, vote: 'up' | 'down') => void;
  onDelete?: (replyId: string) => void;
  onEdit?: (replyId: string, content: string) => void;
}

export interface ReplyFormProps {
  onSubmit: (content: string) => void;
  onCancel: () => void;
}

export interface ReviewItemProps {
  review: Review;
  currentUserId?: string;
  instructorId?: string;
  onVote?: (reviewId: string, vote: 'up' | 'down') => void;
  onReport?: (reviewId: string) => void;
  onReply?: (reviewId: string, content: string) => void;
  onDelete?: (feedbackId: string) => void;
  onEdit?: (feedbackId: string, content: string, rating?: number) => void;
}
