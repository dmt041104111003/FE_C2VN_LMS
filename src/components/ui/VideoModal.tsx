'use client';

import { memo, useEffect } from 'react';
import { VideoModalProps } from './ui.types';
import { VideoPlayer } from './VideoPlayer';
import { CloseIcon } from './icons';
import {
  VIDEO_MODAL_OVERLAY,
  VIDEO_MODAL_CLOSE,
  VIDEO_MODAL_CLOSE_ICON,
  VIDEO_MODAL_CONTAINER,
  VIDEO_MODAL_HEADER,
  VIDEO_MODAL_TITLE,
  VIDEO_MODAL_SUBTITLE,
  VIDEO_MODAL_VIDEO,
} from './ui.styles';

function VideoModalComponent({ isOpen, videoUrl, title, subtitle, onClose, onDurationChange }: VideoModalProps) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className={VIDEO_MODAL_OVERLAY} onClick={onClose}>
      <button className={VIDEO_MODAL_CLOSE} onClick={onClose}>
        <CloseIcon className={VIDEO_MODAL_CLOSE_ICON} />
      </button>

      <div className={VIDEO_MODAL_CONTAINER} onClick={(e) => e.stopPropagation()}>
        {(title || subtitle) && (
          <div className={VIDEO_MODAL_HEADER}>
            {title && <h3 className={VIDEO_MODAL_TITLE}>{title}</h3>}
            {subtitle && <p className={VIDEO_MODAL_SUBTITLE}>{subtitle}</p>}
          </div>
        )}

        <div className={VIDEO_MODAL_VIDEO}>
          <VideoPlayer url={videoUrl} title={title} onDurationChange={onDurationChange} />
        </div>
      </div>
    </div>
  );
}

export const VideoModal = memo(VideoModalComponent);
