import type { QuizType, CourseFormData, Chapter, Lecture, Quiz, QuizQuestion } from '@/types/course-create';
import { SYSTEM_CONFIG } from './config';

export const COURSE_CREATE_LABELS = {
  pageTitle: 'Tạo khóa học mới',
  editPageTitle: 'Chỉnh sửa khóa học',
  back: 'Quay lại',
  basicInfo: {
    title: 'Thông tin cơ bản',
    courseTitle: 'Tên khóa học',
    courseTitlePlaceholder: 'Nhập tên khóa học...',
    price: 'Giá khóa học',
    pricePlaceholder: '0.00',
    description: 'Mô tả khóa học',
    descriptionPlaceholder: 'Nhập mô tả chi tiết về khóa học...',
    status: 'Trạng thái',
  },
  chapters: {
    title: 'Nội dung khóa học',
    addChapter: 'Thêm chương',
    chapterTitle: 'Tên chương',
    chapterPlaceholder: 'Nhập tên chương...',
    removeChapter: 'Xóa chương',
    prefix: 'Chương',
    untitled: 'Chưa đặt tên',
  },
  lectures: {
    title: 'Bài giảng',
    addLecture: 'Thêm bài giảng',
    lectureTitle: 'Tên bài giảng',
    lecturePlaceholder: 'Nhập tên bài giảng...',
    videoUrl: 'Link video YouTube',
    videoPlaceholder: 'https://youtube.com/watch?v=...',
    content: 'Nội dung bài giảng',
    contentPlaceholder: 'Nhập nội dung bài giảng...',
    removeLecture: 'Xóa bài giảng',
    prefix: 'Bài',
  },
  quizzes: {
    title: 'Bài kiểm tra',
    addQuiz: 'Thêm bài kiểm tra',
    quizTitle: 'Tên bài kiểm tra',
    quizPlaceholder: 'Nhập tên bài kiểm tra...',
    quizType: 'Loại bài kiểm tra',
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
    noQuizMessage: 'Chưa có bài kiểm tra nào. Nhấn "Thêm bài kiểm tra" để tạo mới.',
  },
  actions: {
    create: 'Tạo khóa học',
    save: 'Lưu thay đổi',
    cancel: 'Hủy',
    preview: 'Xem trước',
    clearForm: 'Xóa form',
    continueEditing: 'Tiếp tục tạo',
    continueEditingEdit: 'Tiếp tục sửa',
    createNew: 'Tạo mới',
    restoreOriginal: 'Khôi phục gốc',
  },
  toast: {
    createSuccess: 'Tạo khóa học thành công',
    updateSuccess: 'Cập nhật khóa học thành công',
  },
  resumeDialog: {
    title: 'Bạn có dữ liệu chưa hoàn thành',
    message: 'Bạn muốn tiếp tục chỉnh sửa hay tạo khóa học mới?',
  },
  editResumeDialog: {
    title: 'Bạn có thay đổi chưa lưu',
    message: 'Bạn muốn tiếp tục sửa hay khôi phục từ bản gốc?',
  },
  validation: {
    titleRequired: 'Vui lòng nhập tên khóa học',
    priceRequired: 'Vui lòng nhập giá khóa học (≥ 0)',
    priceInvalid: 'Giá khóa học không hợp lệ',
    chapterRequired: 'Vui lòng thêm ít nhất 1 chương',
    chapterTitleRequired: 'Vui lòng nhập tên cho tất cả các chương',
    lectureRequired: 'Mỗi chương cần có ít nhất 1 bài giảng',
    lectureTitleRequired: 'Vui lòng nhập tên cho tất cả bài giảng',
    quizQuestionRequired: 'Mỗi bài kiểm tra cần có ít nhất 1 câu hỏi',
    quizAnswerRequired: 'Mỗi câu hỏi cần chọn ít nhất 1 đáp án đúng',
  },
} as const;

export type CourseStatus = 'draft' | 'published';

export const COURSE_STATUS_OPTIONS: { value: CourseStatus; label: string }[] = [
  { value: 'draft', label: 'Bản nháp' },
  { value: 'published', label: 'Xuất bản' },
];

export const QUIZ_TYPE_OPTIONS: { value: QuizType; label: string }[] = [
  { value: 'final', label: 'Bài kiểm tra cuối khóa' },
  { value: 'chapter', label: 'Bài kiểm tra theo chương' },
  { value: 'lecture', label: 'Bài kiểm tra theo bài giảng' },
];

export const QUIZ_TYPE_LABELS: Record<QuizType, string> = {
  final: 'Cuối khóa',
  chapter: 'Theo chương',
  lecture: 'Theo bài',
};

export const createEmptyLecture = (): Lecture => ({
  id: `lecture-${Date.now()}`,
  title: '',
  content: '',
  videoUrl: '',
});

export const createEmptyChapter = (): Chapter => ({
  id: `chapter-${Date.now()}`,
  title: '',
  lectures: [createEmptyLecture()],
});

export const createEmptyQuestion = (): QuizQuestion => ({
  id: `question-${Date.now()}`,
  question: '',
  options: ['', '', '', ''],
  correctIndexes: [],
  explanation: '',
});

export const createEmptyQuiz = (): Quiz => ({
  id: `quiz-${Date.now()}`,
  title: '',
  type: 'final',
  questions: [createEmptyQuestion()],
});

export const INITIAL_COURSE_FORM: CourseFormData = {
  title: '',
  description: '',
  price: 0,
  status: 'draft',
  chapters: [createEmptyChapter()],
  quizzes: [],
};

