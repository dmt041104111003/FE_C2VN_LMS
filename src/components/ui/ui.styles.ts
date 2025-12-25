import { ButtonVariant, ButtonSize, BadgeVariant, LogoSize, InputVariant, InputSize, RatingSize, UserAvatarSize } from './ui.types';

export const BUTTON_BASE = 'inline-flex items-center justify-center font-medium rounded-full whitespace-nowrap';
export const BUTTON_VARIANTS: Record<ButtonVariant, string> = {
  primary: 'bg-[var(--accent)] text-white',
  secondary: 'bg-[var(--bg-alt)] text-[var(--text)]',
  ghost: 'bg-transparent text-[var(--text)]',
  inverse: 'bg-white text-[var(--accent)]',
};
export const BUTTON_SIZES: Record<ButtonSize, string> = {
  sm: 'px-3 py-1.5 text-xs sm:text-sm',
  md: 'px-4 py-2 text-xs sm:text-sm',
  lg: 'px-5 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base',
};

export const BADGE_BASE = 'inline-block px-2 py-0.5 text-xs font-medium rounded';
export const BADGE_VARIANTS: Record<BadgeVariant, string> = {
  default: 'bg-[var(--bg-alt)] text-[var(--text)]',
  accent: 'bg-[var(--accent)]/10 text-[var(--accent)]',
};

export const HEADER = 'fixed top-0 left-0 right-0 z-50 bg-[var(--bg)] border-b border-[var(--bg-alt)]';
export const HEADER_CONTAINER = 'max-w-7xl mx-auto px-4 h-14 sm:h-16 flex items-center justify-between';
export const HEADER_LEFT = 'flex items-center gap-6 sm:gap-8';
export const HEADER_NAV = 'hidden lg:flex items-center gap-1';
export const HEADER_NAV_LINK = 'px-3 py-2 text-sm font-medium text-[var(--text)]/70 hover:text-[var(--text)] transition-colors';
export const HEADER_NAV_LINK_ACTIVE = 'px-3 py-2 text-sm font-medium text-[var(--accent)]';
export const HEADER_RIGHT = 'flex items-center gap-2 sm:gap-3';
export const HEADER_ICON_BTN = 'p-2 text-[var(--text)]';
export const HEADER_MENU_BTN = 'p-2 text-[var(--text)]';
export const HEADER_AUTH_LINK = 'text-sm font-medium text-[var(--text)]';
export const HEADER_AUTH_ACCENT = 'text-sm font-medium text-[var(--accent)]';

export const HEADER_MEGA = 'fixed inset-x-0 top-14 sm:top-16 bg-[var(--bg)] border-b border-[var(--bg-alt)] z-40 overflow-auto max-h-[calc(100vh-56px)] sm:max-h-[calc(100vh-64px)]';
export const HEADER_SPACER = 'h-14 sm:h-16';
export const HEADER_MEGA_CONTAINER = 'max-w-7xl mx-auto px-4 py-8';
export const HEADER_MEGA_GRID = 'grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6 md:gap-8';
export const HEADER_MEGA_COL = 'flex flex-col gap-1';
export const HEADER_MEGA_TITLE = 'text-sm font-semibold uppercase tracking-wide text-[var(--text)] mb-3 flex items-center gap-2';
export const HEADER_MEGA_TITLE_ACTIVE = 'text-sm font-semibold uppercase tracking-wide text-[var(--accent)] mb-3 flex items-center gap-2';
export const HEADER_MEGA_LINK = 'text-sm text-[var(--text)]/70 py-1.5 hover:text-[var(--text)] transition-colors';
export const HEADER_MEGA_LINK_ACTIVE = 'text-sm text-[var(--accent)] py-1.5 font-medium';
export const HEADER_MEGA_FOOTER = 'border-t border-[var(--bg-alt)] mt-6 pt-6';
export const HEADER_MEGA_APPS = 'flex flex-wrap gap-3';
export const HEADER_APP_BTN = 'flex items-center gap-2 px-4 py-2.5 bg-[var(--text)] text-white rounded-lg text-sm';
export const HEADER_APP_BTN_ALT = 'flex items-center gap-2 px-4 py-2.5 bg-[var(--bg-alt)] text-[var(--text)] border border-[var(--text)]/20 rounded-lg text-sm';
export const HEADER_APP_TEXT = 'leading-tight';
export const HEADER_APP_LABEL = 'text-xs opacity-70';
export const HEADER_APP_NAME = 'font-semibold';

