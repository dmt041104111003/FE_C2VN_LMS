'use client';

import { memo } from 'react';
import type { 
  SpinnerProps, 
  LoadingProps, 
  LoadingOverlayProps, 
  PageLoadingProps, 
  SkeletonProps, 
  ButtonSpinnerProps 
} from './ui.types';
import {
  SPINNER_SIZES,
  SPINNER_COLORS,
  SPINNER_BORDER_COLORS,
  SPINNER_BORDER_WIDTHS,
  SPINNER_TEXT_SIZES,
  SPINNER_WAVE_HEIGHTS,
  SPINNER_WAVE_WIDTHS,
  SPINNER_WAVE_GAPS,
  SKELETON_ROUNDED,
  SPINNER,
} from './ui.styles';

export const Spinner = memo(function Spinner({ 
  size = 'md', 
  variant = 'accent',
  className = '' 
}: SpinnerProps) {
  const colorClass = SPINNER_COLORS[variant];

  return (
    <div 
      className={`flex items-center ${SPINNER_WAVE_GAPS[size]} ${className}`}
      role="status"
      aria-label="Đang tải"
    >
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className={`${SPINNER_SIZES[size].dot} ${colorClass} rounded-full`}
          style={{ 
            animation: 'pulse-dot 1.4s ease-in-out infinite',
            animationDelay: `${i * 0.16}s` 
          }}
        />
      ))}
    </div>
  );
});

export const SpinnerBounce = memo(function SpinnerBounce({ 
  size = 'md', 
  variant = 'accent',
  className = '' 
}: SpinnerProps) {
  const colorClass = SPINNER_COLORS[variant];

  return (
    <div 
      className={`flex items-end ${SPINNER_WAVE_HEIGHTS[size]} ${SPINNER_WAVE_GAPS[size]} ${className}`}
      role="status"
      aria-label="Đang tải"
    >
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className={`${SPINNER_SIZES[size].dot} ${colorClass} rounded-full`}
          style={{ 
            animation: 'bounce-dot 0.6s ease-in-out infinite alternate',
            animationDelay: `${i * 0.1}s` 
          }}
        />
      ))}
    </div>
  );
});

export const SpinnerWave = memo(function SpinnerWave({ 
  size = 'md', 
  variant = 'accent',
  className = '' 
}: SpinnerProps) {
  const colorClass = SPINNER_COLORS[variant];

  return (
    <div 
      className={`flex items-center ${SPINNER_WAVE_HEIGHTS[size]} ${SPINNER_WAVE_GAPS[size]} ${className}`}
      role="status"
      aria-label="Đang tải"
    >
      {[0, 1, 2, 3, 4].map((i) => (
        <span
          key={i}
          className={`${SPINNER_WAVE_WIDTHS[size]} ${colorClass} rounded-full`}
          style={{
            animation: 'wave-bar 1s ease-in-out infinite',
            animationDelay: `${i * 0.1}s`,
            height: '40%',
          }}
        />
      ))}
    </div>
  );
});

export const SpinnerRing = memo(function SpinnerRing({ 
  size = 'md', 
  variant = 'accent',
  className = '' 
}: SpinnerProps) {
  const sizeClass = SPINNER_SIZES[size];

  return (
    <div 
      className={`relative ${sizeClass.wrapper} ${className}`}
      role="status"
      aria-label="Đang tải"
    >
      <span 
        className={`absolute inset-0 rounded-full ${SPINNER_BORDER_WIDTHS[size]} ${SPINNER_BORDER_COLORS[variant]} border-t-transparent animate-spin`}
      />
    </div>
  );
});

export const SpinnerFade = memo(function SpinnerFade({ 
  size = 'md', 
  variant = 'accent',
  className = '' 
}: SpinnerProps) {
  const colorClass = SPINNER_COLORS[variant];

  return (
    <div 
      className={`flex items-center ${SPINNER_WAVE_GAPS[size]} ${className}`}
      role="status"
      aria-label="Đang tải"
    >
      {[0, 1, 2, 3].map((i) => (
        <span
          key={i}
          className={`${SPINNER_SIZES[size].dot} ${colorClass} rounded-full`}
          style={{ 
            animation: 'fade-dot 1.2s ease-in-out infinite',
            animationDelay: `${i * 0.15}s` 
          }}
        />
      ))}
    </div>
  );
});

