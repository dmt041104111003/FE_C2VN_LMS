'use client';

import { memo, useState, useCallback, useMemo, Suspense } from 'react';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { Logo } from './Logo';
import { SearchModal } from './SearchModal';
import {
  ChevronDownIcon,
  MenuIcon,
  CloseIcon,
  SearchIcon,
  AppleIcon,
  PlayStoreIcon,
} from './icons';
import {
  ROUTES,
  NAV_ITEMS,
  AUTH_TEXT,
  APP_DOWNLOAD,
} from '@/constants';
import {
  HEADER,
  HEADER_CONTAINER,
  HEADER_LEFT,
  HEADER_NAV,
  HEADER_NAV_LINK,
  HEADER_NAV_LINK_ACTIVE,
  HEADER_RIGHT,
  HEADER_ICON_BTN,
  HEADER_MENU_BTN,
  HEADER_AUTH_LINK,
  HEADER_MEGA,
  HEADER_MEGA_CONTAINER,
  HEADER_MEGA_GRID,
  HEADER_MEGA_COL,
  HEADER_MEGA_TITLE,
  HEADER_MEGA_TITLE_ACTIVE,
  HEADER_MEGA_LINK,
  HEADER_MEGA_LINK_ACTIVE,
  HEADER_MEGA_FOOTER,
  HEADER_MEGA_APPS,
  HEADER_APP_BTN,
  HEADER_APP_BTN_ALT,
  HEADER_APP_TEXT,
  HEADER_APP_LABEL,
  HEADER_APP_NAME,
  ICON_SM,
  ICON_LG,
} from './ui.styles';

function HeaderInner() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const isActive = useCallback((href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  }, [pathname]);

  const isChildActive = useCallback((childHref: string) => {
    const [childPath, childQuery] = childHref.split('?');
    if (pathname !== childPath) return false;
    
    if (!childQuery) {
      return searchParams.toString() === '';
    }
    
    const childParams = new URLSearchParams(childQuery);
    for (const [key, value] of childParams.entries()) {
      if (searchParams.get(key) !== value) return false;
    }
    return true;
  }, [pathname, searchParams]);

  const toggleMenu = useCallback(() => {
    setIsMenuOpen(prev => !prev);
  }, []);

  const closeMenu = useCallback(() => {
    setIsMenuOpen(false);
  }, []);

  const openSearch = useCallback(() => {
    setIsSearchOpen(true);
  }, []);

  const closeSearch = useCallback(() => {
    setIsSearchOpen(false);
  }, []);

  const navItemsWithChildren = useMemo(() => 
    NAV_ITEMS.filter(item => 'children' in item),
  []);

  return (
    <>
      <header className={HEADER}>
        <div className={HEADER_CONTAINER}>
          <div className={HEADER_LEFT}>
            <Link href={ROUTES.HOME} onClick={closeMenu}>
              <Logo layout="inline" size="sm" showText={true} />
            </Link>

            <nav className={HEADER_NAV}>
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className={isActive(item.href) ? HEADER_NAV_LINK_ACTIVE : HEADER_NAV_LINK}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          <div className={HEADER_RIGHT}>
            <button className={HEADER_MENU_BTN} onClick={toggleMenu}>
              {isMenuOpen ? <CloseIcon /> : <MenuIcon />}
            </button>

            <button className={HEADER_ICON_BTN} onClick={openSearch}>
              <SearchIcon />
            </button>

            <Link href={ROUTES.LOGIN} className={HEADER_AUTH_LINK}>
              {AUTH_TEXT.login}
            </Link>
          </div>
        </div>
      </header>

      {isMenuOpen && (
        <div className={HEADER_MEGA}>
          <div className={HEADER_MEGA_CONTAINER}>
            <div className={HEADER_MEGA_GRID}>
              {navItemsWithChildren.map((item) => {
                if (!('children' in item)) return null;
                return (
                  <div key={item.label} className={HEADER_MEGA_COL}>
                    <Link
                      href={item.href}
                      className={isActive(item.href) ? HEADER_MEGA_TITLE_ACTIVE : HEADER_MEGA_TITLE}
                      onClick={closeMenu}
                    >
                      {item.label}
                      <ChevronDownIcon className={ICON_SM} />
                    </Link>
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className={isChildActive(child.href) ? HEADER_MEGA_LINK_ACTIVE : HEADER_MEGA_LINK}
                        onClick={closeMenu}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                );
              })}
            </div>

            <div className={HEADER_MEGA_FOOTER}>
              <div className={HEADER_MEGA_APPS}>
                <a href="#" className={HEADER_APP_BTN}>
                  <AppleIcon className={ICON_LG} />
                  <div className={HEADER_APP_TEXT}>
                    <div className={HEADER_APP_LABEL}>{APP_DOWNLOAD.label}</div>
                    <div className={HEADER_APP_NAME}>{APP_DOWNLOAD.appStore}</div>
                  </div>
                </a>
                <a href="#" className={HEADER_APP_BTN_ALT}>
                  <PlayStoreIcon className={ICON_LG} />
                  <div className={HEADER_APP_TEXT}>
                    <div className={HEADER_APP_LABEL}>{APP_DOWNLOAD.label}</div>
                    <div className={HEADER_APP_NAME}>{APP_DOWNLOAD.android}</div>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {isSearchOpen && <SearchModal onClose={closeSearch} />}
    </>
  );
}

const HeaderMemo = memo(HeaderInner);

export function Header() {
  return (
    <Suspense fallback={<header className={HEADER}><div className={HEADER_CONTAINER} /></header>}>
      <HeaderMemo />
    </Suspense>
  );
}