export const SEARCH_OVERLAY = 'fixed inset-0 bg-black/50 z-50 flex items-start justify-center pt-16 sm:pt-20';
export const SEARCH_MODAL = 'bg-[var(--bg)] w-full max-w-2xl mx-4 rounded-xl shadow-2xl overflow-visible';
export const SEARCH_INPUT_WRAPPER = 'flex items-center border-b border-[var(--bg-alt)] px-4';
export const SEARCH_INPUT = 'flex-1 py-4 text-base outline-none bg-transparent text-[var(--text)] placeholder:text-[var(--text)]/50';
export const SEARCH_INPUT_BTN = 'p-2 text-[var(--accent)]';
export const SEARCH_CONTENT = 'p-4 max-h-[60vh] overflow-y-auto';
export const SEARCH_SECTION = 'mb-8 flex flex-col gap-4';
export const SEARCH_SECTION_TITLE = 'text-sm font-semibold text-[var(--text)] mb-2';
export const SEARCH_COURSE_ITEM = 'flex items-center gap-3 py-2';
export const SEARCH_COURSE_IMG = 'w-10 h-10 rounded object-cover';
export const SEARCH_COURSE_INFO = 'flex-1';
export const SEARCH_COURSE_TITLE = 'text-sm font-medium text-[var(--text)]';
export const SEARCH_COURSE_PROVIDER = 'text-xs text-[var(--text)]/60';
export const SEARCH_TREND_ITEM = 'flex items-center gap-2 py-2 text-sm text-[var(--text)]/70';
export const SEARCH_FOOTER = 'border-t border-[var(--bg-alt)] p-4';
export const SEARCH_FOOTER_TEXT = 'text-sm text-[var(--text)]/60 mb-2';
export const SEARCH_FOOTER_LINK = 'text-sm font-medium text-[var(--accent)] flex items-center gap-1';

export const FOOTER = 'bg-[var(--bg-alt)] py-12 md:py-16 px-4 md:px-8';
export const FOOTER_CONTAINER = 'max-w-6xl mx-auto';
export const FOOTER_TOP = 'flex flex-col md:flex-row justify-between gap-8 md:gap-12 mb-8 md:mb-12';
export const FOOTER_LEFT = 'max-w-md';
export const FOOTER_TITLE = 'text-2xl md:text-3xl font-bold text-[var(--text)] mb-3';
export const FOOTER_DESC = 'text-sm md:text-base text-[var(--text)]/70 mb-6';
export const FOOTER_SOCIALS = 'flex gap-4';
export const FOOTER_SOCIAL_LINK = 'text-[var(--text)]';
export const FOOTER_RIGHT = 'flex gap-12 md:gap-16';
export const FOOTER_COL = 'flex flex-col gap-3';
export const FOOTER_COL_TITLE = 'text-xs font-semibold uppercase tracking-wider text-[var(--text)]/50 mb-1';
export const FOOTER_COL_LINK = 'text-sm text-[var(--text)]/80';
export const FOOTER_BOTTOM = 'flex flex-col md:flex-row justify-between items-center gap-4 pt-8 border-t border-[var(--text)]/10';
export const FOOTER_COPYRIGHT = 'text-sm text-[var(--text)]/50';
export const FOOTER_LEGAL = 'flex gap-2 text-sm text-[var(--text)]/50';
export const FOOTER_LEGAL_LINK = 'text-[var(--text)]/50';

