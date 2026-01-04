import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Xác minh chứng chỉ',
  description: 'Xác minh chứng chỉ NFT trên blockchain Cardano.',
};

export default function VerifyLayout({ children }: { children: React.ReactNode }) {
  return children;
}

