'use client';

import { memo, useMemo } from 'react';
import { UserProps } from './ui.types';
import { USER_AVATAR_SIZES } from './ui.styles';
import { getAvatarFromName } from '@/utils';

function UserComponent({
  name,
  avatar,
  label,
  size = 'sm',
  className = '',
}: UserProps) {
  const styles = USER_AVATAR_SIZES[size];
  
  const avatarSrc = useMemo(() => {
    return avatar || getAvatarFromName(name);
  }, [avatar, name]);

  return (
    <div className={`flex items-center ${styles.gap} ${className}`}>
      <img
        src={avatarSrc}
        alt={name}
        className={`${styles.avatar} rounded-full object-cover`}
      />
      <div className={label ? 'flex flex-col' : ''}>
        <span className={`${styles.name} text-[var(--text)]/70`}>{name}</span>
        {label && (
          <span className={`${styles.label} text-[var(--text)]/50`}>{label}</span>
        )}
      </div>
    </div>
  );
}

export const User = memo(UserComponent);

