import type { QuizType } from '@/types/course-create';
import type { ActivityType } from '@/types/course-detail';
import type { TabItem } from '@/components/ui/ui.types';

export const OPTION_LABELS = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'] as const;

export const QUIZ_TYPE_VARIANT: Record<QuizType, 'warning' | 'info'> = {
  final: 'warning',
  chapter: 'info',
  lecture: 'info',
};

export const COURSE_DETAIL_TABS: TabItem[] = [
  { key: 'content', label: 'Nội dung khóa học' },
  { key: 'history', label: 'Lịch sử hoạt động' },
];

export const ACTIVITY_TYPE_LABELS: Record<ActivityType, string> = {
  course_created: 'Tạo khóa học',
  course_updated: 'Cập nhật khóa học',
  course_published: 'Xuất bản khóa học',
  course_unpublished: 'Ẩn khóa học',
  student_added: 'Thêm học viên',
  student_removed: 'Xóa học viên',
  certificate_issued: 'Cấp chứng chỉ',
  chapter_added: 'Thêm chương',
  lecture_added: 'Thêm bài giảng',
  quiz_added: 'Thêm bài kiểm tra',
};

export const ACTIVITY_ITEMS_PER_PAGE = 10;

export const PERIOD_FILTER_OPTIONS = [
  { value: 'all', label: 'Tất cả' },
  { value: 'week', label: 'Tuần này' },
  { value: 'month', label: 'Tháng này' },
  { value: 'quarter', label: 'Quý này' },
  { value: 'year', label: 'Năm nay' },
];

export const COURSE_DETAIL_LABELS = {
  title: 'Chi tiết khóa học',
  back: 'Quay lại',
  edit: 'Chỉnh sửa',
  delete: 'Xóa',
  notFound: 'Không tìm thấy khóa học',
  stats: 'Thống kê',
  chapterPrefix: 'Chương',
  lecturePrefix: 'Bài',
  questionPrefix: 'Câu',
  questionList: 'Danh sách câu hỏi',
  lectureList: 'Danh sách bài giảng',
  quizType: {
    final: 'Cuối khóa',
    chapter: 'Chương',
    lecture: 'Bài giảng',
  },
  sections: {
    info: 'Thông tin cơ bản',
    description: 'Mô tả khóa học',
    chapters: 'Nội dung khóa học',
    quizzes: 'Bài kiểm tra',
  },
  fields: {
    title: 'Tên khóa học',
    price: 'Giá',
    status: 'Trạng thái',
    chapters: 'chương',
    lectures: 'bài giảng',
    quizzes: 'bài kiểm tra',
    questions: 'câu hỏi',
    explanation: 'Giải thích',
    noExplanation: 'Chưa có giải thích',
  },
  empty: {
    description: 'Chưa có mô tả',
    chapters: 'Chưa có nội dung',
    quizzes: 'Chưa có bài kiểm tra',
    lectures: 'Chưa có bài giảng',
    questions: 'Chưa có câu hỏi',
  },
  deleteModal: {
    title: 'Xóa khóa học',
    message: 'Bạn có chắc muốn xóa khóa học này? Hành động không thể hoàn tác.',
  },
  toast: {
    deleteSuccess: 'Đã xóa khóa học thành công',
  },
  activity: {
    empty: 'Chưa có hoạt động nào',
    by: 'bởi',
    loadMore: 'Đang tải thêm...',
    noMore: 'Đã hiển thị tất cả hoạt động',
  },
  periodFilter: 'Thời gian',
} as const;

export const COURSE_DETAIL_STYLES = {
  header: 'flex items-center justify-between mb-6',
  content: 'space-y-8',
  infoGrid: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4',
  section: {
    title: 'text-lg font-semibold text-[var(--text)] mb-4',
  },
  card: {
    base: 'bg-[var(--bg)] rounded-xl border border-[var(--border)]',
    padding: 'p-4',
    paddingLg: 'p-5',
    paddingXl: 'p-6',
    item: 'bg-[var(--bg)] border border-[var(--border)] rounded-lg p-5',
  },
  navigator: {
    wrapper: 'p-5',
    grid: 'flex flex-col lg:flex-row gap-6',
    sidebar: 'lg:w-56 flex-shrink-0',
    main: 'flex-1 min-w-0',
  },
  activity: {
    container: '',
    group: '',
    groupDate: 'py-3 text-xs font-medium text-[var(--text)]/50 uppercase tracking-wider border-b border-[var(--border)]',
    list: 'divide-y divide-[var(--border)] pl-6',
    item: 'py-3 flex items-start gap-4',
    content: 'flex-1 min-w-0',
    description: 'text-sm text-[var(--text)]',
    meta: 'mt-0.5 text-xs text-[var(--text)]/50',
    time: 'flex-shrink-0 text-xs text-[var(--text)]/40 mt-0.5',
    loadMore: 'py-4 text-center text-sm text-[var(--text)]/40',
    loader: 'flex justify-center py-4',
  },
  infoCard: {
    label: 'text-xs text-[var(--text)]/50 mb-1',
    value: 'font-medium text-[var(--text)] truncate',
  },
  chapter: {
    container: 'space-y-4',
    header: 'px-5 py-4 bg-[var(--bg-alt)]/50 border-b border-[var(--border)]',
    title: 'font-semibold text-[var(--text)]',
    subtitle: 'text-sm text-[var(--text)]/50 mt-1',
    list: 'divide-y divide-[var(--border)]',
    item: 'p-5',
    itemHeader: 'flex items-center gap-3',
    index: 'w-7 h-7 rounded-full bg-[var(--accent)]/10 text-[var(--accent)] text-sm font-medium flex items-center justify-center flex-shrink-0',
    lectureTitle: 'font-medium text-[var(--text)]',
    lectureContent: 'mt-4 pl-10 text-sm',
    lectureVideo: 'mt-4 pl-10',
  },
  quiz: {
    container: 'space-y-4',
    header: 'px-5 py-4 bg-[var(--bg-alt)]/50 border-b border-[var(--border)] flex items-center justify-between',
    title: 'font-semibold text-[var(--text)]',
    count: 'text-sm text-[var(--text)]/50',
    questions: 'divide-y divide-[var(--border)]',
    question: 'p-5',
    questionHeader: 'flex items-start gap-3',
    questionIndex: 'w-7 h-7 rounded-full bg-[var(--accent)]/10 text-[var(--accent)] text-sm font-medium flex items-center justify-center flex-shrink-0',
    questionText: 'font-medium text-[var(--text)] flex-1',
    options: 'space-y-2 pl-10 mt-3',
    option: 'flex items-center gap-2 text-sm',
    optionIndex: 'w-5 h-5 rounded-full border border-[var(--border)] text-xs flex items-center justify-center flex-shrink-0',
    optionCorrect: 'w-5 h-5 rounded-full bg-[var(--correct)] text-white text-xs flex items-center justify-center flex-shrink-0',
    optionText: 'text-[var(--text)]',
    explanation: 'pl-10 mt-3 p-3 bg-[var(--bg-alt)]/50 rounded-lg',
    explanationLabel: 'text-xs text-[var(--text)]/50 mb-1',
    explanationText: 'text-sm text-[var(--text)]',
  },
  empty: 'bg-[var(--bg-alt)]/30 rounded-xl p-8 text-center text-[var(--text)]/50',
} as const;