export const LOGO_COMPACT = 'w-6 h-6 sm:w-8 sm:h-8 flex-shrink-0 object-contain';
export const LOGO_INLINE_WRAPPER = 'flex items-center gap-2';
export const LOGO_INLINE_IMG: Record<LogoSize, string> = {
  sm: 'w-6 h-6 sm:w-8 sm:h-8 flex-shrink-0 object-contain',
  md: 'w-8 h-8 sm:w-10 sm:h-10 flex-shrink-0 object-contain',
  lg: 'w-10 h-10 sm:w-12 sm:h-12 flex-shrink-0 object-contain',
};
export const LOGO_INLINE_TEXT = 'leading-tight min-w-0 flex-shrink';
export const LOGO_INLINE_TITLE: Record<LogoSize, string> = {
  sm: 'text-sm sm:text-base font-semibold text-[var(--accent)]',
  md: 'text-base sm:text-lg font-semibold text-[var(--accent)]',
  lg: 'text-lg sm:text-xl font-semibold text-[var(--accent)]',
};
export const LOGO_INLINE_SUBTITLE: Record<LogoSize, string> = {
  sm: 'text-xs uppercase tracking-widest text-[var(--text)]/50',
  md: 'text-xs uppercase tracking-widest text-[var(--text)]/50',
  lg: 'text-xs uppercase tracking-widest text-[var(--text)]/50',
};
export const LOGO_STACKED_WRAPPER = 'text-center';
export const LOGO_STACKED_BOX: Record<LogoSize, string> = {
  sm: 'relative w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-6 sm:mb-8',
  md: 'relative w-36 h-36 sm:w-48 sm:h-48 mx-auto mb-6 sm:mb-8',
  lg: 'relative w-44 h-44 sm:w-56 sm:h-56 mx-auto mb-6 sm:mb-8',
};
export const LOGO_STACKED_IMG = 'w-full h-full object-contain';
export const LOGO_STACKED_TITLE: Record<LogoSize, string> = {
  sm: 'text-xl sm:text-2xl font-bold text-[var(--accent)] mb-2',
  md: 'text-2xl sm:text-3xl font-bold text-[var(--accent)] mb-2',
  lg: 'text-3xl sm:text-4xl font-bold text-[var(--accent)] mb-2',
};
export const LOGO_STACKED_SUBTITLE: Record<LogoSize, string> = {
  sm: 'text-sm sm:text-base text-[var(--text)]/50 tracking-[0.15em] sm:tracking-[0.2em] uppercase',
  md: 'text-base sm:text-xl text-[var(--text)]/50 tracking-[0.15em] sm:tracking-[0.2em] uppercase',
  lg: 'text-xl sm:text-2xl text-[var(--text)]/50 tracking-[0.15em] sm:tracking-[0.2em] uppercase',
};

export const LIGHTBOX_OVERLAY = 'fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4';
export const LIGHTBOX_CLOSE = 'absolute top-4 right-4 text-white text-3xl cursor-pointer z-10';
export const LIGHTBOX_WRAPPER = 'relative w-[90vw] h-[80vh] sm:w-[80vw] sm:h-[75vh] md:w-[70vw] md:h-[70vh] rounded-xl md:rounded-2xl overflow-hidden';
export const LIGHTBOX_IMAGE = 'w-full h-full object-cover pointer-events-none select-none';
export const LIGHTBOX_NAV = 'absolute top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 bg-white/20 rounded-full flex items-center justify-center text-white text-xl md:text-2xl cursor-pointer';
export const LIGHTBOX_PREV = 'left-2 md:left-4';
export const LIGHTBOX_NEXT = 'right-2 md:right-4';
export const LIGHTBOX_DOTS = 'absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2';
export const LIGHTBOX_DOT = 'w-2 h-2 md:w-3 md:h-3 rounded-full cursor-pointer';
export const LIGHTBOX_DOT_ACTIVE = 'bg-white';
export const LIGHTBOX_DOT_INACTIVE = 'bg-white/40';
export const LIGHTBOX_CLOSE_ICON = 'w-8 h-8';
export const LIGHTBOX_NAV_ICON = 'w-6 h-6';

export const CARD_MODAL_OVERLAY = 'fixed inset-0 z-[100] bg-black/80 flex items-center justify-center p-4';
export const CARD_MODAL_CLOSE = 'absolute top-4 right-4 text-white z-10';
export const CARD_MODAL_CLOSE_ICON = 'w-8 h-8';
export const CARD_MODAL_CONTAINER = 'bg-[var(--bg)] rounded-2xl overflow-hidden max-w-6xl w-full flex flex-col md:flex-row';
export const CARD_MODAL_IMAGE_WRAPPER = 'md:w-1/2 flex-shrink-0';
export const CARD_MODAL_IMAGE = 'w-full h-[200px] md:h-full object-cover pointer-events-none select-none';
export const CARD_MODAL_CONTENT = 'md:w-1/2 p-6 md:p-8 flex flex-col justify-center';
export const CARD_MODAL_TAG = 'mb-3';
export const CARD_MODAL_TITLE = 'text-xl md:text-2xl font-bold text-[var(--text)] mb-2 md:mb-3';
export const CARD_MODAL_SUBTITLE = 'text-sm md:text-base text-[var(--text)]/70 mb-4';
export const CARD_MODAL_PRICE = 'text-2xl md:text-3xl font-bold text-[var(--accent)] mb-4 md:mb-6';
export const CARD_MODAL_BUTTON = 'block w-full py-3 bg-[var(--accent)] text-white text-center font-medium rounded-lg';

