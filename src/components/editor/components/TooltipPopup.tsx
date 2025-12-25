'use client';

import { memo, useCallback } from 'react';
import { Button, Textarea } from '@/components/ui';
import { EditorModal } from './EditorModal';
import { EDITOR_LABELS } from '@/constants';
import type { TooltipPopupProps } from '@/types/editor';

function TooltipPopupComponent({
  isOpen,
  selectedText,
  tooltipText,
  onTooltipTextChange,
  onAddTooltip,
  onRemoveTooltip,
  onClose,
}: TooltipPopupProps) {
  const handleChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onTooltipTextChange(e.target.value);
  }, [onTooltipTextChange]);

  return (
    <EditorModal
      isOpen={isOpen}
      title={EDITOR_LABELS.addTooltip}
      onClose={onClose}
      footer={
        <>
          <Button variant="ghost" size="sm" onClick={onRemoveTooltip}>
            {EDITOR_LABELS.removeTooltip}
          </Button>
          <Button variant="primary" size="sm" onClick={onAddTooltip}>
            {EDITOR_LABELS.addTooltip}
          </Button>
        </>
      }
    >
      <div className="space-y-4">
        {selectedText && (
          <div className="p-3 bg-[var(--bg-alt)] rounded-lg">
            <p className="text-xs text-[var(--text)]/60 mb-1">{EDITOR_LABELS.selectedText}</p>
            <p className="text-sm text-[var(--text)]">{selectedText}</p>
          </div>
        )}
        <div className="space-y-2">
          <label className="text-sm text-[var(--text)]/60">{EDITOR_LABELS.tooltipContent}</label>
          <Textarea
            value={tooltipText}
            onChange={handleChange}
            placeholder={EDITOR_LABELS.tooltipPlaceholder}
            variant="minimal"
            rows={3}
          />
        </div>
      </div>
    </EditorModal>
  );
}

export const TooltipPopup = memo(TooltipPopupComponent);
