export const LEARN_PAGE = {
  ID_PREFIX: {
    LECTURE: 'lecture-',
    TEST: 'test-',
  },
  FINAL_CHAPTER: {
    ID: 'final-tests',
    TITLE: 'Bài kiểm tra cuối khóa',
  },
  DEFAULTS: {
    PASSING_SCORE: 70,
    POINTS_PER_QUESTION: 1,
    COMPLETION_PERCENT: 100,
    INITIAL_PROGRESS: 0,
  },
  QUESTION_TYPE: 'single' as const,
  LESSON_TYPE: {
    VIDEO: 'video' as const,
    QUIZ: 'quiz' as const,
  },
  STATUS: {
    COMPLETED: 'completed' as const,
    AVAILABLE: 'available' as const,
    LOCKED: 'locked' as const,
  },
} as const;

export const INITIAL_PROGRESS = {
  courseId: '',
  currentLessonId: '',
  completionRate: 0,
  isCompleted: false,
  lastAccessedAt: new Date().toISOString(),
  lessonProgress: {},
};

