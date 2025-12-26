'use client';

import { memo, useCallback } from 'react';
import {
  TableRow,
  TableCell,
  StatusBadge,
  ActionButton,
  ActionDropdown,
  ActionsCell,
  EditIcon,
  TrashIcon,
  EyeIcon,
  EyeOffIcon,
  UsersIcon,
  ListIcon,
} from '@/components/ui';
import { ICON_SM } from '@/components/ui/ui.styles';
import { formatCode, formatCurrency, formatDate } from '@/constants/config';
import { COURSE_TABLE, COURSE_STATUS_LABELS, COURSE_STATUS_VARIANT } from '@/constants/instructor';
import type { CourseRowProps } from '@/types/instructor';

const ACTIONS = COURSE_TABLE.actions;
const HEADERS = COURSE_TABLE.headers;
const COURSE_CODE_PREFIX = 'KH';

export const CourseRow = memo(function CourseRow({ index, course, onEdit, onDelete, onToggleStatus, onAddStudent, onViewStudents }: CourseRowProps) {
  const isPublished = course.status === 'published';

  const handleToggleStatus = useCallback(() => {
    onToggleStatus(course.id, isPublished);
  }, [course.id, isPublished, onToggleStatus]);

  const handleAddStudent = useCallback(() => {
    onAddStudent(course.id, course.title);
  }, [course.id, course.title, onAddStudent]);

  const handleViewStudents = useCallback(() => {
    onViewStudents(course.id);
  }, [course.id, onViewStudents]);

  const dropdownItems = [
    {
      label: ACTIONS.viewStudents,
      icon: <ListIcon className={ICON_SM} />,
      onClick: handleViewStudents,
    },
    {
      label: ACTIONS.addStudent,
      icon: <UsersIcon className={ICON_SM} />,
      onClick: handleAddStudent,
    },
    {
      label: ACTIONS.edit,
      icon: <EditIcon className={ICON_SM} />,
      onClick: () => onEdit(course.id),
    },
    {
      label: ACTIONS.delete,
      icon: <TrashIcon className={ICON_SM} />,
      onClick: () => onDelete(course.id),
      danger: true,
    },
  ];

  return (
    <TableRow mobileTitle={course.title}>
      <TableCell hideOnMobile>{index}</TableCell>
      <TableCell label={HEADERS[1]}>
        <span className="font-mono text-xs">{formatCode(COURSE_CODE_PREFIX, course.id)}</span>
      </TableCell>
      <TableCell hideOnMobile>
        <span className="font-medium">{course.title}</span>
      </TableCell>
      <TableCell label={HEADERS[3]}>{course.students.toLocaleString('vi-VN')}</TableCell>
      <TableCell label={HEADERS[4]}>{formatCurrency(course.revenue)}</TableCell>
      <TableCell label={HEADERS[5]}>
        <StatusBadge variant={COURSE_STATUS_VARIANT[course.status]}>
          {COURSE_STATUS_LABELS[course.status]}
        </StatusBadge>
      </TableCell>
      <TableCell label={HEADERS[6]}>{formatDate(course.updatedAt)}</TableCell>
      <TableCell isActions>
        <ActionsCell>
          <ActionButton
            icon={isPublished ? <EyeOffIcon className={ICON_SM} /> : <EyeIcon className={ICON_SM} />}
            onClick={handleToggleStatus}
            title={isPublished ? ACTIONS.unpublish : ACTIONS.publish}
          />
          <ActionDropdown items={dropdownItems} />
        </ActionsCell>
      </TableCell>
    </TableRow>
  );
});
