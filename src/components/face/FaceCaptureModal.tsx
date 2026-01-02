'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import { Button } from '@/components/ui/Button';
import { DIALOG } from '@/components/ui/ui.styles';

interface FaceCaptureModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCapture: (imageBase64: string) => void;
  isProcessing?: boolean;
}

type CaptureStep = 'intro' | 'camera' | 'preview';

export function FaceCaptureModal({
  isOpen,
  onClose,
  onCapture,
  isProcessing = false,
}: FaceCaptureModalProps) {
  const [step, setStep] = useState<CaptureStep>('intro');
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const stopCamera = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
  }, []);

  const startCamera = useCallback(async () => {
    try {
      setError(null);
      
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        setError('Trình duyệt không hỗ trợ camera.');
        return;
      }

      const stream = await navigator.mediaDevices.getUserMedia({
        video: { 
          facingMode: 'user', 
          width: { ideal: 640 }, 
          height: { ideal: 480 } 
        },
        audio: false,
      });
      
      streamRef.current = stream;
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
      }
    } catch (err) {
      const errorName = (err as Error).name;
      if (errorName === 'NotAllowedError' || errorName === 'PermissionDeniedError') {
        setError('Quyền camera bị từ chối. Vui lòng cấp quyền và thử lại.');
      } else if (errorName === 'NotFoundError' || errorName === 'DevicesNotFoundError') {
        setError('Không tìm thấy camera. Vui lòng kết nối camera.');
      } else if (errorName === 'NotReadableError' || errorName === 'TrackStartError') {
        setError('Camera đang được sử dụng bởi ứng dụng khác.');
      } else {
        setError('Không thể truy cập camera. Vui lòng thử lại.');
      }
    }
  }, []);

  useEffect(() => {
    if (step === 'camera' && !streamRef.current) {
      startCamera();
    }
    
    return () => {
      if (step !== 'camera') {
        stopCamera();
      }
    };
  }, [step, startCamera, stopCamera]);

  useEffect(() => {
    if (!isOpen) {
      setStep('intro');
      setCapturedImage(null);
      setError(null);
      stopCamera();
    }
  }, [isOpen, stopCamera]);

  const handleCapture = useCallback(() => {
    if (!videoRef.current) return;

    const canvas = document.createElement('canvas');
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.drawImage(videoRef.current, 0, 0);
    const imageData = canvas.toDataURL('image/jpeg', 0.9);
    setCapturedImage(imageData);
    setStep('preview');
    stopCamera();
  }, [stopCamera]);

  const handleRetake = useCallback(() => {
    setCapturedImage(null);
    setStep('camera');
  }, []);

  const handleConfirm = useCallback(() => {
    if (!capturedImage) return;
    const base64 = capturedImage.split(',')[1];
    onCapture(base64);
  }, [capturedImage, onCapture]);

  const handleClose = useCallback(() => {
    stopCamera();
    onClose();
  }, [stopCamera, onClose]);

  if (!isOpen) return null;

  return (
    <div className={DIALOG.OVERLAY} onClick={handleClose}>
      <div className={`${DIALOG.CONTAINER} max-w-md`} onClick={e => e.stopPropagation()}>
        <div className={DIALOG.HEADER}>
          <h2 className={DIALOG.TITLE}>
            {step === 'intro' && 'Xác minh khuôn mặt'}
            {step === 'camera' && 'Chụp ảnh khuôn mặt'}
            {step === 'preview' && 'Xác nhận ảnh'}
          </h2>
        </div>

        <div className={DIALOG.BODY}>
          {step === 'intro' && (
            <div className="space-y-4">
              <p className={DIALOG.MESSAGE}>
                Để đảm bảo tính xác thực của chứng chỉ NFT, vui lòng chụp ảnh khuôn mặt trước khi thanh toán.
              </p>
              <div className="bg-[var(--warning)]/10 border border-[var(--warning)]/20 p-4 rounded-lg text-sm text-[var(--warning)]">
                <p className="font-semibold mb-2">Lưu ý:</p>
                <ul className="list-disc list-inside space-y-1">
                  <li>Đảm bảo ánh sáng đủ và đều</li>
                  <li>Nhìn thẳng vào camera</li>
                  <li>Không đeo kính râm hoặc khẩu trang</li>
                  <li>Chỉ có một người trong khung hình</li>
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
                  <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    muted
                    className="w-full h-full object-cover scale-x-[-1]"
                  />
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="w-40 h-52 border-2 border-dashed border-white/60 rounded-[50%]" />
                  </div>
                </div>
              )}
            </div>
          )}

          {step === 'preview' && capturedImage && (
            <div className="space-y-4">
              <div className="relative aspect-[4/3] bg-black rounded-lg overflow-hidden">
                <img src={capturedImage} alt="Preview" className="w-full h-full object-cover scale-x-[-1]" />
                <div className="absolute top-2 right-2 bg-[var(--correct)] text-white text-xs px-2 py-1 rounded-full">
                  Đã chụp
                </div>
              </div>
              <p className={DIALOG.MESSAGE}>
                Kiểm tra khuôn mặt rõ ràng. Nếu OK, nhấn xác nhận để thanh toán.
              </p>
            </div>
          )}
        </div>

        <div className={DIALOG.ACTIONS}>
          {step === 'intro' && (
            <>
              <Button variant="ghost" onClick={handleClose}>Hủy</Button>
              <Button variant="primary" onClick={() => setStep('camera')}>Tiếp tục</Button>
            </>
          )}

          {step === 'camera' && (
            <>
              <Button variant="ghost" onClick={handleClose}>Hủy</Button>
              {error ? (
                <Button variant="primary" onClick={startCamera}>Thử lại</Button>
              ) : (
                <Button variant="primary" onClick={handleCapture}>Chụp ảnh</Button>
              )}
            </>
          )}

          {step === 'preview' && (
            <>
              <Button variant="ghost" onClick={handleRetake} disabled={isProcessing}>Chụp lại</Button>
              <Button variant="primary" onClick={handleConfirm} disabled={isProcessing}>
                {isProcessing ? 'Đang xử lý...' : 'Xác nhận & Thanh toán'}
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

