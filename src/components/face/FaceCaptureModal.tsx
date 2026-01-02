'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import { Dialog } from '@/components/ui/Dialog';
import { Button } from '@/components/ui/Button';
import { useCamera } from '@/hooks/useCamera';
import type { FaceCaptureModalProps, CaptureStep } from './face.types';
import { FACE_INSTRUCTIONS } from './face.types';

export function FaceCaptureModal({
  isOpen,
  onClose,
  onCapture,
  isProcessing = false,
}: FaceCaptureModalProps) {
  const [step, setStep] = useState<CaptureStep>('intro');
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const stepRef = useRef(step);
  stepRef.current = step;

  const { videoRef, canvasRef, error, startCamera, stopCamera, captureFrame } = useCamera({ onError: () => {} });

  useEffect(() => {
    if (step === 'camera') startCamera();
  }, [step, startCamera]);

  useEffect(() => {
    if (!isOpen) {
      setStep('intro');
      setCapturedImage(null);
      stopCamera();
    }
  }, [isOpen, stopCamera]);

  const handleCapture = useCallback(() => {
    const imageData = captureFrame();
    if (imageData) {
    setCapturedImage(imageData);
    setStep('preview');
    stopCamera();
    }
  }, [captureFrame, stopCamera]);

  const handleRetake = useCallback(() => {
    setCapturedImage(null);
    setStep('camera');
  }, []);

  const handleConfirm = useCallback(() => {
    if (!capturedImage) return;
    onCapture(capturedImage.split(',')[1]);
  }, [capturedImage, onCapture]);

  const handleClose = useCallback(() => {
    stopCamera();
    onClose();
  }, [stopCamera, onClose]);

  return (
    <Dialog isOpen={isOpen} onClose={handleClose}>
      <div className="p-6">
        <h2 className="text-lg font-semibold text-[var(--text)] mb-4">
          {step === 'intro' && FACE_INSTRUCTIONS.TITLE}
          {step === 'camera' && FACE_INSTRUCTIONS.CAPTURE_TITLE}
          {step === 'preview' && FACE_INSTRUCTIONS.PREVIEW_TITLE}
          </h2>

        <div className="mb-6">
          {step === 'intro' && (
            <div className="space-y-4">
              <p className="text-sm text-[var(--text)]/70">{FACE_INSTRUCTIONS.INTRO_DESC}</p>
              <div className="bg-[var(--warning)]/10 border border-[var(--warning)]/20 p-4 rounded-lg text-sm text-[var(--warning)]">
                <p className="font-semibold mb-2">{FACE_INSTRUCTIONS.NOTE_TITLE}</p>
                <ul className="list-disc list-inside space-y-1">
                  {FACE_INSTRUCTIONS.NOTES.map((note, i) => <li key={i}>{note}</li>)}
                </ul>
              </div>
            </div>
          )}

          {step === 'camera' && (
            <div className="space-y-4">
              {error ? (
                <div className="bg-[var(--incorrect)]/10 border border-[var(--incorrect)]/20 p-4 rounded-lg text-[var(--incorrect)] text-center text-sm">
                  {error}
                </div>
              ) : (
                <div className="relative aspect-[4/3] bg-black rounded-lg overflow-hidden">
                  <video ref={videoRef} autoPlay playsInline muted className="w-full h-full object-cover scale-x-[-1]" />
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="w-40 h-52 border-2 border-dashed border-white/60 rounded-[50%]" />
                  </div>
                </div>
              )}
              <canvas ref={canvasRef} className="hidden" />
            </div>
          )}

          {step === 'preview' && capturedImage && (
            <div className="space-y-4">
              <div className="relative aspect-[4/3] bg-black rounded-lg overflow-hidden">
                <img src={capturedImage} alt="Preview" className="w-full h-full object-cover scale-x-[-1]" />
                <div className="absolute top-2 right-2 bg-[var(--correct)] text-white text-xs px-2 py-1 rounded-full">
                  {FACE_INSTRUCTIONS.CAPTURED_BADGE}
                </div>
              </div>
              <p className="text-sm text-[var(--text)]/70">{FACE_INSTRUCTIONS.PREVIEW_DESC}</p>
            </div>
          )}
        </div>

        <div className="flex justify-end gap-3">
          {step === 'intro' && (
            <>
              <Button variant="ghost" onClick={handleClose}>{FACE_INSTRUCTIONS.BTN_CANCEL}</Button>
              <Button onClick={() => setStep('camera')}>{FACE_INSTRUCTIONS.BTN_CONTINUE}</Button>
            </>
          )}

          {step === 'camera' && (
            <>
              <Button variant="ghost" onClick={handleClose}>{FACE_INSTRUCTIONS.BTN_CANCEL}</Button>
              {error ? (
                <Button onClick={startCamera}>{FACE_INSTRUCTIONS.BTN_RETRY}</Button>
              ) : (
                <Button onClick={handleCapture}>{FACE_INSTRUCTIONS.BTN_CAPTURE}</Button>
              )}
            </>
          )}

          {step === 'preview' && (
            <>
              <Button variant="ghost" onClick={handleRetake} disabled={isProcessing}>{FACE_INSTRUCTIONS.BTN_RETAKE}</Button>
              <Button onClick={handleConfirm} disabled={isProcessing}>
                {isProcessing ? FACE_INSTRUCTIONS.BTN_PROCESSING : FACE_INSTRUCTIONS.BTN_CONFIRM_PAY}
              </Button>
            </>
          )}
        </div>
      </div>
    </Dialog>
  );
}
