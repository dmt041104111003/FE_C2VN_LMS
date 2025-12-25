'use client';

import { memo, useState, useCallback, ReactNode } from 'react';
import { ChevronDownIcon } from './icons';

export interface ShowMoreProps {
  children: ReactNode[];
  initialCount?: number;
  incrementCount?: number;
  showText?: string;
  hideText?: string;
  className?: string;
}

const SHOW_MORE_BTN = 'flex items-center justify-center gap-2 w-full py-3 text-sm text-[var(--text)]/60 hover:text-[var(--accent)] transition-colors';
const SHOW_MORE_ICON = 'w-4 h-4 transition-transform duration-200';
const SHOW_MORE_ICON_EXPANDED = 'rotate-180';

function ShowMoreComponent({
  children,
  initialCount = 2,
  incrementCount = 10,
  showText = 'Xem thêm',
  hideText = 'Thu gọn',
  className = '',
}: ShowMoreProps) {
  const [visibleCount, setVisibleCount] = useState(initialCount);
  
  const items = Array.isArray(children) ? children : [children];
  const totalItems = items.length;
  const hasMore = visibleCount < totalItems;
  const isExpanded = visibleCount > initialCount;
  const visibleItems = items.slice(0, visibleCount);
  const remainingCount = totalItems - visibleCount;

  const handleShowMore = useCallback(() => {
    setVisibleCount((prev) => Math.min(prev + incrementCount, totalItems));
  }, [incrementCount, totalItems]);

  const handleCollapse = useCallback(() => {
    setVisibleCount(initialCount);
  }, [initialCount]);

  if (items.length === 0) return null;

  return (
    <div className={className}>
      {visibleItems}
      
      <div className="flex gap-2 justify-center">
        {hasMore && (
          <button onClick={handleShowMore} className={SHOW_MORE_BTN}>
            <span>{showText} ({remainingCount})</span>
            <ChevronDownIcon className={SHOW_MORE_ICON} />
          </button>
        )}
        
        {isExpanded && (
          <button onClick={handleCollapse} className={SHOW_MORE_BTN}>
            <span>{hideText}</span>
            <ChevronDownIcon className={`${SHOW_MORE_ICON} ${SHOW_MORE_ICON_EXPANDED}`} />
          </button>
        )}
      </div>
    </div>
  );
}

export const ShowMore = memo(ShowMoreComponent);
