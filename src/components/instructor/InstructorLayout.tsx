'use client';

import { memo, useMemo } from 'react';
import Link from 'next/link';
import { Sidebar, SidebarLayout, ChevronLeftIcon } from '@/components/ui';
import type { SidebarItem } from '@/components/ui';
import { SIDEBAR } from '@/components/ui/ui.styles';
import { INSTRUCTOR_LABELS, INSTRUCTOR_SIDEBAR_ITEMS } from '@/constants/instructor';
import { ROUTES } from '@/constants/navigation';
import type { InstructorLayoutProps } from '@/types/instructor';

export const InstructorLayout = memo(function InstructorLayout({ children, activeId, title, inboxUnreadCount }: InstructorLayoutProps) {
  const sidebarItems = useMemo((): SidebarItem[] => {
    return INSTRUCTOR_SIDEBAR_ITEMS.map(item => ({
      ...item,
      badge: item.id === 'inbox' ? inboxUnreadCount : undefined,
    }));
  }, [inboxUnreadCount]);

  const sidebar = (
    <Sidebar
      items={sidebarItems}
      activeId={activeId}
      header={<div className={SIDEBAR.TITLE}>{INSTRUCTOR_LABELS.title}</div>}
      footer={
        <Link href={ROUTES.HOME} className={`${SIDEBAR.LOGOUT_BTN} flex items-center gap-2 text-[var(--text)]/70 hover:text-[var(--text)]`}>
          <ChevronLeftIcon className="w-4 h-4" />
          Về trang chủ
        </Link>
      }
    />
  );

  return (
    <SidebarLayout sidebar={sidebar} sidebarWidth="w-52" header={{ title }}>
      {children}
    </SidebarLayout>
  );
});
