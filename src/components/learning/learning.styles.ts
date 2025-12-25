import type { QuestionDisplayStatus } from '@/types/learning';

export const LEARNING_PAGE = {
  CONTAINER: 'h-screen bg-[var(--bg)] flex overflow-hidden',
  SIDEBAR: 'w-72 border-r border-[var(--border)] flex-shrink-0 overflow-y-auto hidden lg:block',
  SIDEBAR_MOBILE: 'fixed inset-0 z-50 bg-black/30 lg:hidden',
  SIDEBAR_MOBILE_CONTENT: 'w-72 h-full bg-[var(--bg)] overflow-y-auto',
  MAIN: 'flex-1 flex flex-col min-w-0 h-full',
  CONTENT: 'flex-1 overflow-y-auto min-h-0',
} as const;

export const SIDEBAR = {
  BACK_LINK: 'px-5 py-4 text-sm text-[var(--text)]/40 hover:text-[var(--accent)] transition-colors border-b border-[var(--border)]',
  HEADER: 'px-5 py-6 border-b border-[var(--border)]',
  TITLE: 'text-xs uppercase tracking-[0.2em] text-[var(--text)]/40 mb-4',
  PROGRESS_BAR: 'h-0.5 bg-[var(--text)]/5 rounded-full overflow-hidden',
  PROGRESS_FILL: 'h-full bg-[var(--accent)] transition-all duration-500',
  PROGRESS_TEXT: 'text-xs text-[var(--text)]/30 mt-2',
  CHAPTER_LIST: '',
  CHAPTER: 'border-b border-[var(--border)]',
  CHAPTER_HEADER: 'flex items-center justify-between px-5 py-4 cursor-pointer group',
  CHAPTER_TITLE: 'text-sm text-[var(--text)]/50 group-hover:text-[var(--text)]/70 transition-colors',
  CHAPTER_ICON: 'w-4 h-4 text-[var(--text)]/30 transition-transform duration-200',
  CHAPTER_ICON_OPEN: 'rotate-180',
  LESSON_LIST: 'pb-2',
  LESSON: 'flex items-center gap-3 mx-3 px-3 py-2.5 rounded-lg cursor-pointer transition-all duration-200',
  LESSON_CURRENT: 'bg-[var(--accent)]/5 text-[var(--accent)]',
  LESSON_COMPLETED: 'text-[var(--text)]/40 hover:text-[var(--text)]/60',
  LESSON_AVAILABLE: 'text-[var(--text)]/60 hover:bg-[var(--text)]/5',
  LESSON_LOCKED: 'text-[var(--text)]/20 cursor-not-allowed',
  LESSON_ICON: 'w-4 h-4 flex-shrink-0',
  LESSON_CONTENT: 'flex-1 min-w-0',
  LESSON_TITLE: 'text-sm truncate',
  LESSON_META: 'text-xs opacity-50 mt-0.5',
} as const;

export const LESSON_HEADER = {
  CONTAINER: 'h-14 border-b border-[var(--border)] flex items-center justify-between px-4 sm:px-6',
  LEFT: 'flex items-center gap-3',
  BACK_BTN: 'p-1.5 -ml-1.5 text-[var(--text)]/30 hover:text-[var(--text)]/60 transition-colors lg:hidden',
  INFO: 'flex flex-col gap-0.5',
  CHAPTER: 'text-xs text-[var(--text)]/30 uppercase tracking-[0.15em]',
  TITLE: 'text-sm text-[var(--text)]/80',
  RIGHT: 'flex items-center gap-1',
  NAV_BTN: 'p-2 text-[var(--text)]/30 hover:text-[var(--text)]/60 disabled:opacity-20 disabled:cursor-not-allowed transition-colors',
  NAV_ICON: 'w-5 h-5',
} as const;

