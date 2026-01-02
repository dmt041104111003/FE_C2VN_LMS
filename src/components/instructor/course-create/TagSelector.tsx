'use client';

import { COURSE_CREATE_STYLES as S } from '@/constants/course-create';
import type { TagSelectorProps } from '@/types/course-create';

export function TagSelector({ tags, selectedIds, onToggle, disabled }: TagSelectorProps) {
  if (tags.length === 0) {
    return (
      <section className={S.SECTION}>
        <h2 className={S.SECTION_TITLE_BORDERED}>Thẻ khóa học</h2>
        <div className={S.FORM_GROUP}>
          <p className="text-sm text-[var(--text)]/50">
            Chưa có thẻ nào.{' '}
            <a href="/instructor/tags" className="text-[var(--accent)] hover:underline">
              Tạo thẻ mới
            </a>
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className={S.SECTION}>
      <h2 className={S.SECTION_TITLE_BORDERED}>Thẻ khóa học</h2>
      <div className={S.FORM_GROUP}>
        <div className="flex flex-wrap gap-2">
          {tags.map(tag => {
            const isSelected = selectedIds.includes(tag.id);
            return (
              <button
                key={tag.id}
                type="button"
                onClick={() => onToggle(tag.id)}
                disabled={disabled}
                className={`px-3 py-1.5 rounded-full text-sm border transition-colors ${
                  disabled ? 'cursor-not-allowed opacity-50' : ''
                } ${
                  isSelected
                    ? 'bg-[var(--accent)] text-white border-[var(--accent)]'
                    : 'bg-[var(--bg-alt)]/50 text-[var(--text)] border-[var(--border)] hover:border-[var(--accent)]'
                }`}
              >
                {tag.name}
              </button>
            );
          })}
        </div>
        {selectedIds.length > 0 && (
          <p className="text-xs text-[var(--text)]/50 mt-2">
            Đã chọn {selectedIds.length} thẻ
          </p>
        )}
      </div>
    </section>
  );
}
