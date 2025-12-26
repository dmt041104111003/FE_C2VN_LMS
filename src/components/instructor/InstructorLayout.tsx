'use client';

import { memo, useCallback, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { Sidebar, SidebarLayout, Button, LogoutIcon } from '@/components/ui';
import type { SidebarItem } from '@/components/ui';
import { SIDEBAR } from '@/components/ui/ui.styles';
import { INSTRUCTOR_LABELS, INSTRUCTOR_SIDEBAR_ITEMS } from '@/constants/instructor';
import type { InstructorLayoutProps } from '@/types/instructor';

export const InstructorLayout = memo(function InstructorLayout({ children, activeId, title, inboxUnreadCount }: InstructorLayoutProps) {
  const router = useRouter();

  const handleLogout = useCallback(() => {
    router.push('/');
  }, [router]);

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
        <Button variant="ghost" onClick={handleLogout} className={SIDEBAR.LOGOUT_BTN}>
          <LogoutIcon className={SIDEBAR.LOGOUT_ICON} />
          {INSTRUCTOR_LABELS.logout}
        </Button>
      }
    />
  );

  return (
    <SidebarLayout sidebar={sidebar} sidebarWidth="w-52" header={{ title }}>
      {children}
    </SidebarLayout>
  );
});
