'use client';

import { memo } from 'react';
import { PriceDisplayProps } from './ui.types';
import { PRICE_SIZES } from './ui.styles';
import { SYSTEM_CONFIG } from '@/constants';

const isDiscountValid = (discount?: number, discountEndTime?: string): boolean => {
  if (!discount || discount <= 0) return false;
  if (!discountEndTime) return false;
  return new Date() < new Date(discountEndTime);
};

function PriceDisplayComponent({
  price,
  currency = SYSTEM_CONFIG.DEFAULT_CURRENCY,
  discount,
  discountEndTime,
  freeText = 'Miễn phí',
  size = 'sm',
  className = '',
}: PriceDisplayProps) {
  const styles = PRICE_SIZES[size];
  const isFree = price === 0;
  const hasValidDiscount = isDiscountValid(discount, discountEndTime);
  const finalPrice = hasValidDiscount ? price * (1 - discount! / 100) : price;

  if (isFree) {
    return (
      <span className={`${styles.price} font-bold text-[var(--accent)] ${className}`}>
        {freeText}
      </span>
    );
  }

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <span className={`${styles.price} font-bold text-[var(--accent)]`}>
        {finalPrice.toLocaleString()} {currency}
      </span>
      {hasValidDiscount && (
        <span className={`${styles.original} text-[var(--text)]/40 line-through`}>
          {price.toLocaleString()}
        </span>
      )}
    </div>
  );
}

export const PriceDisplay = memo(PriceDisplayComponent);

