'use client';

import { memo, useMemo, useCallback, useState, useEffect } from 'react';
import Link from 'next/link';
import {
  UserProfilePageProps,
  UserCourse,
  UserCertificate,
  UserStats,
} from '@/types/user';
import {
  USER_LABELS,
  USER_CONFIG,
  ROLE_LABELS,
  STATS_ITEMS,
  truncateWalletAddress,
} from '@/constants/user';
import { ROUTES } from '@/constants/navigation';
import { formatDate } from '@/constants/config';
import { ShowMore, useToast, Tabs, TabPanel, CloseIcon, CheckCircleIcon, GoogleIcon, GitHubIcon, WalletIcon, MailIcon } from '@/components/ui';
import { TipTapPreview } from '@/components/editor';
import { getUserAvatar } from '@/utils';
import * as S from './user.styles';
import {
  LIGHTBOX_OVERLAY,
  LIGHTBOX_CLOSE,
  LIGHTBOX_CLOSE_ICON,
} from '@/components/ui/ui.styles';

const CourseImage = memo(function CourseImage({ thumbnail, title }: { thumbnail?: string; title: string }) {
  if (thumbnail) {
    return <img src={thumbnail} alt={title} className={S.USER_COURSE_ITEM.IMAGE} />;
  }
  return (
    <div className={S.USER_COURSE_ITEM.IMAGE_PLACEHOLDER}>
      <img src={USER_CONFIG.DEFAULT_COURSE_IMAGE} alt="" className="w-8 h-8 opacity-30" />
    </div>
  );
});

const ProgressBar = memo(function ProgressBar({ progress }: { progress: number }) {
  return (
    <div className={S.USER_COURSE_ITEM.PROGRESS_WRAPPER}>
      <div className={S.USER_COURSE_ITEM.PROGRESS_BAR}>
        <div className={S.USER_COURSE_ITEM.PROGRESS_FILL} style={{ width: `${progress}%` }} />
      </div>
      <span className={S.USER_COURSE_ITEM.PROGRESS_TEXT}>{progress}%</span>
    </div>
  );
});

const CompletedBadge = memo(function CompletedBadge() {
  return (
    <div className={S.USER_COURSE_ITEM.COMPLETED}>
      <CheckCircleIcon className="w-4 h-4" />
      <span>{USER_LABELS.completedText}</span>
    </div>
  );
});

const UserCourseItem = memo(function UserCourseItem({ course }: { course: UserCourse }) {
  const isCompleted = course.progress === USER_CONFIG.PROGRESS_COMPLETE;

  return (
    <Link href={`${ROUTES.COURSES}/${course.id}/learn`} className={S.USER_COURSE_ITEM.CONTAINER}>
      <div className={S.USER_COURSE_ITEM.IMAGE_WRAPPER}>
        <CourseImage thumbnail={course.courseThumbnail} title={course.courseTitle} />
      </div>
      <div className={S.USER_COURSE_ITEM.CONTENT}>
        <h3 className={S.USER_COURSE_ITEM.TITLE}>{course.courseTitle}</h3>
        <p className={S.USER_COURSE_ITEM.INSTRUCTOR}>{course.instructorName}</p>
        {isCompleted ? <CompletedBadge /> : <ProgressBar progress={course.progress} />}
      </div>
    </Link>
  );
});

interface CertificateItemProps {
  certificate: UserCertificate;
  onClick: (cert: UserCertificate) => void;
  onCopyLink: (url: string) => void;
  userWallet?: string;
}

const buildVerifyUrl = (wallet: string, courseTitle: string) => 
  `${window.location.origin}/verify?wallet=${encodeURIComponent(wallet)}&course=${encodeURIComponent(courseTitle)}`;

