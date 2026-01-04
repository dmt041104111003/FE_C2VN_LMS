'use client';

import { memo, useState, useCallback, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { Logo } from './Logo';
import { SearchModal } from './SearchModal';
import { api } from '@/services/api';
import {
  ChevronDownIcon,
  MenuIcon,
  CloseIcon,
  SearchIcon,
  AppleIcon,
  PlayStoreIcon,
  MailIcon,
  LogoutIcon,
  UserIcon,
  UsersIcon,
  LockIcon,
} from './icons';
import {
  ROUTES,
  NAV_ITEMS,
  AUTH_TEXT,
  APP_DOWNLOAD,
  ROLE_LABELS,
} from '@/constants';
import { useAuth } from '@/contexts';
import { getUserAvatar } from '@/utils/avatar';
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
  const { user, isAuthenticated, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  const userAvatar = getUserAvatar(user);

  useEffect(() => {
    if (!isAuthenticated) {
      setUnreadCount(0);
      return;
    }
    
    api.get<number>('/api/feedbacks/inbox/count')
      .then(count => setUnreadCount(count || 0))
      .catch(() => setUnreadCount(0));
  }, [isAuthenticated]);

  const roleInfo = user?.role ? {
    label: ROLE_LABELS[user.role as keyof typeof ROLE_LABELS] || user.role,
    href: user.role === 'ADMIN' ? ROUTES.ADMIN : user.role === 'INSTRUCTOR' ? ROUTES.INSTRUCTOR : null,
  } : null;

  const isActive = useCallback((href: string, children?: readonly { href: string }[]) => {
    if (href === '/') return pathname === '/';
    if (pathname.startsWith(href)) return true;
    if (children) {
      return children.some(child => {
        const childPath = child.href.split('?')[0];
        return pathname === childPath || pathname.startsWith(childPath + '/');
      });
    }
    return false;
  }, [pathname]);

  const isChildActive = useCallback((childHref: string) => {
    const [childPath, childQuery] = childHref.split('?');
    if (pathname !== childPath) return false;
    if (!childQuery) return true;
    
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
                  className={isActive(item.href, 'children' in item ? item.children : undefined) ? HEADER_NAV_LINK_ACTIVE : HEADER_NAV_LINK}
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

            {isAuthenticated && user ? (
              <>
                <Link href={ROUTES.PROFILE_INBOX} className={`${HEADER_ICON_BTN} relative`}>
                  <MailIcon />
                  {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 bg-red-500 text-white text-xs font-medium rounded-full flex items-center justify-center">
                      {unreadCount > 99 ? '99+' : unreadCount}
                    </span>
                  )}
                </Link>

                <div className="relative">
                  <button 
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    className="flex items-center gap-2 ml-2"
                  >
                    {userAvatar ? (
                      <img 
                        src={userAvatar} 
                        alt={user?.fullName || 'User'} 
                        className="w-8 h-8 rounded-full"
                      />
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-[var(--accent)] flex items-center justify-center text-white text-sm font-medium">
                        {user?.fullName?.[0] || user?.email?.[0] || 'U'}
                      </div>
                    )}
                  </button>

                  {isUserMenuOpen && (
                    <div className="absolute right-0 top-full mt-2 w-48 bg-[var(--bg)] border border-[var(--text)]/10 rounded-lg shadow-lg py-2 z-50">
                      <div className="px-4 py-2 border-b border-[var(--text)]/10">
                        <p className="text-sm font-medium text-[var(--text)] truncate">
                          {user?.fullName || 'User'}
                        </p>
                        <p className="text-xs text-[var(--text)]/50 truncate">
                          {user?.email || (user?.walletAddress ? user.walletAddress.slice(0, 12) + '...' : user?.loginMethod || '')}
                        </p>
                      </div>
                      {roleInfo?.href && (
                        <Link 
                          href={roleInfo.href} 
                          className={`flex items-center gap-2 px-4 py-2 text-sm hover:bg-[var(--text)]/5 ${
                            isActive(roleInfo.href) 
                              ? 'text-[var(--accent)] bg-[var(--accent)]/10 font-medium' 
                              : 'text-[var(--text)]/70'
                          }`}
                          onClick={() => setIsUserMenuOpen(false)}
                        >
                          <UsersIcon className="w-4 h-4" />
                          {roleInfo.label}
                        </Link>
                      )}
                      <Link 
                        href={ROUTES.PROFILE} 
                        className={`flex items-center gap-2 px-4 py-2 text-sm hover:bg-[var(--text)]/5 ${
                          isActive(ROUTES.PROFILE) 
                            ? 'text-[var(--accent)] bg-[var(--accent)]/10 font-medium' 
                            : 'text-[var(--text)]/70'
                        }`}
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        <UserIcon className="w-4 h-4" />
                        Hồ sơ
                      </Link>
                      {user.hasPassword && (
                        <Link 
                          href={ROUTES.CHANGE_PASSWORD} 
                          className={`flex items-center gap-2 px-4 py-2 text-sm hover:bg-[var(--text)]/5 ${
                            isActive(ROUTES.CHANGE_PASSWORD) 
                              ? 'text-[var(--accent)] bg-[var(--accent)]/10 font-medium' 
                              : 'text-[var(--text)]/70'
                          }`}
                          onClick={() => setIsUserMenuOpen(false)}
                        >
                          <LockIcon className="w-4 h-4" />
                          Đổi mật khẩu
                        </Link>
                      )}
                      <button 
                        onClick={() => { setIsUserMenuOpen(false); logout(); }}
                        className="flex items-center gap-2 w-full px-4 py-2 text-sm text-red-500 hover:bg-[var(--text)]/5"
                      >
                        <LogoutIcon className="w-4 h-4" />
                        Đăng xuất
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <Link href={ROUTES.LOGIN} className={HEADER_AUTH_LINK}>
                {AUTH_TEXT.login}
              </Link>
            )}
          </div>
        </div>
      </header>

      {isMenuOpen && (
        <div className={HEADER_MEGA}>
          <div className={HEADER_MEGA_CONTAINER}>
            <div className={HEADER_MEGA_GRID}>
              {NAV_ITEMS.map((item) => (
                <div key={item.label} className={HEADER_MEGA_COL}>
                  <Link
                    href={item.href}
                    className={isActive(item.href, 'children' in item ? item.children : undefined) ? HEADER_MEGA_TITLE_ACTIVE : HEADER_MEGA_TITLE}
                    onClick={closeMenu}
                  >
                    {item.label}
                    {'children' in item && <ChevronDownIcon className={ICON_SM} />}
                  </Link>
                  {'children' in item && item.children.map((child) => (
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
              ))}
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
