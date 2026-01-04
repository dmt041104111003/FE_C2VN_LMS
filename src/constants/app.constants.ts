export const ROUTES = {
  HOME: '/',
  COURSES: '/courses',
  COURSE_DETAIL: '/courses',
  PROFILE: '/profile',
  PROFILE_EDIT: '/profile/edit',
  PROFILE_INBOX: '/profile/inbox',
  CERTIFICATES: '/certificates',
  LOGIN: '/auth/login',
  REGISTER: '/auth/register',
  VERIFY_EMAIL: '/auth/verify-email',
  FORGOT_PASSWORD: '/auth/forgot-password',
  RESET_PASSWORD: '/auth/reset-password',
  CHANGE_PASSWORD: '/auth/change-password',
  ADMIN: '/admin',
  INSTRUCTOR: '/instructor',
  ABOUT: '/about',
  PROJECT: '/project',
  CATALYST: '/catalyst',
  PRIVACY: '/privacy',
  TERMS: '/terms',
  DOCS: '/docs',
  BLOG: '/blog',
  FAQ: '/faq',
  FORUM: '/forum',
  VERIFY_CERTIFICATE: '/verify',
} as const;

export const NAV_ITEMS = [
  { label: 'Trang chủ', href: ROUTES.HOME },
  {
    label: 'Khóa học',
    href: ROUTES.COURSES,
    children: [
      { label: 'Tất cả khóa học', href: ROUTES.COURSES },
      { label: 'Khóa học miễn phí', href: `${ROUTES.COURSES}?price=free` },
      { label: 'Khóa học trả phí', href: `${ROUTES.COURSES}?price=paid` },
    ],
  },
  {
    label: 'Tài nguyên',
    href: ROUTES.DOCS,
    children: [
      { label: 'Tài liệu', href: ROUTES.DOCS },
      { label: 'Bài viết', href: ROUTES.BLOG },
      { label: 'Xác minh chứng chỉ', href: ROUTES.VERIFY_CERTIFICATE },
    ],
  },
  {
    label: 'Cộng đồng',
    href: ROUTES.FORUM,
    children: [
      { label: 'Diễn đàn', href: ROUTES.FORUM },
      { label: 'Sự kiện', href: '/events' },
      { label: 'Dự án Catalyst', href: ROUTES.CATALYST },
    ],
  },
  { label: 'Về chúng tôi', href: 'https://cardano2vn.io' },
] as const;

export const FOOTER_CONFIG = {
  resources: [
    { label: 'Tài liệu', href: ROUTES.DOCS },
    { label: 'GitHub', href: 'https://github.com/cardano2vn' },
    { label: 'Bài viết', href: ROUTES.BLOG },
  ],
  support: [
    { label: 'Cộng đồng', href: 'https://t.me/cardano2vn' },
    { label: 'Câu hỏi thường gặp', href: ROUTES.FAQ },
  ],
  social: [
    { label: 'GitHub', href: 'https://github.com/cardano2vn', icon: 'github' },
    { label: 'YouTube', href: 'https://youtube.com/@cardano2vn', icon: 'youtube' },
    { label: 'X', href: 'https://x.com/cardano2vn', icon: 'x' },
    { label: 'Telegram', href: 'https://t.me/cardano2vn', icon: 'telegram' },
  ],
  labels: {
    title: 'Theo dõi hành trình',
    description: 'Tham gia cộng đồng C2VN để cập nhật tin tức, chia sẻ kiến thức và kết nối với những người cùng đam mê blockchain.',
    resourcesTitle: 'Tài nguyên',
    supportTitle: 'Hỗ trợ',
    copyright: '© 2025 C2VN.',
    terms: 'Điều khoản',
    privacy: 'Chính sách',
  },
} as const;

export const AUTH_TEXT = { login: 'Đăng nhập' } as const;

export const APP_DOWNLOAD = {
  label: 'Tải app C2VN',
  appStore: 'App Store',
  android: 'Android',
} as const;

export const FOOTER_RESOURCES = FOOTER_CONFIG.resources;
export const FOOTER_SUPPORT = FOOTER_CONFIG.support;
export const SOCIAL_LINKS = FOOTER_CONFIG.social;
export const FOOTER_LABELS = FOOTER_CONFIG.labels;

export const SYSTEM_CONFIG = {
  DEFAULT_CURRENCY: '₳',
  DEFAULT_LOCALE: 'vi-VN',
  DEFAULT_TIMEZONE: 'Asia/Ho_Chi_Minh',
  FONT_SANS: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif',
  FONT_MONO: 'ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, "Liberation Mono", monospace',
  FONT_SIZE_BASE: '16px',
} as const;

