import { memo } from 'react';
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

const LOGO_TITLE = 'C2VN.IO';

const LOGO_SUBTITLE = 'BREAK THE BLOCKS';

function LogoComponent({
  className = '',
  compact = false,
  showText = true,
  layout = 'stacked',
  size = 'md',
}: LogoProps) {
  if (compact) {
    return (
      <img
        src={LOGO_SRC}
        className={className || LOGO_COMPACT}
        alt={LOGO_ALT}
        draggable={false}
        style={{ aspectRatio: '1/1' }}
      />
    );
  }

  if (layout === 'inline') {
    return (
      <div className={[LOGO_INLINE_WRAPPER, className].join(' ')}>
        <img
          src={LOGO_SRC}
          className={LOGO_INLINE_IMG[size]}
          alt={LOGO_ALT}
          draggable={false}
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
  }

  return (
    <div className={[LOGO_STACKED_WRAPPER, className].join(' ')}>
      <div className={LOGO_STACKED_BOX[size]}>
        <img
          src={LOGO_SRC}
          className={LOGO_STACKED_IMG}
          alt={LOGO_ALT}
          draggable={false}
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
}

export const Logo = memo(LogoComponent);
