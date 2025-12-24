import { memo } from 'react';
import Link from 'next/link';
import { CardProps } from './ui.types';
import {
  CARD_BASE,
  CARD_CONTENT,
  CARD_SUBTITLE,
  CARD_VARIANTS,
  CARD_IMAGE_VARIANTS,
  CARD_CONTENT_VARIANTS,
  CARD_TITLE_SIZES,
} from './ui.styles';

function CardComponent({
  title,
  subtitle,
  image,
  variant = 'default',
  size = 'md',
  href,
  onClick,
  className = '',
}: CardProps) {
  const variantStyle = CARD_VARIANTS[variant];

  const imageStyle = CARD_IMAGE_VARIANTS[variant];

  const contentStyle = CARD_CONTENT_VARIANTS[variant];

  const titleStyle = CARD_TITLE_SIZES[size];

  const cardClass = `${CARD_BASE} ${variantStyle} ${className}`;

  const content = (
    <>
      {image && (
        <img
          src={image}
          alt={title}
          className={imageStyle}
          draggable={false}
          onContextMenu={(e) => e.preventDefault()}
        />
      )}
      <div className={`${CARD_CONTENT} ${contentStyle}`}>
        <span className={titleStyle}>
          {title}
        </span>
        {subtitle && (
          <span className={CARD_SUBTITLE}>
            {subtitle}
          </span>
        )}
      </div>
    </>
  );

  if (href) {
    return (
      <Link
        href={href}
        className={cardClass}
      >
        {content}
      </Link>
    );
  }

  if (onClick) {
    return (
      <button
        type="button"
        className={cardClass}
        onClick={onClick}
      >
        {content}
      </button>
    );
  }

  return (
    <div className={cardClass}>
      {content}
    </div>
  );
}

export const Card = memo(CardComponent);