const UserCertificateItem = memo(function UserCertificateItem({ certificate, onClick, onCopyLink, userWallet }: CertificateItemProps) {
  const walletAddress = certificate.walletAddress || userWallet;
  const verifyUrl = certificate.qrUrl || (walletAddress && certificate.courseTitle ? buildVerifyUrl(walletAddress, certificate.courseTitle) : null);
  
  const handleCopyClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (verifyUrl) onCopyLink(verifyUrl);
  };

  return (
    <div className={`${S.USER_CERTIFICATE_ITEM.CONTAINER} w-full`}>
      <button
        type="button"
        onClick={() => onClick(certificate)}
        className="flex items-center gap-4 flex-1 text-left cursor-pointer"
      >
        <div className={S.USER_CERTIFICATE_ITEM.IMAGE_WRAPPER}>
          <img src={USER_CONFIG.DEFAULT_CERTIFICATE_IMAGE} alt="" className={S.USER_CERTIFICATE_ITEM.IMAGE} />
        </div>
        <div className={S.USER_CERTIFICATE_ITEM.CONTENT}>
          <h3 className={S.USER_CERTIFICATE_ITEM.TITLE}>{certificate.courseTitle}</h3>
          <span className={S.USER_CERTIFICATE_ITEM.META}>{formatDate(certificate.issuedAt)}</span>
        </div>
      </button>
      {verifyUrl && (
        <button
          type="button"
          onClick={handleCopyClick}
          className="text-xs text-[var(--accent)] hover:underline px-3 py-1"
        >
          Xác minh
        </button>
      )}
    </div>
  );
});

const StatsSection = memo(function StatsSection({ stats }: { stats: UserStats }) {
  return (
    <div className={S.USER_STATS.CONTAINER}>
      {STATS_ITEMS.map(({ key, label }) => (
        <div key={key} className={S.USER_STATS.ITEM}>
          <div className={S.USER_STATS.VALUE}>{stats[key]}</div>
          <div className={S.USER_STATS.LABEL}>{label}</div>
        </div>
      ))}
    </div>
  );
});

interface ListSectionProps<T> {
  title: string;
  items: T[];
  emptyText: string;
  initialCount: number;
  incrementCount: number;
  renderItem: (item: T) => React.ReactNode;
  getKey: (item: T) => string;
}

function ListSection<T>({ title, items, emptyText, initialCount, incrementCount, renderItem, getKey }: ListSectionProps<T>) {
  if (items.length === 0) {
    return (
      <section className={S.USER_SECTION.CONTAINER}>
        <h2 className={S.USER_SECTION.TITLE}>{title}</h2>
        <div className={S.USER_SECTION.EMPTY}>{emptyText}</div>
      </section>
    );
  }

  return (
    <section className={S.USER_SECTION.CONTAINER}>
      <h2 className={S.USER_SECTION.TITLE}>{title}</h2>
      <ShowMore
        initialCount={initialCount}
        incrementCount={incrementCount}
        showText={USER_LABELS.showMore}
        hideText={USER_LABELS.showLess}
        className={S.USER_SECTION.LIST}
      >
        {items.map((item) => <div key={getKey(item)}>{renderItem(item)}</div>)}
      </ShowMore>
    </section>
  );
}

const COPY_SUCCESS_MSG = 'Đã sao chép!';

const CERT_TABS = [
  { key: 'image', label: 'Chứng chỉ' },
  { key: 'info', label: 'Thông tin' },
];

interface CertificateLightboxProps {
  cert: UserCertificate;
  userWallet?: string;
  onClose: () => void;
  onCopy: (text: string) => void;
}

