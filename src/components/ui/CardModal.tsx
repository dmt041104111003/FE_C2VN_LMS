'use client';

import { memo, useCallback } from 'react';
import Link from 'next/link';
import { CardModalProps } from './ui.types';
import { CloseIcon, ChevronLeftIcon, ChevronRightIcon } from './icons';
import { Badge } from './Badge';
import { PriceDisplay } from './PriceDisplay';
import {
  CARD_MODAL_OVERLAY,
  CARD_MODAL_CLOSE,
  CARD_MODAL_CLOSE_ICON,
  CARD_MODAL_CONTAINER,
  CARD_MODAL_IMAGE_WRAPPER,
  CARD_MODAL_IMAGE,
  CARD_MODAL_CONTENT,
  CARD_MODAL_TAG,
  CARD_MODAL_TITLE,
  CARD_MODAL_SUBTITLE,
  CARD_MODAL_PRICE,
  CARD_MODAL_BUTTON,
  LIGHTBOX_NAV,
  LIGHTBOX_PREV,
  LIGHTBOX_NEXT,
  LIGHTBOX_NAV_ICON,
  LIGHTBOX_DOTS,
  LIGHTBOX_DOT,
  LIGHTBOX_DOT_ACTIVE,
  LIGHTBOX_DOT_INACTIVE,
} from './ui.styles';

function CardModalComponent({
  items,
  currentIndex,
  onClose,
  onPrev,
  onNext,
  onGoTo,
}: CardModalProps) {
  const currentItem = items[currentIndex];

  const handleContentClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
  }, []);

  const handleCloseClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    onClose();
  }, [onClose]);

  const handlePrev = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    onPrev();
  }, [onPrev]);

  const handleNext = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    onNext();
  }, [onNext]);

  const handleGoTo = useCallback((e: React.MouseEvent, index: number) => {
    e.stopPropagation();
    onGoTo(index);
  }, [onGoTo]);

  return (
    <div className={CARD_MODAL_OVERLAY} onClick={onClose}>
      <button className={CARD_MODAL_CLOSE} onClick={handleCloseClick}>
        <CloseIcon className={CARD_MODAL_CLOSE_ICON} />
      </button>

      <div className={CARD_MODAL_CONTAINER} onClick={handleContentClick}>
        {currentItem.image && (
          <div className={CARD_MODAL_IMAGE_WRAPPER}>
            <img
              src={currentItem.image}
              alt={currentItem.title}
              className={CARD_MODAL_IMAGE}
              draggable={false}
              onContextMenu={(e) => e.preventDefault()}
            />
          </div>
        )}

        <div className={CARD_MODAL_CONTENT}>
          {currentItem.tag && (
            <Badge variant="accent" className={CARD_MODAL_TAG}>
              {currentItem.tag}
            </Badge>
          )}

          <h3 className={CARD_MODAL_TITLE}>{currentItem.title}</h3>

          {currentItem.subtitle && (
            <p className={CARD_MODAL_SUBTITLE}>{currentItem.subtitle}</p>
          )}

          {currentItem.price !== undefined && (
            <div className={CARD_MODAL_PRICE}>
              <PriceDisplay
                price={currentItem.price}
                currency={currentItem.currency}
                discount={currentItem.discount}
                discountEndTime={currentItem.discountEndTime}
                size="md"
              />
            </div>
          )}

          {currentItem.buttonText && currentItem.buttonHref && (
            <Link href={currentItem.buttonHref} className={CARD_MODAL_BUTTON} onClick={onClose}>
              {currentItem.buttonText}
            </Link>
          )}
        </div>

        <button className={`${LIGHTBOX_NAV} ${LIGHTBOX_PREV}`} onClick={handlePrev}>
          <ChevronLeftIcon className={LIGHTBOX_NAV_ICON} />
        </button>

        <button className={`${LIGHTBOX_NAV} ${LIGHTBOX_NEXT}`} onClick={handleNext}>
          <ChevronRightIcon className={LIGHTBOX_NAV_ICON} />
        </button>

        <div className={LIGHTBOX_DOTS}>
          {items.map((_, index) => (
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

export const CardModal = memo(CardModalComponent);
