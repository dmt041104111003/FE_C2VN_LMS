import type { QuizType, QuizQuestion, Quiz, QuizSourceType } from '@/types/quiz.types';

export const QUIZ_CONFIG = {
  PASS_SCORE: {
    MIN: 0,
    MAX: 100,
    DEFAULT: 0,
  },
  TIME_LIMIT: {
    MIN: 1,
    MAX: 180,
    DEFAULT: 30,
  },
  OPTIONS: {
    DEFAULT_COUNT: 4,
    MAX_COUNT: 26,
  },
} as const;

const OPTION_LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

export const getOptionLetter = (index: number): string => 
  index < OPTION_LETTERS.length ? OPTION_LETTERS[index] : String(index + 1);

export const QUIZ_TYPE_OPTIONS: ReadonlyArray<{ value: QuizType; label: string }> = [
  { value: 'final', label: 'Bài kiểm tra cuối khóa' },
  { value: 'chapter', label: 'Bài kiểm tra theo chương' },
] as const;

export const QUIZ_TYPE_MAP: ReadonlyMap<QuizType, string> = new Map(
  QUIZ_TYPE_OPTIONS.map(opt => [opt.value, opt.label])
);

export const QUIZ_LABELS = {
  title: 'Bài kiểm tra',
  addQuiz: 'Thêm bài kiểm tra',
  quizTitle: 'Tên bài kiểm tra',
  quizPlaceholder: 'Nhập tên bài kiểm tra...',
  quizType: 'Loại bài kiểm tra',
  passScore: 'Điểm đạt',
  passScoreHint: 'Phần trăm tối thiểu để đạt (0-100)',
  timeLimit: 'Thời gian (phút)',
  timeLimitHint: 'Thời gian làm bài (1-180 phút)',
  selectChapter: 'Chọn chương',
  selectLecture: 'Chọn bài giảng',
  selectChapterPlaceholder: '-- Chọn chương --',
  selectLecturePlaceholder: '-- Chọn bài giảng --',
  removeQuiz: 'Xóa bài kiểm tra',
  prefix: 'Bài kiểm tra',
  questions: 'Câu hỏi',
  addQuestion: 'Thêm câu hỏi',
  questionPrefix: 'Câu',
  questionContent: 'Nội dung câu hỏi',
  questionPlaceholder: 'Nhập nội dung câu hỏi...',
  optionLabel: 'Đáp án',
  optionPlaceholder: 'Nhập nội dung đáp án...',
  correctAnswer: 'Đáp án đúng',
  explanation: 'Giải thích đáp án',
  explanationPlaceholder: 'Nhập giải thích cho đáp án đúng...',
  removeQuestion: 'Xóa câu hỏi',
  chapterPrefix: 'Chương',
  lecturePrefix: 'Bài',
  untitled: 'Chưa đặt tên',
  external: {
    apiUrl: 'URL Script',
    apiUrlPlaceholder: 'https://script.google.com/macros/s/.../exec',
    fromQuestion: 'Từ câu',
    toQuestion: 'Đến câu',
  },
} as const;

export const QUIZ_SOURCE_TABS: ReadonlyArray<{ key: QuizSourceType; label: string }> = [
  { key: 'manual', label: 'Thủ công' },
  { key: 'external', label: 'Nhập từ URL' },
] as const;

let questionIdCounter = 0;
let quizIdCounter = 0;

const generateId = (prefix: string, counter: number): string => 
  `${prefix}-${Date.now()}-${counter}`;

export const createEmptyQuestion = (): QuizQuestion => ({
  id: generateId('question', ++questionIdCounter),
  question: '',
  options: Array(QUIZ_CONFIG.OPTIONS.DEFAULT_COUNT).fill(''),
  correctIndexes: [],
  explanation: '',
});

export const createEmptyQuiz = (): Quiz => ({
  id: generateId('quiz', ++quizIdCounter),
  title: '',
  type: 'final',
  questions: [createEmptyQuestion()],
  passScore: QUIZ_CONFIG.PASS_SCORE.DEFAULT,
  timeLimit: QUIZ_CONFIG.TIME_LIMIT.DEFAULT,
});

export const clampPassScore = (value: number): number => 
  Math.min(QUIZ_CONFIG.PASS_SCORE.MAX, Math.max(QUIZ_CONFIG.PASS_SCORE.MIN, value));

export const parsePassScore = (value: string): number => 
  clampPassScore(parseInt(value, 10) || QUIZ_CONFIG.PASS_SCORE.DEFAULT);

export const clampTimeLimit = (value: number): number => 
  Math.min(QUIZ_CONFIG.TIME_LIMIT.MAX, Math.max(QUIZ_CONFIG.TIME_LIMIT.MIN, value));

export const parseTimeLimit = (value: string): number => 
  clampTimeLimit(parseInt(value, 10) || QUIZ_CONFIG.TIME_LIMIT.DEFAULT);

export const isChapterRequired = (type: QuizType): boolean => 
  type === 'chapter';