export const COURSE_CREATE_STYLES = {
  PAGE: 'min-h-screen bg-[var(--bg)]',
  CONTAINER: 'p-4 sm:p-6 space-y-6 sm:space-y-8 w-full',
  HEADER: 'flex items-center justify-between gap-4 min-w-0',
  TITLE: 'text-xl sm:text-2xl font-bold text-[var(--text)] truncate',
  SECTION: 'space-y-4 min-w-0',
  SECTION_TITLE: 'text-base sm:text-lg font-semibold text-[var(--text)] truncate min-w-0',
  SECTION_TITLE_BORDERED: 'text-base sm:text-lg font-semibold text-[var(--text)] pb-3 border-b border-[var(--border)]',
  SECTION_HEADER_WRAPPER: 'flex items-center justify-between gap-4 pb-3 border-b border-[var(--border)] min-w-0',
  FORM_GROUP: 'space-y-2 min-w-0',
  LABEL: 'block text-sm font-medium text-[var(--text)]',
  LABEL_SM: 'text-xs font-medium text-[var(--text)]/70',
  INPUT: 'w-full px-3 sm:px-4 py-2 sm:py-2.5 border border-[var(--border)] rounded-lg text-sm focus:outline-none focus:border-[var(--accent)] transition-colors',
  INPUT_GROUP: 'flex items-center border border-[var(--border)] rounded-lg overflow-hidden focus-within:border-[var(--accent)] transition-colors',
  INPUT_PREFIX: 'px-3 sm:px-4 py-2 sm:py-2.5 bg-[var(--bg-alt)]/50 text-sm text-[var(--text)]/70 border-r border-[var(--border)] select-none',
  INPUT_NO_BORDER: 'flex-1 px-3 sm:px-4 py-2 sm:py-2.5 text-sm focus:outline-none bg-transparent',
  SELECT: 'w-full px-3 sm:px-4 py-2 sm:py-2.5 border border-[var(--border)] rounded-lg text-sm focus:outline-none focus:border-[var(--accent)] transition-colors bg-white',
  TEXTAREA: 'w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-[var(--border)] rounded-lg text-sm focus:outline-none focus:border-[var(--accent)] transition-colors resize-none',
  CHAPTER_CARD: 'bg-[var(--bg-alt)]/30 border border-[var(--border)] rounded-xl p-4 sm:p-5 space-y-4 min-w-0 overflow-hidden',
  LECTURE_CARD: 'bg-white border border-[var(--border)] rounded-lg p-3 sm:p-4 space-y-4 min-w-0 overflow-hidden',
  QUIZ_CARD: 'bg-[var(--bg-alt)]/30 border border-[var(--border)] rounded-xl p-4 sm:p-5 space-y-4 min-w-0 overflow-hidden',
  QUESTION_CARD: 'bg-white border border-[var(--border)] rounded-lg p-3 sm:p-4 space-y-3 min-w-0 overflow-hidden',
  CARD_HEADER: 'flex items-center justify-between gap-2 min-w-0',
  CARD_TITLE: 'text-sm font-semibold text-[var(--text)] truncate min-w-0 flex-1',
  CARD_TITLE_SM: 'text-xs text-[var(--text)]/50',
  ADD_BTN: 'flex items-center gap-1.5 text-sm text-[var(--accent)] hover:text-[var(--accent)]/80 transition-colors flex-shrink-0 whitespace-nowrap',
  REMOVE_BTN: 'p-2 text-[var(--text)]/40 hover:text-[var(--incorrect)] hover:bg-[var(--incorrect)]/10 rounded-lg transition-colors flex-shrink-0',
  ACTIONS: 'flex items-center justify-end gap-3 pt-4 border-t border-[var(--border)]',
  VIDEO_PREVIEW: 'mt-3 rounded-lg overflow-hidden',
  GRID_2: 'grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4',
  GRID_3: 'grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4',
  OPTIONS_GRID: 'grid grid-cols-1 md:grid-cols-2 gap-3',
  OPTION_ROW: 'flex items-start gap-2 min-w-0',
  RADIO: 'w-4 h-4 text-[var(--accent)] cursor-pointer flex-shrink-0',
  CHECKBOX: 'mt-3 w-4 h-4 text-[var(--accent)] cursor-pointer flex-shrink-0',
  REQUIRED: 'text-[var(--incorrect)]',
  LIST_GAP_SM: 'space-y-2',
  LIST_GAP_MD: 'space-y-3 sm:space-y-4',
  LIST_GAP_LG: 'space-y-4 sm:space-y-6',
  SECTION_HEADER: 'flex items-center justify-between gap-4 min-w-0',
  SECTION_SUBTITLE: 'text-sm font-medium text-[var(--text)]/70 truncate min-w-0',
  OPTION_CONTENT: 'flex-1 min-w-0',
  OPTION_LABEL: 'text-xs text-[var(--text)]/50 mb-1',
  EMPTY_STATE: 'text-sm text-[var(--text)]/50 text-center py-8',
} as const;

export const OPTION_LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

export const getOptionLetter = (index: number): string => OPTION_LETTERS[index] || String(index + 1);

export const BLOCKED_PRICE_KEYS = new Set(['-', 'e', 'E']);

export const isPriceKeyBlocked = (key: string): boolean => BLOCKED_PRICE_KEYS.has(key);

export const sanitizePrice = (value: string): number => Math.max(0, Number(value) || 0);

export const COURSE_DRAFT_KEY = 'course_create_draft';
export const COURSE_EDIT_DRAFT_KEY_PREFIX = 'course_edit_draft_';

