import type { RatingValue, RatingSize } from '@/types/review';

export const REVIEW_LABELS = {
  sectionTitle: 'Đánh giá từ học viên',
  ratingLabel: 'Đánh giá của bạn',
  contentLabel: 'Nhận xét',
  contentPlaceholder: 'Chia sẻ trải nghiệm của bạn về khóa học này...',
  reviewPlaceholder: 'Chia sẻ trải nghiệm của bạn về khóa học này...',
  contentHelper: 'Tối thiểu 10 ký tự',
  submitBtn: 'Gửi đánh giá',
  emptyText: 'Chưa có đánh giá nào. Hãy là người đầu tiên!',
  reviewsText: 'đánh giá',
  starText: 'sao',
  charText: 'ký tự',
  helpfulText: 'người thấy hữu ích',
  instructorBadge: 'Giảng viên',
  replyBtn: 'Phản hồi',
  replyPlaceholder: 'Nhập phản hồi...',
  cancelBtn: 'Hủy',
  sendBtn: 'Gửi',
  saveBtn: 'Lưu',
  editBtn: 'Chỉnh sửa',
  deleteBtn: 'Thu hồi',
  showMoreReviews: 'Xem thêm đánh giá',
  hideReviews: 'Thu gọn',
} as const;

export const RATING_LABELS: Record<RatingValue, string> = {
  1: 'Rất tệ',
  2: 'Tệ',
  3: 'Bình thường',
  4: 'Tốt',
  5: 'Xuất sắc',
} as const;

export const RATING_SIZE_MAP: Record<RatingSize, string> = {
  sm: 'w-5 h-5',
  md: 'w-6 h-6',
  lg: 'w-8 h-8',
} as const;

export const REVIEW_CONFIG = {
  MIN_CONTENT_LENGTH: 10,
  INITIAL_DISPLAY_COUNT: 2,
  INCREMENT_COUNT: 10,
  STARS: [1, 2, 3, 4, 5] as const,
  STAR_ORDER: [5, 4, 3, 2, 1] as const,
  MIN_BAR_DENOMINATOR: 1,
  PERCENTAGE_MULTIPLIER: 100,
} as const;

export const isValidRating = (rating: number): rating is RatingValue => {
  return rating >= 1 && rating <= 5 && Number.isInteger(rating);
};

export const isValidContent = (content: string): boolean => {
  return content.trim().length >= REVIEW_CONFIG.MIN_CONTENT_LENGTH;
};

export const calculatePercentage = (count: number, max: number): number => {
  const denominator = Math.max(max, REVIEW_CONFIG.MIN_BAR_DENOMINATOR);
  return (count / denominator) * REVIEW_CONFIG.PERCENTAGE_MULTIPLIER;
};

export const canUserReply = (
  currentUserId: string | undefined,
  reviewUserId: string,
  instructorId: string | undefined,
  hasInstructorReply: boolean = false
): boolean => {
  if (!currentUserId) return false;
  if (currentUserId === instructorId) return true;
  if (currentUserId === reviewUserId && hasInstructorReply) return true;
  return false;
};
