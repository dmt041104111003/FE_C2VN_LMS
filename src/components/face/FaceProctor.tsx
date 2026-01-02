'use client';

import { useRef, useState, useEffect, useCallback } from 'react';
import { faceService } from '@/services/face';
import type { FaceProctorProps, FaceVerifyResult, ProctorStatus, CameraConfig } from './face.types';
import { CAMERA_ERRORS } from './face.types';

const PROCTOR_CAMERA_CONFIG: CameraConfig = {
  width: 320,
  height: 240,
  frameRate: 15,
  facingMode: 'user',
};

const WARNING_MESSAGES = ['NO_FACE_DETECTED', 'MULTIPLE_FACES_DETECTED', 'LOOKING_AWAY', 'HEAD_POSE_INVALID', 'FACE_TOO_SMALL'];

export function FaceProctor({
  enrollmentId,
  testId,
  intervalMs = 10000,
  onVerificationResult,
  onNoFace,
  onMultipleFaces,
  onMismatch,
  enabled = true,
}: FaceProctorProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const isVerifyingRef = useRef(false);
  const mountedRef = useRef(true);

  const callbacksRef = useRef({ onVerificationResult, onNoFace, onMultipleFaces, onMismatch });
  callbacksRef.current = { onVerificationResult, onNoFace, onMultipleFaces, onMismatch };

  const [, setStatus] = useState<ProctorStatus>('idle');
  const [lastResult, setLastResult] = useState<FaceVerifyResult | null>(null);

  const stopCamera = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
  }, []);

  const captureBase64 = useCallback((): string | null => {
    if (!videoRef.current || !canvasRef.current) return null;
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return null;

    canvas.width = video.videoWidth || 320;
    canvas.height = video.videoHeight || 240;
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    return canvas.toDataURL('image/jpeg', 0.8).split(',')[1];
  }, []);

  const captureAndVerify = useCallback(async () => {
    if (isVerifyingRef.current || !streamRef.current) return;

    isVerifyingRef.current = true;
    const imageBase64 = captureBase64();

    if (!imageBase64) {
      isVerifyingRef.current = false;
      return;
    }

    try {
      const result = await faceService.verify({ enrollmentId, testId, imageBase64 });
      if (!mountedRef.current) return;

      setLastResult(result);
      callbacksRef.current.onVerificationResult?.(result);

      if (!result.success) {
        if (result.message === 'NO_FACE_DETECTED') callbacksRef.current.onNoFace?.();
        else if (result.message === 'MULTIPLE_FACES_DETECTED') callbacksRef.current.onMultipleFaces?.();
        else if (WARNING_MESSAGES.includes(result.message)) callbacksRef.current.onNoFace?.();
      } else if (!result.isMatch) {
        callbacksRef.current.onMismatch?.();
      }
    } catch {
      if (mountedRef.current) setLastResult(null);
    } finally {
      isVerifyingRef.current = false;
    }
  }, [enrollmentId, testId, captureBase64]);

  useEffect(() => {
    mountedRef.current = true;

    if (!enabled) {
      stopCamera();
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      setStatus('idle');
      return;
    }

    const startCamera = async () => {
      try {
        if (!navigator.mediaDevices?.getUserMedia) return;

        const stream = await navigator.mediaDevices.getUserMedia({
          video: {
            width: { ideal: PROCTOR_CAMERA_CONFIG.width },
            height: { ideal: PROCTOR_CAMERA_CONFIG.height },
            facingMode: PROCTOR_CAMERA_CONFIG.facingMode,
            frameRate: { ideal: PROCTOR_CAMERA_CONFIG.frameRate },
          },
          audio: false,
        });

        if (!mountedRef.current) {
          stream.getTracks().forEach(t => t.stop());
          return;
        }

        streamRef.current = stream;
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          await videoRef.current.play();
        }

        setStatus('active');
        setTimeout(() => { if (mountedRef.current) captureAndVerify(); }, 500);
        intervalRef.current = setInterval(captureAndVerify, intervalMs);
      } catch {
        setStatus('error');
      }
    };

    startCamera();

    return () => {
      mountedRef.current = false;
      stopCamera();
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [enabled, intervalMs, stopCamera, captureAndVerify]);

  const getStatusStyle = () => {
    if (!lastResult) return { border: 'border-[var(--border)]', dot: 'bg-[var(--text)]/30' };
    if (lastResult.success && lastResult.isMatch) return { border: 'border-[var(--correct)]', dot: 'bg-[var(--correct)]' };
    if (!lastResult.success) return { border: 'border-[var(--warning)]', dot: 'bg-[var(--warning)]' };
    return { border: 'border-[var(--incorrect)]', dot: 'bg-[var(--incorrect)]' };
  };

  const { border, dot } = getStatusStyle();

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className={`relative bg-[var(--bg-alt)] rounded-lg overflow-hidden shadow-xl border-4 ${border}`}>
        <video ref={videoRef} autoPlay playsInline muted className="object-cover scale-x-[-1]" style={{ width: 160, height: 120 }} />
        <canvas ref={canvasRef} className="hidden" />
        <div className={`absolute top-1 right-1 w-3 h-3 rounded-full ${dot}`} />
      </div>
    </div>
  );
}
