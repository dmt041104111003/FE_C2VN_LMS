'use client';

import { memo } from 'react';
import { VideoPlayer } from '@/components/ui';
import { SECTION_LABELS } from './constants';
import * as S from '../courses.styles';

interface IntroVideoSectionProps {
  videoUrl: string;
}

function IntroVideoSectionComponent({ videoUrl }: IntroVideoSectionProps) {
  return (
    <section className={S.COURSE_DETAIL_SECTION}>
      <h2 className={S.COURSE_DETAIL_SECTION_TITLE}>{SECTION_LABELS.introVideo}</h2>
      <div className="rounded-lg overflow-hidden">
        <VideoPlayer url={videoUrl} />
      </div>
    </section>
  );
}

export const IntroVideoSection = memo(IntroVideoSectionComponent);

