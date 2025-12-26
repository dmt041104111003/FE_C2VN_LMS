'use client';

import { memo, useCallback } from 'react';
import { PlusIcon } from '@/components/ui';
import { ICON_SM } from '@/components/ui/ui.styles';
import { COURSE_CREATE_LABELS as LABELS, COURSE_CREATE_STYLES as S } from '@/constants/course-create';
import type { ChapterEditorProps } from '@/types/course-create';
import { LectureEditor } from './LectureEditor';
import { EditorCardHeader } from './EditorCardHeader';

export const ChapterEditor = memo(function ChapterEditor({
  chapter,
  chapterIndex,
  onUpdate,
  onRemove,
  onAddLecture,
  onUpdateLecture,
  onRemoveLecture,
}: ChapterEditorProps) {
  const handleTitleChange = useCallback((title: string) => {
    onUpdate(chapterIndex, { ...chapter, title });
  }, [chapter, chapterIndex, onUpdate]);

  const handleRemove = useCallback(() => {
    onRemove(chapterIndex);
  }, [chapterIndex, onRemove]);

  return (
    <div className={S.CHAPTER_CARD}>
      <EditorCardHeader
        title={`${LABELS.chapters.prefix} ${chapterIndex + 1}`}
        onRemove={handleRemove}
        removeTitle={LABELS.chapters.removeChapter}
      />

      <div className={S.FORM_GROUP}>
        <label className={S.LABEL}>{LABELS.chapters.chapterTitle}</label>
        <input
          type="text"
          value={chapter.title}
          onChange={e => handleTitleChange(e.target.value)}
          placeholder={LABELS.chapters.chapterPlaceholder}
          className={S.INPUT}
        />
      </div>

      <div className={S.LIST_GAP_MD}>
        <div className={S.SECTION_HEADER}>
          <span className={S.SECTION_SUBTITLE}>{LABELS.lectures.title}</span>
          <button
            type="button"
            onClick={() => onAddLecture(chapterIndex)}
            className={S.ADD_BTN}
          >
            <PlusIcon className={ICON_SM} />
            {LABELS.lectures.addLecture}
          </button>
        </div>

        {chapter.lectures.map((lecture, lectureIndex) => (
          <LectureEditor
            key={lecture.id}
            lecture={lecture}
            chapterIndex={chapterIndex}
            lectureIndex={lectureIndex}
            onUpdate={onUpdateLecture}
            onRemove={onRemoveLecture}
          />
        ))}
      </div>
    </div>
  );
});