export const VIDEO_LESSON = {
  CONTAINER: 'flex flex-col h-full',
  VIDEO_WRAPPER: 'flex-1 bg-black min-h-0 [&>div]:h-full [&>div]:aspect-auto [&_iframe]:h-full',
  FOOTER: 'flex-shrink-0 px-6 py-4 border-t border-[var(--border)] flex items-center justify-between',
  LESSON_TITLE: 'text-sm text-[var(--text)]/70',
  ACTIONS: 'flex items-center gap-3',
  COMPLETE_BTN: 'px-5 py-2 text-sm text-[var(--text)]/60 border border-[var(--border)] rounded hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors',
  COMPLETED_BADGE: 'flex items-center gap-1.5 text-sm text-[var(--correct)]',
  NEXT_BTN: 'px-5 py-2 text-sm bg-[var(--accent)] text-white rounded hover:opacity-90 transition-opacity',
} as const;

export const READING_LESSON = {
  CONTAINER: 'max-w-3xl mx-auto px-6 py-8 h-full overflow-y-auto',
  CONTENT: '',
  FOOTER: 'mt-12 pt-6 border-t border-[var(--border)] flex items-center justify-between',
} as const;

export const QUIZ = {
  CONTAINER: 'max-w-4xl mx-auto px-4 sm:px-6 py-6 h-full overflow-y-auto',
  CONTAINER_FULL: 'h-full flex flex-col overflow-hidden',
  HEADER: 'flex-shrink-0 bg-[var(--bg-alt)] border-b border-[var(--border)]',
  HEADER_INNER: 'max-w-6xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-4',
  HEADER_LEFT: 'flex items-center gap-4 min-w-0',
  HEADER_TITLE: 'text-sm font-medium text-[var(--text)]/80 truncate',
  HEADER_META: 'hidden sm:flex items-center gap-3 text-xs text-[var(--text)]/40',
  HEADER_RIGHT: 'flex items-center gap-3',
  TIMER: 'flex items-center gap-2 px-3 py-1.5 bg-[var(--bg)] border border-[var(--border)] rounded text-sm font-mono tabular-nums text-[var(--text)]/70',
  TIMER_ICON: 'w-4 h-4 text-[var(--text)]/40',
  TIMER_WARNING: '!border-[var(--warning)] !text-[var(--warning)] !bg-[var(--warning)]/5',
  TIMER_DANGER: '!border-[var(--incorrect)] !text-[var(--incorrect)] !bg-[var(--incorrect)]/5 animate-pulse',
  MAIN: 'flex-1 overflow-y-auto',
  MAIN_INNER: 'max-w-6xl mx-auto px-4 sm:px-6 py-6',
  GRID: 'flex flex-col lg:flex-row gap-6',
  GRID_QUESTION: 'flex-1 min-w-0 order-last lg:order-first',
  GRID_SIDEBAR: 'lg:w-56 flex-shrink-0',
  NAV: 'bg-[var(--bg-alt)] border border-[var(--border)] rounded-lg p-4',
  NAV_TITLE: 'text-xs uppercase tracking-[0.15em] text-[var(--text)]/40 mb-3 px-1',
  NAV_GRID: 'grid grid-cols-8 lg:grid-cols-5 gap-2',
  NAV_ITEM: 'w-8 h-8 flex items-center justify-center text-xs rounded cursor-pointer transition-all',
  NAV_UNANSWERED: 'bg-[var(--bg)] border border-[var(--border)] text-[var(--text)]/50 hover:border-[var(--text)]/20',
  NAV_ANSWERED: 'bg-[var(--accent)] border-2 border-[var(--accent)] text-white font-medium',
  NAV_CURRENT: 'bg-[var(--current)] border-2 border-[var(--current)] text-white font-medium shadow-sm',
  NAV_CORRECT: 'bg-[var(--correct)] border-2 border-[var(--correct)] text-white font-medium',
  NAV_INCORRECT: 'bg-[var(--incorrect)] border-2 border-[var(--incorrect)] text-white font-medium',
  NAV_PROGRESS: 'mt-3 pt-3 border-t border-[var(--border)]',
  NAV_PROGRESS_TEXT: 'text-xs text-[var(--text)]/40 text-center',
  NAV_PROGRESS_BAR: 'mt-2 h-1 bg-[var(--text)]/5 rounded-full overflow-hidden',
  NAV_PROGRESS_FILL: 'h-full bg-[var(--accent)] transition-all duration-300',
  NAV_ACTIONS: 'mt-4',
  INTRO: 'flex flex-col items-center justify-center min-h-[60vh] text-center px-4',
  INTRO_ICON: 'w-16 h-16 text-[var(--accent)]/30 mb-6',
  INTRO_TITLE: 'text-xl text-[var(--text)]/80 mb-2',
  INTRO_DESC: 'text-sm text-[var(--text)]/50 mb-8 max-w-md',
  INTRO_META: 'flex items-center justify-center gap-6 text-xs text-[var(--text)]/40 mb-8',
  INTRO_META_ITEM: 'flex items-center gap-1.5',
  INTRO_BTN: '',
  PROGRESS: 'mb-6',
  PROGRESS_BAR: 'h-px bg-[var(--text)]/10 rounded-full overflow-hidden',
  PROGRESS_FILL: 'h-full bg-[var(--accent)] transition-all duration-300',
  PROGRESS_TEXT: 'flex items-center justify-between mt-3 text-sm text-[var(--text)]/40',
  GRID_LIST: 'lg:w-56 flex-shrink-0',
  GRID_MAIN: 'flex-1 min-w-0',
  GRID_RESULT: 'flex flex-col lg:flex-row gap-6',
  GRID_RESULT_LIST: 'lg:w-56 flex-shrink-0',
  GRID_RESULT_QUESTION: 'flex-1 min-w-0',
  GRID_RESULT_EXPLAIN: 'lg:w-72 flex-shrink-0',
  QUESTION_LIST: 'bg-[var(--bg-alt)] border border-[var(--border)] rounded-lg p-4',
  QUESTION_LIST_TITLE: 'text-xs uppercase tracking-[0.15em] text-[var(--text)]/40 mb-3 px-1',
  QUESTION_LIST_GRID: 'grid grid-cols-8 lg:grid-cols-5 gap-2',
  QUESTION_LIST_ITEM: 'w-8 h-8 flex items-center justify-center text-xs rounded cursor-pointer transition-all',
  QUESTION_LIST_UNANSWERED: 'bg-[var(--bg)] border border-[var(--border)] text-[var(--text)]/50 hover:border-[var(--text)]/20',
  QUESTION_LIST_ANSWERED: 'bg-[var(--accent)] border-2 border-[var(--accent)] text-white font-medium',
  QUESTION_LIST_CURRENT: 'bg-[var(--current)] border-2 border-[var(--current)] text-white font-medium shadow-sm',
  QUESTION_LIST_CORRECT: 'bg-[var(--correct)] border-2 border-[var(--correct)] text-white font-medium',
  QUESTION_LIST_INCORRECT: 'bg-[var(--incorrect)] border-2 border-[var(--incorrect)] text-white font-medium',
  TITLE: 'text-xl font-light text-[var(--text)] mb-3',
  DESCRIPTION: 'text-sm text-[var(--text)]/50 mb-6',
  META: 'flex items-center justify-center gap-6 text-sm text-[var(--text)]/40',
  META_ITEM: 'flex items-center gap-1.5',
  START_BTN: '',
} as const;

