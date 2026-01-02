'use client';

import { getYouTubeId, VIDEO_UNAVAILABLE_TEXT } from '@/constants/config';
import {
  VIDEO_PLAYER_WRAPPER,
  VIDEO_PLAYER_ERROR,
  VIDEO_PLAYER_ERROR_TEXT,
  VIDEO_PLAYER_IFRAME,
} from './ui.styles';
import type { VideoPlayerProps } from './ui.types';

export function VideoPlayer({ url, className = '' }: VideoPlayerProps) {
  const videoId = getYouTubeId(url);

  if (!videoId) {
    if (!url?.trim()) return null;
    return (
      <div className={`${VIDEO_PLAYER_ERROR} ${className}`}>
        <p className={VIDEO_PLAYER_ERROR_TEXT}>{VIDEO_UNAVAILABLE_TEXT}</p>
      </div>
    );
  }

  return (
    <div className={`${VIDEO_PLAYER_WRAPPER} ${className}`}>
      <iframe
        className={VIDEO_PLAYER_IFRAME}
        src={`https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1`}
        title="Video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
}
