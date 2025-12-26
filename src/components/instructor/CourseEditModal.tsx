'use client';

import { memo, useState, useCallback, useEffect } from 'react';
import { Button } from '@/components/ui';
import { CONFIRM_MODAL } from '@/components/ui/ui.styles';
import { INSTRUCTOR_LABELS } from '@/constants/instructor';
import type { InstructorCourse, CourseEditData } from '@/types/instructor';

const LABELS = INSTRUCTOR_LABELS.courses;
const COMMON = INSTRUCTOR_LABELS.common;

interface CourseEditModalProps {
  isOpen: boolean;
  course: InstructorCourse | null;
  onSave: (courseId: string, data: CourseEditData) => void;
  onClose: () => void;
}

export const CourseEditModal = memo(function CourseEditModal({
  isOpen,
  course,
  onSave,
  onClose,
}: CourseEditModalProps) {
  const [title, setTitle] = useState('');

  useEffect(() => {
    if (course) {
      setTitle(course.title);
    }
  }, [course]);

  const handleSubmit = useCallback(() => {
    if (!course || !title.trim()) return;
    onSave(course.id, { title: title.trim() });
  }, [course, title, onSave]);

  const handleClose = useCallback(() => {
    setTitle('');
    onClose();
  }, [onClose]);

  if (!isOpen || !course) return null;

  const isValid = title.trim().length > 0;

  return (
    <div className={CONFIRM_MODAL.OVERLAY} onClick={handleClose}>
      <div 
        className={`${CONFIRM_MODAL.CONTAINER} max-w-md`} 
        onClick={e => e.stopPropagation()}
      >
        <div className={CONFIRM_MODAL.HEADER}>
          <h3 className={CONFIRM_MODAL.TITLE}>{LABELS.editTitle}</h3>
        </div>
        <div className={`${CONFIRM_MODAL.BODY} space-y-4`}>
          <div>
            <label className="block text-sm font-medium text-[var(--text)] mb-1">
              {LABELS.titleLabel} <span className="text-[var(--incorrect)]">*</span>
            </label>
            <input
              type="text"
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder={LABELS.titlePlaceholder}
              className="w-full px-3 py-2 border border-[var(--border)] rounded-lg text-sm focus:outline-none focus:border-[var(--accent)]"
              autoFocus
            />
          </div>
        </div>
        <div className={CONFIRM_MODAL.FOOTER}>
          <Button variant="ghost" onClick={handleClose}>
            {COMMON.cancel}
          </Button>
          <Button variant="primary" onClick={handleSubmit} disabled={!isValid}>
            {COMMON.save}
          </Button>
        </div>
      </div>
    </div>
  );
});

