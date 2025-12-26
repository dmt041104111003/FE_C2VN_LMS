import './globals.css';
import { Metadata, Viewport } from 'next';
import { ContentProtection } from '@/components/ui';

const BASE_URL = 'https://lms.cardano2vn.io';

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
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
    shortcut: '/loading.png',
  },
  openGraph: {
    type: 'website',
    locale: 'vi_VN',
    url: BASE_URL,
    siteName: 'C2VN Learning',
    title: 'C2VN - Học Blockchain & Cardano',
    description: 'Nền tảng học trực tuyến về Blockchain và Cardano. Khóa học chất lượng, chứng chỉ NFT.',
    images: [
      {
        url: `${BASE_URL}/loading.png`,
        width: 512,
        height: 512,
        alt: 'C2VN Logo',
        type: 'image/png',
      },
      {
        url: `${BASE_URL}/background.png`,
        width: 1200,
        height: 630,
        alt: 'C2VN Learning Platform',
      },
    ],
  },
  twitter: {
    card: 'summary',
    title: 'C2VN - Học Blockchain & Cardano',
    description: 'Nền tảng học trực tuyến về Blockchain và Cardano',
    images: [`${BASE_URL}/loading.png`],
    creator: '@cardano2vn',
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
    google: process.env.GOOGLE_VERIFICATION,
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Cardano2VN',
  url: BASE_URL,
  logo: `${BASE_URL}/loading.png`,
  sameAs: [
    'https://facebook.com/cardano2vn',
    'https://twitter.com/cardano2vn',
  ],
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'customer service',
    availableLanguage: 'Vietnamese',
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
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <ContentProtection />
        {children}
      </body>
    </html>
  );
}
