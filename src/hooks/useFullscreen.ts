'use client';

import { useEffect, useRef, useCallback } from 'react';
import type { UseFullscreenOptions, UseFullscreenReturn } from '@/types/hooks';

export function useFullscreen<T extends HTMLElement>({ 
  isActive, 
  onExit 
}: UseFullscreenOptions): UseFullscreenReturn<T> {
  const ref = useRef<T>(null);

  const enter = useCallback(async () => {
    try {
      await ref.current?.requestFullscreen?.();
    } catch {}
  }, []);

  const exit = useCallback(async () => {
    if (document.fullscreenElement) {
      try { await document.exitFullscreen(); } catch {}
    }
  }, []);

  useEffect(() => {
    if (isActive && ref.current) enter();
  }, [isActive, enter]);

  useEffect(() => {
    if (!isActive || !onExit) return;

    const handleChange = () => {
      if (!document.fullscreenElement) onExit();
    };

    document.addEventListener('fullscreenchange', handleChange);
    return () => document.removeEventListener('fullscreenchange', handleChange);
  }, [isActive, onExit]);

  return { ref, enter, exit };
}
