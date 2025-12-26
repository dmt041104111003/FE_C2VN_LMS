'use client';

import { memo, useState, useRef, useEffect, ReactNode, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { MoreVerticalIcon } from './icons';
import type { ActionButtonProps, ActionDropdownProps, DropdownPosition } from './ui.types';
import { ACTION_BTN, DROPDOWN, ICON_SM } from './ui.styles';

export const ActionButton = memo(function ActionButton({ icon, onClick, title, danger }: ActionButtonProps) {
  return (
    <button
      className={danger ? ACTION_BTN.DANGER : ACTION_BTN.BASE}
      onClick={onClick}
      title={title}
    >
      {icon}
    </button>
  );
});

const calculateDropdownPosition = (
  buttonRect: DOMRect,
  itemCount: number
): DropdownPosition => {
  const menuHeight = itemCount * DROPDOWN.ITEM_HEIGHT + DROPDOWN.PADDING;
  const spaceBelow = window.innerHeight - buttonRect.bottom;
  const spaceAbove = buttonRect.top;
  const shouldFlip = spaceBelow < menuHeight && spaceAbove > spaceBelow;

  return {
    top: shouldFlip ? buttonRect.top - menuHeight : buttonRect.bottom + DROPDOWN.GAP,
    left: Math.max(DROPDOWN.VIEWPORT_MARGIN, buttonRect.right - DROPDOWN.WIDTH),
  };
};

const useDropdownEvents = (
  isOpen: boolean,
  buttonRef: React.RefObject<HTMLButtonElement | null>,
  menuRef: React.RefObject<HTMLDivElement | null>,
  onClose: () => void,
  onUpdatePosition: () => void
) => {
  useEffect(() => {
    if (!isOpen) return;

    onUpdatePosition();

    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;
      const isOutsideButton = buttonRef.current && !buttonRef.current.contains(target);
      const isOutsideMenu = menuRef.current && !menuRef.current.contains(target);
      if (isOutsideButton && isOutsideMenu) onClose();
    };

    document.addEventListener('mousedown', handleClickOutside);
    window.addEventListener('scroll', onClose, true);
    window.addEventListener('resize', onUpdatePosition);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('scroll', onClose, true);
      window.removeEventListener('resize', onUpdatePosition);
    };
  }, [isOpen, buttonRef, menuRef, onClose, onUpdatePosition]);
};

export const ActionDropdown = memo(function ActionDropdown({ items, label }: ActionDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState<DropdownPosition>({ top: 0, left: 0 });
  const buttonRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const itemCount = items.length + (label ? 1 : 0);

  const handleClose = useCallback(() => setIsOpen(false), []);
  const handleToggle = useCallback(() => setIsOpen(prev => !prev), []);

  const updatePosition = useCallback(() => {
    if (!buttonRef.current) return;
    setPosition(calculateDropdownPosition(buttonRef.current.getBoundingClientRect(), itemCount));
  }, [itemCount]);

  useDropdownEvents(isOpen, buttonRef, menuRef, handleClose, updatePosition);

  const handleItemClick = useCallback((onClick: () => void) => {
    onClick();
    handleClose();
  }, [handleClose]);

  return (
    <div className="relative">
      <button ref={buttonRef} className={ACTION_BTN.BASE} onClick={handleToggle}>
        <MoreVerticalIcon className={ICON_SM} />
      </button>
      {isOpen && typeof document !== 'undefined' && createPortal(
        <div ref={menuRef} className={DROPDOWN.PORTAL} style={position}>
          {label && <div className={DROPDOWN.LABEL}>{label}</div>}
          {items.map((item, i) => (
            <button
              key={i}
              className={item.danger ? DROPDOWN.ITEM_DANGER : DROPDOWN.ITEM}
              onClick={() => handleItemClick(item.onClick)}
            >
              {item.icon}
              {item.label}
            </button>
          ))}
        </div>,
        document.body
      )}
    </div>
  );
});

export const ActionsCell = memo(function ActionsCell({ children }: { children: ReactNode }) {
  return <div className={ACTION_BTN.GROUP}>{children}</div>;
});

