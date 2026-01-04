import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Học',
  description: 'Tiếp tục học tập trên C2VN.',
};

export default function LearnLayout({ children }: { children: React.ReactNode }) {
  return children;
}