export const CARD_BASE = 'block rounded-lg overflow-hidden';
export const CARD_CONTENT = 'flex flex-col';
export const CARD_SUBTITLE = 'text-xs text-[var(--text)]/60 truncate';

export const CARD_VARIANTS = {
  default: 'flex flex-col',
  horizontal: 'flex flex-row items-center gap-3',
  compact: 'flex flex-row items-center gap-2',
  list: 'flex flex-row items-center gap-4 px-4 py-3',
};

export const CARD_IMAGE_VARIANTS = {
  default: 'w-full aspect-video object-cover pointer-events-none select-none',
  horizontal: 'w-12 h-12 rounded object-cover flex-shrink-0 pointer-events-none select-none',
  compact: 'w-10 h-10 rounded object-cover flex-shrink-0 pointer-events-none select-none',
  list: 'w-10 h-10 rounded-xl object-contain flex-shrink-0 pointer-events-none select-none',
};

export const CARD_CONTENT_VARIANTS = {
  default: 'p-3',
  horizontal: 'flex-1 min-w-0',
  compact: 'flex-1 min-w-0',
  list: 'flex-1 min-w-0 text-center',
};

export const CARD_TITLE_SIZES = {
  sm: 'text-sm font-medium text-[var(--text)] truncate',
  md: 'text-base font-medium text-[var(--text)] truncate',
  lg: 'text-lg font-semibold text-[var(--text)] truncate',
};

export const INPUT_BASE = 'w-full bg-transparent text-[var(--text)] placeholder:text-[var(--text)]/30 outline-none transition-colors';
export const INPUT_VARIANTS: Record<InputVariant, string> = {
  default: 'bg-[var(--bg)] border-2 border-[var(--text)]/20 focus:border-[var(--accent)] rounded-full',
  search: 'bg-transparent border-none',
  rounded: 'bg-[var(--bg)] border-2 border-[var(--text)]/20 focus:border-[var(--accent)] rounded-full',
  minimal: 'border-b border-[var(--text)]/10 focus:border-[var(--accent)]/50 rounded-none',
};
export const INPUT_SIZES: Record<InputSize, string> = {
  sm: 'px-3 py-2 text-sm',
  md: 'px-4 py-3 text-sm md:text-base',
  lg: 'px-5 py-3 text-sm md:text-base',
};

export const TEXTAREA_BASE = 'w-full bg-transparent text-[var(--text)] placeholder:text-[var(--text)]/30 outline-none resize-none transition-colors';
export const TEXTAREA_VARIANTS: Record<InputVariant, string> = {
  default: 'bg-[var(--bg)] border-2 border-[var(--text)]/20 focus:border-[var(--accent)] rounded-2xl',
  search: 'bg-transparent border-none',
  rounded: 'bg-[var(--bg)] border-2 border-[var(--text)]/20 focus:border-[var(--accent)] rounded-2xl',
  minimal: 'border-b border-[var(--text)]/10 focus:border-[var(--accent)]/50 rounded-none',
};
export const TEXTAREA_SIZES: Record<InputSize, string> = {
  sm: 'px-3 py-2 text-sm',
  md: 'px-4 py-3 text-sm md:text-base',
  lg: 'px-5 py-3 text-sm md:text-base',
};

export const FORM_BASE = 'flex flex-col gap-6 w-full';
export const FORM_ROW = 'flex flex-col sm:flex-row gap-6';
export const FORM_COLUMN = 'flex flex-col gap-6';

export const ICON_SM = 'w-4 h-4';
export const ICON_MD = 'w-5 h-5';
export const ICON_LG = 'w-6 h-6';

