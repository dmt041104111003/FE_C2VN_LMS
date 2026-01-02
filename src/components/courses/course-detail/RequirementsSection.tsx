'use client';

import { memo } from 'react';
import { RequirementsSectionProps } from '@/types/course';
import { COURSE_DETAIL } from '@/constants/course';
import * as S from '../courses.styles';

export const RequirementsSection = memo(function RequirementsSection({ requirements }: RequirementsSectionProps) {
  return (
    <section className={S.COURSE_DETAIL_SECTION}>
      <h2 className={S.COURSE_DETAIL_SECTION_TITLE}>{COURSE_DETAIL.requirementsTitle}</h2>
      <div className={S.COURSE_DETAIL_REQUIREMENTS}>
        {requirements.map((req, i) => (
          <div key={i} className={S.COURSE_DETAIL_REQUIREMENT}>
            <div className={S.COURSE_DETAIL_REQUIREMENT_BULLET} />
            <span>{req}</span>
          </div>
        ))}
      </div>
    </section>
  );
});

