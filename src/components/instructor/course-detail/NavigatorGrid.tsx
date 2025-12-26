'use client';

import { QUIZ } from '@/components/learning/learning.styles';
import type { NavigatorGridProps } from '@/types/course-detail';

export function NavigatorGrid({ items, currentIndex, onSelect, title }: NavigatorGridProps) {
  const getItemClass = (idx: number) => 
    `${QUIZ.QUESTION_LIST_ITEM} ${idx === currentIndex ? QUIZ.QUESTION_LIST_CURRENT : QUIZ.QUESTION_LIST_ANSWERED}`;

  return (
    <div className={QUIZ.QUESTION_LIST}>
      <div className={QUIZ.QUESTION_LIST_TITLE}>{title}</div>
      <div className={QUIZ.QUESTION_LIST_GRID}>
        {Array.from({ length: items }, (_, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => onSelect(idx)}
            className={getItemClass(idx)}
          >
            {idx + 1}
          </button>
        ))}
      </div>
    </div>
  );
}

