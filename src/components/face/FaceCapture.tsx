'use client';

import { useState, useCallback } from 'react';
import { Button } from '@/components/ui';
import { useCamera } from '@/hooks/useCamera';
import type { FaceCaptureProps } from './face.types';
import { FACE_INSTRUCTIONS } from './face.types';

export function FaceCapture({
  onCapture,
  onError,
  buttonText = FACE_INSTRUCTIONS.BTN_START_CAMERA,
  captureButtonText = FACE_INSTRUCTIONS.BTN_CAPTURE,
  retakeButtonText = FACE_INSTRUCTIONS.BTN_RETAKE,
  config,
}: FaceCaptureProps) {
  const [capturedImage, setCapturedImage] = useState<string | null>(null);

  const { videoRef, canvasRef, state, startCamera, stopCamera, captureFrame, captureBase64 } = useCamera({ config, onError });

  const handleCapture = useCallback(() => {
    const imageData = captureFrame();
    const base64 = captureBase64();
    
    if (imageData && base64) {
      setCapturedImage(imageData);
      stopCamera();
      onCapture(base64);
    }
  }, [captureFrame, captureBase64, stopCamera, onCapture]);

  const handleRetake = useCallback(() => {
    setCapturedImage(null);
    startCamera();
  }, [startCamera]);

  const isCaptured = state === 'idle' && capturedImage !== null;

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative w-full max-w-md aspect-[4/3] bg-gray-900 rounded-lg overflow-hidden">
        {state === 'idle' && !capturedImage && (
          <div className="absolute inset-0 flex items-center justify-center">
            <Button onClick={startCamera}>{buttonText}</Button>
          </div>
        )}

        {state === 'streaming' && (
          <>
            <video ref={videoRef} autoPlay playsInline muted className="w-full h-full object-cover" />
            <div className="absolute inset-0 border-4 border-dashed border-primary/50 rounded-lg pointer-events-none" />
          </>
        )}

        {isCaptured && capturedImage && (
          <img src={capturedImage} alt="Preview" className="w-full h-full object-cover" />
        )}
      </div>

      <canvas ref={canvasRef} className="hidden" />

      {state === 'streaming' && (
        <Button onClick={handleCapture} className="w-full max-w-md">{captureButtonText}</Button>
      )}

      {isCaptured && (
        <Button onClick={handleRetake} variant="secondary" className="w-full max-w-md">{retakeButtonText}</Button>
      )}
    </div>
  );
}