const CertificateLightbox = memo(function CertificateLightbox({ cert, userWallet, onClose, onCopy }: CertificateLightboxProps) {
  const [activeTab, setActiveTab] = useState('image');
  const walletAddress = cert.walletAddress || userWallet;

  const copyField = (value: string) => {
    onCopy(value);
  };

  return (
    <div className={LIGHTBOX_OVERLAY} onClick={onClose}>
      <button className={LIGHTBOX_CLOSE} onClick={onClose}>
        <CloseIcon className={LIGHTBOX_CLOSE_ICON} />
      </button>
      <div className="bg-[var(--bg)] rounded-xl max-w-lg w-full max-h-[90vh] overflow-hidden" onClick={e => e.stopPropagation()}>
        <div className="p-4 border-b border-[var(--text)]/5">
          <Tabs items={CERT_TABS} activeKey={activeTab} onChange={setActiveTab} variant="underline" size="sm" />
        </div>

        <div className="p-4 overflow-y-auto max-h-[70vh]">
          <TabPanel isActive={activeTab === 'image'}>
            {cert.imgUrl ? (
              <img
                src={cert.imgUrl}
                alt="Certificate"
                className="w-full rounded-lg pointer-events-none select-none"
                draggable={false}
                onContextMenu={e => e.preventDefault()}
              />
            ) : (
              <div className="py-8 text-center text-sm text-[var(--text)]/40">Không có ảnh</div>
            )}
          </TabPanel>

          <TabPanel isActive={activeTab === 'info'}>
            <div className="space-y-0">
              {cert.policyId && (
                <button onClick={() => copyField(cert.policyId!)} className="w-full flex items-center justify-between gap-2 py-3 border-b border-[var(--text)]/5 hover:bg-[var(--text)]/5 transition-colors">
                  <span className="text-sm text-[var(--text)]/50 shrink-0">Policy ID</span>
                  <span className="text-xs text-[var(--text)] truncate max-w-[200px]">{cert.policyId}</span>
                </button>
              )}
              {cert.assetName && (
                <button onClick={() => copyField(cert.assetName!)} className="w-full flex items-center justify-between gap-2 py-3 border-b border-[var(--text)]/5 hover:bg-[var(--text)]/5 transition-colors">
                  <span className="text-sm text-[var(--text)]/50 shrink-0">Asset Name</span>
                  <span className="text-xs text-[var(--text)] truncate max-w-[200px]">{cert.assetName}</span>
                </button>
              )}
              {walletAddress && (
                <button onClick={() => copyField(walletAddress)} className="w-full flex items-center justify-between gap-2 py-3 hover:bg-[var(--text)]/5 transition-colors">
                  <span className="text-sm text-[var(--text)]/50 shrink-0">Địa chỉ ví</span>
                  <span className="text-xs text-[var(--text)] truncate max-w-[200px]">{walletAddress}</span>
                </button>
              )}
            </div>
          </TabPanel>
        </div>
      </div>
    </div>
  );
});

