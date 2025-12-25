'use client';

import { memo, ReactNode } from 'react';
import type { PageLayoutProps, PageHeaderProps, PanelProps, StatCardProps } from './ui.types';
import { PAGE, PANEL, STAT } from './ui.styles';

export const PageLayout = memo(function PageLayout({ children }: PageLayoutProps) {
  return (
    <div className={PAGE.LAYOUT}>
      <div className={PAGE.CONTAINER}>{children}</div>
    </div>
  );
});

export const PageHeader = memo(function PageHeader({ title, subtitle }: PageHeaderProps) {
  return (
    <header className={PAGE.HEADER}>
      <h1 className={PAGE.HEADER_TITLE}>{title}</h1>
      {subtitle && <p className={PAGE.HEADER_SUBTITLE}>{subtitle}</p>}
    </header>
  );
});

export const Panel = memo(function Panel({ title, children, footer, action }: PanelProps) {
  return (
    <div className={PANEL.BASE}>
      {title && (
        <div className={PANEL.HEADER}>
          <h2 className={PANEL.TITLE}>{title}</h2>
          {action}
        </div>
      )}
      <div className={PANEL.BODY}>{children}</div>
      {footer && <div className={PANEL.FOOTER}>{footer}</div>}
    </div>
  );
});

export const StatCard = memo(function StatCard({ value, label, icon }: StatCardProps) {
  return (
    <div className={STAT.CARD}>
      <div className="flex items-center justify-between">
        <div className={STAT.VALUE}>{value}</div>
        {icon && <div className="text-[var(--text)]/20">{icon}</div>}
      </div>
      <div className={STAT.LABEL}>{label}</div>
    </div>
  );
});

export const StatsGrid = memo(function StatsGrid({ children }: { children: ReactNode }) {
  return <div className={STAT.GRID}>{children}</div>;
});

