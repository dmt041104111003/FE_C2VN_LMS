'use client';

import { memo, useMemo, useState, useCallback } from 'react';
import { UserProps } from './ui.types';
import { USER_AVATAR_SIZES } from './ui.styles';
import { getUserAvatar } from '@/utils';

const DEFAULT_MAX_DESC_LENGTH = 150;
const SHOW_MORE_BTN = 'text-[var(--accent)] hover:underline cursor-pointer ml-1';

function UserComponent({
  name,
  avatar,
  label,
  description,
  maxDescriptionLength = DEFAULT_MAX_DESC_LENGTH,
  size = 'sm',
  className = '',
}: UserProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const styles = USER_AVATAR_SIZES[size];
  
  const avatarSrc = useMemo(() => {
    return avatar || getUserAvatar({ fullName: name });
  }, [avatar, name]);

  const { truncatedDesc, needsTruncation } = useMemo(() => {
    if (!description) return { truncatedDesc: '', needsTruncation: false };
    const needs = description.length > maxDescriptionLength;
    const truncated = needs ? description.slice(0, maxDescriptionLength) + '...' : description;
    return { truncatedDesc: truncated, needsTruncation: needs };
  }, [description, maxDescriptionLength]);

  const handleToggle = useCallback(() => {
    setIsExpanded((prev) => !prev);
  }, []);

  const hasSubContent = label || description;
  const displayDesc = isExpanded ? description : truncatedDesc;

  return (
    <div className={`flex items-start ${styles.gap} ${className}`}>
      <img
        src={avatarSrc}
        alt={name}
        className={`${styles.avatar} rounded-full object-cover flex-shrink-0`}
      />
      <div className={hasSubContent ? 'flex flex-col' : ''}>
        <span className={`${styles.name} text-[var(--text)]`}>{name}</span>
        {label && (
          <span className={`${styles.label} text-[var(--text)]/50`}>{label}</span>
        )}
        {description && (
          <p className={`${styles.description} text-[var(--text)]/60 mt-1 leading-relaxed whitespace-pre-line`}>
            {displayDesc}
            {needsTruncation && (
              <span onClick={handleToggle} className={SHOW_MORE_BTN}>
                {isExpanded ? 'Thu gọn' : 'Xem thêm'}
              </span>
            )}
          </p>
        )}
      </div>
    </div>
  );
}

export const User = memo(UserComponent);
