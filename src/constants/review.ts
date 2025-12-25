export const REVIEW_LABELS = {
  sectionTitle: 'Đánh giá từ học viên',
  ratingLabel: 'Đánh giá của bạn',
  contentLabel: 'Nhận xét',
  contentPlaceholder: 'Chia sẻ trải nghiệm của bạn về khóa học này...',
  contentHelper: 'Tối thiểu 10 ký tự',
  submitBtn: 'Gửi đánh giá',
  submittingBtn: 'Đang gửi...',
  emptyText: 'Chưa có đánh giá nào. Hãy là người đầu tiên!',
  reviewsText: 'đánh giá',
  starText: 'sao',
  charText: 'ký tự',
  helpfulText: 'người thấy hữu ích',
  instructorBadge: 'Giảng viên',
} as const;

export const RATING_LABELS: Record<number, string> = {
  1: 'Rất tệ',
  2: 'Tệ',
  3: 'Bình thường',
  4: 'Tốt',
  5: 'Xuất sắc',
} as const;

export const REVIEW_CONFIG = {
  MIN_CONTENT_LENGTH: 10,
  STARS: [1, 2, 3, 4, 5] as const,
  STAR_ORDER: [5, 4, 3, 2, 1] as const,
} as const;

