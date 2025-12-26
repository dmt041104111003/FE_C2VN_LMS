export const SYSTEM_CONFIG = {
  DEFAULT_CURRENCY: '₳',
  DEFAULT_LOCALE: 'vi-VN',
  DEFAULT_TIMEZONE: 'Asia/Ho_Chi_Minh',
  FONT_SANS: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif',
  FONT_MONO: 'ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, "Liberation Mono", monospace',
  FONT_SIZE_BASE: '16px',
} as const;

export const DATE_FORMAT = {
  DATE: { day: '2-digit', month: '2-digit', year: 'numeric' },
  TIME: { hour: '2-digit', minute: '2-digit', hour12: false },
  DATETIME: { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit', hour12: false },
  FULL: { weekday: 'long', day: '2-digit', month: '2-digit', year: 'numeric' },
} as const;

const createFormatter = (options: Intl.DateTimeFormatOptions): Intl.DateTimeFormat => {
  return new Intl.DateTimeFormat(SYSTEM_CONFIG.DEFAULT_LOCALE, {
    ...options,
    timeZone: SYSTEM_CONFIG.DEFAULT_TIMEZONE,
  });
};

const dateFormatter = createFormatter(DATE_FORMAT.DATE as Intl.DateTimeFormatOptions);
const timeFormatter = createFormatter(DATE_FORMAT.TIME as Intl.DateTimeFormatOptions);
const dateTimeFormatter = createFormatter(DATE_FORMAT.DATETIME as Intl.DateTimeFormatOptions);
const fullFormatter = createFormatter(DATE_FORMAT.FULL as Intl.DateTimeFormatOptions);

export const formatDate = (date: Date | string | number): string => {
  return dateFormatter.format(new Date(date));
};

export const formatTime = (date: Date | string | number): string => {
  return timeFormatter.format(new Date(date));
};

export const formatDateTime = (date: Date | string | number): string => {
  return dateTimeFormatter.format(new Date(date));
};

export const formatFullDate = (date: Date | string | number): string => {
  return fullFormatter.format(new Date(date));
};

export const getRelativeTime = (date: Date | string | number): string => {
  const now = new Date();
  const target = new Date(date);
  const diffMs = now.getTime() - target.getTime();
  const diffSec = Math.floor(diffMs / 1000);
  const diffMin = Math.floor(diffSec / 60);
  const diffHour = Math.floor(diffMin / 60);
  const diffDay = Math.floor(diffHour / 24);
  const diffWeek = Math.floor(diffDay / 7);
  const diffMonth = Math.floor(diffDay / 30);
  const diffYear = Math.floor(diffDay / 365);

  if (diffSec < 60) return 'Vừa xong';
  if (diffMin < 60) return `${diffMin} phút trước`;
  if (diffHour < 24) return `${diffHour} giờ trước`;
  if (diffDay < 7) return `${diffDay} ngày trước`;
  if (diffWeek < 4) return `${diffWeek} tuần trước`;
  if (diffMonth < 12) return `${diffMonth} tháng trước`;
  if (diffYear >= 1) return `${diffYear} năm trước`;
  return formatDate(date);
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

export const DEFAULT_PAGE_SIZE = 10;
const CODE_PAD_LENGTH = 3;

export const formatCode = (prefix: string, id: string): string => 
  `${prefix}${id.padStart(CODE_PAD_LENGTH, '0')}`;

const YOUTUBE_PATTERNS = [
  /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\s?]+)/,
  /^([a-zA-Z0-9_-]{11})$/,
] as const;

export const getYouTubeId = (url?: string): string | null => {
  if (!url) return null;
  const decoded = isObfuscated(url) ? deobfuscateVideoUrl(url) : url;
  for (const pattern of YOUTUBE_PATTERNS) {
    const match = decoded.match(pattern);
    if (match?.[1]) return match[1];
  }
  return null;
};

export const VIDEO_UNAVAILABLE_TEXT = 'Video không khả dụng';

const OBFUSCATE_PREFIX = 'v1:';

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

export const isObfuscated = (url?: string): boolean => {
  return url?.startsWith(OBFUSCATE_PREFIX) ?? false;
};

export const YOUTUBE_PLAYER_VARS = {
  autoplay: 1,
  rel: 0,
  modestbranding: 1,
  disablekb: 0,
  fs: 1,
  iv_load_policy: 3,
  playsinline: 1,
} as const;
