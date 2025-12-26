import { memo, forwardRef } from 'react';
import type { LoadingSpinnerProps } from '@/types/inbox';

const SPINNER_CLASS = 'animate-spin w-5 h-5 border-2 border-[var(--accent)] border-t-transparent rounded-full';
const CONTAINER_CLASS = 'flex justify-center py-4';

export const LoadingSpinner = memo(forwardRef<HTMLDivElement, LoadingSpinnerProps>(
  function LoadingSpinner({ isLoading }, ref) {
    return (
      <div ref={ref} className={CONTAINER_CLASS}>
        {isLoading && <div className={SPINNER_CLASS} />}
      </div>
    );
  }
));