export const QUESTION_LIST_STATUS: Record<QuestionDisplayStatus, string> = {
  answered: QUIZ.QUESTION_LIST_ANSWERED,
  unanswered: QUIZ.QUESTION_LIST_UNANSWERED,
  correct: QUIZ.QUESTION_LIST_CORRECT,
  incorrect: QUIZ.QUESTION_LIST_INCORRECT,
};

export const QUESTION = {
  CONTAINER: 'bg-[var(--bg)] border border-[var(--border)] rounded-lg p-6',
  NUMBER: 'text-xs uppercase tracking-[0.15em] text-[var(--text)]/40 mb-3',
  CONTENT: 'text-base text-[var(--text)]/80 mb-6 leading-relaxed',
  GRID: 'grid grid-cols-1 lg:grid-cols-2 gap-6',
  OPTIONS: 'space-y-2',
  OPTION: 'flex items-center gap-3 px-4 py-3 bg-[var(--bg-alt)] border border-[var(--border)] rounded cursor-pointer transition-all hover:border-[var(--text)]/15',
  OPTION_SELECTED: '!border-[var(--accent)] !bg-[var(--accent)]/5',
  OPTION_CORRECT: '!border-[var(--correct)] !bg-[var(--correct)]/5',
  OPTION_INCORRECT: '!border-[var(--incorrect)] !bg-[var(--incorrect)]/5 opacity-70',
  OPTION_DISABLED: 'cursor-default',
  RADIO: 'w-4 h-4 rounded-full border-2 border-[var(--text)]/20 flex items-center justify-center flex-shrink-0 transition-colors',
  RADIO_SELECTED: '!border-[var(--accent)]',
  RADIO_CORRECT: '!border-[var(--correct)]',
  RADIO_INCORRECT: '!border-[var(--incorrect)]',
  RADIO_DOT: 'w-2 h-2 rounded-full bg-[var(--accent)]',
  RADIO_DOT_CORRECT: '!bg-[var(--correct)]',
  RADIO_DOT_INCORRECT: '!bg-[var(--incorrect)]',
  CHECKBOX: 'w-4 h-4 rounded border-2 border-[var(--text)]/20 flex items-center justify-center flex-shrink-0 transition-colors',
  CHECKBOX_SELECTED: '!border-[var(--accent)] !bg-[var(--accent)]',
  CHECKBOX_CORRECT: '!border-[var(--correct)] !bg-[var(--correct)]',
  CHECKBOX_INCORRECT: '!border-[var(--incorrect)] !bg-[var(--incorrect)]',
  CHECKBOX_CHECK: 'w-2.5 h-2.5 text-white',
  OPTION_TEXT: 'flex-1 text-sm text-[var(--text)]/70',
  OPTION_LABEL: 'w-6 h-6 flex items-center justify-center text-xs font-medium bg-[var(--text)]/5 rounded text-[var(--text)]/50',
  TEXT_INPUT: 'w-full px-4 py-3 bg-[var(--bg-alt)] border border-[var(--border)] rounded text-sm text-[var(--text)] placeholder:text-[var(--text)]/30 focus:border-[var(--accent)] focus:outline-none transition-colors',
  EXPLANATION: 'p-4 bg-[var(--bg-alt)] border border-[var(--border)] rounded-lg',
  EXPLANATION_TITLE: 'text-xs uppercase tracking-[0.15em] text-[var(--text)]/40 mb-2',
  EXPLANATION_TEXT: 'text-sm text-[var(--text)]/60 leading-relaxed',
} as const;

