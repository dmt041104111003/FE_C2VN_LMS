import { api } from './api';
import type { CertificateResponse } from '@/types/user';

export type { CertificateResponse };

export const certificateService = {
  getMyCertificates: () => 
    api.get<CertificateResponse[]>('/api/certificates/me'),

  verifyCertificateByWalletAndCourse: (walletAddress: string, courseTitle: string) =>
    api.get<CertificateResponse | null>(`/api/certificates/verify/wallet?walletAddress=${encodeURIComponent(walletAddress)}&courseTitle=${encodeURIComponent(courseTitle)}`),
};
