import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Giảng viên',
  description: 'Quản lý khóa học và học viên của bạn trên C2VN.',
};

export default function InstructorLayout({ children }: { children: React.ReactNode }) {
  return children;
}

