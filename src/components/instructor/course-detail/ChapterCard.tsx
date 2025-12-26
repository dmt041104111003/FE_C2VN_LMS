'use client';

import { useState } from 'react';
import { VideoPlayer } from '@/components/ui';
import { TipTapPreview } from '@/components/editor/TipTapPreview';
import { COURSE_DETAIL_LABELS, COURSE_DETAIL_STYLES } from '@/constants/course-detail';
import { NavigatorGrid } from './NavigatorGrid';
import type { ChapterCardProps, LectureItemProps } from '@/types/course-detail';

const LABELS = COURSE_DETAIL_LABELS;
const S = COURSE_DETAIL_STYLES;

export function ChapterCard({ chapter, index }: ChapterCardProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentLecture = chapter.lectures[currentIndex];
  const hasLectures = chapter.lectures.length > 0;

  return (
    <div className={`${S.card.base} overflow-hidden`}>
      <div className={S.chapter.header}>
        <h4 className={S.chapter.title}>
          {LABELS.chapterPrefix} {index + 1}: {chapter.title}
        </h4>
        <p className={S.chapter.subtitle}>
          {chapter.lectures.length} {LABELS.fields.lectures}
        </p>
      </div>
      {hasLectures ? (
        <div className={S.navigator.wrapper}>
          <div className={S.navigator.grid}>
            <div className={S.navigator.sidebar}>
              <NavigatorGrid
                items={chapter.lectures.length}
                currentIndex={currentIndex}
                onSelect={setCurrentIndex}
                title={LABELS.lectureList}
              />
            </div>
            <div className={S.navigator.main}>
              {currentLecture && <LectureItem lecture={currentLecture} index={currentIndex} />}
            </div>
          </div>
        </div>
      ) : (
        <div className={S.navigator.wrapper}>
          <p className="text-sm text-[var(--text)]/50 italic">{LABELS.empty.lectures}</p>
        </div>
      )}
    </div>
  );
}

function LectureItem({ lecture, index }: LectureItemProps) {
  return (
    <div className={S.card.item}>
      <div className="flex items-center gap-3 mb-4">
        <span className={S.chapter.index}>{index + 1}</span>
        <span className={S.chapter.lectureTitle}>{lecture.title}</span>
      </div>
      {lecture.videoUrl && (
        <div className="mb-4">
          <VideoPlayer url={lecture.videoUrl} className="w-full" />
        </div>
      )}
      {lecture.content && (
        <div className="text-sm">
          <TipTapPreview content={lecture.content} />
        </div>
      )}
    </div>
  );
}

