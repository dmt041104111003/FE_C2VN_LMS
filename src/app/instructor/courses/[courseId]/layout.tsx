import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Chi tiết khóa học',
  description: 'Xem chi tiết và thống kê khóa học của bạn trên C2VN.',
};

export default function CourseDetailLayout({ children }: { children: React.ReactNode }) {
  return children;
}

