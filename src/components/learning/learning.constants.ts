export const LESSON_PREFIX = {
  LECTURE: 'lecture-',
  TEST: 'test-',
} as const;

export const LESSON_STATUS = {
  COMPLETED: 'completed',
  AVAILABLE: 'available',
  LOCKED: 'locked',
} as const;

export const LESSON_TYPE = {
  VIDEO: 'video',
  READING: 'reading',
  QUIZ: 'quiz',
} as const;

export const LOCKED_CONTENT = {
  TITLE: 'Nội dung bị khóa',
  DESCRIPTION: 'Vui lòng hoàn thành bài học trước để mở khóa nội dung này',
} as const;

export const SHOW_MORE_TEXT = {
  SHOW: 'Xem nội dung bài học',
  HIDE: 'Thu gọn',
} as const;

export const QNA_TEXT = {
  SHOW: 'Xem hỏi đáp',
  HIDE: 'Thu gọn',
} as const;