'use client';

import { memo, useCallback } from 'react';
import { TipTapEditor } from '@/components/editor/TipTapEditor';
import { VideoPlayer } from '@/components/ui/VideoPlayer';
import {
  COURSE_CREATE_LABELS as LABELS,
  COURSE_CREATE_STYLES as S,
  COURSE_STATUS_OPTIONS,
  isPriceKeyBlocked,
  sanitizePrice,
  isValidPrice,
  MIN_PAID_PRICE_ADA,
} from '@/constants/course-create';
import { SYSTEM_CONFIG } from '@/constants/config';
import type { CourseBasicInfoProps, CourseStatus } from '@/types/course-create';

export const CourseBasicInfo = memo(function CourseBasicInfo({
  title,
  price,
  description,
  videoUrl,
  status,
  receiverAddress,
  discount,
  discountEndTime,
  onTitleChange,
  onPriceChange,
  onDescriptionChange,
  onVideoUrlChange,
  onStatusChange,
  onReceiverAddressChange,
  onDiscountChange,
  onDiscountEndTimeChange,
  disabled,
}: CourseBasicInfoProps) {
  const handlePriceChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    onPriceChange(sanitizePrice(e.target.value));
  }, [onPriceChange]);

  const handlePriceKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    if (isPriceKeyBlocked(e.key)) e.preventDefault();
  }, []);

  const handleDiscountChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (val === '') {
      onDiscountChange?.(undefined);
    } else {
      const num = Math.min(100, Math.max(0, parseInt(val, 10) || 0));
      onDiscountChange?.(num);
    }
  }, [onDiscountChange]);

  const handleDiscountEndTimeChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    onDiscountEndTimeChange?.(e.target.value || undefined);
  }, [onDiscountEndTimeChange]);

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
            disabled={disabled}
          />
        </div>

        <div className={S.FORM_GROUP}>
          <label className={S.LABEL}>
            {LABELS.basicInfo.price}
          </label>
          <div className={S.INPUT_GROUP}>
            <span className={S.INPUT_PREFIX}>{SYSTEM_CONFIG.DEFAULT_CURRENCY}</span>
            <input
              type="number"
              value={price}
              onChange={handlePriceChange}
              onKeyDown={handlePriceKeyDown}
              placeholder={LABELS.basicInfo.pricePlaceholder}
              className={S.INPUT_NO_BORDER}
              min={0}
              step="1"
              disabled={disabled}
            />
          </div>
          {!isValidPrice(price) ? (
            <p className="text-xs text-[var(--incorrect)] mt-1">
              Giá phải là 0 (miễn phí) hoặc từ {MIN_PAID_PRICE_ADA} ADA trở lên
            </p>
          ) : (
          <p className="text-xs text-[var(--text)]/50 mt-1">
            {price === 0 
              ? 'Khóa học miễn phí' 
              : discount && discount > 0 && discountEndTime
                ? `Giá: ${(price * (1 - discount / 100)).toFixed(2)} ${SYSTEM_CONFIG.DEFAULT_CURRENCY} (gốc: ${price} ${SYSTEM_CONFIG.DEFAULT_CURRENCY})`
                : `Giá: ${price} ${SYSTEM_CONFIG.DEFAULT_CURRENCY}`}
          </p>
          )}
        </div>

        <div className={S.FORM_GROUP}>
          <label className={S.LABEL}>{LABELS.basicInfo.status}</label>
          <select
            value={status}
            onChange={e => onStatusChange(e.target.value as CourseStatus)}
            className={S.SELECT}
            disabled={disabled}
          >
            {COURSE_STATUS_OPTIONS.map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>
      </div>

      {price > 0 && (
        <>
          <div className={S.FORM_GROUP}>
            <label className={S.LABEL}>
              {LABELS.basicInfo.receiverAddress} <span className={S.REQUIRED}>*</span>
            </label>
            <input
              type="text"
              value={receiverAddress}
              onChange={e => onReceiverAddressChange(e.target.value)}
              placeholder={LABELS.basicInfo.receiverAddressPlaceholder}
              className={S.INPUT}
              disabled={disabled}
            />
            <p className="text-xs text-[var(--text)]/50 mt-1">
              Địa chỉ ví Cardano để nhận thanh toán khi học viên mua khóa học
            </p>
          </div>

          <div className={S.GRID_2}>
            <div className={S.FORM_GROUP}>
              <label className={S.LABEL}>Giảm giá (%)</label>
              <input
                type="number"
                min={0}
                max={100}
                value={discount ?? ''}
                onChange={handleDiscountChange}
                placeholder="VD: 20"
                className={S.INPUT}
                disabled={disabled}
              />
              {discount && discount > 0 && !isValidPrice(price * (1 - discount / 100)) ? (
                <p className="text-xs text-[var(--incorrect)] mt-1">
                  Giá sau giảm ({(price * (1 - discount / 100)).toFixed(2)} ADA) phải ≥ {MIN_PAID_PRICE_ADA} ADA
                </p>
              ) : (
              <p className="text-xs text-[var(--text)]/50 mt-1">
                {discount && discount > 0 
                  ? discountEndTime 
                    ? `Giá sau giảm: ${(price * (1 - discount / 100)).toFixed(2)} ${SYSTEM_CONFIG.DEFAULT_CURRENCY}` 
                    : `Cần đặt thời hạn giảm giá để áp dụng`
                  : 'Để trống nếu không giảm giá'}
              </p>
              )}
            </div>

            <div className={S.FORM_GROUP}>
              <label className={S.LABEL}>
                Thời hạn giảm giá {discount && discount > 0 && <span className={S.REQUIRED}>*</span>}
              </label>
              <input
                type="datetime-local"
                value={discountEndTime ?? ''}
                onChange={handleDiscountEndTimeChange}
                className={S.INPUT}
                disabled={disabled}
              />
              <p className="text-xs text-[var(--text)]/50 mt-1">
                {discount && discount > 0 
                  ? 'Bắt buộc để áp dụng giảm giá'
                  : 'Để trống nếu không giảm giá'}
              </p>
            </div>
          </div>
        </>
      )}

      <div className={S.FORM_GROUP}>
        <label className={S.LABEL}>{LABELS.basicInfo.videoUrl}</label>
        <input
          type="text"
          value={videoUrl}
          onChange={e => onVideoUrlChange(e.target.value)}
          placeholder={LABELS.basicInfo.videoPlaceholder}
          className={S.INPUT}
          disabled={disabled}
        />
        {videoUrl && (
          <div className={S.VIDEO_PREVIEW}>
            <VideoPlayer url={videoUrl} />
          </div>
        )}
      </div>

      <div className={S.FORM_GROUP}>
        <label className={S.LABEL}>{LABELS.basicInfo.description}</label>
        <TipTapEditor
          content={description}
          onChange={onDescriptionChange}
          placeholder={LABELS.basicInfo.descriptionPlaceholder}
          minHeight="150px"
          disabled={disabled}
        />
      </div>
    </section>
  );
});
