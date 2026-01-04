'use client';

import Link from 'next/link';
import { Course } from '@/types/course';
import { BookIcon, ClockIcon, UsersIcon } from '@/components/ui/icons';
import { Dialog } from '@/components/ui/Dialog';
import { WalletModal } from '@/components/ui/WalletModal';
import { formatCurrency, formatDuration } from '@/constants/config';
import { COURSE_DETAIL, COURSE_PAGE } from '@/constants/course';
import { ROUTES } from '@/constants/navigation';
import { useEnrollment } from '@/hooks';
import { ENROLL_DIALOG, ENROLLMENT_CONFIG } from './constants';
import type { CourseSidebarProps, PriceSectionProps, ProgressBarProps, FeatureProps } from './types';
import * as S from '../courses.styles';

const isDiscountValid = (discount?: number, discountEndTime?: string): boolean => {
  if (!discount || discount <= 0) return false;
  if (!discountEndTime) return false;
  return new Date() < new Date(discountEndTime);
};

const calculateDiscountedPrice = (price: number, discount?: number, discountEndTime?: string): number => 
  isDiscountValid(discount, discountEndTime) ? price * (1 - discount! / ENROLLMENT_CONFIG.percentDivisor) : price;

const getButtonText = (progress: number): string => {
  if (progress === ENROLLMENT_CONFIG.progressNone) return COURSE_DETAIL.startButton;
  if (progress === ENROLLMENT_CONFIG.progressComplete) return COURSE_DETAIL.completedText;
  return COURSE_DETAIL.continueButton;
};

const getEnrollButtonText = (isFree: boolean): string => 
  isFree ? COURSE_DETAIL.enrollFreeButton : COURSE_DETAIL.enrollButton;

const getPaidMessage = (price: number, currency: string): string => 
  `Bạn sẽ thanh toán ${formatCurrency(price, currency)} để đăng ký khóa học này.`;

