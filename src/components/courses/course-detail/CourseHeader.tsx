'use client';

import { Course } from '@/types/course';
import { Tags } from '@/components/ui';
import { CalendarIcon } from '@/components/ui/icons';
import { TipTapPreview } from '@/components/editor/TipTapPreview';
import { formatDate } from '@/constants/config';
import { COURSE_DETAIL } from '@/constants/course';
import * as S from '../courses.styles';

interface CourseHeaderProps {
  course: Course;
}

export function CourseHeader({ course }: CourseHeaderProps) {
  return (
    <div className={S.COURSE_DETAIL_HEADER}>
      <div className={S.COURSE_DETAIL_HEADER_OVERLAY} />
      <div className={`${S.COURSE_DETAIL_HEADER_CONTAINER} relative z-10`}>
        <h1 className={S.COURSE_DETAIL_TITLE}>{course.title}</h1>
        <div className={S.COURSE_DETAIL_SUBTITLE}>
          <TipTapPreview content={course.description} compact inheritColor />
        </div>

        {course.updatedAt && (
          <div className={S.COURSE_DETAIL_META}>
            <div className={S.COURSE_DETAIL_META_ITEM}>
              <CalendarIcon className="w-4 h-4" />
              <span>{COURSE_DETAIL.lastUpdatedText}: {formatDate(course.updatedAt)}</span>
            </div>
          </div>
        )}

        {course.tags && course.tags.length > 0 && <Tags tags={course.tags} max={5} className="mt-4" />}
      </div>
    </div>
  );
}

