import { Course, CardType, CardConfig } from '@/types/course';
import { COURSE_PAGE } from '@/constants/course';
import { formatDate } from '@/constants/config';

export const COURSE_CARD_BASE = 'group block bg-[var(--bg)] overflow-hidden border-b border-[var(--text)]/10 hover:bg-[var(--bg-alt)]/50 transition-colors';
export const COURSE_CARD_IMAGE_BASE = 'flex-shrink-0 bg-[var(--bg-alt)] relative overflow-hidden';
export const COURSE_CARD_TITLE_HOVER = 'text-[var(--text)] group-hover:text-[var(--accent)] transition-colors';
export const COURSE_CARD_DESC = 'text-[var(--text)]/60';
export const COURSE_CARD_IMAGE_HOVER = 'w-full h-full object-cover object-center';
export const COURSE_CARD_PLACEHOLDER = 'flex items-center justify-center';
export const COURSE_CARD_FOOTER = 'flex items-center justify-between mt-auto';

const HORIZONTAL_CARD_CONFIG: CardConfig = {
  containerClass: 'flex flex-col sm:flex-row py-4',
  imageClass: 'sm:w-[260px] h-[150px] sm:h-[145px] flex-shrink-0',
  contentClass: 'flex-1 px-4 py-2 sm:py-0 flex flex-col',
  titleClass: 'text-lg font-bold mb-1 line-clamp-2 text-[#1c1d1f]',
  descClass: 'text-sm text-[#6a6f73] mb-1 line-clamp-2',
  showDescription: true,
  showTags: false,
  maxTags: 0,
  showFeatures: true,
  featureColumns: 1,
  featureSize: 'xs',
  userSize: 'xs',
  ratingSize: 'sm',
  priceSize: 'lg',
  showInstructorLabel: false,
  showRatingCount: true,
  features: (c: Course) => [
    `${c.totalLessons} ${COURSE_PAGE.lessonsText}`,
    `${c.totalStudents} ${COURSE_PAGE.studentsText}`,
    'Chứng chỉ NFT',
  ],
};

export const CARD_CONFIGS: Record<CardType, CardConfig> = {
  featured: HORIZONTAL_CARD_CONFIG,
  tall: HORIZONTAL_CARD_CONFIG,
  wide: HORIZONTAL_CARD_CONFIG,
  default: HORIZONTAL_CARD_CONFIG,
};

export const COURSE_DETAIL_PAGE = 'min-h-screen bg-[var(--bg)]';
export const COURSE_DETAIL_HEADER = 'relative pt-20 pb-8 bg-[var(--bg-alt)] bg-[url("/background.png")] bg-cover bg-center bg-no-repeat';
export const COURSE_DETAIL_HEADER_OVERLAY = 'absolute inset-0 bg-black/50';
export const COURSE_DETAIL_HEADER_CONTAINER = 'max-w-7xl mx-auto px-4';
export const COURSE_DETAIL_BREADCRUMB = 'flex items-center gap-2 text-sm text-[var(--text)]/60 mb-6';
export const COURSE_DETAIL_BREADCRUMB_LINK = 'hover:text-[var(--accent)] transition-colors';
export const COURSE_DETAIL_BREADCRUMB_SEPARATOR = 'text-[var(--text)]/30';
export const COURSE_DETAIL_TITLE = 'text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4';
export const COURSE_DETAIL_SUBTITLE = 'text-base sm:text-lg text-white/80 mb-6 max-w-3xl';
export const COURSE_DETAIL_META = 'flex flex-wrap items-center gap-4 sm:gap-6';
export const COURSE_DETAIL_META_ITEM = 'flex items-center gap-2 text-sm text-white/70';

export const COURSE_DETAIL_BODY = 'max-w-7xl mx-auto px-4 py-8';
export const COURSE_DETAIL_GRID = 'grid grid-cols-1 lg:grid-cols-3 gap-8';
export const COURSE_DETAIL_MAIN = 'lg:col-span-2 space-y-8 order-2 lg:order-1';
export const COURSE_DETAIL_SIDEBAR = 'lg:col-span-1 order-1 lg:order-2';

