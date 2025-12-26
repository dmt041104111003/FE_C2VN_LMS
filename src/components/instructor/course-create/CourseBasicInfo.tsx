'use client';

import { memo, useCallback } from 'react';
import { TipTapEditor } from '@/components/editor/TipTapEditor';
import {
  COURSE_CREATE_LABELS as LABELS,
  COURSE_CREATE_STYLES as S,
  COURSE_STATUS_OPTIONS,
  isPriceKeyBlocked,
  sanitizePrice,
} from '@/constants/course-create';
import { SYSTEM_CONFIG } from '@/constants/config';
import type { CourseBasicInfoProps, CourseStatus } from '@/types/course-create';

export const CourseBasicInfo = memo(function CourseBasicInfo({
  title,
  price,
  description,
  status,
  onTitleChange,
  onPriceChange,
  onDescriptionChange,
  onStatusChange,
}: CourseBasicInfoProps) {
  const handlePriceChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    onPriceChange(sanitizePrice(e.target.value));
  }, [onPriceChange]);

  const handlePriceKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    if (isPriceKeyBlocked(e.key)) e.preventDefault();
  }, []);

  return (
    <section className={S.SECTION}>
      <h2 className={S.SECTION_TITLE_BORDERED}>{LABELS.basicInfo.title}</h2>
      
      <div className={S.GRID_3}>
        <div className={S.FORM_GROUP}>
          <label className={S.LABEL}>
            {LABELS.basicInfo.courseTitle} <span className={S.REQUIRED}>*</span>
          </label>
          <input
            type="text"
            value={title}
            onChange={e => onTitleChange(e.target.value)}
            placeholder={LABELS.basicInfo.courseTitlePlaceholder}
            className={S.INPUT}
          />
        </div>

        <div className={S.FORM_GROUP}>
          <label className={S.LABEL}>
            {LABELS.basicInfo.price} <span className={S.REQUIRED}>*</span>
          </label>
          <div className={S.INPUT_GROUP}>
            <span className={S.INPUT_PREFIX}>{SYSTEM_CONFIG.DEFAULT_CURRENCY}</span>
            <input
              type="number"
              value={price || ''}
              onChange={handlePriceChange}
              onKeyDown={handlePriceKeyDown}
              placeholder={LABELS.basicInfo.pricePlaceholder}
              className={S.INPUT_NO_BORDER}
              min={0}
              step="0.01"
            />
          </div>
        </div>

        <div className={S.FORM_GROUP}>
          <label className={S.LABEL}>{LABELS.basicInfo.status}</label>
          <select
            value={status}
            onChange={e => onStatusChange(e.target.value as CourseStatus)}
            className={S.SELECT}
          >
            {COURSE_STATUS_OPTIONS.map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>
      </div>

      <div className={S.FORM_GROUP}>
        <label className={S.LABEL}>{LABELS.basicInfo.description}</label>
        <TipTapEditor
          content={description}
          onChange={onDescriptionChange}
          placeholder={LABELS.basicInfo.descriptionPlaceholder}
          minHeight="150px"
        />
      </div>
    </section>
  );
});
