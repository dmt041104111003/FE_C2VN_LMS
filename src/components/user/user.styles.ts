export const USER_PROFILE = {
  CONTAINER: 'max-w-4xl mx-auto px-4 py-8 sm:py-12',
  HEADER: 'flex flex-col sm:flex-row gap-4 sm:gap-6 items-center sm:items-start mb-12 sm:mb-16 pb-6 sm:pb-8 border-b border-[var(--text)]/10',
  AVATAR: 'w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover flex-shrink-0',
  INFO: 'flex-1 min-w-0 text-center sm:text-left',
  NAME: 'text-lg sm:text-xl font-light tracking-wide text-[var(--text)]',
  ROLE: 'text-[10px] uppercase tracking-widest text-[var(--text)]/40 mt-1',
  BIO: 'text-sm text-[var(--text)]/50 mt-3 leading-relaxed',
  META: 'flex flex-wrap items-center justify-center sm:justify-start gap-3 sm:gap-4 mt-3',
  META_ITEM: 'flex items-center gap-1.5 text-[11px] sm:text-xs text-[var(--text)]/40',
  EDIT_BTN: 'mt-3 sm:mt-0 text-xs text-[var(--text)]/30 hover:text-[var(--accent)] transition-colors flex-shrink-0',
} as const;

export const USER_STATS = {
  CONTAINER: 'grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-8 mb-12 sm:mb-16 py-6 sm:py-8 border-y border-[var(--text)]/10',
  ITEM: 'text-center',
  VALUE: 'text-xl sm:text-2xl font-light text-[var(--text)]',
  LABEL: 'text-[9px] sm:text-[10px] uppercase tracking-widest text-[var(--text)]/40 mt-1',
} as const;

export const USER_SECTION = {
  CONTAINER: 'mb-12 sm:mb-16',
  TITLE: 'text-[10px] sm:text-xs uppercase tracking-widest text-[var(--text)]/40 mb-6 sm:mb-8',
  LIST: 'space-y-2 sm:space-y-4',
  EMPTY: 'py-6 sm:py-8 text-center text-sm text-[var(--text)]/30',
} as const;

export const USER_COURSE_ITEM = {
  CONTAINER: 'flex gap-3 sm:gap-4 py-3 sm:py-4 border-b border-[var(--text)]/5 hover:border-[var(--accent)]/30 transition-colors group',
  IMAGE_WRAPPER: 'w-12 h-12 sm:w-16 sm:h-16 flex-shrink-0 rounded overflow-hidden bg-[var(--text)]/5',
  IMAGE: 'w-full h-full object-cover',
  IMAGE_PLACEHOLDER: 'w-full h-full flex items-center justify-center',
  CONTENT: 'flex-1 min-w-0',
  TITLE: 'text-sm text-[var(--text)] group-hover:text-[var(--accent)] transition-colors line-clamp-1',
  INSTRUCTOR: 'text-[11px] sm:text-xs text-[var(--text)]/40 mt-0.5',
  PROGRESS_WRAPPER: 'mt-2 flex items-center gap-2 sm:gap-3',
  PROGRESS_BAR: 'flex-1 h-0.5 bg-[var(--text)]/10 rounded-full overflow-hidden',
  PROGRESS_FILL: 'h-full bg-[var(--accent)] rounded-full',
  PROGRESS_TEXT: 'text-[10px] text-[var(--text)]/40 min-w-[32px] sm:min-w-[40px] text-right',
  COMPLETED: 'flex items-center gap-1.5 text-[11px] sm:text-xs text-[var(--accent)] mt-2',
} as const;

export const USER_CERTIFICATE_ITEM = {
  CONTAINER: 'flex items-center gap-3 sm:gap-4 py-3 sm:py-4 border-b border-[var(--text)]/5 hover:border-[var(--accent)]/30 transition-colors group',
  IMAGE_WRAPPER: 'w-12 h-12 sm:w-16 sm:h-16 flex-shrink-0 rounded overflow-hidden bg-[var(--text)]/5 flex items-center justify-center p-1.5 sm:p-2',
  IMAGE: 'w-full h-full object-contain',
  CONTENT: 'flex-1 min-w-0',
  TITLE: 'text-sm text-[var(--text)] group-hover:text-[var(--accent)] transition-colors line-clamp-1',
  META: 'text-[11px] sm:text-xs text-[var(--text)]/40 mt-0.5',
} as const;

export const ICON_SIZES = {
  XS: 'w-3 h-3',
  SM: 'w-3.5 h-3.5',
  MD: 'w-6 h-6',
  LG: 'w-10 h-10',
} as const;
