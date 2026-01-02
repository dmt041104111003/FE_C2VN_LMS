'use client';

import { memo } from 'react';
import { User, ShowMore } from '@/components/ui';
import { TipTapPreview } from '@/components/editor';
import { SECTION_LABELS, SHOW_MORE_CONFIG } from './constants';
import * as S from '../courses.styles';

interface InstructorSectionProps {
  name: string;
  avatar?: string;
  bio?: string;
}

function InstructorSectionComponent({ name, avatar, bio }: InstructorSectionProps) {
  const { lineClamp } = SHOW_MORE_CONFIG.instructorBio;

  return (
    <section className={S.COURSE_DETAIL_SECTION}>
      <h2 className={S.COURSE_DETAIL_SECTION_TITLE}>{SECTION_LABELS.instructor}</h2>
      <User name={name} avatar={avatar} size="lg" />
      {bio && (
        <ShowMore lineClamp={lineClamp} className="mt-4">
          <TipTapPreview content={bio} compact />
        </ShowMore>
      )}
    </section>
  );
}

export const InstructorSection = memo(InstructorSectionComponent);

