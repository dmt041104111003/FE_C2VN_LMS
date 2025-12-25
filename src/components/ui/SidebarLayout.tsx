'use client';

import { memo, useState, useCallback, ReactNode } from 'react';
import { MenuIcon, ChevronLeftIcon, ChevronRightIcon } from './icons';
import type { SidebarLayoutProps, SidebarLayoutHeaderProps } from './ui.types';
import { SIDEBAR_LAYOUT } from './ui.styles';

interface HeaderProps extends SidebarLayoutHeaderProps {
  onToggleSidebar: () => void;
}

const Header = memo(function Header({
  title,
  subtitle,
  onPrev,
  onNext,
  hasPrev,
  hasNext,
  rightContent,
  onToggleSidebar,
}: HeaderProps) {
  return (
    <header className={SIDEBAR_LAYOUT.HEADER}>
      <div className={SIDEBAR_LAYOUT.HEADER_LEFT}>
        <button className={SIDEBAR_LAYOUT.HEADER_MENU_BTN} onClick={onToggleSidebar}>
          <MenuIcon className={SIDEBAR_LAYOUT.HEADER_NAV_ICON} />
        </button>
        {(title || subtitle) && (
          <div className={SIDEBAR_LAYOUT.HEADER_INFO}>
            {subtitle && <span className={SIDEBAR_LAYOUT.HEADER_SUBTITLE}>{subtitle}</span>}
            {title && <span className={SIDEBAR_LAYOUT.HEADER_TITLE}>{title}</span>}
          </div>
        )}
      </div>
      <div className={SIDEBAR_LAYOUT.HEADER_RIGHT}>
        {rightContent}
        {(onPrev || onNext) && (
          <>
            <button
              className={SIDEBAR_LAYOUT.HEADER_NAV_BTN}
              onClick={onPrev}
              disabled={!hasPrev}
            >
              <ChevronLeftIcon className={SIDEBAR_LAYOUT.HEADER_NAV_ICON} />
            </button>
            <button
              className={SIDEBAR_LAYOUT.HEADER_NAV_BTN}
              onClick={onNext}
              disabled={!hasNext}
            >
              <ChevronRightIcon className={SIDEBAR_LAYOUT.HEADER_NAV_ICON} />
            </button>
          </>
        )}
      </div>
    </header>
  );
});

function SidebarLayoutComponent({
  sidebar,
  children,
  header,
  sidebarWidth = 'w-72',
}: SidebarLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = useCallback(() => setSidebarOpen(p => !p), []);
  const closeSidebar = useCallback(() => setSidebarOpen(false), []);

  return (
    <div className={SIDEBAR_LAYOUT.CONTAINER}>
      <aside className={`${sidebarWidth} ${SIDEBAR_LAYOUT.SIDEBAR_DESKTOP}`}>
        {sidebar}
      </aside>

      {sidebarOpen && (
        <div className={SIDEBAR_LAYOUT.SIDEBAR_MOBILE_OVERLAY} onClick={closeSidebar}>
          <div
            className={`${sidebarWidth} ${SIDEBAR_LAYOUT.SIDEBAR_MOBILE_CONTENT}`}
            onClick={e => e.stopPropagation()}
          >
            {sidebar}
          </div>
        </div>
      )}

      <main className={SIDEBAR_LAYOUT.MAIN}>
        {header && <Header {...header} onToggleSidebar={toggleSidebar} />}
        <div className={SIDEBAR_LAYOUT.CONTENT}>{children}</div>
      </main>
    </div>
  );
}

export const SidebarLayout = memo(SidebarLayoutComponent);

