'use client';

import { memo, useCallback } from 'react';
import { TABS } from './ui.styles';
import type { TabsProps, TabPanelProps, TabButtonProps, TabsVariant, TabsSize } from './ui.types';

const getItemClasses = (variant: TabsVariant, isActive: boolean, size: TabsSize, disabled: boolean) => {
  const styles = TABS.ITEM[variant];
  return [
    TABS.ITEM_BASE,
    styles.base,
    isActive ? styles.active : styles.inactive,
    TABS.SIZE[size],
    disabled && 'opacity-40 cursor-not-allowed',
  ].filter(Boolean).join(' ');
};

const TabButton = memo(function TabButton({ item, isActive, variant, size, onClick }: TabButtonProps) {
  const handleClick = useCallback(() => {
    if (!item.disabled) onClick();
  }, [item.disabled, onClick]);

  return (
    <button
      type="button"
      role="tab"
      aria-selected={isActive}
      disabled={item.disabled}
      onClick={handleClick}
      className={getItemClasses(variant, isActive, size, !!item.disabled)}
    >
      {item.label}
      {item.badge !== undefined && <span className={TABS.BADGE}>{item.badge}</span>}
    </button>
  );
});

function TabsComponent({
  items,
  activeKey,
  onChange,
  variant = 'underline',
  size = 'md',
  fullWidth = false,
  className = '',
}: TabsProps) {
  const containerClass = `${TABS.CONTAINER} ${fullWidth ? TABS.CONTAINER_FULL : ''} ${className}`.trim();
  const listClass = `${TABS.LIST[variant]} ${fullWidth ? 'w-full justify-between' : ''}`.trim();

  return (
    <div className={containerClass} role="tablist">
      <div className={listClass}>
        {items.map((item) => (
          <TabButton
            key={item.key}
            item={item}
            isActive={activeKey === item.key}
            variant={variant}
            size={size}
            onClick={() => onChange(item.key)}
          />
        ))}
      </div>
    </div>
  );
}

function TabPanelComponent({ children, isActive, className = '' }: TabPanelProps) {
  if (!isActive) return null;
  return <div role="tabpanel" className={`${TABS.PANEL} ${className}`}>{children}</div>;
}

export const Tabs = memo(TabsComponent);
export const TabPanel = memo(TabPanelComponent);
