import { memo } from 'react';
import Link from 'next/link';
import { LogoProps } from './ui.types';
import {
  LOGO_COMPACT,
  LOGO_INLINE_WRAPPER,
  LOGO_INLINE_IMG,
  LOGO_INLINE_TEXT,
  LOGO_INLINE_TITLE,
  LOGO_INLINE_SUBTITLE,
  LOGO_STACKED_WRAPPER,
  LOGO_STACKED_BOX,
  LOGO_STACKED_IMG,
  LOGO_STACKED_TITLE,
  LOGO_STACKED_SUBTITLE,
} from './ui.styles';

const LOGO_SRC = '/loading.png';

const LOGO_ALT = 'C2VN Logo';

const LOGO_TITLE = 'CARDANO2VN.IO';

const LOGO_SUBTITLE = 'BREAK THE BLOCKS';

function LogoComponent({
  className = '',
  compact = false,
  showText = true,
  layout = 'stacked',
  size = 'md',
  href,
}: LogoProps) {
  if (compact) {
    const img = (
      <img
        src={LOGO_SRC}
        className={className || LOGO_COMPACT}
        alt={LOGO_ALT}
        style={{ aspectRatio: '1/1' }}
      />
    );
    return href ? <Link href={href}>{img}</Link> : img;
  }

  if (layout === 'inline') {
    const content = (
      <div className={[LOGO_INLINE_WRAPPER, className].join(' ')}>
        <img
          src={LOGO_SRC}
          className={LOGO_INLINE_IMG[size]}
          alt={LOGO_ALT}
          style={{ aspectRatio: '1/1' }}
        />

        {showText && (
          <div className={LOGO_INLINE_TEXT}>
            <div className={LOGO_INLINE_TITLE[size]}>
              {LOGO_TITLE}
            </div>
            <div className={LOGO_INLINE_SUBTITLE[size]}>
              {LOGO_SUBTITLE}
            </div>
          </div>
        )}
      </div>
    );
    return href ? <Link href={href}>{content}</Link> : content;
  }

  const content = (
    <div className={[LOGO_STACKED_WRAPPER, className].join(' ')}>
      <div className={LOGO_STACKED_BOX[size]}>
        <img
          src={LOGO_SRC}
          className={LOGO_STACKED_IMG}
          alt={LOGO_ALT}
        />
      </div>

      {showText && (
        <>
          <div className={LOGO_STACKED_TITLE[size]}>
            {LOGO_TITLE}
          </div>
          <div className={LOGO_STACKED_SUBTITLE[size]}>
            {LOGO_SUBTITLE}
          </div>
        </>
      )}
    </div>
  );
  return href ? <Link href={href}>{content}</Link> : content;
}

export const Logo = memo(LogoComponent);
