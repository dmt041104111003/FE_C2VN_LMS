'use client';

import { useRef, useCallback } from 'react';
import { COURSE_CREATE_STYLES as S } from '@/constants/course-create';
import type { ImageUploaderProps } from '@/types/course-create';

export function ImageUploader({ imageFile, existingImageUrl, onImageChange, required, disabled }: ImageUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) onImageChange(file);
  }, [onImageChange]);

  const previewUrl = imageFile ? URL.createObjectURL(imageFile) : existingImageUrl;

  return (
    <section className={S.SECTION}>
      <h2 className={S.SECTION_TITLE_BORDERED}>
        Ảnh đại diện khóa học {required && <span className={S.REQUIRED}>*</span>}
      </h2>
      <div className={S.FORM_GROUP}>
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          onChange={handleChange}
          className="hidden"
          id="course-image"
          disabled={disabled}
        />
        <label
          htmlFor="course-image"
          className={`flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-[var(--border)] rounded-xl transition-colors overflow-hidden ${
            disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer hover:border-[var(--accent)]'
          }`}
        >
          {previewUrl ? (
            <img src={previewUrl} alt="Preview" className="w-full h-full object-cover" />
          ) : (
            <div className="text-center">
              <p className="text-sm text-[var(--text)]/70">Nhấn để chọn ảnh</p>
              <p className="text-xs text-[var(--text)]/50 mt-1">PNG, JPG (tối đa 5MB)</p>
            </div>
          )}
        </label>
        {imageFile && (
          <p className="text-xs text-[var(--text)]/50 mt-2">Đã chọn: {imageFile.name}</p>
        )}
        {!imageFile && existingImageUrl && (
          <p className="text-xs text-[var(--text)]/50 mt-2">Nhấn vào ảnh để thay đổi</p>
        )}
      </div>
    </section>
  );
}
