'use client';

import { memo, useMemo } from 'react';
import Link from 'next/link';
import { COURSE_PAGE } from '@/constants/course';
import { CourseCardProps, CardType, ImageSectionProps } from '@/types/course';
import { Badge, Rating, User, Tags, PriceDisplay, FeatureList } from '@/components/ui';
import { TipTapPreview } from '@/components/editor/TipTapPreview';
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

interface ImageSectionInternalProps extends ImageSectionProps {
  hasValidDiscount: boolean;
}

const ImageSection = memo(function ImageSection({ course, className, isFree, hasValidDiscount }: ImageSectionInternalProps) {
  return (
    <div className={`${COURSE_CARD_IMAGE_BASE} ${className}`}>
      {course.thumbnail ? (
        <img src={course.thumbnail} alt={course.title} className={COURSE_CARD_IMAGE_HOVER} />
      ) : (
        <div className={`w-full h-full ${COURSE_CARD_PLACEHOLDER}`}>
          <img src="/loading.png" alt="" className="w-12 h-12 sm:w-16 sm:h-16 opacity-30" />
        </div>
      )}
      <div className="absolute top-2 left-2 flex gap-1">
        {isFree && <Badge variant="accent">{COURSE_PAGE.freeText}</Badge>}
        {hasValidDiscount && <Badge variant="accent">-{course.discount}%</Badge>}
      </div>
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
            className="mb-2"
          />
        )}

        <div className={COURSE_CARD_FOOTER}>
          <PriceDisplay
            price={course.price}
            currency={course.currency}
            discount={hasValidDiscount ? course.discount : undefined}
            discountEndTime={course.discountEndTime}
            freeText={COURSE_PAGE.freeText}
            size={config.priceSize}
          />
        </div>
      </div>
    );
  };

  return (
    <Link href={`/courses/${course.slug || course.id}`} className={`${COURSE_CARD_BASE} ${config.containerClass} ${className}`}>
      <ImageSection course={course} className={config.imageClass} isFree={isFree} hasValidDiscount={hasValidDiscount} />
      {renderContent()}
    </Link>
  );
}

export const CourseCard = memo(CourseCardComponent);
