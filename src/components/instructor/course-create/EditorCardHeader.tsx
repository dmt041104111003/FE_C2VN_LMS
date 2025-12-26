'use client';

import { memo } from 'react';
import { TrashIcon } from '@/components/ui';
import { ICON_SM } from '@/components/ui/ui.styles';
import { COURSE_CREATE_STYLES as S } from '@/constants/course-create';
import type { EditorCardHeaderProps } from '@/types/course-create';

export const EditorCardHeader = memo(function EditorCardHeader({
  title,
  onRemove,
  removeTitle,
  titleClassName = S.CARD_TITLE,
}: EditorCardHeaderProps) {
  return (
    <div className={S.CARD_HEADER}>
      <span className={titleClassName}>{title}</span>
      <button
        type="button"
        onClick={onRemove}
        className={S.REMOVE_BTN}
        title={removeTitle}
      >
        <TrashIcon className={ICON_SM} />
      </button>
    </div>
  );
});

