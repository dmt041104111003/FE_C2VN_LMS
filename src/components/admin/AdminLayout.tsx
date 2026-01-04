'use client';

import { memo } from 'react';
import Link from 'next/link';
import { Sidebar, SidebarLayout, ChevronLeftIcon } from '@/components/ui';
import { SIDEBAR } from '@/components/ui/ui.styles';
import { ADMIN_LABELS, ADMIN_SIDEBAR_ITEMS } from '@/constants/admin';
import { ROUTES } from '@/constants/navigation';
import type { AdminLayoutProps } from '@/types/admin';

export const AdminLayout = memo(function AdminLayout({ children, activeId, title }: AdminLayoutProps) {
  const sidebar = (
    <Sidebar
      items={ADMIN_SIDEBAR_ITEMS}
      activeId={activeId}
      header={<div className={SIDEBAR.TITLE}>{ADMIN_LABELS.title}</div>}
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