export const AUTH_PAGE = 'min-h-screen flex items-center justify-center bg-[var(--bg)] px-4 py-12';
export const AUTH_CONTAINER = 'w-full max-w-md';
export const AUTH_CARD = 'bg-[var(--bg-alt)] rounded-2xl p-6 sm:p-8';
export const AUTH_HEADER = 'text-center mb-8';
export const AUTH_TITLE = 'text-2xl sm:text-3xl font-bold text-[var(--text)] mb-2';
export const AUTH_SUBTITLE = 'text-sm text-[var(--text)]/60';
export const AUTH_FORM = 'flex flex-col gap-4';
export const AUTH_FORGOT = 'text-right';
export const AUTH_FORGOT_LINK = 'text-sm text-[var(--link)]';
export const AUTH_DIVIDER = 'flex items-center gap-4 my-6';
export const AUTH_DIVIDER_LINE = 'flex-1 h-px bg-[var(--text)]/10';
export const AUTH_DIVIDER_TEXT = 'text-sm text-[var(--text)]/50';
export const AUTH_SOCIAL = 'flex flex-col gap-3';
export const AUTH_SOCIAL_BTN = 'flex items-center justify-center gap-3 w-full py-3 bg-[var(--bg)] border border-[var(--text)]/10 rounded-full text-sm font-medium text-[var(--text)]';
export const AUTH_FOOTER = 'text-center mt-6';
export const AUTH_FOOTER_TEXT = 'text-sm text-[var(--text)]/60';
export const AUTH_FOOTER_LINK = 'text-[var(--link)] font-medium';

export const MODAL_OVERLAY = 'fixed inset-0 z-[100] bg-black/50 flex items-center justify-center p-4';
export const MODAL_CONTAINER = 'bg-[var(--bg)] rounded-2xl w-full max-w-sm overflow-hidden';
export const MODAL_HEADER = 'flex items-center justify-between px-6 py-4 border-b border-[var(--text)]/10';
export const MODAL_TITLE = 'text-lg font-semibold text-[var(--text)]';
export const MODAL_CLOSE = 'p-1 text-[var(--text)]/50';
export const MODAL_BODY = 'py-6 max-h-[60vh] overflow-y-auto flex flex-col items-center';
export const MODAL_EMPTY = 'px-6 py-8 text-center text-sm text-[var(--text)]/60';

export const PAGINATION_CONTAINER = 'flex items-center justify-center gap-2';
export const PAGINATION_BTN = 'w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-colors';
export const PAGINATION_BTN_ACTIVE = 'bg-[var(--accent)] text-white';
export const PAGINATION_BTN_INACTIVE = 'bg-[var(--bg-alt)] text-[var(--text)] hover:bg-[var(--accent)]/20';
export const PAGINATION_BTN_NAV = 'bg-[var(--bg-alt)] text-[var(--text)] hover:bg-[var(--accent)] hover:text-white';
export const PAGINATION_BTN_DISABLED = 'opacity-30 cursor-not-allowed hover:bg-[var(--bg-alt)] hover:text-[var(--text)]';

export const RATING_SIZES: Record<RatingSize, { star: string; text: string; gap: string }> = {
  xs: { star: 'w-3 h-3', text: 'text-xs', gap: 'gap-0.5' },
  sm: { star: 'w-4 h-4', text: 'text-xs', gap: 'gap-1' },
  md: { star: 'w-5 h-5', text: 'text-sm', gap: 'gap-1.5' },
};

export const USER_AVATAR_SIZES: Record<UserAvatarSize, { avatar: string; name: string; label: string; description: string; gap: string }> = {
  xs: { avatar: 'w-5 h-5', name: 'text-xs', label: 'text-xs', description: 'text-xs', gap: 'gap-1.5' },
  sm: { avatar: 'w-6 h-6', name: 'text-sm', label: 'text-xs', description: 'text-xs', gap: 'gap-2' },
  md: { avatar: 'w-8 h-8', name: 'text-sm', label: 'text-xs', description: 'text-xs', gap: 'gap-2' },
  lg: { avatar: 'w-12 h-12', name: 'text-lg font-medium', label: 'text-sm', description: 'text-sm', gap: 'gap-4' },
};

export const PRICE_SIZES: Record<'xs' | 'sm' | 'md' | 'lg', { price: string; original: string }> = {
  xs: { price: 'text-xs', original: 'text-xs' },
  sm: { price: 'text-sm', original: 'text-xs' },
  md: { price: 'text-base', original: 'text-xs' },
  lg: { price: 'text-lg', original: 'text-sm' },
};

export const FEATURE_SIZES: Record<'xs' | 'sm', { icon: string; text: string; gap: string }> = {
  xs: { icon: 'w-3 h-3', text: 'text-xs', gap: 'gap-1' },
  sm: { icon: 'w-4 h-4', text: 'text-xs', gap: 'gap-2' },
};

