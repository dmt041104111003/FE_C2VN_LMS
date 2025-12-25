'use client';

import { memo, useCallback } from 'react';
import {
  TableRow,
  TableCell,
  StatusBadge,
  ActionButton,
  ActionDropdown,
  ActionsCell,
  UserCell,
  LockIcon,
  UnlockIcon,
  TrashIcon,
  ShieldIcon,
} from '@/components/ui';
import {
  ADMIN_LABELS,
  ROLE_OPTIONS,
  ROLE_LABELS,
  STATUS_LABELS,
  ROLE_BADGE_VARIANT,
  STATUS_BADGE_VARIANT,
  formatDate,
} from '@/constants/admin';
import type { UserRowProps, UserRole } from '@/types/admin';

const LABELS = ADMIN_LABELS.users;

export const UserRow = memo(function UserRow({ user, onToggleStatus, onDelete, onChangeRole }: UserRowProps) {
  const isActive = user.status === 'ACTIVE';

  const handleToggleStatus = useCallback(() => {
    onToggleStatus(user.id, isActive);
  }, [user.id, isActive, onToggleStatus]);

  const dropdownItems = [
    ...ROLE_OPTIONS.filter(r => r.value && r.value !== user.role).map(role => ({
      label: role.label,
      icon: <ShieldIcon className="w-4 h-4" />,
      onClick: () => onChangeRole(user.id, role.value as UserRole),
    })),
    {
      label: LABELS.actions.delete,
      icon: <TrashIcon className="w-4 h-4" />,
      onClick: () => onDelete(user.id),
      danger: true,
    },
  ];

  return (
    <TableRow>
      <TableCell>
        <UserCell name={user.fullName} email={user.email} showAvatar={false} />
      </TableCell>
      <TableCell>
        <StatusBadge variant={ROLE_BADGE_VARIANT[user.role]}>
          {ROLE_LABELS[user.role]}
        </StatusBadge>
      </TableCell>
      <TableCell>
        <StatusBadge variant={STATUS_BADGE_VARIANT[user.status]}>
          {STATUS_LABELS[user.status]}
        </StatusBadge>
      </TableCell>
      <TableCell>{formatDate(user.createdAt)}</TableCell>
      <TableCell>
        <ActionsCell>
          <ActionButton
            icon={isActive ? <LockIcon className="w-4 h-4" /> : <UnlockIcon className="w-4 h-4" />}
            onClick={handleToggleStatus}
            title={isActive ? LABELS.actions.ban : LABELS.actions.unban}
          />
          <ActionDropdown items={dropdownItems} label={LABELS.actions.changeRole} />
        </ActionsCell>
      </TableCell>
    </TableRow>
  );
});
