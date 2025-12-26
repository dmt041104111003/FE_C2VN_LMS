'use client';

import { memo, useCallback } from 'react';
import {
  TableRow,
  TableCell,
  StatusBadge,
  ActionDropdown,
  ActionsCell,
  EyeIcon,
  EyeOffIcon,
  ListIcon,
  InfoIcon,
} from '@/components/ui';
import { ICON_SM } from '@/components/ui/ui.styles';
import { formatCode, formatCurrency } from '@/constants/config';
import { COURSE_TABLE, COURSE_STATUS_LABELS, COURSE_STATUS_VARIANT, COURSE_CODE_PREFIX } from '@/constants/instructor';
import type { CourseRowProps } from '@/types/instructor';

const ACTIONS = COURSE_TABLE.actions;
const HEADERS = COURSE_TABLE.headers;

export const CourseRow = memo(function CourseRow({ index, course, onViewDetails, onToggleStatus, onViewStudents }: CourseRowProps) {
  const isPublished = course.status === 'published';

  const handleToggleStatus = useCallback(() => {
    onToggleStatus(course.id, isPublished);
  }, [course.id, isPublished, onToggleStatus]);

  const handleViewStudents = useCallback(() => {
    onViewStudents(course.id);
  }, [course.id, onViewStudents]);

  const handleViewDetails = useCallback(() => {
    onViewDetails(course.id);
  }, [course.id, onViewDetails]);

  const dropdownItems = [
    {
      label: ACTIONS.viewDetails,
      icon: <InfoIcon className={ICON_SM} />,
      onClick: handleViewDetails,
    },
    {
      label: ACTIONS.viewStudents,
      icon: <ListIcon className={ICON_SM} />,
      onClick: handleViewStudents,
    },
    {
      label: isPublished ? ACTIONS.unpublish : ACTIONS.publish,
      icon: isPublished ? <EyeOffIcon className={ICON_SM} /> : <EyeIcon className={ICON_SM} />,
      onClick: handleToggleStatus,
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
      <TableCell label={HEADERS[6]}>
        {course.completedCount > 0 ? (
          <span className="text-sm">
            {course.completedCount}
            {course.pendingCertificateCount > 0 && (
              <span className="text-[var(--text)]/50 ml-1">
                ({course.pendingCertificateCount} {COURSE_TABLE.pendingLabel})
              </span>
            )}
          </span>
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
