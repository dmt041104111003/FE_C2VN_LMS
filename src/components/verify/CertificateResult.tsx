'use client';

import { memo, useState } from 'react';
import { Tabs, TabPanel } from '@/components/ui';
import { CheckCircleIcon, ErrorCircleIcon, ShareIcon } from '@/components/ui/icons';
import { formatDate } from '@/constants';
import { VERIFY_LABELS, VERIFY_RESULT, getCardanoScanUrl } from '@/constants/verify';
import type { CertificateResultProps } from './verify.types';

const RESULT_TABS = [
  { key: 'info', label: VERIFY_LABELS.tabInfo },
  { key: 'image', label: VERIFY_LABELS.tabImage },
];

function CertificateResultComponent({ certificate, notFound, walletAddress }: CertificateResultProps) {
  const [activeTab, setActiveTab] = useState('info');

  if (notFound) {
    return (
      <div className={VERIFY_RESULT.CARD}>
        <div className={VERIFY_RESULT.INVALID_HEADER}>
          <ErrorCircleIcon className={VERIFY_RESULT.ICON} />
          <span className={VERIFY_RESULT.TITLE}>{VERIFY_LABELS.invalid}</span>
        </div>
        <div className={VERIFY_RESULT.BODY}>
          <p className="text-sm text-[var(--text)]/60">{VERIFY_LABELS.notFoundDesc}</p>
        </div>
      </div>
    );
  }

  if (!certificate) {
    return (
      <div className="flex flex-col items-center justify-center py-8">
        <img src="/background.png" alt="" className="w-48 h-48 object-contain opacity-60" />
        <p className="text-sm text-[var(--text)]/40 mt-4">{VERIFY_LABELS.emptyState}</p>
      </div>
    );
  }

  const cardanoScanUrl = certificate.txHash ? getCardanoScanUrl(walletAddress) + certificate.txHash : null;

  return (
    <div className={VERIFY_RESULT.CARD}>
      <div className={VERIFY_RESULT.VALID_HEADER}>
        <CheckCircleIcon className={VERIFY_RESULT.ICON} />
        <span className={VERIFY_RESULT.TITLE}>{VERIFY_LABELS.valid}</span>
      </div>

      <div className="px-4 pt-4">
        <Tabs items={RESULT_TABS} activeKey={activeTab} onChange={setActiveTab} variant="underline" size="sm" />
      </div>

      <div className={VERIFY_RESULT.BODY}>
        <TabPanel isActive={activeTab === 'info'}>
          <div>
            <div className={VERIFY_RESULT.ROW}>
              <span className={VERIFY_RESULT.ROW_LABEL}>{VERIFY_LABELS.course}</span>
              <span className={VERIFY_RESULT.ROW_VALUE}>{certificate.courseTitle}</span>
            </div>
            {certificate.name && (
              <div className={VERIFY_RESULT.ROW}>
                <span className={VERIFY_RESULT.ROW_LABEL}>{VERIFY_LABELS.student}</span>
                <span className={VERIFY_RESULT.ROW_VALUE}>{certificate.name}</span>
              </div>
            )}
            <div className={VERIFY_RESULT.ROW}>
              <span className={VERIFY_RESULT.ROW_LABEL}>{VERIFY_LABELS.issuedAt}</span>
              <span className={VERIFY_RESULT.ROW_VALUE}>{formatDate(certificate.issuedAt)}</span>
            </div>
            {cardanoScanUrl && (
              <div className={VERIFY_RESULT.ROW}>
                <span className={VERIFY_RESULT.ROW_LABEL}>{VERIFY_LABELS.txHash}</span>
                <a href={cardanoScanUrl} target="_blank" rel="noopener noreferrer" className={VERIFY_RESULT.LINK}>
                  {VERIFY_LABELS.viewOnChain}
                  <ShareIcon className="w-3.5 h-3.5" />
                </a>
              </div>
            )}
          </div>
        </TabPanel>

        <TabPanel isActive={activeTab === 'image'}>
          {certificate.imgUrl ? (
            <img src={certificate.imgUrl} alt="Certificate" className={VERIFY_RESULT.IMAGE} />
          ) : (
            <p className="text-sm text-[var(--text)]/40 text-center py-4">Không có ảnh chứng chỉ</p>
          )}
        </TabPanel>
      </div>
    </div>
  );
}

export const CertificateResult = memo(CertificateResultComponent);