export const SpinnerLine = memo(function SpinnerLine({ 
  size = 'md', 
  variant = 'accent',
  className = '' 
}: SpinnerProps) {
  const heights: Record<string, string> = { xs: 'h-0.5', sm: 'h-1', md: 'h-1', lg: 'h-1.5', xl: 'h-2' };
  const widths: Record<string, string> = { xs: 'w-12', sm: 'w-16', md: 'w-24', lg: 'w-32', xl: 'w-40' };
  const colorClass = SPINNER_COLORS[variant];

  return (
    <div 
      className={`relative ${widths[size]} ${heights[size]} bg-[var(--text)]/10 rounded-full overflow-hidden ${className}`}
      role="status"
      aria-label="Đang tải"
    >
      <span 
        className={`absolute inset-y-0 left-0 ${colorClass} rounded-full`}
        style={{ 
          width: '30%',
          animation: 'line-progress 1.5s ease-in-out infinite'
        }}
      />
    </div>
  );
});

export const SpinnerBreath = memo(function SpinnerBreath({ 
  size = 'md', 
  variant = 'accent',
  className = '' 
}: SpinnerProps) {
  const sizeClass = SPINNER_SIZES[size];
  const colorClass = SPINNER_COLORS[variant];

  return (
    <div 
      className={`relative ${sizeClass.wrapper} ${className}`}
      role="status"
      aria-label="Đang tải"
    >
      <span 
        className={`absolute inset-0 ${colorClass} rounded-full`}
        style={{ animation: 'breath 2s ease-in-out infinite' }}
      />
      <span 
        className={`absolute inset-0 ${colorClass} rounded-full`}
        style={{ 
          animation: 'breath 2s ease-in-out infinite',
          animationDelay: '1s' 
        }}
      />
    </div>
  );
});

export const Loading = memo(function Loading({ 
  size = 'md',
  variant = 'accent',
  text,
  fullScreen = false,
  overlay = false,
  className = '',
}: LoadingProps) {
  const content = (
    <div className={`${SPINNER.CONTAINER} ${className}`}>
      <Spinner size={size} variant={variant} />
      {text && (
        <p className={`${SPINNER_TEXT_SIZES[size]} ${SPINNER.TEXT}`}>
          {text}
        </p>
      )}
    </div>
  );

  if (fullScreen) {
    return <div className={SPINNER.FULLSCREEN}>{content}</div>;
  }

  if (overlay) {
    return <div className={SPINNER.OVERLAY}>{content}</div>;
  }

  return content;
});

export const LoadingOverlay = memo(function LoadingOverlay({ 
  size = 'md',
  variant = 'accent',
  text,
  blur = true,
  className = '',
}: LoadingOverlayProps) {
  return (
    <div className={`${blur ? SPINNER.OVERLAY : SPINNER.OVERLAY_NO_BLUR} ${className}`}>
      <div className={SPINNER.CONTAINER}>
        <Spinner size={size} variant={variant} />
        {text && (
          <p className={`${SPINNER_TEXT_SIZES[size]} ${SPINNER.TEXT}`}>
            {text}
          </p>
        )}
      </div>
    </div>
  );
});

export const PageLoading = memo(function PageLoading({ 
  text = 'Đang tải...',
}: PageLoadingProps) {
  return (
    <div className={SPINNER.PAGE}>
      <div className={SPINNER.CONTAINER}>
        <Spinner size="lg" variant="accent" />
        <p className="text-sm text-[var(--text)]/60 font-medium tracking-wide mt-4">
          {text}
        </p>
      </div>
    </div>
  );
});

export const Skeleton = memo(function Skeleton({ 
  className = '',
  rounded = 'md',
}: SkeletonProps) {
  return (
    <div className={`${SPINNER.SKELETON} ${SKELETON_ROUNDED[rounded]} ${className}`} />
  );
});

export const ButtonSpinner = memo(function ButtonSpinner({ 
  size = 'sm',
  className = '',
}: ButtonSpinnerProps) {
  return <SpinnerRing size={size} variant="white" className={className} />;
});

export default Spinner;
