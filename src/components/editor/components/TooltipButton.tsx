'use client';

import { memo } from 'react';
import { InfoIcon } from '@/components/ui';
import { TooltipPopup } from './TooltipPopup';
import { useTooltipState } from '../hooks';
import * as S from '../editor.styles';
import { TOOLBAR_TITLES, MENU_STYLES } from '@/constants';
import type { TooltipButtonProps, TooltipBadgesProps } from '@/types/editor';

const TooltipBadges = memo(function TooltipBadges({ lockedTextsSize, tooltipCount }: TooltipBadgesProps) {
  if (lockedTextsSize === 0 && tooltipCount === 0) return null;

  return (
    <div className="absolute -top-1 -right-1 flex gap-0.5">
      {lockedTextsSize > 0 && (
        <span className={`${S.TOOLTIP.BADGE} ${S.TOOLTIP.BADGE_LOCKED}`}>{lockedTextsSize}</span>
      )}
      {tooltipCount > 0 && (
        <span className={`${S.TOOLTIP.BADGE} ${S.TOOLTIP.BADGE_COUNT}`}>{tooltipCount}</span>
      )}
    </div>
  );
});

function TooltipButtonComponent({ editor }: TooltipButtonProps) {
  const {
    isOpen,
    tooltipText,
    setTooltipText,
    count,
    lockedCount,
    selection,
    isDisabled,
    addTooltip,
    removeTooltip,
    toggle,
    close,
  } = useTooltipState(editor);

  return (
    <div className="relative">
      <button
        onClick={toggle}
        disabled={isDisabled}
        className={MENU_STYLES.BTN}
        title={isDisabled ? TOOLBAR_TITLES.tooltipDisabled : TOOLBAR_TITLES.tooltip}
      >
        <InfoIcon className={MENU_STYLES.ICON} />
      </button>
      
      <TooltipBadges lockedTextsSize={lockedCount} tooltipCount={count} />

      <TooltipPopup
        isOpen={isOpen}
        selectedText={selection.text}
        tooltipText={tooltipText}
        onTooltipTextChange={setTooltipText}
        onAddTooltip={() => addTooltip(tooltipText)}
        onRemoveTooltip={removeTooltip}
        onClose={close}
      />
    </div>
  );
}

export const TooltipButton = memo(TooltipButtonComponent);