export const COURSE_DETAIL_SECTION = 'bg-[var(--bg-alt)] rounded-xl p-6';
export const COURSE_DETAIL_SECTION_TITLE = 'text-lg font-semibold text-[var(--text)] mb-4';
export const COURSE_DETAIL_SECTION_TEXT = 'text-sm text-[var(--text)]/70 leading-relaxed';

export const COURSE_DETAIL_OBJECTIVES = 'grid grid-cols-1 sm:grid-cols-2 gap-3';
export const COURSE_DETAIL_OBJECTIVE = 'flex items-start gap-3 text-sm text-[var(--text)]/80';
export const COURSE_DETAIL_OBJECTIVE_ICON = 'w-4 h-4 text-[var(--accent)] flex-shrink-0 mt-0.5';

export const COURSE_DETAIL_REQUIREMENTS = 'space-y-2';
export const COURSE_DETAIL_REQUIREMENT = 'flex items-start gap-3 text-sm text-[var(--text)]/80';
export const COURSE_DETAIL_REQUIREMENT_BULLET = 'w-1.5 h-1.5 rounded-full bg-[var(--accent)] flex-shrink-0 mt-2';

export const COURSE_DETAIL_CHAPTERS = 'divide-y divide-[var(--text)]/10';
export const COURSE_DETAIL_CHAPTER = 'py-4 first:pt-0 last:pb-0';
export const COURSE_DETAIL_CHAPTER_HEADER = 'flex items-center justify-between cursor-pointer w-full text-left';
export const COURSE_DETAIL_CHAPTER_TITLE = 'font-medium text-[var(--text)]';
export const COURSE_DETAIL_CHAPTER_META = 'text-xs text-[var(--text)]/50';
export const COURSE_DETAIL_CHAPTER_ICON = 'w-5 h-5 text-[var(--text)]/50 transition-transform';
export const COURSE_DETAIL_CHAPTER_ICON_OPEN = 'rotate-180';
export const COURSE_DETAIL_LECTURES = 'mt-3 pl-4 border-l border-[var(--text)]/10 space-y-2';
export const COURSE_DETAIL_LECTURE = 'flex items-center justify-between py-2 text-sm';
export const COURSE_DETAIL_LECTURE_TITLE = 'flex items-center gap-2 text-[var(--text)]/70';
export const COURSE_DETAIL_LECTURE_PREVIEW = 'text-xs text-[var(--accent)]';
export const COURSE_DETAIL_LECTURE_DURATION = 'text-xs text-[var(--text)]/50';

export const COURSE_DETAIL_INSTRUCTOR = 'flex items-start gap-4';
export const COURSE_DETAIL_INSTRUCTOR_AVATAR = 'w-16 h-16 rounded-full bg-[var(--accent)]/20 flex items-center justify-center text-2xl font-bold text-[var(--accent)]';
export const COURSE_DETAIL_INSTRUCTOR_INFO = 'flex-1';
export const COURSE_DETAIL_INSTRUCTOR_NAME = 'font-semibold text-[var(--text)] mb-1';
export const COURSE_DETAIL_INSTRUCTOR_BIO = 'text-sm text-[var(--text)]/70';

export const COURSE_DETAIL_REVIEW = 'py-4 first:pt-0 border-b border-[var(--text)]/10 last:border-0';
export const COURSE_DETAIL_REVIEW_HEADER = 'flex items-center justify-between mb-2';
export const COURSE_DETAIL_REVIEW_USER = 'flex items-center gap-3';
export const COURSE_DETAIL_REVIEW_AVATAR = 'w-10 h-10 rounded-full bg-[var(--accent)]/20 flex items-center justify-center text-sm font-medium text-[var(--accent)]';
export const COURSE_DETAIL_REVIEW_NAME = 'font-medium text-[var(--text)]';
export const COURSE_DETAIL_REVIEW_DATE = 'text-xs text-[var(--text)]/50';
export const COURSE_DETAIL_REVIEW_CONTENT = 'text-sm text-[var(--text)]/70 mb-2';
export const COURSE_DETAIL_REVIEW_HELPFUL = 'text-xs text-[var(--text)]/50';

