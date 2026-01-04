import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Hộp thư',
  description: 'Xem thông báo và tin nhắn của bạn trên C2VN.',
};

export default function InboxLayout({ children }: { children: React.ReactNode }) {
  return children;
}

