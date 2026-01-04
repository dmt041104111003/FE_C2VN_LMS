import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Tạo khóa học',
  description: 'Tạo khóa học mới trên C2VN.',
};

export default function CreateCourseLayout({ children }: { children: React.ReactNode }) {
  return children;
}

