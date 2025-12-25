'use client';

import { memo, useCallback } from 'react';
import { Button, Input, Textarea, CloseIcon } from '@/components/ui';
import {
  MODAL_OVERLAY,
  MODAL_CONTAINER,
  MODAL_HEADER,
  MODAL_TITLE,
  MODAL_CLOSE,
  MODAL_BODY,
} from '@/components/ui/ui.styles';
import { EDITOR_LABELS } from '@/constants';
import type { EditorModalProps, LinkModalProps, ImageModalProps } from '@/types/editor';

function EditorModalComponent({
  isOpen,
  title,
  onClose,
  children,
  footer,
}: EditorModalProps) {
  const handleOverlayClick = useCallback((e: React.MouseEvent) => {
    if (e.target === e.currentTarget) onClose();
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div className={MODAL_OVERLAY} onClick={handleOverlayClick}>
      <div className={`${MODAL_CONTAINER} max-w-md`}>
        <div className={MODAL_HEADER}>
          <h3 className={MODAL_TITLE}>{title}</h3>
          <button onClick={onClose} className={MODAL_CLOSE}>
            <CloseIcon className="w-5 h-5" />
          </button>
        </div>
        <div className={`${MODAL_BODY} px-6 items-stretch`}>
          {children}
        </div>
        {footer && (
          <div className="flex justify-end gap-3 px-6 py-4 border-t border-[var(--text)]/10">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}

export const EditorModal = memo(EditorModalComponent);

function LinkModalComponent({
  isOpen,
  url,
  onUrlChange,
  onConfirm,
  onClose,
}: LinkModalProps) {
  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    onUrlChange(e.target.value);
  }, [onUrlChange]);

  return (
    <EditorModal
      isOpen={isOpen}
      title={EDITOR_LABELS.addLink}
      onClose={onClose}
      footer={
        <>
          <Button variant="ghost" size="sm" onClick={onClose}>
            {EDITOR_LABELS.cancel}
          </Button>
          <Button variant="primary" size="sm" onClick={onConfirm}>
            {EDITOR_LABELS.confirm}
          </Button>
        </>
      }
    >
      <div className="space-y-2">
        <label className="text-sm text-[var(--text)]/60">{EDITOR_LABELS.linkUrl}</label>
        <Input
          value={url}
          onChange={handleChange}
          placeholder={EDITOR_LABELS.linkPlaceholder}
          variant="minimal"
          autoFocus
        />
      </div>
    </EditorModal>
  );
}

export const LinkModal = memo(LinkModalComponent);

function ImageModalComponent({
  isOpen,
  url,
  onUrlChange,
  onConfirm,
  onClose,
}: ImageModalProps) {
  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    onUrlChange(e.target.value);
  }, [onUrlChange]);

  return (
    <EditorModal
      isOpen={isOpen}
      title={EDITOR_LABELS.addImage}
      onClose={onClose}
      footer={
        <>
          <Button variant="ghost" size="sm" onClick={onClose}>
            {EDITOR_LABELS.cancel}
          </Button>
          <Button variant="primary" size="sm" onClick={onConfirm}>
            {EDITOR_LABELS.confirm}
          </Button>
        </>
      }
    >
      <div className="space-y-2">
        <label className="text-sm text-[var(--text)]/60">{EDITOR_LABELS.imageUrl}</label>
        <Input
          value={url}
          onChange={handleChange}
          placeholder={EDITOR_LABELS.imagePlaceholder}
          variant="minimal"
          autoFocus
        />
      </div>
    </EditorModal>
  );
}

export const ImageModal = memo(ImageModalComponent);
