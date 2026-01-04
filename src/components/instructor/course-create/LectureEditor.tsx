'use client';

import { memo, useCallback } from 'react';
import { TipTapEditor } from '@/components/editor/TipTapEditor';
import { COURSE_CREATE_LABELS as LABELS, COURSE_CREATE_STYLES as S } from '@/constants/course-create';
import type { LectureEditorProps } from '@/types/course-create';
import { EditorCardHeader } from './EditorCardHeader';
import { VideoUploader } from './VideoUploader';

export const LectureEditor = memo(function LectureEditor({
  lecture,
  chapterIndex,
  lectureIndex,
  onUpdate,
  onRemove,
  disabled,
}: LectureEditorProps) {
  const handleChange = useCallback(<K extends keyof typeof lecture>(
    field: K,
    value: typeof lecture[K]
  ) => {
    onUpdate(chapterIndex, lectureIndex, { ...lecture, [field]: value });
  }, [lecture, chapterIndex, lectureIndex, onUpdate]);

  const handleRemove = useCallback(() => {
    onRemove(chapterIndex, lectureIndex);
  }, [chapterIndex, lectureIndex, onRemove]);

  const handlePreviewFreeChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    onUpdate(chapterIndex, lectureIndex, { ...lecture, previewFree: e.target.checked });
  }, [lecture, chapterIndex, lectureIndex, onUpdate]);

  const handleVideoChange = useCallback((url: string, duration?: number) => {
    const updatedLecture = { ...lecture, videoUrl: url, ...(duration !== undefined && { duration }) };
    onUpdate(chapterIndex, lectureIndex, updatedLecture);
  }, [lecture, chapterIndex, lectureIndex, onUpdate]);

  return (
    <div className={S.LECTURE_CARD}>
      <EditorCardHeader
        title={`${LABELS.lectures.prefix} ${lectureIndex + 1}`}
        onRemove={handleRemove}
        removeTitle={LABELS.lectures.removeLecture}
        disabled={disabled}
      />

      <div className={S.GRID_2}>
        <div className={S.FORM_GROUP}>
          <label className={S.LABEL}>{LABELS.lectures.lectureTitle}</label>
          <input
            type="text"
            value={lecture.title}
            onChange={e => handleChange('title', e.target.value)}
            placeholder={LABELS.lectures.lecturePlaceholder}
            className={S.INPUT}
            disabled={disabled}
          />
        </div>

        <div className={S.FORM_GROUP}>
          <label className={S.LABEL}>&nbsp;</label>
          <label className={`flex items-center gap-2 select-none h-[42px] ${disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}`}>
            <input
              type="checkbox"
              checked={lecture.previewFree}
              onChange={handlePreviewFreeChange}
              className="w-4 h-4 text-[var(--accent)] rounded border-[var(--border)] focus:ring-[var(--accent)]"
              disabled={disabled}
            />
            <span className="text-sm text-[var(--text)]">{LABELS.lectures.previewFree}</span>
          </label>
          <p className="text-xs text-[var(--text)]/50">{LABELS.lectures.previewFreeHint}</p>
        </div>
      </div>

      <VideoUploader
        videoUrl={lecture.videoUrl}
        onVideoChange={handleVideoChange}
        disabled={disabled}
      />

      <div className={S.FORM_GROUP}>
        <label className={S.LABEL}>{LABELS.lectures.content}</label>
        <TipTapEditor
          content={lecture.content}
          onChange={value => handleChange('content', value)}
          placeholder={LABELS.lectures.contentPlaceholder}
          minHeight="200px"
          disabled={disabled}
        />
      </div>
    </div>
  );
});