export const getOptionClass = (
  base: string,
  selected: boolean,
  correct: boolean,
  showResult?: boolean
): string => {
  let cls = base;
  if (showResult) {
    cls += ` ${QUESTION.OPTION_DISABLED}`;
    if (correct) cls += ` ${QUESTION.OPTION_CORRECT}`;
    else if (selected) cls += ` ${QUESTION.OPTION_INCORRECT}`;
  } else if (selected) {
    cls += ` ${QUESTION.OPTION_SELECTED}`;
  }
  return cls;
};

export const QUIZ_RESULT = {
  CONTAINER: 'text-center py-12',
  ICON: 'w-12 h-12 mx-auto mb-6',
  ICON_PASS: 'text-[var(--correct)]',
  ICON_FAIL: 'text-[var(--incorrect)]',
  TITLE: 'text-xl text-[var(--text)] mb-2',
  MESSAGE: 'text-sm text-[var(--text)]/50 mb-8',
  SCORE_CARD: 'inline-flex items-center gap-8 px-8 py-5 bg-[var(--bg-alt)] border border-[var(--border)] rounded-lg mb-8',
  SCORE_ITEM: 'text-center',
  SCORE_VALUE: 'text-2xl font-light text-[var(--text)]',
  SCORE_LABEL: 'text-xs text-[var(--text)]/40 mt-1 uppercase tracking-wider',
  ACTIONS: 'flex items-center justify-center gap-3',
  RETRY_BTN: 'px-6 py-2.5 text-sm text-[var(--text)]/60 border border-[var(--border)] rounded hover:border-[var(--text)]/30 transition-colors',
  CONTINUE_BTN: 'px-6 py-2.5 text-sm bg-[var(--accent)] text-white rounded hover:opacity-90 transition-opacity',
} as const;
