'use client';

import { memo, useState, useRef, useEffect, ReactNode } from 'react';
import { MoreVerticalIcon } from './icons';
import type { ActionButtonProps, ActionDropdownProps } from './ui.types';
import { ACTION_BTN, DROPDOWN } from './ui.styles';

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

export const ActionDropdown = memo(function ActionDropdown({ items, label }: ActionDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button className={ACTION_BTN.BASE} onClick={() => setIsOpen(!isOpen)}>
        <MoreVerticalIcon className="w-4 h-4" />
      </button>
      {isOpen && (
        <div className={DROPDOWN.CONTAINER}>
          {label && <div className={DROPDOWN.LABEL}>{label}</div>}
          {items.map((item, i) => (
            <button
              key={i}
              className={item.danger ? DROPDOWN.ITEM_DANGER : DROPDOWN.ITEM}
              onClick={() => { item.onClick(); setIsOpen(false); }}
            >
              {item.icon}
              {item.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
});

export const ActionsCell = memo(function ActionsCell({ children }: { children: ReactNode }) {
  return <div className={ACTION_BTN.GROUP}>{children}</div>;
});

