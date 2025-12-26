'use client';

import { memo, useCallback } from 'react';
import { useToast } from './Toast';
import { COPYABLE_TEXT } from './ui.styles';
import type { CopyableTextProps } from './ui.types';

const { TRUNCATE_LENGTH, TOAST, TOOLTIP, BASE } = COPYABLE_TEXT;

const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  const half = Math.floor((maxLength - 3) / 2);
  return `${text.slice(0, half)}...${text.slice(-half)}`;
};

export const CopyableText = memo(function CopyableText({
  text,
  maxLength = TRUNCATE_LENGTH,
  className = '',
  successMessage = TOAST.SUCCESS,
}: CopyableTextProps) {
  const toast = useToast();

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success(successMessage);
    } catch {
      toast.error(TOAST.ERROR);
    }
  }, [text, toast, successMessage]);

  const displayText = truncateText(text, maxLength);
  const isTruncated = text.length > maxLength;
  const title = isTruncated ? `${text}${TOOLTIP.TRUNCATED_SUFFIX}` : TOOLTIP.DEFAULT;

  return (
    <button
      type="button"
      onClick={handleCopy}
      title={title}
      className={`${BASE} ${className}`}
    >
      {displayText}
    </button>
  );
});
