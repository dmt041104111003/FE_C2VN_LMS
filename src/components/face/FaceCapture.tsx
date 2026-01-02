'use client';

import { useRef, useState, useCallback, useEffect } from 'react';
import { Button } from '@/components/ui';

interface FaceCaptureProps {
  onCapture: (imageBase64: string) => void;
  onError?: (error: string) => void;
  buttonText?: string;
  captureButtonText?: string;
  retakeButtonText?: string;
}

type CaptureState = 'idle' | 'streaming' | 'captured';

export function FaceCapture({
  onCapture,
  onError,
  buttonText = 'Bật Camera',
  captureButtonText = 'Chụp ảnh',
  retakeButtonText = 'Chụp lại',
}: FaceCaptureProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const [state, setState] = useState<CaptureState>('idle');
  const [capturedImage, setCapturedImage] = useState<string | null>(null);

  const startCamera = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: 640, height: 480, facingMode: 'user' },
        audio: false,
      });

      streamRef.current = stream;

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
      }

      setState('streaming');
    } catch (err) {
      onError?.('Không thể truy cập camera. Vui lòng cấp quyền.');
    }
  }, [onError]);

  const stopCamera = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
  }, []);

  const captureFrame = useCallback(() => {
    if (!videoRef.current || !canvasRef.current) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    if (!ctx) return;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    ctx.drawImage(video, 0, 0);

    const imageBase64 = canvas.toDataURL('image/jpeg', 0.8).split(',')[1];
    setCapturedImage(canvas.toDataURL('image/jpeg', 0.8));
    setState('captured');
    stopCamera();

    onCapture(imageBase64);
  }, [onCapture, stopCamera]);

  const retake = useCallback(() => {
    setCapturedImage(null);
    startCamera();
  }, [startCamera]);

  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, [stopCamera]);

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative w-full max-w-md aspect-[4/3] bg-gray-900 rounded-lg overflow-hidden">
        {state === 'idle' && (
          <div className="absolute inset-0 flex items-center justify-center">
            <Button onClick={startCamera}>{buttonText}</Button>
          </div>
        )}

        {state === 'streaming' && (
          <>
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 border-4 border-dashed border-primary/50 rounded-lg pointer-events-none" />
          </>
        )}

        {state === 'captured' && capturedImage && (
          <img
            src={capturedImage}
            alt="Captured face"
            className="w-full h-full object-cover"
          />
        )}
      </div>

      <canvas ref={canvasRef} className="hidden" />

      {state === 'streaming' && (
        <Button onClick={captureFrame} className="w-full max-w-md">
          {captureButtonText}
        </Button>
      )}

      {state === 'captured' && (
        <Button onClick={retake} variant="outline" className="w-full max-w-md">
          {retakeButtonText}
        </Button>
      )}
    </div>
  );
}


