'use client';

import { useEffect, useRef, useCallback } from 'react';

interface UseFullscreenOptions {
  isActive: boolean;
  onExit?: () => void;
}

export function useFullscreen<T extends HTMLElement>({ isActive, onExit }: UseFullscreenOptions) {
  const ref = useRef<T>(null);

  const enter = useCallback(async () => {
    try {
      await ref.current?.requestFullscreen?.();
    } catch (error) {
      console.warn('Fullscreen not supported:', error);
    }
  }, []);

  const exit = useCallback(async () => {
    try {
      if (document.fullscreenElement) {
        await document.exitFullscreen();
      }
    } catch (error) {
      console.warn('Exit fullscreen failed:', error);
    }
  }, []);

  useEffect(() => {
    if (isActive && ref.current) {
      enter();
    }
  }, [isActive, enter]);

  useEffect(() => {
    if (!isActive || !onExit) return;

    const handleChange = () => {
      const hasExitedFullscreen = !document.fullscreenElement;
      if (hasExitedFullscreen) {
        onExit();
      }
    };

    document.addEventListener('fullscreenchange', handleChange);
    return () => document.removeEventListener('fullscreenchange', handleChange);
  }, [isActive, onExit]);

  return { ref, enter, exit };
}