function PriceSection({ price, discountedPrice, discount, discountEndTime, currency }: PriceSectionProps) {
  if (price === 0) {
    return (
      <div className={S.COURSE_DETAIL_CARD_PRICE}>
        <span className={S.COURSE_DETAIL_CARD_PRICE_FREE}>{COURSE_PAGE.freeText}</span>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-1">
      <div className={S.COURSE_DETAIL_CARD_PRICE}>
        <span className={S.COURSE_DETAIL_CARD_PRICE_CURRENT}>
          {formatCurrency(discountedPrice, currency)}
        </span>
        {discount && (
          <>
            <span className={S.COURSE_DETAIL_CARD_PRICE_ORIGINAL}>
              {formatCurrency(price, currency)}
            </span>
            <span className={S.COURSE_DETAIL_CARD_DISCOUNT}>-{discount}%</span>
          </>
        )}
      </div>
      {discount && discountEndTime && (
        <p className="text-xs text-[var(--correct)]">
          Đến {new Date(discountEndTime).toLocaleString('vi-VN')}
        </p>
      )}
    </div>
  );
}

function ProgressBar({ progress }: ProgressBarProps) {
  return (
    <div className={S.COURSE_DETAIL_PROGRESS}>
      <div className={S.COURSE_DETAIL_PROGRESS_HEADER}>
        <span className={S.COURSE_DETAIL_PROGRESS_LABEL}>{COURSE_DETAIL.progressText}</span>
        <span className={S.COURSE_DETAIL_PROGRESS_VALUE}>{progress}%</span>
      </div>
      <div className={S.COURSE_DETAIL_PROGRESS_BAR}>
        <div className={S.COURSE_DETAIL_PROGRESS_FILL} style={{ width: `${progress}%` }} />
      </div>
    </div>
  );
}

function Feature({ icon: Icon, text }: FeatureProps) {
  return (
    <div className={S.COURSE_DETAIL_CARD_FEATURE}>
      <Icon className={S.COURSE_DETAIL_CARD_FEATURE_ICON} />
      <span>{text}</span>
    </div>
  );
}

function CourseThumbnail({ thumbnail, title }: { thumbnail?: string; title: string }) {
  if (thumbnail) {
    return <img src={thumbnail} alt={title} className={S.COURSE_DETAIL_CARD_IMAGE} />;
  }
  return (
    <div className={S.COURSE_DETAIL_CARD_IMAGE_PLACEHOLDER}>
      <img src="/loading.png" alt="" className="w-16 h-16 opacity-30" />
    </div>
  );
}

function CourseFeatures({ totalLectures, totalLessons, totalDuration, totalStudents }: {
  totalLectures: number;
  totalLessons: number;
  totalDuration: number;
  totalStudents: number;
}) {
  return (
    <div className={S.COURSE_DETAIL_CARD_FEATURES}>
      <Feature icon={BookIcon} text={`${totalLectures || totalLessons} ${COURSE_DETAIL.lessonsText}`} />
      <Feature icon={ClockIcon} text={`${formatDuration(totalDuration)} ${COURSE_DETAIL.totalText.toLowerCase()}`} />
      <Feature icon={UsersIcon} text={`${totalStudents.toLocaleString()} ${COURSE_DETAIL.studentsText}`} />
    </div>
  );
}

function EnrolledActions({ courseSlug, progress }: { courseSlug: string; progress: number }) {
  return (
    <Link href={`${ROUTES.COURSES}/${courseSlug}/learn`} className={S.COURSE_DETAIL_CARD_BUTTON}>
      {getButtonText(progress)}
    </Link>
  );
}

function EnrollButton({ onClick, isProcessing, isFree }: {
  onClick: () => void;
  isProcessing: boolean;
  isFree: boolean;
}) {
  return (
    <button 
      onClick={onClick} 
      disabled={isProcessing} 
      className={`${S.COURSE_DETAIL_CARD_BUTTON} ${isProcessing ? 'opacity-50 cursor-not-allowed' : ''}`}
    >
      {isProcessing ? 'Đang xử lý...' : getEnrollButtonText(isFree)}
    </button>
  );
}

export function CourseSidebar({ 
  course, 
  isEnrolled = false, 
  progress = 0, 
  totalLectures,
  totalDuration,
}: CourseSidebarProps) {
  const courseSlug = course.slug || course.id;
  const discountedPrice = calculateDiscountedPrice(course.price, course.discount, course.discountEndTime);
  const hasValidDiscount = isDiscountValid(course.discount, course.discountEndTime);
  const isFree = course.price === 0;

  const {
    state,
    wallets,
    handleEnrollClick,
    handleConfirmEnroll,
    handleWalletSelect,
    closeDialog,
    closeWalletModal,
  } = useEnrollment({ course, courseSlug, discountedPrice });

  const dialogMessage = isFree 
    ? ENROLL_DIALOG.freeMessage 
    : getPaidMessage(discountedPrice, course.currency);

  return (
    <>
      <div className={S.COURSE_DETAIL_SIDEBAR}>
        <div className={S.COURSE_DETAIL_CARD}>
          <div className={S.COURSE_DETAIL_CARD_IMAGE_WRAPPER}>
            <CourseThumbnail thumbnail={course.thumbnail} title={course.title} />
          </div>
          <div className={S.COURSE_DETAIL_CARD_BODY}>
            <PriceSection 
              price={course.price} 
              discountedPrice={discountedPrice} 
              discount={hasValidDiscount ? course.discount : undefined} 
              discountEndTime={hasValidDiscount ? course.discountEndTime : undefined}
              currency={course.currency} 
            />

            {isEnrolled ? (
              <EnrolledActions courseSlug={courseSlug} progress={progress} />
            ) : (
              <EnrollButton 
                onClick={handleEnrollClick} 
                isProcessing={state.isProcessing} 
                isFree={isFree} 
              />
            )}

            <CourseFeatures 
              totalLectures={totalLectures}
              totalLessons={course.totalLessons}
              totalDuration={totalDuration}
              totalStudents={course.totalStudents}
            />
          </div>
        </div>
      </div>

      <Dialog
        isOpen={state.isDialogOpen}
        title={ENROLL_DIALOG.title}
        message={dialogMessage}
        primaryText={ENROLL_DIALOG.confirmText}
        secondaryText={ENROLL_DIALOG.cancelText}
        onPrimary={handleConfirmEnroll}
        onSecondary={closeDialog}
      />

      <WalletModal
        isOpen={state.isWalletModalOpen}
        wallets={wallets}
        emptyText={ENROLL_DIALOG.noWallet}
        onClose={closeWalletModal}
        onSelect={handleWalletSelect}
      />
    </>
  );
}
