import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Học viên',
  description: 'Quản lý học viên trong khóa học của bạn trên C2VN.',
};

export default function StudentsLayout({ children }: { children: React.ReactNode }) {
  return children;
}

