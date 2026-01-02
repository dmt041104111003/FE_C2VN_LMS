'use client';

import { useState, useCallback, useMemo } from 'react';
import { Chapter } from '@/types/course';
import { formatDuration } from '@/constants/config';
import { COURSE_DETAIL } from '@/constants/course';
import { ChapterItem } from './ChapterItem';
import * as S from '../courses.styles';

interface ChaptersSectionProps {
  chapters: Chapter[];
  onPreview: (lectureId: string) => void;
}

export function ChaptersSection({ chapters, onPreview }: ChaptersSectionProps) {
  const [expandedChapters, setExpandedChapters] = useState<Set<string>>(new Set());

  const { totalLectures, totalDuration } = useMemo(() => ({
    totalLectures: chapters.reduce((acc, ch) => acc + ch.lectures.length, 0),
    totalDuration: chapters.reduce(
      (acc, ch) => acc + ch.lectures.reduce((a, l) => a + l.duration, 0), 0
    ),
  }), [chapters]);

  const toggleChapter = useCallback((chapterId: string) => {
    setExpandedChapters(prev => {
      const next = new Set(prev);
      next.has(chapterId) ? next.delete(chapterId) : next.add(chapterId);
      return next;
    });
  }, []);

  const toggleAll = useCallback(() => {
    setExpandedChapters(prev => 
      prev.size === chapters.length
        ? new Set()
        : new Set(chapters.map(ch => ch.id))
    );
  }, [chapters]);

  const allExpanded = expandedChapters.size === chapters.length;

  return (
    <section className={S.COURSE_DETAIL_SECTION}>
      <div className="flex items-center justify-between mb-4">
        <h2 className={`${S.COURSE_DETAIL_SECTION_TITLE} !mb-0`}>{COURSE_DETAIL.chaptersTitle}</h2>
        <div className="flex items-center gap-4 text-sm">
          <span className="text-[var(--text)]/50">
            {chapters.length} chương • {totalLectures} {COURSE_DETAIL.lecturesText} • {formatDuration(totalDuration)}
          </span>
          <button onClick={toggleAll} className="text-[var(--accent)] hover:underline">
            {allExpanded ? COURSE_DETAIL.collapseAll : COURSE_DETAIL.expandAll}
          </button>
        </div>
      </div>
      <div className={S.COURSE_DETAIL_CHAPTERS}>
        {chapters.map(chapter => (
          <ChapterItem
            key={chapter.id}
            chapter={chapter}
            isExpanded={expandedChapters.has(chapter.id)}
            onToggle={() => toggleChapter(chapter.id)}
            onPreview={onPreview}
          />
        ))}
      </div>
    </section>
  );
}