function UserProfileComponent({ user, stats, courses, certificates, isOwnProfile = false }: UserProfilePageProps) {
  const [selectedCert, setSelectedCert] = useState<UserCertificate | null>(null);
  const toast = useToast();

  useEffect(() => {
    if (typeof window === 'undefined' || certificates.length === 0) return;
    
    const hash = window.location.hash;
    const match = hash.match(/^#certificate-(\d+)$/);
    if (match) {
      const certId = match[1];
      const cert = certificates.find(c => c.id === certId);
      if (cert) {
        setSelectedCert(cert);
        window.history.replaceState(null, '', window.location.pathname);
      }
    }
  }, [certificates]);

  const handleCertificateClick = useCallback((cert: UserCertificate) => {
    setSelectedCert(cert);
  }, []);

  const handleCloseDialog = useCallback(() => {
    setSelectedCert(null);
  }, []);

  const handleCopyLink = useCallback(async (url: string) => {
    try {
      await navigator.clipboard.writeText(url);
      toast.success(COPY_SUCCESS_MSG);
    } catch {}
  }, [toast]);

  if (!user) {
    return (
      <div className={S.USER_PROFILE.CONTAINER}>
        <div className="flex items-center justify-center py-20">
          <p className="text-[var(--text)]/50">{USER_LABELS.noCourses}</p>
        </div>
      </div>
    );
  }

  const roleLabel = ROLE_LABELS[user.role];

  const loginMethodInfo = useMemo(() => {
    if (!user.loginMethod) return null;
    if (user.loginMethod === 'WALLET') {
      return user.walletAddress ? { icon: WalletIcon, text: truncateWalletAddress(user.walletAddress) } : null;
    }
    if (user.loginMethod === 'GOOGLE') {
      return { icon: GoogleIcon, text: user.email };
    }
    if (user.loginMethod === 'GITHUB') {
      return { icon: GitHubIcon, text: user.email };
    }
    return { icon: MailIcon, text: user.email };
  }, [user.loginMethod, user.walletAddress, user.email]);

  const renderCourse = useCallback((course: UserCourse) => (
    <UserCourseItem course={course} />
  ), []);
  const renderCertificate = useCallback((cert: UserCertificate) => (
    <UserCertificateItem certificate={cert} onClick={handleCertificateClick} onCopyLink={handleCopyLink} userWallet={user?.walletAddress} />
  ), [handleCertificateClick, handleCopyLink, user?.walletAddress]);
  const getCourseKey = useCallback((course: UserCourse) => course.id, []);
  const getCertificateKey = useCallback((cert: UserCertificate) => String(cert.id), []);

  const avatarSrc = useMemo(
    () => getUserAvatar({
      walletAddress: user.walletAddress,
      fullName: user.fullName,
      email: user.email,
    }),
    [user.walletAddress, user.fullName, user.email]
  );

  return (
    <div className={S.USER_PROFILE.CONTAINER}>
      <header className={S.USER_PROFILE.HEADER}>
        <img src={avatarSrc} alt={user.fullName} className={S.USER_PROFILE.AVATAR} />
        <div className={S.USER_PROFILE.INFO}>
          <h1 className={S.USER_PROFILE.NAME}>{user.fullName}</h1>
          <span className={S.USER_PROFILE.ROLE}>{roleLabel}</span>
          {loginMethodInfo && (
            <span className="flex items-center gap-1.5 text-xs text-[var(--text)]/40 mt-1">
              <loginMethodInfo.icon className="w-4 h-4" />
              {loginMethodInfo.text}
            </span>
          )}
          {user.bio && (
            <div className={S.USER_PROFILE.BIO}>
              <TipTapPreview content={user.bio} compact />
            </div>
          )}
          <div className={S.USER_PROFILE.META}>
            <span className={S.USER_PROFILE.META_ITEM}>
              {formatDate(user.createdAt)}
            </span>
          </div>
        </div>
        {isOwnProfile && (
          <Link href={ROUTES.PROFILE_EDIT} className={S.USER_PROFILE.EDIT_BTN}>
            {USER_LABELS.editProfile}
          </Link>
        )}
      </header>

      <StatsSection stats={stats} />

      <ListSection<UserCourse>
        title={USER_LABELS.coursesTitle}
        items={courses}
        emptyText={USER_LABELS.noCourses}
        initialCount={USER_CONFIG.INITIAL_COURSES_COUNT}
        incrementCount={USER_CONFIG.INCREMENT_COURSES_COUNT}
        renderItem={renderCourse}
        getKey={getCourseKey}
      />

      <ListSection<UserCertificate>
        title={USER_LABELS.certificatesTitle}
        items={certificates}
        emptyText={USER_LABELS.noCertificates}
        initialCount={USER_CONFIG.INITIAL_CERTIFICATES_COUNT}
        incrementCount={USER_CONFIG.INCREMENT_CERTIFICATES_COUNT}
        renderItem={renderCertificate}
        getKey={getCertificateKey}
      />

      {selectedCert && (
        <CertificateLightbox
          cert={selectedCert}
          userWallet={user?.walletAddress}
          onClose={handleCloseDialog}
          onCopy={handleCopyLink}
        />
      )}
    </div>
  );
}

export const UserProfile = memo(UserProfileComponent);
