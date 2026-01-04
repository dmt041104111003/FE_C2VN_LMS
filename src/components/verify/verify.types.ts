import type { CertificateResponse } from '@/types/user';

export interface VerifyFormProps {
  onVerify: (walletAddress: string, courseTitle: string) => void;
  initialWallet?: string;
  initialCourse?: string;
}

export interface CertificateResultProps {
  certificate: CertificateResponse | null;
  notFound: boolean;
  walletAddress?: string;
}
