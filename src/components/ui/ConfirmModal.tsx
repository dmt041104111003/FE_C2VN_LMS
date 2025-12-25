'use client';

import { memo, useEffect } from 'react';
import { Button } from './Button';
import type { ConfirmModalProps } from './ui.types';
import { CONFIRM_MODAL } from './ui.styles';

export const ConfirmModal = memo(function ConfirmModal({
  isOpen,
  title,
  message,
  confirmText = 'Xác nhận',
  cancelText = 'Hủy',
  danger,
  onConfirm,
  onCancel,
}: ConfirmModalProps) {
  useEffect(() => {
    if (isOpen) {
      const handleEsc = (e: KeyboardEvent) => { if (e.key === 'Escape') onCancel(); };
      document.addEventListener('keydown', handleEsc);
      document.body.style.overflow = 'hidden';
      return () => {
        document.removeEventListener('keydown', handleEsc);
        document.body.style.overflow = '';
      };
    }
  }, [isOpen, onCancel]);

  if (!isOpen) return null;

  return (
    <div className={CONFIRM_MODAL.OVERLAY} onClick={onCancel}>
      <div className={CONFIRM_MODAL.CONTAINER} onClick={e => e.stopPropagation()}>
        <div className={CONFIRM_MODAL.HEADER}>
          <h3 className={CONFIRM_MODAL.TITLE}>{title}</h3>
        </div>
        <div className={CONFIRM_MODAL.BODY}>
          <p className={CONFIRM_MODAL.MESSAGE}>{message}</p>
        </div>
        <div className={CONFIRM_MODAL.FOOTER}>
          <Button variant="secondary" onClick={onCancel}>{cancelText}</Button>
          <Button
            onClick={onConfirm}
            className={danger ? '!bg-[var(--incorrect)] hover:!opacity-90' : ''}
          >
            {confirmText}
          </Button>
        </div>
      </div>
    </div>
  );
});

