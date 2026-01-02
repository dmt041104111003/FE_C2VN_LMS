'use client';

import { memo } from 'react';
import Link from 'next/link';
import { Sidebar, SidebarLayout, ChevronLeftIcon } from '@/components/ui';
import { SIDEBAR } from '@/components/ui/ui.styles';
import { INSTRUCTOR_LABELS, INSTRUCTOR_SIDEBAR_ITEMS } from '@/constants/instructor';
import { ROUTES } from '@/constants/navigation';
import type { InstructorLayoutProps } from '@/types/instructor';

export const InstructorLayout = memo(function InstructorLayout({ children, activeId, title }: InstructorLayoutProps) {
  const sidebar = (
    <Sidebar
      items={INSTRUCTOR_SIDEBAR_ITEMS as unknown as { id: string; title: string; href: string }[]}
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
