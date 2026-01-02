'use client';

import { memo } from 'react';
import { ObjectivesSectionProps } from '@/types/course';
import { CheckCircleIcon } from '@/components/ui/icons';
import { COURSE_DETAIL } from '@/constants/course';
import * as S from '../courses.styles';

export const ObjectivesSection = memo(function ObjectivesSection({ objectives }: ObjectivesSectionProps) {
  return (
    <section className={S.COURSE_DETAIL_SECTION}>
      <h2 className={S.COURSE_DETAIL_SECTION_TITLE}>{COURSE_DETAIL.objectivesTitle}</h2>
      <div className={S.COURSE_DETAIL_OBJECTIVES}>
        {objectives.map((objective, i) => (
          <div key={i} className={S.COURSE_DETAIL_OBJECTIVE}>
            <CheckCircleIcon className={S.COURSE_DETAIL_OBJECTIVE_ICON} />
            <span>{objective}</span>
          </div>
        ))}
      </div>
    </section>
  );
});

