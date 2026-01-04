'use client';

import { useState, useCallback, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Header, Footer } from '@/components/ui';
import { HEADER_SPACER } from '@/components/ui/ui.styles';
import { VerifyForm, CertificateResult } from '@/components/verify';
import { VERIFY_PAGE } from '@/constants/verify';
import { certificateService } from '@/services/certificate';
import type { CertificateResponse } from '@/types/user';

function VerifyContent() {
  const searchParams = useSearchParams();
  const [certificate, setCertificate] = useState<CertificateResponse | null>(null);
  const [notFound, setNotFound] = useState(false);
  const [initialWallet, setInitialWallet] = useState('');
  const [initialCourse, setInitialCourse] = useState('');
  const [verifiedWallet, setVerifiedWallet] = useState('');

  const handleVerify = useCallback(async (walletAddress: string, courseTitle: string) => {
    setCertificate(null);
    setNotFound(false);
    setVerifiedWallet(walletAddress);

    try {
      const result = await certificateService.verifyCertificateByWalletAndCourse(walletAddress, courseTitle);
      if (result) {
        setCertificate(result);
      } else {
        setNotFound(true);
      }
    } catch {
      setNotFound(true);
    }
  }, []);

  useEffect(() => {
    const wallet = searchParams.get('wallet');
    const course = searchParams.get('course');
    if (wallet && course) {
      setInitialWallet(wallet);
      setInitialCourse(course);
      handleVerify(wallet, course);
    }
  }, [searchParams, handleVerify]);

  return (
    <div className={VERIFY_PAGE.CONTAINER}>
      <div className={VERIFY_PAGE.LEFT}>
        <div className={VERIFY_PAGE.HEADER}>
          <h1 className={VERIFY_PAGE.TITLE}>{VERIFY_PAGE.LABELS.title}</h1>
          <p className={VERIFY_PAGE.SUBTITLE}>{VERIFY_PAGE.LABELS.subtitle}</p>
        </div>
        <VerifyForm
          onVerify={handleVerify}
          initialWallet={initialWallet}
          initialCourse={initialCourse}
        />
      </div>

      <div className={VERIFY_PAGE.RIGHT}>
        <CertificateResult 
          certificate={certificate} 
          notFound={notFound} 
          walletAddress={verifiedWallet} 
        />
      </div>
    </div>
  );
}

export default function VerifyCertificatePage() {
  return (
    <div className={VERIFY_PAGE.WRAPPER}>
      <Header />
      <div className={HEADER_SPACER} />
      <main className={VERIFY_PAGE.MAIN}>
        <Suspense fallback={<div className={VERIFY_PAGE.CONTAINER} />}>
          <VerifyContent />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
