'use client';

import { memo, useState, useCallback, useMemo } from 'react';
import Link from 'next/link';
import { ChevronDownIcon, PlayIcon } from '@/components/ui/icons';
import { ProgressBar } from '@/components/ui';
import { LEARNING_LABELS, LESSON_TYPE_ICONS, LESSON_STATUS_ICONS } from '@/constants/learning';
import type { 
  LearningSidebarProps, 
  ChapterItemProps, 
  LessonItemProps, 
  LessonStatus 
} from '@/types/learning';
import * as S from './learning.styles';

const STATUS_CLASSES: Record<LessonStatus, string> = {
  completed: S.SIDEBAR.LESSON_COMPLETED,
  locked: S.SIDEBAR.LESSON_LOCKED,
  available: S.SIDEBAR.LESSON_AVAILABLE,
  in_progress: S.SIDEBAR.LESSON_AVAILABLE,
};

const ChapterItem = memo(function ChapterItem({ chapter, currentLessonId, progress, onSelectLesson }: ChapterItemProps) {
  const [isOpen, setIsOpen] = useState(() => chapter.lessons.some(l => l.id === currentLessonId));
  const toggle = useCallback(() => setIsOpen(p => !p), []);

  return (
    <div className={S.SIDEBAR.CHAPTER}>
      <div className={S.SIDEBAR.CHAPTER_HEADER} onClick={toggle}>
        <span className={S.SIDEBAR.CHAPTER_TITLE}>{chapter.title}</span>
        <ChevronDownIcon className={`${S.SIDEBAR.CHAPTER_ICON} ${isOpen ? S.SIDEBAR.CHAPTER_ICON_OPEN : ''}`} />
      </div>
      {isOpen && (
        <div className={S.SIDEBAR.LESSON_LIST}>
          {chapter.lessons.map(lesson => (
            <LessonItem
              key={lesson.id}
              lesson={lesson}
              isCurrent={lesson.id === currentLessonId}
              status={progress[lesson.id]?.status || 'locked'}
              onSelect={onSelectLesson}
            />
          ))}
        </div>
      )}
    </div>
  );
});

const LessonItem = memo(function LessonItem({ lesson, isCurrent, status, onSelect }: LessonItemProps) {
  const statusClass = isCurrent ? S.SIDEBAR.LESSON_CURRENT : STATUS_CLASSES[status];

  const handleClick = useCallback(() => {
    if (status !== 'locked') onSelect(lesson.id);
  }, [status, lesson.id, onSelect]);

  const StatusIcon = LESSON_STATUS_ICONS[status];
  const TypeIcon = StatusIcon || LESSON_TYPE_ICONS[lesson.type] || PlayIcon;

  return (
    <div className={`${S.SIDEBAR.LESSON} ${statusClass}`} onClick={handleClick}>
      <TypeIcon className={S.SIDEBAR.LESSON_ICON} />
      <div className={S.SIDEBAR.LESSON_CONTENT}>
        <div className={S.SIDEBAR.LESSON_TITLE}>{lesson.title}</div>
        <div className={S.SIDEBAR.LESSON_META}>{lesson.duration} phút</div>
      </div>
    </div>
  );
});

function LearningSidebarComponent({ chapters, currentLessonId, progress, onSelectLesson }: LearningSidebarProps) {
  const { completed, total } = useMemo(() => {
    let completed = 0, total = 0;
    chapters.forEach(ch => ch.lessons.forEach(l => {
      total++;
      if (progress[l.id]?.status === 'completed') completed++;
    }));
    return { completed, total };
  }, [chapters, progress]);

  const progressPercent = total > 0 ? Math.round((completed / total) * 100) : 0;

  return (
    <div className="flex flex-col h-full">
      <Link href="/" className={S.SIDEBAR.BACK_LINK}>
        ← Về trang chủ
      </Link>
      <div className={S.SIDEBAR.HEADER}>
        <div className={S.SIDEBAR.TITLE}>{LEARNING_LABELS.sidebar.title}</div>
        <ProgressBar value={completed} max={total} size="xs" />
        <div className={S.SIDEBAR.PROGRESS_TEXT}>
          {completed}/{total} · {progressPercent}%
        </div>
      </div>
      <div className={S.SIDEBAR.CHAPTER_LIST}>
        {chapters.map(chapter => (
          <ChapterItem
            key={chapter.id}
            chapter={chapter}
            currentLessonId={currentLessonId}
            progress={progress}
            onSelectLesson={onSelectLesson}
          />
        ))}
      </div>
    </div>
  );
}

export const LearningSidebar = memo(LearningSidebarComponent);
