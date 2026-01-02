'use client';

import { memo, useState, useCallback, useEffect, ReactNode } from 'react';
import { ChevronDownIcon } from './icons';

export interface ShowMoreProps {
  children: ReactNode | ReactNode[];
  initialCount?: number;
  incrementCount?: number;
  showText?: string;
  hideText?: string;
  className?: string;
  
  lineClamp?: number;
  
  buttonPosition?: 'top' | 'bottom';
  
  targetId?: string;
}

const SHOW_MORE_BTN = 'flex items-center justify-center gap-2 w-full py-3 text-sm text-[var(--text)]/60 hover:text-[var(--accent)] transition-colors';
const SHOW_MORE_ICON = 'w-4 h-4 transition-transform duration-200';
const SHOW_MORE_ICON_EXPANDED = 'rotate-180';

const LINE_CLAMP_CLASSES: Record<number, string> = {
  1: 'line-clamp-1',
  2: 'line-clamp-2',
  3: 'line-clamp-3',
  4: 'line-clamp-4',
  5: 'line-clamp-5',
  6: 'line-clamp-6',
};

function ShowMoreComponent({
  children,
  initialCount = 2,
  incrementCount = 10,
  showText = 'Xem thêm',
  hideText = 'Thu gọn',
  className = '',
  lineClamp,
  buttonPosition = 'bottom',
  targetId,
}: ShowMoreProps) {
  const [expanded, setExpanded] = useState(false);

  
  if (lineClamp) {
    const clampClass = LINE_CLAMP_CLASSES[lineClamp] || 'line-clamp-2';
    const toggleButton = (
      <button 
        onClick={() => setExpanded(!expanded)} 
        className={SHOW_MORE_BTN}
      >
        <span>{expanded ? hideText : showText}</span>
        <ChevronDownIcon className={`${SHOW_MORE_ICON} ${expanded ? SHOW_MORE_ICON_EXPANDED : ''}`} />
      </button>
    );
    
    return (
      <div className={className}>
        {buttonPosition === 'top' && toggleButton}
        <div className={expanded ? '' : clampClass}>
          {children}
        </div>
        {buttonPosition === 'bottom' && toggleButton}
      </div>
    );
  }

  
  const items = Array.isArray(children) ? children : [children];
  const totalItems = items.length;
  
  
  const shouldAutoExpand = targetId && initialCount === 0;
  const [visibleCount, setVisibleCount] = useState(shouldAutoExpand ? totalItems : initialCount);
  
  
  useEffect(() => {
    if (!targetId) return;
    
    const checkAndExpand = () => {
      const element = document.getElementById(targetId);
      if (element) {
        
        if (targetId === 'qna-section') {
          return true;
        }
        
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth', block: 'center' });
          element.classList.add('ring-2', 'ring-[var(--accent)]', 'ring-offset-2');
          setTimeout(() => {
            element.classList.remove('ring-2', 'ring-[var(--accent)]', 'ring-offset-2');
          }, 3000);
        }, 300);
        return true;
      }
      return false;
    };
    
    
    const timer = setTimeout(() => {
      if (!checkAndExpand() && visibleCount < totalItems) {
        
        setVisibleCount(prev => Math.min(prev + incrementCount, totalItems));
      }
    }, 200);
    
    return () => clearTimeout(timer);
  }, [targetId, visibleCount, totalItems, incrementCount]);

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

  const toggleButtons = (
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
  );

  return (
    <div className={className}>
      {buttonPosition === 'top' && toggleButtons}
      {visibleItems}
      {buttonPosition === 'bottom' && toggleButtons}
    </div>
  );
}

export const ShowMore = memo(ShowMoreComponent);
