'use client';

import { memo, useEffect } from 'react';
import { Button } from './Button';
import { InfoIcon, WarningIcon } from './icons';
import { DIALOG } from './ui.styles';
import type { DialogProps } from './ui.types';

const ESCAPE_KEY = 'Escape';

export const Dialog = memo(function Dialog({
  isOpen,
  title,
  message,
  primaryText = DIALOG.DEFAULT_PRIMARY_TEXT,
  secondaryText = DIALOG.DEFAULT_SECONDARY_TEXT,
  danger = false,
  onPrimary,
  onSecondary,
}: DialogProps) {
  useEffect(() => {
    if (!isOpen) return;

    const handleEscapeKey = (e: KeyboardEvent) => {
      if (e.key === ESCAPE_KEY) onSecondary();
    };

    document.addEventListener('keydown', handleEscapeKey);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
      document.body.style.overflow = '';
    };
  }, [isOpen, onSecondary]);

  if (!isOpen) return null;

  const Icon = danger ? WarningIcon : InfoIcon;
  const iconClass = danger ? DIALOG.ICON_DANGER : DIALOG.ICON;

  return (
    <div className={DIALOG.OVERLAY} onClick={onSecondary}>
      <div className={DIALOG.CONTAINER} onClick={e => e.stopPropagation()}>
        <div className={DIALOG.HEADER}>
          <div className={iconClass}>
            <Icon className={DIALOG.ICON_INNER} />
          </div>
          <h2 className={DIALOG.TITLE}>{title}</h2>
        </div>
        <div className={DIALOG.BODY}>
          <p className={DIALOG.MESSAGE}>{message}</p>
        </div>
        <div className={DIALOG.ACTIONS}>
          <Button variant="ghost" onClick={onSecondary}>
            {secondaryText}
          </Button>
          <Button variant={danger ? 'danger' : 'primary'} onClick={onPrimary}>
            {primaryText}
          </Button>
        </div>
      </div>
    </div>
  );
});