export const DEFAULT_PAGE_SIZE = 10;

export const DATE_FORMAT = {
  DATE: { day: '2-digit', month: '2-digit', year: 'numeric' },
  TIME: { hour: '2-digit', minute: '2-digit', hour12: false },
  DATETIME: { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit', hour12: false },
  FULL: { weekday: 'long', day: '2-digit', month: '2-digit', year: 'numeric' },
} as const;

const createFormatter = (options: Intl.DateTimeFormatOptions): Intl.DateTimeFormat =>
  new Intl.DateTimeFormat(SYSTEM_CONFIG.DEFAULT_LOCALE, {
    ...options,
    timeZone: SYSTEM_CONFIG.DEFAULT_TIMEZONE,
  });

const dateFormatter = createFormatter(DATE_FORMAT.DATE as Intl.DateTimeFormatOptions);
const timeFormatter = createFormatter(DATE_FORMAT.TIME as Intl.DateTimeFormatOptions);
const dateTimeFormatter = createFormatter(DATE_FORMAT.DATETIME as Intl.DateTimeFormatOptions);
const fullFormatter = createFormatter(DATE_FORMAT.FULL as Intl.DateTimeFormatOptions);

const DEFAULT_DATE_STRING = '-';

const toSafeDate = (date: Date | string | number | null | undefined): Date | null => {
  if (!date && date !== 0) return null;
  const parsed = new Date(date);
  return isNaN(parsed.getTime()) ? null : parsed;
};

export const formatDate = (date: Date | string | number | null | undefined): string => {
  const safeDate = toSafeDate(date);
  return safeDate ? dateFormatter.format(safeDate) : DEFAULT_DATE_STRING;
};

export const formatTime = (date: Date | string | number | null | undefined): string => {
  const safeDate = toSafeDate(date);
  return safeDate ? timeFormatter.format(safeDate) : DEFAULT_DATE_STRING;
};

export const formatDateTime = (date: Date | string | number | null | undefined): string => {
  const safeDate = toSafeDate(date);
  return safeDate ? dateTimeFormatter.format(safeDate) : DEFAULT_DATE_STRING;
};

export const formatFullDate = (date: Date | string | number | null | undefined): string => {
  const safeDate = toSafeDate(date);
  return safeDate ? fullFormatter.format(safeDate) : DEFAULT_DATE_STRING;
};

export const getRelativeTime = (date: Date | string | number | null | undefined): string => {
  const target = toSafeDate(date);
  if (!target) return DEFAULT_DATE_STRING;
  
  const diffMs = Date.now() - target.getTime();
  const diffSec = Math.floor(diffMs / 1000);
  const diffMin = Math.floor(diffSec / 60);
  const diffHour = Math.floor(diffMin / 60);
  const diffDay = Math.floor(diffHour / 24);

  if (diffSec < 60) return 'Vừa xong';
  if (diffMin < 60) return `${diffMin} phút trước`;
  if (diffHour < 24) return `${diffHour} giờ trước`;
  if (diffDay < 7) return `${diffDay} ngày trước`;
  if (diffDay < 30) return `${Math.floor(diffDay / 7)} tuần trước`;
  if (diffDay < 365) return `${Math.floor(diffDay / 30)} tháng trước`;
  return `${Math.floor(diffDay / 365)} năm trước`;
};

export const formatCurrency = (amount: number, currency?: string): string => {
  const symbol = currency || SYSTEM_CONFIG.DEFAULT_CURRENCY;
  return `${amount.toLocaleString(SYSTEM_CONFIG.DEFAULT_LOCALE)} ${symbol}`;
};

export const formatDuration = (minutes: number): string => {
  if (minutes < 60) return `${minutes}m`;
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`;
};

export const formatCountdown = (seconds: number): string => {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, '0')}`;
};

export const getInitials = (name: string): string => {
  const parts = name.split(' ');
  const first = parts[0]?.[0] || '';
  const last = parts[parts.length - 1]?.[0] || '';
  return (first + last).toUpperCase();
};

const CODE_PAD_LENGTH = 3;
export const formatCode = (prefix: string, id: string): string =>
  `${prefix}${id.padStart(CODE_PAD_LENGTH, '0')}`;

const YOUTUBE_PATTERNS = [
  /(?:youtube\.com|youtu\.be).*[?&]v=([a-zA-Z0-9_-]{11})/,
  /youtu\.be\/([a-zA-Z0-9_-]{11})/,
  /youtube\.com\/embed\/([a-zA-Z0-9_-]{11})/,
  /youtube\.com\/v\/([a-zA-Z0-9_-]{11})/,
  /youtube\.com\/shorts\/([a-zA-Z0-9_-]{11})/,
  /youtube\.com\/live\/([a-zA-Z0-9_-]{11})/,
  /^([a-zA-Z0-9_-]{11})$/,
] as const;

const OBFUSCATE_PREFIX = 'v1:';

export const isObfuscated = (url?: string): boolean => url?.startsWith(OBFUSCATE_PREFIX) ?? false;

export const obfuscateVideoUrl = (url: string): string => {
  if (typeof window === 'undefined') {
    return OBFUSCATE_PREFIX + Buffer.from(url).toString('base64');
  }
  return OBFUSCATE_PREFIX + btoa(url);
};

export const deobfuscateVideoUrl = (encoded: string): string => {
  const data = encoded.slice(OBFUSCATE_PREFIX.length);
  if (typeof window === 'undefined') {
    return Buffer.from(data, 'base64').toString('utf-8');
  }
  return atob(data);
};

export const getYouTubeId = (url?: string): string | null => {
  if (!url) return null;
  const trimmed = url.trim();
  const decoded = isObfuscated(trimmed) ? deobfuscateVideoUrl(trimmed) : trimmed;
  for (const pattern of YOUTUBE_PATTERNS) {
    const match = decoded.match(pattern);
    if (match?.[1]) return match[1];
  }
  return null;
};

export const isYouTubeUrl = (url?: string): boolean => getYouTubeId(url) !== null;

export const VIDEO_UNAVAILABLE_TEXT = 'Video không khả dụng';

export const YOUTUBE_PLAYER_VARS = {
  autoplay: 0,
  rel: 0,
  modestbranding: 1,
  disablekb: 1,
  fs: 1,
  iv_load_policy: 3,
  playsinline: 1,
  controls: 1,
} as const;

export const VIDEO_SEEK_TOLERANCE_SECONDS = 3;
export const VIDEO_CHECK_INTERVAL_MS = 500;

export const API_BASE_URL = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:8080';

export const API_ENDPOINTS = {
  AUTH: {
    TOKEN: '/api/auth/token',
    REGISTER: '/api/auth/register',
    VERIFY_EMAIL: '/api/auth/verify-email',
    RESEND_CODE: '/api/auth/resend-code',
    FORGOT_PASSWORD: '/api/auth/forgot-password',
    RESET_PASSWORD: '/api/auth/reset-password',
    LOGOUT: '/api/auth/logout',
    INTROSPECT: '/api/auth/introspect',
    REFRESH: '/api/auth/refresh',
  },
  NONCE: '/api/nonce',
  USERS: {
    BASE: '/api/users',
    MY_INFO: '/api/users/my-info',
    UPDATE_PROFILE: '/api/users/me/profile',
    CHANGE_PASSWORD: '/api/users/me/password',
    BY_EMAIL: '/api/users/by-email',
    BY_ID: (userId: string) => `/api/users/${userId}`,
    BAN: (userId: string) => `/api/users/${userId}/ban`,
    UNBAN: (userId: string) => `/api/users/${userId}/unban`,
    UPDATE_ROLE: (userId: string) => `/api/users/updateRole/${userId}`,
    DELETE: (userId: string) => `/api/users/${userId}`,
  },
  OAUTH: {
    GOOGLE: '/oauth2/authorization/google',
    GITHUB: '/oauth2/authorization/github',
  },
} as const;

export const API_ERROR_MESSAGES = {
  CONNECTION_ERROR: 'Không thể kết nối đến server',
  DEFAULT_ERROR: 'Đã có lỗi xảy ra',
} as const;

export const IS_PROTECTION_ENABLED =
  process.env.NODE_ENV === 'production' ||
  process.env.PROTECTION === 'true';

export const BLOCKED_CTRL_KEYS = new Set(['s', 'u', 'p', 'c', 'a']);
export const BLOCKED_CTRL_SHIFT_KEYS = new Set(['i', 'j', 'c', 's']);
export const BLOCKED_KEYS = new Set(['F12', 'PrintScreen', 'F3']);
export const EDITABLE_TAGS = new Set(['INPUT', 'TEXTAREA']);
export const DEVTOOLS_THRESHOLD = 160;
