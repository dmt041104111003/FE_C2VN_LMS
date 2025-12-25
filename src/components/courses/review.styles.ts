export const RATING_INPUT_SIZES = {
  sm: 'w-5 h-5',
  md: 'w-6 h-6',
  lg: 'w-8 h-8',
} as const;

export const RATING_INPUT = {
  WRAPPER: 'flex items-center gap-1',
  STAR: 'cursor-pointer transition-transform hover:scale-110',
  STAR_DISABLED: 'cursor-default',
  STAR_FILLED: 'text-[var(--accent)]',
  STAR_EMPTY: 'text-[var(--text)]/20',
  STAR_HOVER: 'text-[var(--accent)]/60',
} as const;

export const REVIEW_FORM = {
  CONTAINER: 'space-y-6 p-6 bg-[var(--bg-alt)] rounded-2xl',
  SECTION: 'space-y-2',
  LABEL: 'text-sm font-medium text-[var(--text)]',
  TEXTAREA: 'w-full min-h-[120px] p-4 bg-[var(--bg)] border border-[var(--text)]/10 rounded-xl text-sm text-[var(--text)] placeholder:text-[var(--text)]/40 focus:border-[var(--accent)]/50 focus:outline-none resize-none transition-colors',
  HELPER: 'text-xs text-[var(--text)]/50',
  FOOTER: 'flex items-center justify-between pt-2',
  RATING_DISPLAY: 'text-sm text-[var(--text)]/60',
} as const;

export const REVIEW_STATS = {
  CONTAINER: 'flex flex-col sm:flex-row gap-8 p-6 bg-[var(--bg-alt)] rounded-2xl',
  SUMMARY: 'flex flex-col items-center justify-center text-center sm:pr-8 sm:border-r sm:border-[var(--text)]/10',
  AVERAGE: 'text-5xl font-bold text-[var(--text)]',
  TOTAL: 'text-sm text-[var(--text)]/50 mt-2',
  DISTRIBUTION: 'flex-1 space-y-2',
  BAR_ROW: 'flex items-center gap-3',
  BAR_LABEL: 'w-12 text-sm text-[var(--text)]/70 text-right',
  BAR_CONTAINER: 'flex-1 h-2 bg-[var(--text)]/10 rounded-full overflow-hidden',
  BAR_FILL: 'h-full bg-[var(--accent)] rounded-full transition-all duration-300',
  BAR_COUNT: 'w-10 text-xs text-[var(--text)]/50',
} as const;

export const REVIEW_LIST = {
  CONTAINER: 'space-y-6',
  EMPTY: 'py-12 text-center text-sm text-[var(--text)]/50',
} as const;

export const REVIEW_CARD = {
  CONTAINER: 'p-6 bg-[var(--bg-alt)] rounded-2xl',
  HEADER: 'flex items-start justify-between gap-4 mb-4',
  USER: 'flex items-center gap-3',
  AVATAR: 'w-12 h-12 rounded-full object-cover bg-transparent',
  USER_INFO: 'flex flex-col',
  NAME: 'font-medium text-[var(--text)]',
  DATE: 'text-xs text-[var(--text)]/50',
  CONTENT: 'text-sm text-[var(--text)]/80 leading-relaxed mb-4',
  FOOTER: 'flex items-center justify-between pt-4 border-t border-[var(--text)]/5',
  ACTIONS: 'flex items-center gap-4',
  ACTION_BTN: 'flex items-center gap-1.5 text-xs text-[var(--text)]/30 hover:text-[var(--text)]/60 transition-colors',
  ACTION_BTN_ACTIVE: '!text-[var(--accent)] font-semibold',
  ACTION_COUNT: 'min-w-[16px]',
  REPORT_BTN: 'text-xs text-[var(--text)]/30 hover:text-[var(--text)]/60 transition-colors',
} as const;

export const REVIEW_REPLY = {
  CONTAINER: 'mt-4 pl-6 border-l-2 border-[var(--text)]/10 space-y-4',
  CARD: 'p-4 bg-[var(--bg)] rounded-xl',
  HEADER: 'flex items-center gap-3 mb-2',
  AVATAR: 'w-8 h-8 rounded-full object-cover bg-transparent',
  NAME: 'text-sm font-medium text-[var(--text)]',
  BADGE: 'text-xs px-2 py-0.5 bg-[var(--accent)]/10 text-[var(--accent)] rounded-full',
  DATE: 'text-xs text-[var(--text)]/40',
  CONTENT: 'text-sm text-[var(--text)]/70',
} as const;

export const REVIEW_SECTION = {
  CONTAINER: 'space-y-8',
  HEADER: 'flex items-center justify-between',
  TITLE: 'text-xl font-bold text-[var(--text)]',
  DIVIDER: 'border-t border-[var(--text)]/10 my-8',
} as const;

