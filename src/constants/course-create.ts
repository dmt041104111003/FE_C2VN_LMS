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
    videoUrl: 'Video giới thiệu',
    videoPlaceholder: 'https://youtube.com/watch?v=...',
    status: 'Trạng thái',
    receiverAddress: 'Địa chỉ ví nhận thanh toán',
    receiverAddressPlaceholder: 'addr1qx... (địa chỉ ví Cardano)',
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
    videoUrl: 'Video bài giảng',
    videoPlaceholder: 'https://youtube.com/watch?v=...',
    content: 'Nội dung bài giảng',
    contentPlaceholder: 'Nhập nội dung bài giảng...',
    removeLecture: 'Xóa bài giảng',
    prefix: 'Bài',
    previewFree: 'Xem trước miễn phí',
    previewFreeHint: 'Cho phép xem trước bài giảng này mà không cần mua khóa học',
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
    priceMinUtxo: 'Giá khóa học phải là 0 (miễn phí) hoặc từ 1 ADA trở lên (quy định của Cardano)',
    discountedPriceMinUtxo: 'Giá sau giảm phải ≥ 1 ADA (quy định của Cardano)',
    receiverAddressRequired: 'Vui lòng nhập địa chỉ ví nhận thanh toán cho khóa học có phí',
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


export { 
  QUIZ_TYPE_OPTIONS, 
  createEmptyQuestion, 
  createEmptyQuiz,
  getOptionLetter,
} from './quiz.constants';

export const QUIZ_TYPE_LABELS: Record<QuizType, string> = {
  final: 'Cuối khóa',
  chapter: 'Theo chương',
  lecture: 'Theo bài giảng',
};

export const createEmptyLecture = (): Lecture => ({
  id: `lecture-${Date.now()}`,
  title: '',
  content: '',
  videoUrl: '',
  previewFree: false,
});

export const createEmptyChapter = (): Chapter => ({
  id: `chapter-${Date.now()}`,
  title: '',
  lectures: [createEmptyLecture()],
});

export const INITIAL_COURSE_FORM: CourseFormData = {
  title: '',
  description: '',
  videoUrl: '',
  price: 0,
  status: 'draft',
  receiverAddress: '',
  discount: undefined,
  discountEndTime: undefined,
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
  INPUT: 'w-full px-3 sm:px-4 py-2 sm:py-2.5 border border-[var(--border)] rounded-lg text-sm focus:outline-none focus:border-[var(--accent)] transition-colors disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-[var(--bg-alt)]',
  INPUT_GROUP: 'flex items-center border border-[var(--border)] rounded-lg overflow-hidden focus-within:border-[var(--accent)] transition-colors',
  INPUT_PREFIX: 'px-3 sm:px-4 py-2 sm:py-2.5 bg-[var(--bg-alt)]/50 text-sm text-[var(--text)]/70 border-r border-[var(--border)] select-none',
  INPUT_NO_BORDER: 'flex-1 px-3 sm:px-4 py-2 sm:py-2.5 text-sm focus:outline-none bg-transparent disabled:opacity-50 disabled:cursor-not-allowed',
  SELECT: 'w-full px-3 sm:px-4 py-2 sm:py-2.5 border border-[var(--border)] rounded-lg text-sm focus:outline-none focus:border-[var(--accent)] transition-colors bg-white disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-[var(--bg-alt)]',
  TEXTAREA: 'w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-[var(--border)] rounded-lg text-sm focus:outline-none focus:border-[var(--accent)] transition-colors resize-none disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-[var(--bg-alt)]',
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

export const BLOCKED_PRICE_KEYS = new Set(['-', 'e', 'E']);
export const MIN_PAID_PRICE_ADA = 1;

export const isPriceKeyBlocked = (key: string): boolean => BLOCKED_PRICE_KEYS.has(key);

export const sanitizePrice = (value: string): number => Math.max(0, Number(value) || 0);

export const isValidPrice = (price: number): boolean => price === 0 || price >= MIN_PAID_PRICE_ADA;

export const COURSE_DRAFT_KEY = 'course_create_draft';
export const COURSE_EDIT_DRAFT_KEY_PREFIX = 'course_edit_draft_';

export const VIDEO_UPLOADER = {
  LABELS: {
    title: 'Video bài giảng',
    youtubePlaceholder: 'https://youtube.com/watch?v=...',
    uploadHint: 'MP4, WebM (tối đa 100MB)',
    uploadBtn: 'Chọn video',
    uploadSuccess: 'Tải lên thành công!',
    uploadError: 'Tải lên thất bại',
    changeVideo: 'Thay đổi video',
  },
  TABS: [
    { key: 'youtube', label: 'YouTube' },
    { key: 'upload', label: 'Tải lên' },
  ],
  STYLES: {
    CONTENT: 'mt-4',
    DROPZONE: 'flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-[var(--border)] rounded-xl transition-colors',
    DROPZONE_ACTIVE: 'cursor-pointer hover:border-[var(--accent)]',
    DROPZONE_DISABLED: 'cursor-not-allowed opacity-50',
  },
} as const;

export const COURSE_CREATE_TAB_ITEMS = {
  create: [
    { key: 'form', label: 'Tạo khóa học' },
    { key: 'json', label: 'Parse JSON' },
  ],
  edit: [
    { key: 'form', label: 'Chỉnh sửa khóa học' },
    { key: 'json', label: 'Parse JSON' },
  ],
};

