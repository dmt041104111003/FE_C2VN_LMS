import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Quản lý thẻ',
  description: 'Quản lý thẻ khóa học trên C2VN.',
};

export default function TagsLayout({ children }: { children: React.ReactNode }) {
  return children;
}

