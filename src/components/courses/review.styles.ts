const COLORS = {
  BG: 'var(--bg)',
  BG_ALT: 'var(--bg-alt)',
  TEXT: 'var(--text)',
  ACCENT: 'var(--accent)',
  PRIMARY: 'var(--primary)',
  BORDER: 'var(--border)',
} as const;

const OPACITY = {
  SUBTLE: '5',
  LIGHT: '10',
  MUTED: '20',
  SOFT: '30',
  MEDIUM: '40',
  HALF: '50',
  STRONG: '60',
  BOLD: '70',
  FULL: '80',
} as const;

export const RATING_INPUT = {
  WRAPPER: 'flex items-center gap-1',
  STAR: 'cursor-pointer transition-transform hover:scale-110 p-1 rounded focus:outline-none',
  STAR_DISABLED: 'cursor-default pointer-events-none',
  STAR_FILLED: `text-[${COLORS.ACCENT}]`,
  STAR_EMPTY: `text-[${COLORS.TEXT}]/${OPACITY.MUTED}`,
  STAR_HOVER: `text-[${COLORS.ACCENT}]/${OPACITY.STRONG}`,
} as const;

export const REVIEW_FORM = {
  CONTAINER: `space-y-6 p-6 bg-[${COLORS.BG_ALT}] rounded-2xl`,
  SECTION: 'space-y-2',
  LABEL: `text-sm font-medium text-[${COLORS.TEXT}]`,
  TEXTAREA: `w-full min-h-[120px] p-4 bg-[${COLORS.BG}] border border-[${COLORS.TEXT}]/${OPACITY.LIGHT} rounded-xl text-sm text-[${COLORS.TEXT}] placeholder:text-[${COLORS.TEXT}]/${OPACITY.MEDIUM} focus:border-[${COLORS.ACCENT}]/${OPACITY.HALF} focus:outline-none resize-none transition-colors disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-[${COLORS.BG_ALT}]`,
  HELPER: `text-xs text-[${COLORS.TEXT}]/${OPACITY.HALF}`,
  FOOTER: 'flex items-center justify-between pt-2',
  RATING_DISPLAY: `text-sm text-[${COLORS.TEXT}]/${OPACITY.STRONG}`,
} as const;

export const REVIEW_STATS = {
  CONTAINER: `flex flex-col sm:flex-row gap-8 p-6 bg-[${COLORS.BG_ALT}] rounded-2xl`,
  SUMMARY: `flex flex-col items-center justify-center text-center sm:pr-8 sm:border-r sm:border-[${COLORS.TEXT}]/${OPACITY.LIGHT}`,
  AVERAGE: `text-5xl font-bold text-[${COLORS.TEXT}]`,
  TOTAL: `text-sm text-[${COLORS.TEXT}]/${OPACITY.HALF} mt-2`,
  DISTRIBUTION: 'flex-1 space-y-2',
  BAR_ROW: 'flex items-center gap-3',
  BAR_LABEL: `w-12 text-sm text-[${COLORS.TEXT}]/${OPACITY.BOLD} text-right`,
  BAR_CONTAINER: `flex-1 h-2 bg-[${COLORS.TEXT}]/${OPACITY.LIGHT} rounded-full overflow-hidden`,
  BAR_FILL: `h-full bg-[${COLORS.ACCENT}] rounded-full transition-all duration-300`,
  BAR_COUNT: `w-10 text-xs text-[${COLORS.TEXT}]/${OPACITY.HALF}`,
} as const;

export const REVIEW_LIST = {
  CONTAINER: 'space-y-6',
  EMPTY: `py-12 text-center text-sm text-[${COLORS.TEXT}]/${OPACITY.HALF}`,
} as const;

export const REVIEW_CARD = {
  CONTAINER: `p-6 bg-[${COLORS.BG_ALT}] rounded-2xl`,
  HEADER: 'flex items-start justify-between gap-4 mb-4',
  USER: 'flex items-center gap-3',
  AVATAR: 'w-12 h-12 rounded-full object-cover bg-transparent',
  USER_INFO: 'flex flex-col',
  NAME: `font-medium text-[${COLORS.TEXT}]`,
  DATE: `text-xs text-[${COLORS.TEXT}]/${OPACITY.HALF}`,
  CONTENT: `text-sm text-[${COLORS.TEXT}]/${OPACITY.FULL} leading-relaxed mb-4`,
  FOOTER: `flex items-center justify-between pt-4 border-t border-[${COLORS.TEXT}]/${OPACITY.SUBTLE}`,
  ACTIONS: 'flex items-center gap-4',
  ACTION_BTN: `flex items-center gap-1.5 text-xs text-[${COLORS.TEXT}]/${OPACITY.SOFT} hover:text-[${COLORS.TEXT}]/${OPACITY.STRONG} transition-colors`,
  ACTION_BTN_ACTIVE: `!text-[${COLORS.ACCENT}] font-semibold`,
  ACTION_COUNT: 'min-w-[16px]',
  REPORT_BTN: `text-xs text-[${COLORS.TEXT}]/${OPACITY.SOFT} hover:text-[${COLORS.TEXT}]/${OPACITY.STRONG} transition-colors`,
} as const;

export const REVIEW_REPLY = {
  CONTAINER: `mt-4 pl-6 border-l-2 border-[${COLORS.TEXT}]/${OPACITY.LIGHT} space-y-4`,
  CARD: `p-4 bg-[${COLORS.BG}] rounded-xl`,
  HEADER: 'flex items-center gap-3 mb-2',
  AVATAR: 'w-8 h-8 rounded-full object-cover bg-transparent',
  NAME: `text-sm font-medium text-[${COLORS.TEXT}]`,
  BADGE: `text-xs px-2 py-0.5 bg-[${COLORS.ACCENT}]/${OPACITY.LIGHT} text-[${COLORS.ACCENT}] rounded-full`,
  DATE: `text-xs text-[${COLORS.TEXT}]/${OPACITY.MEDIUM}`,
  CONTENT: `text-sm text-[${COLORS.TEXT}]/${OPACITY.BOLD}`,
} as const;

export const REVIEW_SECTION = {
  CONTAINER: 'space-y-8',
  HEADER: 'flex items-center justify-between',
  TITLE: `text-xl font-bold text-[${COLORS.TEXT}]`,
  DIVIDER: `border-t border-[${COLORS.TEXT}]/${OPACITY.LIGHT} my-8`,
} as const;

export const REPLY_FORM = {
  CONTAINER: 'mt-3 space-y-2',
  TEXTAREA: `w-full px-3 py-2 text-sm border border-[${COLORS.BORDER}] rounded-lg bg-[${COLORS.BG}] text-[${COLORS.TEXT}] focus:outline-none focus:border-[${COLORS.PRIMARY}]`,
  ACTIONS: 'flex gap-2 justify-end',
  CANCEL_BTN: `px-3 py-1.5 text-sm text-[${COLORS.TEXT}]/${OPACITY.BOLD} hover:text-[${COLORS.TEXT}]`,
  SUBMIT_BTN: `px-3 py-1.5 text-sm bg-[${COLORS.PRIMARY}] text-white rounded-lg disabled:opacity-50`,
  REPLY_LINK: `ml-4 text-sm text-[${COLORS.PRIMARY}] hover:underline`,
} as const;

export const getActionBtnClass = (isActive: boolean): string => {
  return `${REVIEW_CARD.ACTION_BTN} ${isActive ? REVIEW_CARD.ACTION_BTN_ACTIVE : ''}`;
};
