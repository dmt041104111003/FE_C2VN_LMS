'use client';

import { memo } from 'react';
import {
  TableRow,
  TableCell,
  StatusBadge,
  ActionDropdown,
  ActionsCell,
  UserCell,
  LockIcon,
  UnlockIcon,
  TrashIcon,
  ShieldIcon,
} from '@/components/ui';
import { ICON_SM } from '@/components/ui/ui.styles';
import { formatCode, formatDate } from '@/constants/config';
import {
  ADMIN_LABELS,
  USER_CODE_PREFIX,
  ROLE_OPTIONS,
  ROLE_LABELS,
  STATUS_LABELS,
  ROLE_BADGE_VARIANT,
  STATUS_BADGE_VARIANT,
} from '@/constants/admin';
import type { UserRowProps, UserRole } from '@/types/admin';

const LABELS = ADMIN_LABELS.users;

export const UserRow = memo(function UserRow({ index, user, onToggleStatus, onDelete, onChangeRole }: UserRowProps) {
  const isActive = user.status === 'ACTIVE';

  const dropdownItems = [
    ...ROLE_OPTIONS.filter(r => r.value && r.value !== user.role).map(role => ({
      label: role.label,
      icon: <ShieldIcon className={ICON_SM} />,
      onClick: () => onChangeRole(user.id, role.value as UserRole),
    })),
    {
      label: isActive ? LABELS.actions.ban : LABELS.actions.unban,
      icon: isActive ? <LockIcon className={ICON_SM} /> : <UnlockIcon className={ICON_SM} />,
      onClick: () => onToggleStatus(user.id, isActive),
      danger: isActive,
    },
    {
      label: LABELS.actions.delete,
      icon: <TrashIcon className={ICON_SM} />,
      onClick: () => onDelete(user.id),
      danger: true,
    },
  ];

  return (
    <TableRow mobileTitle={user.fullName}>
      <TableCell hideOnMobile>{index}</TableCell>
      <TableCell label={LABELS.table.email}>
        <span className="font-mono text-xs">{formatCode(USER_CODE_PREFIX, user.id)}</span>
      </TableCell>
      <TableCell hideOnMobile>
        <UserCell name={user.fullName} email={user.email} showAvatar={false} />
      </TableCell>
      <TableCell label={LABELS.table.role}>
        <StatusBadge variant={ROLE_BADGE_VARIANT[user.role]}>
          {ROLE_LABELS[user.role]}
        </StatusBadge>
      </TableCell>
      <TableCell label={LABELS.table.status}>
        <StatusBadge variant={STATUS_BADGE_VARIANT[user.status]}>
          {STATUS_LABELS[user.status]}
        </StatusBadge>
      </TableCell>
      <TableCell label={LABELS.table.createdAt}>{formatDate(user.createdAt)}</TableCell>
      <TableCell isActions>
        <ActionsCell>
          <ActionDropdown items={dropdownItems} label={LABELS.actions.changeRole} />
        </ActionsCell>
      </TableCell>
    </TableRow>
  );
});
