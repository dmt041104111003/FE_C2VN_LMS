export const SYSTEM_CONFIG = {
  DEFAULT_CURRENCY: '₳',
  DEFAULT_LOCALE: 'vi-VN',
} as const;

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

export const getInitials = (name: string): string => {
  const parts = name.split(' ');
  const first = parts[0]?.[0] || '';
  const last = parts[parts.length - 1]?.[0] || '';
  return (first + last).toUpperCase();
};

const YOUTUBE_PATTERNS = [
  /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\s?]+)/,
  /^([a-zA-Z0-9_-]{11})$/,
] as const;

export const getYouTubeId = (url: string): string | null => {
  for (const pattern of YOUTUBE_PATTERNS) {
    const match = url.match(pattern);
    if (match?.[1]) return match[1];
  }
  return null;
};

export const VIDEO_UNAVAILABLE_TEXT = 'Video không khả dụng';
