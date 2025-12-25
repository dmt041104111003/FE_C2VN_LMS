import './globals.css';
import { Metadata, Viewport } from 'next';
import { ContentProtection } from '@/components/ui';

export const metadata: Metadata = {
  title: 'LMS - C2VN',
  description: 'Nền tảng học trực tuyến',
  icons: {
    icon: '/loading.png',
    apple: '/loading.png',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

interface Props {
  children: React.ReactNode;
}

export default function RootLayout({ children }: Props) {
  return (
    <html lang="vi">
      <body>
        <ContentProtection />
        {children}
      </body>
    </html>
  );
}
