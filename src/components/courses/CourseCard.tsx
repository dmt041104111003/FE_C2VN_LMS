'use client';

import { memo, useMemo } from 'react';
import Link from 'next/link';
import { COURSE_PAGE } from '@/constants/course';
import { CourseCardProps, CardType, Course } from '@/types/course';
import { Badge, Rating, User, Tags, PriceDisplay, FeatureList } from '@/components/ui';
import { CheckCircleIcon } from '@/components/ui/icons';
import { TipTapPreview } from '@/components/editor/TipTapPreview';
import { formatDate } from '@/constants/config';
import {
  CARD_CONFIGS,
  COURSE_CARD_BASE,
  COURSE_CARD_IMAGE_BASE,
  COURSE_CARD_TITLE_HOVER,
  COURSE_CARD_DESC,
  COURSE_CARD_IMAGE_HOVER,
  COURSE_CARD_PLACEHOLDER,
  COURSE_CARD_FOOTER,
} from './courses.styles';

const isDiscountValid = (discount?: number, discountEndTime?: string): boolean => {
  if (!discount || discount <= 0) return false;
  if (!discountEndTime) return false;
  return new Date() < new Date(discountEndTime);
};

const COURSE_OBJECTIVES = [
  'Nắm vững kiến thức nền tảng',
  'Thực hành với dự án thực tế',
  'Nhận chứng chỉ NFT khi hoàn thành',
];

const HoverPopover = memo(function HoverPopover({ course }: { course: Course }) {
  return (
    <div className="absolute left-[330px] top-0 w-[340px] bg-[var(--bg)] rounded-xl shadow-2xl border border-[var(--text)]/10 p-5 z-[100] hidden lg:group-hover:block">
      <div className="absolute -left-2 top-6 w-4 h-4 bg-[var(--bg)] border-l border-b border-[var(--text)]/10 transform rotate-45" />
      
      <h3 className="text-lg font-bold text-[var(--text)] mb-2 line-clamp-2">{course.title}</h3>
      
      <div className="flex items-center gap-2 text-xs text-[var(--text)]/60 mb-2">
        <span className="text-[var(--accent)] font-medium">Đã cập nhật</span>
        <span>{formatDate(course.createdAt)}</span>
      </div>
      
      <div className="text-xs text-[var(--text)]/60 mb-3">
        {course.totalLessons} bài giảng • {course.totalStudents} học viên
      </div>
      
      <div className="text-sm text-[var(--text)] mb-4 line-clamp-3">
        <TipTapPreview content={course.description} compact />
      </div>
      
      <ul className="space-y-2">
        {COURSE_OBJECTIVES.map((obj, i) => (
          <li key={i} className="flex items-start gap-2 text-sm text-[var(--text)]">
            <CheckCircleIcon className="w-4 h-4 text-[var(--accent)] mt-0.5 flex-shrink-0" />
            <span>{obj}</span>
          </li>
        ))}
      </ul>
    </div>
  );
});

const ImageSection = memo(function ImageSection({ course, className }: { course: CourseCardProps['course']; className: string }) {
  return (
    <div className={`${COURSE_CARD_IMAGE_BASE} ${className}`}>
      {course.thumbnail ? (
        <img src={course.thumbnail} alt={course.title} className={COURSE_CARD_IMAGE_HOVER} />
      ) : (
        <div className={`w-full h-full ${COURSE_CARD_PLACEHOLDER}`}>
          <img src="/loading.png" alt="" className="w-12 h-12 sm:w-16 sm:h-16 opacity-30" />
        </div>
      )}
    </div>
  );
});

function CourseCardComponent({ course, featured = false, tall = false, wide = false, className = '' }: CourseCardProps) {
  const cardType = useMemo<CardType>(() => {
    if (featured) return 'featured';
    if (tall) return 'tall';
    if (wide) return 'wide';
    return 'default';
  }, [featured, tall, wide]);

  const config = CARD_CONFIGS[cardType];
  const isFree = course.price === 0;
  const hasValidDiscount = isDiscountValid(course.discount, course.discountEndTime);

  const renderContent = () => {
    if (cardType === 'default') {
      return (
        <div className={config.contentClass}>
          <h3 className={`${config.titleClass} ${COURSE_CARD_TITLE_HOVER}`}>{course.title}</h3>
          <User name={course.instructorName} avatar={course.instructorAvatar} size="xs" className="mb-2" />
          <div className="flex items-center justify-between text-xs text-[var(--text)]/50 mt-auto">
            <span>{course.totalLessons} {COURSE_PAGE.lessonsText}</span>
            <PriceDisplay
              price={course.price}
              currency={course.currency}
              discount={hasValidDiscount ? course.discount : undefined}
              discountEndTime={course.discountEndTime}
              freeText={COURSE_PAGE.freeText}
              size="xs"
            />
          </div>
        </div>
      );
    }

    return (
      <div className={config.contentClass}>
        {config.showTags && course.tags && course.tags.length > 0 && (
          <Tags tags={course.tags} max={config.maxTags} className="mb-1" />
        )}

        <h3 className={`${config.titleClass} ${COURSE_CARD_TITLE_HOVER}`}>{course.title}</h3>

        {config.showDescription && (
          <div className={`${config.descClass} ${COURSE_CARD_DESC}`}>
            <TipTapPreview content={course.description} compact />
          </div>
        )}

        <User
          name={course.instructorName}
          avatar={course.instructorAvatar}
          label={config.showInstructorLabel ? 'Giảng viên' : undefined}
          size={config.userSize}
          className={`mb-${config.showInstructorLabel ? '2 pb-2 border-b border-[var(--text)]/5' : '1'}`}
        />

        {course.rating != null && course.rating > 0 && (
          <Rating
            value={course.rating}
            count={config.showRatingCount ? course.totalStudents : undefined}
            showCount={config.showRatingCount}
            size={config.ratingSize}
            className="mb-1"
          />
        )}

        {config.showFeatures && (
          <FeatureList
            features={config.features(course)}
            size={config.featureSize}
            columns={config.featureColumns}
            inline={config.featureColumns === 1}
            className="mb-2"
          />
        )}

        <div className={COURSE_CARD_FOOTER}>
          <div className="flex items-center gap-3">
            <PriceDisplay
              price={course.price}
              currency={course.currency}
              discount={hasValidDiscount ? course.discount : undefined}
              discountEndTime={course.discountEndTime}
              freeText={COURSE_PAGE.freeText}
              size={config.priceSize}
            />
            {hasValidDiscount && (
              <Badge variant="accent">-{course.discount}%</Badge>
            )}
          </div>
          {hasValidDiscount && course.discountEndTime && (
            <span className="text-xs text-[var(--text)]/50">
              Còn đến {new Date(course.discountEndTime).toLocaleDateString('vi-VN')}
            </span>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="relative group z-0 hover:z-50">
      <Link href={`/courses/${course.slug || course.id}`} className={`${COURSE_CARD_BASE} ${config.containerClass} ${className}`}>
        <ImageSection course={course} className={config.imageClass} />
        {renderContent()}
      </Link>
      <HoverPopover course={course} />
    </div>
  );
}

export const CourseCard = memo(CourseCardComponent);
