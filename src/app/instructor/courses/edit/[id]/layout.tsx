import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Chỉnh sửa khóa học',
  description: 'Chỉnh sửa khóa học trên C2VN.',
};

export default function EditCourseLayout({ children }: { children: React.ReactNode }) {
  return children;
}

