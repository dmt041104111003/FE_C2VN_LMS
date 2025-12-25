export interface ReviewReply {
  id: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  content: string;
  createdAt: string;
  isInstructor?: boolean;
}

export interface Review {
  id: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  rating: number;
  content: string;
  createdAt: string;
  helpful: number;
  notHelpful: number;
  userVote?: 'up' | 'down' | null;
  replies?: ReviewReply[];
}

export interface ReviewFormData {
  rating: number;
  content: string;
}

export interface ReviewStats {
  average: number;
  total: number;
  distribution: {
    5: number;
    4: number;
    3: number;
    2: number;
    1: number;
  };
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
  onVote?: (reviewId: string, vote: 'up' | 'down') => void;
  onReport?: (reviewId: string) => void;
  className?: string;
}

export interface ReviewSectionProps {
  stats: ReviewStats;
  reviews: Review[];
  canReview?: boolean;
  onSubmitReview?: (data: ReviewFormData) => void;
  onVote?: (reviewId: string, vote: 'up' | 'down') => void;
  onReport?: (reviewId: string) => void;
  isSubmitting?: boolean;
  className?: string;
}

export interface RatingInputProps {
  value: number;
  onChange: (value: number) => void;
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  className?: string;
}

export type VoteType = 'up' | 'down' | null;

