'use client';

import { useRef, useState, useEffect } from 'react';
import { faceService, FaceVerifyResponse } from '@/services/face';

interface FaceProctorProps {
  enrollmentId: number;
  testId?: number;
  intervalMs?: number;
  onVerificationResult?: (result: FaceVerifyResponse) => void;
  onNoFace?: () => void;
  onMultipleFaces?: () => void;
  onMismatch?: () => void;
  enabled?: boolean;
}

type ProctorStatus = 'idle' | 'active' | 'paused' | 'error';

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
  
  const callbacksRef = useRef({ onVerificationResult, onNoFace, onMultipleFaces, onMismatch });
  callbacksRef.current = { onVerificationResult, onNoFace, onMultipleFaces, onMismatch };

  const [status, setStatus] = useState<ProctorStatus>('idle');
  const [lastResult, setLastResult] = useState<FaceVerifyResponse | null>(null);
  const [verifyCount, setVerifyCount] = useState(0);

  useEffect(() => {
    if (!enabled) {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
        streamRef.current = null;
      }
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      setStatus('idle');
      return;
    }

    let mounted = true;

    const captureAndVerify = async () => {
      if (!videoRef.current || !canvasRef.current || isVerifyingRef.current) return;
      if (!streamRef.current) return;
      
      isVerifyingRef.current = true;

      const video = videoRef.current;
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');

      if (!ctx) {
        isVerifyingRef.current = false;
        return;
      }

      canvas.width = 640;
      canvas.height = 480;
      ctx.drawImage(video, 0, 0, 640, 480);

      const imageBase64 = canvas.toDataURL('image/jpeg', 0.8).split(',')[1];

      try {
        const result = await faceService.verify({
          enrollmentId,
          testId,
          imageBase64,
        });

        if (!mounted) return;

        setLastResult(result);
        setVerifyCount((c) => c + 1);
        callbacksRef.current.onVerificationResult?.(result);

        if (!result.success) {
          const warningMessages = [
            'NO_FACE_DETECTED',
            'MULTIPLE_FACES_DETECTED', 
            'LOOKING_AWAY',
            'HEAD_POSE_INVALID',
            'FACE_TOO_SMALL'
          ];
          
          if (result.message === 'NO_FACE_DETECTED') {
            callbacksRef.current.onNoFace?.();
          } else if (result.message === 'MULTIPLE_FACES_DETECTED') {
            callbacksRef.current.onMultipleFaces?.();
          } else if (warningMessages.includes(result.message)) {
            callbacksRef.current.onNoFace?.();
          }
        } else if (!result.isMatch) {
          callbacksRef.current.onMismatch?.();
        }
      } catch {
        if (mounted) setLastResult(null);
      } finally {
        isVerifyingRef.current = false;
      }
    };

    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { 
            width: { ideal: 320 }, 
            height: { ideal: 240 }, 
            frameRate: { ideal: 15 },
            facingMode: 'user' 
          },
          audio: false,
        });

        if (!mounted) {
          stream.getTracks().forEach(t => t.stop());
          return;
        }

        streamRef.current = stream;

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          await videoRef.current.play();
        }

        setStatus('active');
        
        setTimeout(() => {
          if (mounted) captureAndVerify();
        }, 500);
        
        intervalRef.current = setInterval(captureAndVerify, intervalMs);
      } catch {
        if (mounted) setStatus('error');
      }
    };

    startCamera();

    return () => {
      mounted = false;
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
        streamRef.current = null;
      }
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [enabled, enrollmentId, testId, intervalMs]);

  const getStatusInfo = () => {
    if (!lastResult) return null;
    
    if (lastResult.success && lastResult.isMatch) {
      return { border: 'border-[var(--correct)]', bg: 'bg-[var(--correct)]' };
    }
    if (!lastResult.success) {
      return { border: 'border-[var(--warning)]', bg: 'bg-[var(--warning)]' };
    }
    return { border: 'border-[var(--incorrect)]', bg: 'bg-[var(--incorrect)]' };
  };

  const statusInfo = getStatusInfo();
  const borderClass = statusInfo?.border || 'border-[var(--border)]';
  const dotClass = statusInfo?.bg || 'bg-[var(--text)]/30';

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className={`relative bg-[var(--bg-alt)] rounded-lg overflow-hidden shadow-xl border-4 ${borderClass}`}>
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          className="w-40 h-30 object-cover scale-x-[-1]"
          style={{ width: '160px', height: '120px' }}
        />
        <canvas ref={canvasRef} className="hidden" />

        <div className={`absolute top-1 right-1 w-3 h-3 rounded-full ${dotClass}`} />
      </div>
    </div>
  );
}