export const COURSE_DETAIL_CARD = 'bg-[var(--bg-alt)] rounded-xl overflow-hidden sticky top-24';
export const COURSE_DETAIL_CARD_IMAGE_WRAPPER = 'w-full aspect-video bg-[var(--bg)] overflow-hidden';
export const COURSE_DETAIL_CARD_IMAGE = 'w-full h-full object-cover';
export const COURSE_DETAIL_CARD_IMAGE_PLACEHOLDER = 'w-full h-full flex items-center justify-center';
export const COURSE_DETAIL_CARD_BODY = 'p-6 space-y-4';
export const COURSE_DETAIL_CARD_PRICE = 'flex items-baseline gap-2';
export const COURSE_DETAIL_CARD_PRICE_CURRENT = 'text-3xl font-bold text-[var(--text)]';
export const COURSE_DETAIL_CARD_PRICE_ORIGINAL = 'text-lg text-[var(--text)]/50 line-through';
export const COURSE_DETAIL_CARD_PRICE_FREE = 'text-lg font-medium text-[var(--accent)]';
export const COURSE_DETAIL_CARD_DISCOUNT = 'text-sm text-[var(--accent)] font-medium';

export const getGridClasses = (count: number): readonly string[] => {
  return Array(count).fill('');
};

export const getGridContainerClass = (): string => {
  return 'flex flex-col';
};

export const getCardVariants = () => ({
  featured: false,
  tall: false,
  wide: false,
});
export const COURSE_DETAIL_CARD_BUTTON = 'block w-full py-3 bg-[var(--accent)] text-white font-medium rounded-full text-center';
export const COURSE_DETAIL_CARD_BUTTON_SECONDARY = 'w-full py-3 bg-[var(--bg)] text-[var(--text)] font-medium rounded-full text-center border border-[var(--text)]/20';
export const COURSE_DETAIL_CARD_FEATURES = 'space-y-3 pt-4 border-t border-[var(--text)]/10';
export const COURSE_DETAIL_CARD_FEATURE = 'flex items-center gap-3 text-sm text-[var(--text)]/70';
export const COURSE_DETAIL_CARD_FEATURE_ICON = 'w-4 h-4 text-[var(--text)]/50';
export const COURSE_DETAIL_CARD_ACTIONS = 'flex gap-2 pt-4';
export const COURSE_DETAIL_CARD_ACTION = 'flex-1 py-2 text-center text-sm text-[var(--text)]/70 border border-[var(--text)]/10 rounded-full';

export const COURSE_DETAIL_PROGRESS = 'mb-4';
export const COURSE_DETAIL_PROGRESS_HEADER = 'flex justify-between text-sm mb-1';
export const COURSE_DETAIL_PROGRESS_LABEL = 'text-[var(--text)]/70';
export const COURSE_DETAIL_PROGRESS_VALUE = 'font-medium text-[var(--text)]';
export const COURSE_DETAIL_PROGRESS_BAR = 'h-2 bg-[var(--bg)] rounded-full overflow-hidden';
export const COURSE_DETAIL_PROGRESS_FILL = 'h-full bg-[var(--accent)] rounded-full';

export const COURSES_PAGE = 'min-h-screen bg-[var(--bg)]';
export const COURSES_PAGE_MAIN = 'pt-20 pb-16';
export const COURSES_PAGE_CONTAINER = 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8';
export const COURSES_PAGE_HEADER = 'mb-8';
export const COURSES_PAGE_TITLE = 'text-3xl sm:text-4xl font-bold text-[var(--text)] mb-2';
export const COURSES_PAGE_SUBTITLE = 'text-[var(--text)]/60';
export const COURSES_PAGE_EMPTY = 'text-center py-16';
export const COURSES_PAGE_EMPTY_TEXT = 'text-[var(--text)]/50';
