'use client';

import { memo, useState, useCallback, ReactNode } from 'react';
import Link from 'next/link';
import { ChevronDownIcon, ChevronLeftIcon } from './icons';
import type { SidebarProps, SidebarSection, SidebarItem } from './ui.types';
import { SIDEBAR } from './ui.styles';

interface SidebarSectionComponentProps {
  section: SidebarSection;
  activeId?: string;
  onSelect?: (id: string) => void;
  collapsible?: boolean;
}

const SidebarSectionComponent = memo(function SidebarSectionComponent({
  section,
  activeId,
  onSelect,
  collapsible = true,
}: SidebarSectionComponentProps) {
  const [isOpen, setIsOpen] = useState(section.defaultOpen ?? true);
  const toggle = useCallback(() => collapsible && setIsOpen(p => !p), [collapsible]);

  return (
    <div className={SIDEBAR.SECTION}>
      <div className={SIDEBAR.SECTION_HEADER} onClick={toggle}>
        <span className={SIDEBAR.SECTION_TITLE}>{section.title}</span>
        {collapsible && (
          <ChevronDownIcon className={`${SIDEBAR.SECTION_ICON} ${isOpen ? SIDEBAR.SECTION_ICON_OPEN : ''}`} />
        )}
      </div>
      {isOpen && (
        <div className={SIDEBAR.SECTION_CONTENT}>
          {section.items.map(item => (
            <SidebarItemComponent
              key={item.id}
              item={item}
              isActive={item.id === activeId}
              onSelect={onSelect}
            />
          ))}
        </div>
      )}
    </div>
  );
});

interface SidebarItemComponentProps {
  item: SidebarItem;
  isActive: boolean;
  onSelect?: (id: string) => void;
}

const SidebarItemComponent = memo(function SidebarItemComponent({
  item,
  isActive,
  onSelect,
}: SidebarItemComponentProps) {
  const handleClick = useCallback(() => {
    if (!item.disabled && onSelect) onSelect(item.id);
  }, [item.disabled, item.id, onSelect]);

  const itemClass = item.disabled
    ? SIDEBAR.ITEM_DISABLED
    : isActive
    ? SIDEBAR.ITEM_ACTIVE
    : SIDEBAR.ITEM_DEFAULT;

  const content = (
    <>
      {item.icon && <item.icon className={SIDEBAR.ITEM_ICON} />}
      <div className={SIDEBAR.ITEM_CONTENT}>
        <div className={SIDEBAR.ITEM_TITLE}>
          {item.title}
          {item.badge !== undefined && item.badge > 0 && (
            <span className={SIDEBAR.ITEM_BADGE}>({item.badge})</span>
          )}
        </div>
        {item.meta && <div className={SIDEBAR.ITEM_META}>{item.meta}</div>}
      </div>
    </>
  );

  if (item.href && !item.disabled) {
    return (
      <Link href={item.href} className={`${SIDEBAR.ITEM} ${itemClass}`}>
        {content}
      </Link>
    );
  }

  return (
    <div className={`${SIDEBAR.ITEM} ${itemClass}`} onClick={handleClick}>
      {content}
    </div>
  );
});

function SidebarComponent({
  sections,
  items,
  activeId,
  onSelect,
  header,
  footer,
  backLink,
  collapsible = true,
}: SidebarProps) {
  return (
    <div className={SIDEBAR.CONTAINER}>
      {backLink && (
        <Link href={backLink.href} className={SIDEBAR.BACK_LINK}>
          <ChevronLeftIcon className="w-4 h-4" />
          {backLink.label}
        </Link>
      )}
      {header && <div className={SIDEBAR.HEADER}>{header}</div>}
      <nav className={SIDEBAR.NAV}>
        {sections?.map(section => (
          <SidebarSectionComponent
            key={section.id}
            section={section}
            activeId={activeId}
            onSelect={onSelect}
            collapsible={collapsible}
          />
        ))}
        {items && !sections && (
          <div className={SIDEBAR.SECTION_CONTENT}>
            {items.map(item => (
              <SidebarItemComponent
                key={item.id}
                item={item}
                isActive={item.id === activeId}
                onSelect={onSelect}
              />
            ))}
          </div>
        )}
      </nav>
      {footer && <div className={SIDEBAR.FOOTER}>{footer}</div>}
    </div>
  );
}

export const Sidebar = memo(SidebarComponent);

