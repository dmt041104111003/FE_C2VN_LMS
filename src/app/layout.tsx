import './globals.css';
import { Metadata, Viewport } from 'next';
import { ContentProtection } from '@/components/ui';

export const metadata: Metadata = {
  title: {
    default: 'C2VN - Học Blockchain & Cardano',
    template: '%s | C2VN',
  },
  description: 'Nền tảng học trực tuyến về Blockchain và Cardano. Khóa học chất lượng, chứng chỉ NFT, cộng đồng Cardano Việt Nam.',
  keywords: ['blockchain', 'cardano', 'học online', 'LMS', 'NFT', 'smart contract', 'việt nam'],
  authors: [{ name: 'Cardano2VN' }],
  creator: 'Cardano2VN',
  publisher: 'Cardano2VN',
  icons: {
    icon: '/loading.png',
    apple: '/loading.png',
  },
  openGraph: {
    type: 'website',
    locale: 'vi_VN',
    url: 'https://lms.cardano2vn.io',
    siteName: 'C2VN Learning',
    title: 'C2VN - Học Blockchain & Cardano',
    description: 'Nền tảng học trực tuyến về Blockchain và Cardano. Khóa học chất lượng, chứng chỉ NFT.',
    images: [
      {
        url: '/background.png',
        width: 1200,
        height: 630,
        alt: 'C2VN Learning Platform',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'C2VN - Học Blockchain & Cardano',
    description: 'Nền tảng học trực tuyến về Blockchain và Cardano',
    images: ['/background.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
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
