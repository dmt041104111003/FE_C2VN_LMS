'use client';

import { memo, useState, useCallback } from 'react';
import { MenuIcon, ChevronLeftIcon, ChevronRightIcon, CloseIcon } from './icons';
import type { SidebarLayoutProps, SidebarLayoutHeaderProps } from './ui.types';
import { SIDEBAR_LAYOUT } from './ui.styles';

interface HeaderProps extends SidebarLayoutHeaderProps {
  onToggleSidebar: () => void;
  onToggleRightSidebar?: () => void;
  hasRightSidebar?: boolean;
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
  onToggleRightSidebar,
  hasRightSidebar,
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
        {hasRightSidebar && (
          <button
            className={SIDEBAR_LAYOUT.HEADER_NAV_BTN}
            onClick={onToggleRightSidebar}
            title="Nội dung & Hỏi đáp"
          >
            <MenuIcon className={SIDEBAR_LAYOUT.HEADER_NAV_ICON} />
          </button>
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
  collapsible = true,
  rightSidebar,
  rightSidebarWidth = 'w-96',
}: SidebarLayoutProps) {
  const [desktopOpen, setDesktopOpen] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [rightDesktopOpen, setRightDesktopOpen] = useState(true);
  const [rightMobileOpen, setRightMobileOpen] = useState(false);

  const toggleSidebar = useCallback(() => {
    const isDesktop = window.innerWidth >= 1024;
    if (isDesktop && collapsible) {
      setDesktopOpen(p => !p);
    } else {
      setMobileOpen(p => !p);
    }
  }, [collapsible]);

  const toggleRightSidebar = useCallback(() => {
    const isDesktop = window.innerWidth >= 1024;
    if (isDesktop) {
      setRightDesktopOpen(p => !p);
    } else {
      setRightMobileOpen(p => !p);
    }
  }, []);

  const closeMobile = useCallback(() => setMobileOpen(false), []);
  const closeRightMobile = useCallback(() => setRightMobileOpen(false), []);

  const desktopClass = desktopOpen 
    ? sidebarWidth
    : 'w-0 overflow-hidden border-r-0';

  const rightDesktopClass = rightDesktopOpen
    ? rightSidebarWidth
    : 'w-0 border-l-0';

  return (
    <div className={SIDEBAR_LAYOUT.CONTAINER}>
      <aside className={`${SIDEBAR_LAYOUT.SIDEBAR_DESKTOP} ${desktopClass}`}>
        {sidebar}
      </aside>

      {mobileOpen && (
        <div className={SIDEBAR_LAYOUT.SIDEBAR_MOBILE_OVERLAY} onClick={closeMobile}>
          <div
            className={`${sidebarWidth} ${SIDEBAR_LAYOUT.SIDEBAR_MOBILE_CONTENT}`}
            onClick={e => e.stopPropagation()}
          >
            {sidebar}
          </div>
        </div>
      )}

      <main className={SIDEBAR_LAYOUT.MAIN}>
        {header && (
          <Header 
            {...header} 
            onToggleSidebar={toggleSidebar}
            onToggleRightSidebar={toggleRightSidebar}
            hasRightSidebar={!!rightSidebar}
          />
        )}
        <div className={SIDEBAR_LAYOUT.CONTENT}>{children}</div>
      </main>

      {rightSidebar && (
        <>
          <aside className={`${SIDEBAR_LAYOUT.RIGHT_SIDEBAR_DESKTOP} ${rightDesktopClass}`}>
            {rightSidebar}
          </aside>

          {rightMobileOpen && (
            <div className="fixed inset-0 z-50 bg-[var(--bg)] lg:hidden flex flex-col">
              <div className="flex items-center justify-between px-4 py-3 border-b border-[var(--border)]">
                <span className="text-sm font-medium text-[var(--text)]">Nội dung & Hỏi đáp</span>
                <button 
                  onClick={closeRightMobile}
                  className="p-2 text-[var(--text)]/50 hover:text-[var(--text)]"
                >
                  <CloseIcon className="w-5 h-5" />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto">
                {rightSidebar}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export const SidebarLayout = memo(SidebarLayoutComponent);
