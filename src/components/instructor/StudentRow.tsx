'use client';

import { memo, useCallback } from 'react';
import {
  TableRow,
  TableCell,
  StatusBadge,
  ActionDropdown,
  ActionsCell,
  EditIcon,
  TrashIcon,
} from '@/components/ui';
import { ICON_SM } from '@/components/ui/ui.styles';
import { formatCode, formatDate } from '@/constants/config';
import {
  STUDENT_TABLE_HEADERS,
  STUDENT_ACTIONS,
  STUDENT_STATUS_LABELS,
  STUDENT_STATUS_VARIANT,
  STUDENT_CODE_PREFIX,
} from '@/constants/course-students';
import type { StudentRowProps } from '@/types/course-students';

const ACTIONS = STUDENT_ACTIONS;
const HEADERS = STUDENT_TABLE_HEADERS;

export const StudentRow = memo(function StudentRow({
  index,
  student,
  onEdit,
  onRemove,
}: StudentRowProps) {
  const handleEdit = useCallback(() => {
    onEdit(student.id);
  }, [student.id, onEdit]);

  const handleRemove = useCallback(() => {
    onRemove(student.id);
  }, [student.id, onRemove]);

  const dropdownItems = [
    {
      label: ACTIONS.edit,
      icon: <EditIcon className={ICON_SM} />,
      onClick: handleEdit,
    },
    {
      label: ACTIONS.remove,
      icon: <TrashIcon className={ICON_SM} />,
      onClick: handleRemove,
      danger: true,
    },
  ];

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
        <span className="text-sm text-[var(--text)]/70">{student.email}</span>
      </TableCell>
      <TableCell label={HEADERS[4]}>{formatDate(student.enrolledAt)}</TableCell>
      <TableCell label={HEADERS[5]}>
        <StatusBadge variant={STUDENT_STATUS_VARIANT[student.status]}>
          {STUDENT_STATUS_LABELS[student.status]}
        </StatusBadge>
      </TableCell>
      <TableCell isActions>
        <ActionsCell>
          <ActionDropdown items={dropdownItems} />
        </ActionsCell>
      </TableCell>
    </TableRow>
  );
});