export const TAG_BASE = 'text-xs px-2 py-0.5 bg-[var(--bg-alt)] text-[var(--text)]/60 rounded';

export const VIDEO_PLAYER_WRAPPER = 'relative aspect-video';
export const VIDEO_PLAYER_ERROR = 'aspect-video bg-black flex items-center justify-center';
export const VIDEO_PLAYER_ERROR_TEXT = 'text-white/50 text-sm';
export const VIDEO_PLAYER_IFRAME = 'w-full h-full';
export const VIDEO_PLAYER_OVERLAY = 'absolute inset-0 pointer-events-none';

export const VIDEO_MODAL_OVERLAY = 'fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4';
export const VIDEO_MODAL_CLOSE = 'absolute top-4 right-4 text-white z-10 p-2 hover:bg-white/10 rounded-full transition-colors';
export const VIDEO_MODAL_CLOSE_ICON = 'w-8 h-8';
export const VIDEO_MODAL_CONTAINER = 'relative w-full max-w-4xl';
export const VIDEO_MODAL_HEADER = 'mb-4';
export const VIDEO_MODAL_TITLE = 'text-xl font-semibold text-white';
export const VIDEO_MODAL_SUBTITLE = 'text-sm text-white/60 mt-1';
export const VIDEO_MODAL_VIDEO = 'rounded-xl overflow-hidden bg-black';

export const SEARCH_AUTOCOMPLETE_WRAPPER = 'relative';
export const SEARCH_AUTOCOMPLETE_ICON = 'absolute left-1 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text)]/30';
export const SEARCH_AUTOCOMPLETE_FIELD = 'w-full pl-1 pr-4 py-3 bg-transparent text-[var(--text)] placeholder:text-[var(--text)]/30 border-b border-[var(--text)]/10 focus:border-[var(--accent)]/50 focus:outline-none transition-colors';
export const SEARCH_AUTOCOMPLETE_FIELD_ICON = 'w-full pl-8 pr-4 py-3 bg-transparent text-[var(--text)] placeholder:text-[var(--text)]/30 border-b border-[var(--text)]/10 focus:border-[var(--accent)]/50 focus:outline-none transition-colors';
export const SEARCH_SUGGESTION_LIST = 'absolute left-0 right-0 top-full mt-1 bg-[var(--bg)] border border-[var(--text)]/10 rounded-lg shadow-lg max-h-64 overflow-y-auto z-[200]';
export const SEARCH_SUGGESTION_ITEM = 'px-4 py-2.5 cursor-pointer flex items-center justify-between text-sm transition-colors text-[var(--text)]/70 hover:bg-[var(--bg-alt)]';
export const SEARCH_SUGGESTION_ITEM_ACTIVE = 'px-4 py-2.5 cursor-pointer flex items-center justify-between text-sm transition-colors bg-[var(--bg-alt)] text-[var(--text)]';
export const SEARCH_SUGGESTION_ICON = 'w-3.5 h-3.5 text-[var(--text)]/30';
export const SEARCH_SUGGESTION_HIGHLIGHT = 'text-[var(--accent)] font-medium';
export const SEARCH_SUGGESTION_TYPE = 'text-xs text-[var(--text)]/40 uppercase tracking-wider';

export const FILTER_WRAPPER = 'space-y-8';
export const FILTER_ROW = 'flex flex-col sm:flex-row gap-8 sm:gap-12';
export const FILTER_COL = 'flex-1 space-y-1';
export const FILTER_LABEL = 'text-xs text-[var(--text)]/40 uppercase tracking-wider pl-1';
export const FILTER_SELECT = 'w-full py-2 pl-1 bg-transparent text-sm text-[var(--text)] border-b border-[var(--text)]/10 focus:border-[var(--accent)]/50 focus:outline-none transition-colors cursor-pointer';
export const FILTER_RANGE_WRAPPER = 'flex items-center gap-4 py-2';
export const FILTER_RANGE_INPUT = 'flex-1 h-[1px] bg-[var(--text)]/10 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[var(--accent)]';
export const FILTER_RANGE_SEPARATOR = 'text-[var(--text)]/15 text-xs';

