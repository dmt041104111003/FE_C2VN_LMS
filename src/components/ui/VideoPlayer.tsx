'use client';

import { memo, useEffect, useRef, useCallback } from 'react';
import { VideoPlayerProps } from './ui.types';
import { getYouTubeId, VIDEO_UNAVAILABLE_TEXT, YOUTUBE_PLAYER_VARS } from '@/constants/config';
import {
  VIDEO_PLAYER_WRAPPER,
  VIDEO_PLAYER_ERROR,
  VIDEO_PLAYER_ERROR_TEXT,
  VIDEO_PLAYER_IFRAME,
  VIDEO_PLAYER_OVERLAY,
} from './ui.styles';

declare global {
  interface Window {
    YT?: {
      Player: new (element: HTMLElement, config: YTPlayerConfig) => YTPlayer;
    };
    onYouTubeIframeAPIReady?: () => void;
  }
}

interface YTPlayer {
  destroy: () => void;
  getDuration: () => number;
}

interface YTPlayerConfig {
  videoId: string;
  playerVars?: Record<string, number>;
  events?: {
    onReady?: (event: { target: YTPlayer }) => void;
  };
}

const YOUTUBE_API_URL = 'https://www.youtube.com/iframe_api';

let apiLoadPromise: Promise<void> | null = null;

const loadYouTubeAPI = (): Promise<void> => {
  if (apiLoadPromise) return apiLoadPromise;
  
  if (window.YT?.Player) {
    return Promise.resolve();
  }

  apiLoadPromise = new Promise((resolve) => {
    const existingScript = document.querySelector(`script[src="${YOUTUBE_API_URL}"]`);
    
    if (existingScript) {
      window.onYouTubeIframeAPIReady = resolve;
      return;
    }

    const script = document.createElement('script');
    script.src = YOUTUBE_API_URL;
    script.async = true;
    document.body.appendChild(script);

    window.onYouTubeIframeAPIReady = resolve;
  });

  return apiLoadPromise;
};

function VideoPlayerComponent({ url, className = '', onDurationChange }: VideoPlayerProps) {
  const videoId = getYouTubeId(url);
  const playerRef = useRef<YTPlayer | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const handlePlayerReady = useCallback((event: { target: YTPlayer }) => {
    const duration = event.target.getDuration();
    if (onDurationChange && duration > 0) {
      onDurationChange(Math.ceil(duration / 60));
    }
  }, [onDurationChange]);

  useEffect(() => {
    if (!videoId || !containerRef.current) return;

    let isMounted = true;

    const initPlayer = async () => {
      await loadYouTubeAPI();
      
      if (!isMounted || !window.YT?.Player || !containerRef.current) return;

      playerRef.current = new window.YT.Player(containerRef.current, {
        videoId,
        playerVars: YOUTUBE_PLAYER_VARS,
        events: { onReady: handlePlayerReady },
      });
    };

    initPlayer();

    return () => {
      isMounted = false;
      playerRef.current?.destroy();
      playerRef.current = null;
    };
  }, [videoId, handlePlayerReady]);

  if (!videoId) {
    return (
      <div className={`${VIDEO_PLAYER_ERROR} ${className}`}>
        <p className={VIDEO_PLAYER_ERROR_TEXT}>{VIDEO_UNAVAILABLE_TEXT}</p>
      </div>
    );
  }

  return (
    <div className={`${VIDEO_PLAYER_WRAPPER} ${className}`}>
      <div ref={containerRef} className={VIDEO_PLAYER_IFRAME} />
      <div className={VIDEO_PLAYER_OVERLAY} />
    </div>
  );
}

export const VideoPlayer = memo(VideoPlayerComponent);
