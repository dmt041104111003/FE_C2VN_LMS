'use client';

import { memo, useCallback, useMemo } from 'react';
import {
  TableRow,
  TableCell,
  StatusBadge,
  ActionDropdown,
  ActionsCell,
  CopyableText,
  TrashIcon,
} from '@/components/ui';
import { ICON_SM, COPYABLE_TEXT } from '@/components/ui/ui.styles';
import { formatCode, formatDate } from '@/constants/config';
import {
  STUDENT_TABLE_HEADERS,
  STUDENT_ACTIONS,
  STUDENT_STATUS_LABELS,
  STUDENT_STATUS_VARIANT,
  STUDENT_CODE_PREFIX,
  CERTIFICATE_STATUS_LABELS,
  CERTIFICATE_STATUS_VARIANT,
} from '@/constants/course-students';
import type { StudentRowProps } from '@/types/course-students';
import type { DropdownItem } from '@/components/ui/ui.types';

const ACTIONS = STUDENT_ACTIONS;
const HEADERS = STUDENT_TABLE_HEADERS;

export const StudentRow = memo(function StudentRow({
  index,
  student,
  onRemove,
}: StudentRowProps) {
  const handleRemove = useCallback(() => onRemove(student.id), [student.id, onRemove]);

  const isCompleted = student.status === 'completed';
  const hasCertificate = student.certificateStatus === 'issued';
  const hasWallet = Boolean(student.walletAddress);
  const isPending = isCompleted && !hasCertificate && hasWallet;

  const dropdownItems = useMemo((): DropdownItem[] => [
    {
      label: ACTIONS.remove,
      icon: <TrashIcon className={ICON_SM} />,
      onClick: handleRemove,
      danger: true,
    },
  ], [handleRemove]);

  const contactValue = student.walletAddress || student.email;

  return (
    <TableRow mobileTitle={student.fullName}>
      <TableCell hideOnMobile>{index}</TableCell>
      <TableCell label={HEADERS[1]}>
        <span className="font-mono text-xs">{formatCode(STUDENT_CODE_PREFIX, student.id)}</span>
      </TableCell>
      <TableCell hideOnMobile>
        <span className="font-medium">{student.fullName}</span>
      </TableCell>
      <TableCell label={HEADERS[3]}>
        <CopyableText
          text={contactValue}
          maxLength={24}
          successMessage={COPYABLE_TEXT.TOAST.SUCCESS}
          className="text-sm text-[var(--text)]/70"
        />
      </TableCell>
      <TableCell label={HEADERS[4]}>{formatDate(student.enrolledAt)}</TableCell>
      <TableCell label={HEADERS[5]}>
        <StatusBadge variant={STUDENT_STATUS_VARIANT[student.status]}>
          {STUDENT_STATUS_LABELS[student.status]}
        </StatusBadge>
      </TableCell>
      <TableCell label={HEADERS[6]}>
        {hasCertificate ? (
          <StatusBadge variant={CERTIFICATE_STATUS_VARIANT.issued}>
            {CERTIFICATE_STATUS_LABELS.issued}
          </StatusBadge>
        ) : isPending ? (
          <span className="text-sm text-[var(--text)]/60">{CERTIFICATE_STATUS_LABELS.pending}</span>
        ) : isCompleted && !hasWallet ? (
          <span className="text-sm text-[var(--text)]/40">Không có ví</span>
        ) : (
          <span className="text-sm text-[var(--text)]/40">—</span>
        )}
      </TableCell>
      <TableCell isActions>
        <ActionsCell>
          <ActionDropdown items={dropdownItems} />
        </ActionsCell>
      </TableCell>
    </TableRow>
  );
});