export const PAGINATION_DOTS = 'px-2 text-[var(--text)]/50';
export const WALLET_MODAL_LIST = 'p-4 flex flex-col gap-3';
export const WALLET_MODAL_EMPTY = 'py-12 text-center text-sm text-[var(--text)]/50';
export const WALLET_MODAL_ITEM = 'flex items-center gap-3';
export const WALLET_MODAL_ICON_WRAPPER = 'w-14 h-14 rounded-xl bg-[var(--bg-alt)] flex items-center justify-center flex-shrink-0';
export const WALLET_MODAL_ICON = 'w-10 h-10 object-contain';
export const WALLET_MODAL_NAME_WRAPPER = 'flex-1 h-14 rounded-xl border border-[var(--text)]/10 bg-[var(--bg-alt)] flex items-center justify-center px-4';
export const WALLET_MODAL_NAME = 'text-sm font-semibold text-[var(--text)]';
export const SEARCH_MODAL_INPUT_WRAPPER = 'px-4 pt-4 relative overflow-visible';
export const SEARCH_MODAL_EMPTY = 'py-4 text-center text-sm text-[var(--text)]/50';
export const DEMO_FORM_FIELD = 'flex-1 space-y-1';

export const TABS = {
  CONTAINER: 'inline-flex',
  CONTAINER_FULL: 'flex w-full',
  
  LIST: {
    default: 'flex gap-8 border-b border-[var(--text)]/10',
    pills: 'flex gap-1',
    underline: 'flex gap-8',
  },
  
  ITEM_BASE: 'relative transition-all duration-200 cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed',
  
  ITEM: {
    default: {
      base: 'pb-3 -mb-px',
      active: 'text-[var(--text)] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-px after:bg-[var(--text)]',
      inactive: 'text-[var(--text)]/30 hover:text-[var(--text)]/60',
    },
    pills: {
      base: 'px-3 py-1.5 rounded',
      active: 'bg-[var(--text)] text-[var(--bg)]',
      inactive: 'text-[var(--text)]/30 hover:text-[var(--text)]/60 hover:bg-[var(--text)]/5',
    },
    underline: {
      base: 'pb-2',
      active: 'text-[var(--text)] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-px after:bg-[var(--text)]',
      inactive: 'text-[var(--text)]/30 hover:text-[var(--text)]/50',
    },
  },
  
  SIZE: {
    sm: 'text-xs tracking-wide',
    md: 'text-sm tracking-wide',
    lg: 'text-base tracking-wide',
  },
  
  BADGE: 'ml-2 text-xs text-[var(--text)]/40',
  
  PANEL: 'pt-6',
} as const;

export const PREV_NEXT = {
  CONTAINER: 'flex items-center justify-between',
  BTN: 'flex items-center gap-2 text-sm text-[var(--text)]/40 hover:text-[var(--text)]/70 transition-colors disabled:opacity-20 disabled:cursor-not-allowed',
  ICON: 'w-4 h-4',
} as const;

export const PROGRESS_BAR = {
  TRACK: {
    xs: 'h-px bg-[var(--text)]/10 rounded-full overflow-hidden',
    sm: 'h-1 bg-[var(--text)]/10 rounded-full overflow-hidden',
    md: 'h-2 bg-[var(--text)]/10 rounded-full overflow-hidden',
  },
  FILL: 'h-full bg-[var(--accent)] transition-all duration-300',
  LABEL: {
    xs: 'text-xs text-[var(--text)]/30 mt-1',
    sm: 'text-xs text-[var(--text)]/30 mt-2',
    md: 'text-sm text-[var(--text)]/40 mt-2',
  },
} as const;

export const RADIO = {
  BASE: 'w-4 h-4 rounded-full border border-[var(--text)]/20 flex items-center justify-center flex-shrink-0 transition-colors cursor-pointer',
  CHECKED: 'border-[var(--accent)]',
  DISABLED: 'opacity-50 cursor-not-allowed',
  DOT: 'w-2 h-2 rounded-full bg-[var(--accent)]',
} as const;

export const CHECKBOX = {
  BASE: 'w-4 h-4 rounded border border-[var(--text)]/20 flex items-center justify-center flex-shrink-0 transition-colors cursor-pointer',
  CHECKED: 'border-[var(--accent)] bg-[var(--accent)]',
  DISABLED: 'opacity-50 cursor-not-allowed',
  CHECK_ICON: 'w-2.5 h-2.5 text-white',
} as const;
