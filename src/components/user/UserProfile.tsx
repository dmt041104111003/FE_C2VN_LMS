'use client';

import { memo, useMemo, useCallback } from 'react';
import Link from 'next/link';
import {
  UserProfilePageProps,
  UserCourseItemProps,
  UserCertificateItemProps,
  LoginMethodInfo,
  CourseImageProps,
  UserProgressBarProps,
  StatsSectionProps,
  ListSectionProps,
  UserCourse,
  UserCertificate,
} from '@/types/user';
import {
  USER_LABELS,
  USER_CONFIG,
  ROLE_LABELS,
  LOGIN_METHOD_ICONS,
  STATS_ITEMS,
  truncateWalletAddress,
} from '@/constants/user';
import { ROUTES } from '@/constants/navigation';
import { formatDate } from '@/constants/config';
import { ShowMore } from '@/components/ui';
import { TipTapPreview } from '@/components/editor';
import { getAvatarFromName } from '@/utils';
import { CheckCircleIcon, CalendarIcon } from '@/components/ui/icons';
import * as S from './user.styles';

const CourseImage = memo(function CourseImage({ thumbnail, title }: CourseImageProps) {
  if (thumbnail) {
    return <img src={thumbnail} alt={title} className={S.USER_COURSE_ITEM.IMAGE} />;
  }
  return (
    <div className={S.USER_COURSE_ITEM.IMAGE_PLACEHOLDER}>
      <img src={USER_CONFIG.DEFAULT_COURSE_IMAGE} alt="" className="w-8 h-8 opacity-30" />
    </div>
  );
});

const ProgressBar = memo(function ProgressBar({ progress }: UserProgressBarProps) {
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
      <CheckCircleIcon className={S.ICON_SIZES.SM} />
      <span>{USER_LABELS.completedText}</span>
    </div>
  );
});

const UserCourseItem = memo(function UserCourseItem({ course }: UserCourseItemProps) {
  const isCompleted = course.progress === USER_CONFIG.PROGRESS_COMPLETE;

  return (
    <Link href={`${ROUTES.COURSES}/${course.courseId}`} className={S.USER_COURSE_ITEM.CONTAINER}>
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

const UserCertificateItem = memo(function UserCertificateItem({ certificate }: UserCertificateItemProps) {
  return (
    <Link href={`${ROUTES.CERTIFICATES}/${certificate.id}`} className={S.USER_CERTIFICATE_ITEM.CONTAINER}>
      <div className={S.USER_CERTIFICATE_ITEM.IMAGE_WRAPPER}>
        <img src={USER_CONFIG.DEFAULT_CERTIFICATE_IMAGE} alt="" className={S.USER_CERTIFICATE_ITEM.IMAGE} />
      </div>
      <div className={S.USER_CERTIFICATE_ITEM.CONTENT}>
        <h3 className={S.USER_CERTIFICATE_ITEM.TITLE}>{certificate.courseTitle}</h3>
        <span className={S.USER_CERTIFICATE_ITEM.META}>{formatDate(certificate.issuedAt)}</span>
      </div>
    </Link>
  );
});

const StatsSection = memo(function StatsSection({ stats }: StatsSectionProps) {
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

function UserProfileComponent({ user, stats, courses, certificates, isOwnProfile = false }: UserProfilePageProps) {
  const roleLabel = ROLE_LABELS[user.role];

  const loginMethodInfo = useMemo((): LoginMethodInfo | null => {
    const Icon = LOGIN_METHOD_ICONS[user.loginMethod];
    if (user.loginMethod === 'WALLET') {
      return user.walletAddress ? { icon: Icon, text: truncateWalletAddress(user.walletAddress) } : null;
    }
    return { icon: Icon, text: user.email };
  }, [user.loginMethod, user.walletAddress, user.email]);

  const renderCourse = useCallback((course: UserCourse) => <UserCourseItem course={course} />, []);
  const renderCertificate = useCallback((cert: UserCertificate) => <UserCertificateItem certificate={cert} />, []);
  const getCourseKey = useCallback((course: UserCourse) => course.id, []);
  const getCertificateKey = useCallback((cert: UserCertificate) => cert.id, []);

  const avatarSrc = useMemo(
    () => user.avatar || getAvatarFromName(user.fullName),
    [user.avatar, user.fullName]
  );

  return (
    <div className={S.USER_PROFILE.CONTAINER}>
      <header className={S.USER_PROFILE.HEADER}>
        <img src={avatarSrc} alt={user.fullName} className={S.USER_PROFILE.AVATAR} />
        <div className={S.USER_PROFILE.INFO}>
          <h1 className={S.USER_PROFILE.NAME}>{user.fullName}</h1>
          <span className={S.USER_PROFILE.ROLE}>{roleLabel}</span>
          {user.bio && (
            <div className={S.USER_PROFILE.BIO}>
              <TipTapPreview content={user.bio} compact />
            </div>
          )}
          <div className={S.USER_PROFILE.META}>
            <span className={S.USER_PROFILE.META_ITEM}>
              <CalendarIcon className={S.ICON_SIZES.XS} />
              {formatDate(user.createdAt)}
            </span>
            {loginMethodInfo && (
              <span className={S.USER_PROFILE.META_ITEM}>
                <loginMethodInfo.icon className={S.ICON_SIZES.XS} />
                {loginMethodInfo.text}
              </span>
            )}
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
    </div>
  );
}

export const UserProfile = memo(UserProfileComponent);
