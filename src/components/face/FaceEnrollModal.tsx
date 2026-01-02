'use client';

import { useState } from 'react';
import { Dialog } from '@/components/ui/Dialog';
import { Button } from '@/components/ui/Button';
import { CheckIcon, XIcon } from '@/components/ui/icons';
import { FaceCapture } from './FaceCapture';
import { faceService } from '@/services/face';
import type { FaceEnrollModalProps, EnrollStep } from './face.types';
import { getFaceErrorMessage, FACE_INSTRUCTIONS } from './face.types';

export function FaceEnrollModal({
  isOpen,
  onClose,
  enrollmentId,
  walletAddress,
  onSuccess,
}: FaceEnrollModalProps) {
  const [step, setStep] = useState<EnrollStep>('intro');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const handleCapture = async (imageBase64: string) => {
    setStep('processing');

    try {
      const validateResponse = await faceService.validate({ imageBase64 });
      
      if (!validateResponse.success) {
        setErrorMessage(getFaceErrorMessage(validateResponse.message));
        setStep('error');
        return;
      }

      const response = await faceService.enroll({
        enrollmentId,
        embedding: validateResponse.message,
        walletAddress,
      });

      if (response.success) {
        setStep('success');
        onSuccess?.();
      } else {
        setErrorMessage(getFaceErrorMessage(response.message));
        setStep('error');
      }
    } catch {
      setErrorMessage(FACE_INSTRUCTIONS.GENERIC_ERROR);
      setStep('error');
    }
  };

  const handleRetry = () => {
    setStep('capture');
    setErrorMessage('');
  };

  const handleClose = () => {
    setStep('intro');
    setErrorMessage('');
    onClose();
  };

  return (
    <Dialog isOpen={isOpen} onClose={handleClose}>
      <div className="p-6">
        {step === 'intro' && (
          <div className="text-center space-y-4">
            <h2 className="text-xl font-bold text-[var(--text)]">{FACE_INSTRUCTIONS.TITLE}</h2>
            <p className="text-sm text-[var(--text)]/70">{FACE_INSTRUCTIONS.ENROLL_DESC}</p>
            <div className="bg-[var(--warning)]/10 border border-[var(--warning)]/20 p-4 rounded-lg text-sm text-[var(--warning)]">
              <p className="font-medium">{FACE_INSTRUCTIONS.NOTE_TITLE}</p>
              <ul className="list-disc list-inside mt-2 space-y-1 text-left">
                {FACE_INSTRUCTIONS.NOTES.map((note, i) => <li key={i}>{note}</li>)}
              </ul>
            </div>
            <Button onClick={() => setStep('capture')} className="w-full">{FACE_INSTRUCTIONS.BTN_CONTINUE}</Button>
          </div>
        )}

        {step === 'capture' && (
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-center text-[var(--text)]">{FACE_INSTRUCTIONS.CAPTURE_TITLE}</h2>
            <FaceCapture onCapture={handleCapture} onError={(err) => { setErrorMessage(err); setStep('error'); }} />
          </div>
        )}

        {step === 'processing' && (
          <div className="text-center space-y-4 py-8">
            <div className="animate-spin w-12 h-12 border-4 border-[var(--accent)] border-t-transparent rounded-full mx-auto" />
            <p className="text-[var(--text)]">{FACE_INSTRUCTIONS.BTN_PROCESSING}</p>
          </div>
        )}

        {step === 'success' && (
          <div className="text-center space-y-4 py-8">
            <div className="w-16 h-16 bg-[var(--correct)]/10 rounded-full flex items-center justify-center mx-auto">
              <CheckIcon className="w-8 h-8 text-[var(--correct)]" />
            </div>
            <h3 className="text-lg font-semibold text-[var(--text)]">{FACE_INSTRUCTIONS.SUCCESS_TITLE}</h3>
            <p className="text-sm text-[var(--text)]/70">{FACE_INSTRUCTIONS.SUCCESS_DESC}</p>
            <Button onClick={handleClose} className="w-full">{FACE_INSTRUCTIONS.BTN_DONE}</Button>
          </div>
        )}

        {step === 'error' && (
          <div className="text-center space-y-4 py-8">
            <div className="w-16 h-16 bg-[var(--incorrect)]/10 rounded-full flex items-center justify-center mx-auto">
              <XIcon className="w-8 h-8 text-[var(--incorrect)]" />
            </div>
            <h3 className="text-lg font-semibold text-[var(--text)]">{FACE_INSTRUCTIONS.ERROR_TITLE}</h3>
            <p className="text-sm text-[var(--text)]/70">{errorMessage}</p>
            <div className="flex gap-2">
              <Button onClick={handleRetry} className="flex-1">{FACE_INSTRUCTIONS.BTN_RETRY}</Button>
              <Button onClick={handleClose} variant="secondary" className="flex-1">{FACE_INSTRUCTIONS.BTN_CLOSE}</Button>
            </div>
          </div>
        )}
      </div>
    </Dialog>
  );
}
