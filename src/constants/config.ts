export const SYSTEM_CONFIG = {
  DEFAULT_CURRENCY: '₳',
  DEFAULT_LOCALE: 'vi-VN',
} as const;

export const formatCurrency = (amount: number, currency?: string): string => {
  const symbol = currency || SYSTEM_CONFIG.DEFAULT_CURRENCY;
  return `${amount.toLocaleString(SYSTEM_CONFIG.DEFAULT_LOCALE)} ${symbol}`;
};

