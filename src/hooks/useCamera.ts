'use client';

import { useRef, useState, useCallback, useEffect } from 'react';
import type { CameraState, UseCameraOptions } from '@/components/face/face.types';
import { DEFAULT_CAMERA_CONFIG, CAMERA_ERRORS } from '@/components/face/face.types';

export function useCamera(options: UseCameraOptions = {}) {
  const { config = DEFAULT_CAMERA_CONFIG, autoStart = false, onError } = options;
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const configRef = useRef(config);
  const onErrorRef = useRef(onError);
  
  configRef.current = config;
  onErrorRef.current = onError;

  const [state, setState] = useState<CameraState>('idle');
  const [error, setError] = useState<string | null>(null);

  const stopCamera = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    setState('idle');
  }, []);

  const startCamera = useCallback(async () => {
    if (streamRef.current) return;

    try {
      setError(null);

      if (!navigator.mediaDevices?.getUserMedia) {
        const errMsg = CAMERA_ERRORS.NOT_SUPPORTED;
        setError(errMsg);
        setState('error');
        onErrorRef.current?.(errMsg);
        return;
      }

      const cfg = configRef.current;
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: { ideal: cfg.width },
          height: { ideal: cfg.height },
          facingMode: cfg.facingMode,
          frameRate: cfg.frameRate ? { ideal: cfg.frameRate } : undefined,
        },
        audio: false,
      });

      streamRef.current = stream;

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
      }

      setState('streaming');
    } catch (err) {
      const errorName = (err as Error).name;
      let errMsg: string;

      if (errorName === 'NotAllowedError' || errorName === 'PermissionDeniedError') {
        errMsg = CAMERA_ERRORS.PERMISSION_DENIED;
      } else if (errorName === 'NotFoundError' || errorName === 'DevicesNotFoundError') {
        errMsg = CAMERA_ERRORS.NOT_FOUND;
      } else if (errorName === 'NotReadableError' || errorName === 'TrackStartError') {
        errMsg = CAMERA_ERRORS.IN_USE;
      } else {
        errMsg = CAMERA_ERRORS.GENERIC;
      }

      setError(errMsg);
      setState('error');
      onErrorRef.current?.(errMsg);
    }
  }, []);

  const captureFrame = useCallback((quality = 0.8): string | null => {
    if (!videoRef.current || !canvasRef.current) return null;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    if (!ctx) return null;

    const cfg = configRef.current;
    canvas.width = video.videoWidth || cfg.width || 640;
    canvas.height = video.videoHeight || cfg.height || 480;
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    return canvas.toDataURL('image/jpeg', quality);
  }, []);

  const captureBase64 = useCallback((quality = 0.8): string | null => {
    const dataUrl = captureFrame(quality);
    return dataUrl ? dataUrl.split(',')[1] : null;
  }, [captureFrame]);

  useEffect(() => {
    return () => { stopCamera(); };
  }, [stopCamera]);

  useEffect(() => {
    if (autoStart && state === 'idle' && !streamRef.current) startCamera();
  }, [autoStart, state, startCamera]);

  return {
    videoRef,
    canvasRef,
    state,
    error,
    isStreaming: state === 'streaming',
    startCamera,
    stopCamera,
    captureFrame,
    captureBase64,
  };
}
