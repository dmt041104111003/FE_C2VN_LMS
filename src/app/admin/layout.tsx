import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Quản trị',
  description: 'Trang quản trị hệ thống C2VN.',
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return children;
}

