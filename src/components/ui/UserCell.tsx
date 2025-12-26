'use client';

import { memo } from 'react';
import type { UserCellProps } from './ui.types';
import { USER_CELL } from './ui.styles';
import { CopyableText } from './CopyableText';

export const UserCell = memo(function UserCell({ 
  name, 
  email, 
  avatar, 
  showAvatar = true,
  copyable = false,
  copySuccessMessage,
}: UserCellProps) {
  const initials = name.split(' ').map(n => n[0]).slice(0, 2).join('').toUpperCase();
  
  return (
    <div className={USER_CELL.CONTAINER}>
      {showAvatar && (
        <div className={USER_CELL.AVATAR}>
          {avatar ? <img src={avatar} alt="" className="w-full h-full object-cover" /> : initials}
        </div>
      )}
      <div className={USER_CELL.INFO}>
        <div className={USER_CELL.NAME}>{name}</div>
        {copyable ? (
          <CopyableText 
            text={email} 
            maxLength={24} 
            className={USER_CELL.EMAIL}
            successMessage={copySuccessMessage}
          />
        ) : (
          <div className={USER_CELL.EMAIL}>{email}</div>
        )}
      </div>
    </div>
  );
});
