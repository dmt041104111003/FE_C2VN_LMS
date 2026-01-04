import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Hồ sơ',
  description: 'Xem và quản lý hồ sơ cá nhân của bạn trên C2VN.',
};

export default function ProfileLayout({ children }: { children: React.ReactNode }) {
  return children;
}

