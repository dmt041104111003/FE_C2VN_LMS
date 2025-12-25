'use client';

import { memo } from 'react';
import Link from 'next/link';
import { COURSE_PAGE } from '@/constants/course';
import { CourseCardProps } from '@/types/course';
import { Badge, Rating, Instructor, Tags, PriceDisplay, FeatureList } from '@/components/ui';

function CourseCardComponent({ course, featured = false, tall = false, wide = false, className = '' }: CourseCardProps) {
  const isFree = course.price === 0;

  if (featured) {
    return (
      <Link
        href={`/courses/${course.id}`}
        className={`group block bg-[var(--bg)] rounded-2xl overflow-hidden border border-[var(--text)]/5 hover:border-[var(--accent)]/30 transition-colors flex flex-col sm:flex-row h-full sm:min-h-[200px] ${className}`}
      >
        <div className="sm:w-1/2 flex-shrink-0 bg-[var(--bg-alt)] relative overflow-hidden">
          {course.thumbnail ? (
            <img
              src={course.thumbnail}
              alt={course.title}
              className="w-full h-[140px] sm:h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-[140px] sm:h-full flex items-center justify-center">
              <img src="/loading.png" alt="" className="w-16 h-16 opacity-30" />
            </div>
          )}
          <div className="absolute top-2 left-2 flex gap-1">
            {isFree && (
              <Badge variant="accent">
                {COURSE_PAGE.freeText}
              </Badge>
            )}
            {course.discount && (
              <Badge variant="accent">
                -{course.discount}%
              </Badge>
            )}
          </div>
        </div>

        <div className="sm:w-1/2 p-3 sm:p-4 flex flex-col">
          {course.tags && course.tags.length > 0 && (
            <Tags tags={course.tags} max={3} className="mb-1" />
          )}

          <h3 className="text-base sm:text-lg font-bold text-[var(--text)] mb-1 group-hover:text-[var(--accent)] transition-colors">
            {course.title}
          </h3>

          <p className="text-xs text-[var(--text)]/60 mb-2 line-clamp-2">
            {course.description}
          </p>

          <Instructor
            name={course.instructorName}
            avatar={course.instructorAvatar}
            size="sm"
            className="mb-1"
          />

          {course.rating && (
            <Rating
              value={course.rating}
              count={course.totalStudents}
              size="sm"
              className="mb-1"
            />
          )}

          <FeatureList
            features={[
              `${course.totalLessons} ${COURSE_PAGE.lessonsText}`,
              `${course.totalStudents} ${COURSE_PAGE.studentsText}`,
              'Chứng chỉ NFT',
              'Truy cập trọn đời',
            ]}
            size="xs"
            columns={2}
            className="mb-2"
          />

          <div className="flex items-center justify-between mt-auto pt-2 border-t border-[var(--text)]/5">
            <PriceDisplay
              price={course.price}
              currency={course.currency}
              discount={course.discount}
              freeText={COURSE_PAGE.freeText}
              size="md"
            />
          </div>
        </div>
      </Link>
    );
  }

  if (tall) {
    return (
      <Link
        href={`/courses/${course.id}`}
        className={`group block bg-[var(--bg)] rounded-2xl overflow-hidden border border-[var(--text)]/5 hover:border-[var(--accent)]/30 transition-colors h-full flex flex-col ${className}`}
      >
        <div className="aspect-video bg-[var(--bg-alt)] relative overflow-hidden flex-shrink-0">
          {course.thumbnail ? (
            <img
              src={course.thumbnail}
              alt={course.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <img src="/loading.png" alt="" className="w-12 h-12 opacity-30" />
            </div>
          )}
          <div className="absolute top-2 left-2 flex gap-1">
            {isFree && (
              <Badge variant="accent">
                {COURSE_PAGE.freeText}
              </Badge>
            )}
            {course.discount && (
              <Badge variant="accent">
                -{course.discount}%
              </Badge>
            )}
          </div>
        </div>

        <div className="p-3 flex flex-col flex-1">
          {course.tags && course.tags.length > 0 && (
            <Tags tags={course.tags} className="mb-2" />
          )}

          <h3 className="font-semibold text-[var(--text)] mb-1 group-hover:text-[var(--accent)] transition-colors">
            {course.title}
          </h3>

          <p className="text-xs text-[var(--text)]/60 mb-3">
            {course.description}
          </p>

          <Instructor
            name={course.instructorName}
            avatar={course.instructorAvatar}
            label="Giảng viên"
            size="md"
            className="mb-2 pb-2 border-b border-[var(--text)]/5"
          />

          {course.rating && (
            <Rating
              value={course.rating}
              count={course.totalStudents}
              size="sm"
              className="mb-2"
            />
          )}

          <FeatureList
            features={[
              `${course.totalLessons} ${COURSE_PAGE.lessonsText}`,
              `${course.totalStudents} ${COURSE_PAGE.studentsText} đã đăng ký`,
              `Cập nhật ${new Date(course.createdAt).toLocaleDateString('vi-VN', { month: 'long', year: 'numeric' })}`,
              'Chứng chỉ NFT hoàn thành',
              'Truy cập trọn đời',
              'Hỗ trợ Q&A trực tiếp',
            ]}
            size="sm"
            className="mb-2"
          />

          <div className="flex items-center justify-between pt-2 mt-auto border-t border-[var(--text)]/5">
            <PriceDisplay
              price={course.price}
              currency={course.currency}
              discount={course.discount}
              freeText={COURSE_PAGE.freeText}
              size="sm"
            />
          </div>
        </div>
      </Link>
    );
  }

  if (wide) {
    return (
      <Link
        href={`/courses/${course.id}`}
        className={`group block bg-[var(--bg)] rounded-2xl overflow-hidden border border-[var(--text)]/5 hover:border-[var(--accent)]/30 transition-colors flex flex-col sm:flex-row h-full ${className}`}
      >
        <div className="sm:w-1/2 flex-shrink-0 bg-[var(--bg-alt)] relative overflow-hidden">
          {course.thumbnail ? (
            <img
              src={course.thumbnail}
              alt={course.title}
              className="w-full h-[120px] sm:h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-[120px] sm:h-full flex items-center justify-center">
              <img src="/loading.png" alt="" className="w-16 h-16 opacity-30" />
            </div>
          )}
          <div className="absolute top-2 left-2 flex gap-1">
            {isFree && (
              <Badge variant="accent">
                {COURSE_PAGE.freeText}
              </Badge>
            )}
            {course.discount && (
              <Badge variant="accent">
                -{course.discount}%
              </Badge>
            )}
          </div>
        </div>

        <div className="sm:w-1/2 p-3 flex flex-col">
          {course.tags && course.tags.length > 0 && (
            <Tags tags={course.tags} max={2} className="mb-1" />
          )}

          <h3 className="text-sm font-bold text-[var(--text)] mb-1 group-hover:text-[var(--accent)] transition-colors">
            {course.title}
          </h3>

          <p className="text-[10px] text-[var(--text)]/60 mb-1 line-clamp-2">
            {course.description}
          </p>

          <Instructor
            name={course.instructorName}
            avatar={course.instructorAvatar}
            size="xs"
            className="mb-1"
          />

          {course.rating && (
            <Rating
              value={course.rating}
              showCount={false}
              size="xs"
              className="mb-1"
            />
          )}

          <FeatureList
            features={[
              `${course.totalLessons} ${COURSE_PAGE.lessonsText}`,
              `${course.totalStudents} ${COURSE_PAGE.studentsText}`,
              'Chứng chỉ NFT',
            ]}
            size="xs"
            columns={2}
            className="mb-1"
          />

          <div className="flex items-center justify-between mt-auto pt-1 border-t border-[var(--text)]/5">
            <PriceDisplay
              price={course.price}
              currency={course.currency}
              discount={course.discount}
              freeText={COURSE_PAGE.freeText}
              size="xs"
            />
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link
      href={`/courses/${course.id}`}
      className={`group block bg-[var(--bg)] rounded-2xl overflow-hidden border border-[var(--text)]/5 hover:border-[var(--accent)]/30 transition-colors flex flex-col ${className}`}
    >
      <div className="aspect-[5/2] bg-[var(--bg-alt)] relative overflow-hidden flex-shrink-0">
        {course.thumbnail ? (
          <img
            src={course.thumbnail}
            alt={course.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <img src="/loading.png" alt="" className="w-12 h-12 opacity-30" />
          </div>
        )}
        {isFree && (
          <Badge variant="accent" className="absolute top-2 left-2">
            {COURSE_PAGE.freeText}
          </Badge>
        )}
      </div>

      <div className="p-3 flex flex-col flex-1">
        <h3 className="font-semibold text-sm text-[var(--text)] mb-1 line-clamp-2 group-hover:text-[var(--accent)] transition-colors">
          {course.title}
        </h3>

        <Instructor
          name={course.instructorName}
          avatar={course.instructorAvatar}
          size="xs"
          className="mb-2"
        />

        <div className="flex items-center justify-between text-[11px] text-[var(--text)]/50 mt-auto">
          <span>{course.totalLessons} {COURSE_PAGE.lessonsText}</span>
          <PriceDisplay
            price={course.price}
            currency={course.currency}
            discount={course.discount}
            freeText={COURSE_PAGE.freeText}
            size="xs"
          />
        </div>
      </div>
    </Link>
  );
}

export const CourseCard = memo(CourseCardComponent);
