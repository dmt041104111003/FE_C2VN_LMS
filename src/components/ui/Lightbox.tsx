'use client';

import { memo } from 'react';
import { LightboxProps } from './ui.types';
import { CloseIcon, ChevronLeftIcon, ChevronRightIcon } from './icons';
import {
  LIGHTBOX_OVERLAY,
  LIGHTBOX_CLOSE,
  LIGHTBOX_WRAPPER,
  LIGHTBOX_IMAGE,
  LIGHTBOX_NAV,
  LIGHTBOX_PREV,
  LIGHTBOX_NEXT,
  LIGHTBOX_DOTS,
  LIGHTBOX_DOT,
  LIGHTBOX_DOT_ACTIVE,
  LIGHTBOX_DOT_INACTIVE,
  LIGHTBOX_CLOSE_ICON,
  LIGHTBOX_NAV_ICON,
} from './ui.styles';

function LightboxComponent({
  images,
  currentIndex,
  onClose,
  onPrev,
  onNext,
  onGoTo,
}: LightboxProps) {
  const handleOverlayClick = () => {
    onClose();
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    onPrev();
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    onNext();
  };

  const handleGoTo = (e: React.MouseEvent, index: number) => {
    e.stopPropagation();
    onGoTo(index);
  };

  return (
    <div
      className={LIGHTBOX_OVERLAY}
      onClick={handleOverlayClick}
    >
      <button
        className={LIGHTBOX_CLOSE}
        onClick={(e) => { e.stopPropagation(); onClose(); }}
      >
        <CloseIcon className={LIGHTBOX_CLOSE_ICON} />
      </button>
      <div className={LIGHTBOX_WRAPPER}>
        <img
          src={images[currentIndex]}
          alt={`Slide ${currentIndex + 1}`}
          className={LIGHTBOX_IMAGE}
          draggable={false}
          onContextMenu={(e) => e.preventDefault()}
        />
        <button
          className={`${LIGHTBOX_NAV} ${LIGHTBOX_PREV}`}
          onClick={handlePrev}
        >
          <ChevronLeftIcon className={LIGHTBOX_NAV_ICON} />
        </button>
        <button
          className={`${LIGHTBOX_NAV} ${LIGHTBOX_NEXT}`}
          onClick={handleNext}
        >
          <ChevronRightIcon className={LIGHTBOX_NAV_ICON} />
        </button>
        <div className={LIGHTBOX_DOTS}>
          {images.map((_, index) => (
            <span
              key={index}
              className={`${LIGHTBOX_DOT} ${index === currentIndex ? LIGHTBOX_DOT_ACTIVE : LIGHTBOX_DOT_INACTIVE}`}
              onClick={(e) => handleGoTo(e, index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export const Lightbox = memo(LightboxComponent);

