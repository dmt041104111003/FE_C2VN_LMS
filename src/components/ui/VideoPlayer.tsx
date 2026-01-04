'use client';

import { useRef, useEffect, useCallback, useState } from 'react';
import { getYouTubeId, isYouTubeUrl, VIDEO_UNAVAILABLE_TEXT } from '@/constants/config';
import { VIDEO_PLAYER } from './ui.styles';
import type { VideoPlayerProps } from './ui.types';

const SEEK_TOLERANCE = 2;
const PROGRESS_THRESHOLD = 0.9;
const VALID_EXTENSIONS = ['.mp4', '.webm', '.ogg'];

const isValidVideoUrl = (url: string): boolean => 
  url.includes('cloudinary') || 
  VALID_EXTENSIONS.some(ext => url.includes(ext)) ||
  url.startsWith('http');

export function VideoPlayer({ 
  url, 
  className = '',
  onDurationChange,
  onTimeUpdate,
  preventSeeking = false,
  maxWatchedTime: initialMaxWatched = 0,
  onProgress,
}: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [maxWatchedTime, setMaxWatchedTime] = useState(initialMaxWatched);
  const hasTriggered90 = useRef(false);
  const isYouTube = isYouTubeUrl(url);
  const videoId = isYouTube ? getYouTubeId(url) : null;

  const handleLoadedMetadata = useCallback(() => {
    if (videoRef.current && onDurationChange) {
      onDurationChange(Math.ceil(videoRef.current.duration / 60));
    }
  }, [onDurationChange]);

  const enforceSeekLimit = useCallback((video: HTMLVideoElement) => {
    if (preventSeeking && video.currentTime > maxWatchedTime + SEEK_TOLERANCE) {
      video.currentTime = maxWatchedTime;
      return true;
    }
    return false;
  }, [preventSeeking, maxWatchedTime]);

  const handleTimeUpdate = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;

    const { currentTime, duration } = video;
    
    if (currentTime > maxWatchedTime) setMaxWatchedTime(currentTime);
    if (enforceSeekLimit(video)) return;
    
    onTimeUpdate?.(currentTime, duration);
    
    if (!hasTriggered90.current && duration > 0 && currentTime / duration >= PROGRESS_THRESHOLD) {
      hasTriggered90.current = true;
      onProgress?.(PROGRESS_THRESHOLD);
    }
  }, [maxWatchedTime, enforceSeekLimit, onTimeUpdate, onProgress]);

  const handleSeeking = useCallback(() => {
    const video = videoRef.current;
    if (video) enforceSeekLimit(video);
  }, [enforceSeekLimit]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    
    video.addEventListener('loadedmetadata', handleLoadedMetadata);
    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('seeking', handleSeeking);
    
    return () => {
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('seeking', handleSeeking);
    };
  }, [handleLoadedMetadata, handleTimeUpdate, handleSeeking]);

  useEffect(() => {
    hasTriggered90.current = false;
    setMaxWatchedTime(initialMaxWatched);
  }, [url, initialMaxWatched]);

  if (!url?.trim()) return null;

  const wrapperClass = `${VIDEO_PLAYER.WRAPPER} ${className}`;

  if (isYouTube && videoId) {
    return (
      <div className={wrapperClass}>
        <iframe
          className={VIDEO_PLAYER.IFRAME}
          src={`https://www.youtube-nocookie.com/embed/${videoId}?rel=0&modestbranding=1`}
          title="Video player"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    );
  }

  if (!isValidVideoUrl(url)) {
    return (
      <div className={`${VIDEO_PLAYER.ERROR} ${className}`}>
        <p className={VIDEO_PLAYER.ERROR_TEXT}>{VIDEO_UNAVAILABLE_TEXT}</p>
      </div>
    );
  }

  return (
    <div className={wrapperClass}>
      <video
        ref={videoRef}
        className={VIDEO_PLAYER.VIDEO}
        src={url}
        controls
        controlsList="nodownload noplaybackrate"
        disablePictureInPicture
        onContextMenu={e => e.preventDefault()}
        playsInline
      >
        <track kind="captions" />
      </video>
    </div>
  );
}
