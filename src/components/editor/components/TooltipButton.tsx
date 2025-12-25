'use client';

import { memo, useState, useCallback, useEffect, useMemo } from 'react';
import { InfoIcon } from '@/components/ui';
import { TooltipPopup } from './TooltipPopup';
import {
  useTooltipSelection,
  useTooltipEvents,
  useTooltipActions,
  useLockedTexts,
} from '../hooks';
import * as S from '../editor.styles';
import { TOOLBAR_TITLES, MENU_STYLES, hasTooltipMark, getSelectionInfo } from '@/constants';
import type { TooltipButtonProps, TooltipBadgesProps } from '@/types/editor';

function TooltipBadgesComponent({ lockedTextsSize, tooltipCount }: TooltipBadgesProps) {
  if (lockedTextsSize === 0 && tooltipCount === 0) return null;
  
  const badges = [
    lockedTextsSize > 0 && { key: 'locked', value: lockedTextsSize, style: S.TOOLTIP.BADGE_LOCKED },
    tooltipCount > 0 && { key: 'count', value: tooltipCount, style: S.TOOLTIP.BADGE_COUNT },
  ].filter(Boolean) as { key: string; value: number; style: string }[];

  return (
    <div className="absolute -top-1 -right-1 flex gap-0.5">
      {badges.map(({ key, value, style }) => (
        <span key={key} className={`${S.TOOLTIP.BADGE} ${style}`}>{value}</span>
      ))}
    </div>
  );
}

const TooltipBadges = memo(TooltipBadgesComponent);

function TooltipButtonComponent({ editor }: TooltipButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [tooltipText, setTooltipText] = useState('');
  const [tooltipCount, setTooltipCount] = useState(0);

  const selectedText = useTooltipSelection(editor);
  useTooltipEvents(editor, setTooltipText, setIsOpen);
  const { addTooltip, removeTooltip, unlockText, lockText } = useTooltipActions(editor);
  const { lockedTexts, addLockedText, removeLockedText } = useLockedTexts(editor);

  const selection = useMemo(() => getSelectionInfo(editor), [editor.state.selection]);
  const hasTooltip = useMemo(
    () => selection.hasSelection && hasTooltipMark(editor, selection.from, selection.to),
    [editor, selection]
  );

  const resetState = useCallback((text: string) => {
    removeLockedText(text);
    unlockText(selection.from, selection.to);
  }, [removeLockedText, unlockText, selection.from, selection.to]);

  const handleAddTooltip = useCallback(() => {
    if (!tooltipText.trim() || !selection.hasSelection) return;

    addTooltip(tooltipText);
    setTooltipText('');
    setIsOpen(false);
    resetState(selection.text);
    setTooltipCount((c) => c + 1);
  }, [tooltipText, selection, addTooltip, resetState]);

  const handleRemoveTooltip = useCallback(() => {
    removeTooltip();
    setIsOpen(false);
    resetState(selection.text);
  }, [removeTooltip, resetState, selection.text]);

  const handleButtonClick = useCallback(() => {
    if (!selection.hasSelection || hasTooltip) return;

    const isLocked = lockedTexts.has(selection.text);
    
    if (isLocked) {
      resetState(selection.text);
    } else {
      addLockedText(selection.text, selection.from, selection.to);
      lockText();
      setIsOpen(true);
    }
  }, [selection, hasTooltip, lockedTexts, resetState, addLockedText, lockText]);

  const handleClose = useCallback(() => {
    setIsOpen(false);
    setTooltipText('');
  }, []);

  useEffect(() => {
    if (lockedTexts.size === 0) return;

    const onSelectionUpdate = () => {
      const sel = getSelectionInfo(editor);
      if (sel.hasSelection && lockedTexts.has(sel.text)) {
        editor.commands.setTextSelection({ from: sel.from, to: sel.to });
      }
    };

    editor.on('selectionUpdate', onSelectionUpdate);
    return () => { editor.off('selectionUpdate', onSelectionUpdate); };
  }, [lockedTexts, editor]);

  const isDisabled = !selection.hasSelection || hasTooltip;

  return (
    <div className="relative">
      <button
        onClick={handleButtonClick}
        disabled={isDisabled}
        className={MENU_STYLES.BTN}
        title={isDisabled ? TOOLBAR_TITLES.tooltipDisabled : TOOLBAR_TITLES.tooltip}
      >
        <InfoIcon className={MENU_STYLES.ICON} />
      </button>
      <TooltipBadges lockedTextsSize={lockedTexts.size} tooltipCount={tooltipCount} />

      <TooltipPopup
        isOpen={isOpen}
        selectedText={selectedText}
        tooltipText={tooltipText}
        onTooltipTextChange={setTooltipText}
        onAddTooltip={handleAddTooltip}
        onRemoveTooltip={handleRemoveTooltip}
        onClose={handleClose}
      />
    </div>
  );
}

export const TooltipButton = memo(TooltipButtonComponent);
