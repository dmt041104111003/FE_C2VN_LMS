'use client';

import { memo, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Sidebar, SidebarLayout, Button, LogoutIcon } from '@/components/ui';
import { SIDEBAR } from '@/components/ui/ui.styles';
import { ADMIN_LABELS, ADMIN_SIDEBAR_ITEMS } from '@/constants/admin';
import type { AdminLayoutProps } from '@/types/admin';

const LOGOUT_BTN_CLASS = 'w-full justify-start gap-3 hover:!text-[var(--incorrect)] hover:!bg-[var(--incorrect)]/5';

export const AdminLayout = memo(function AdminLayout({ children, activeId, title }: AdminLayoutProps) {
  const router = useRouter();

  const handleLogout = useCallback(() => {
    router.push('/');
  }, [router]);

  const sidebar = (
    <Sidebar
      items={ADMIN_SIDEBAR_ITEMS}
      activeId={activeId}
      header={<div className={SIDEBAR.TITLE}>{ADMIN_LABELS.title}</div>}
      footer={
        <Button variant="ghost" onClick={handleLogout} className={LOGOUT_BTN_CLASS}>
          <LogoutIcon className="w-5 h-5" />
          {ADMIN_LABELS.logout}
        </Button>
      }
    />
  );

  return (
    <SidebarLayout sidebar={sidebar} sidebarWidth="w-64" header={{ title }}>
      {children}
    </SidebarLayout>
  );
});
