'use client';

import { memo, ReactNode, useMemo } from 'react';
import { Sidebar, SidebarLayout, UsersIcon, BookIcon, ShieldIcon } from '@/components/ui';
import { ADMIN_LABELS, ADMIN_SIDEBAR_ITEMS } from '@/constants/admin';
import type { SidebarItem } from '@/components/ui';

const SIDEBAR_ICONS: Record<string, React.FC<{ className?: string }>> = {
  users: UsersIcon,
  courses: BookIcon,
  settings: ShieldIcon,
};

interface AdminLayoutProps {
  children: ReactNode;
  activeId: string;
  title?: string;
}

export const AdminLayout = memo(function AdminLayout({ children, activeId, title }: AdminLayoutProps) {
  const sidebarItems: SidebarItem[] = useMemo(
    () => ADMIN_SIDEBAR_ITEMS.map(item => ({
      ...item,
      icon: SIDEBAR_ICONS[item.id],
    })),
    []
  );

  const sidebar = (
    <Sidebar
      items={sidebarItems}
      activeId={activeId}
      backLink={{ href: '/', label: 'Về trang chủ' }}
      header={
        <div className="text-xs uppercase tracking-[0.2em] text-[var(--text)]/40">
          {ADMIN_LABELS.title}
        </div>
      }
    />
  );

  return (
    <SidebarLayout
      sidebar={sidebar}
      sidebarWidth="w-64"
      header={{ title }}
    >
      {children}
    </SidebarLayout>
  );
});
