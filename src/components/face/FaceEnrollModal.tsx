'use client';

import { useState } from 'react';
import { Dialog } from '@/components/ui/Dialog';
import { Button } from '@/components/ui/Button';
import { FaceCapture } from './FaceCapture';
import { faceService } from '@/services/face';

interface FaceEnrollModalProps {
  isOpen: boolean;
  onClose: () => void;
  enrollmentId: number;
  walletAddress: string;
  onSuccess?: () => void;
}

type EnrollStep = 'intro' | 'capture' | 'processing' | 'success' | 'error';

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
      const response = await faceService.enroll({
        enrollmentId,
        imageBase64,
        walletAddress,
      });

      if (response.result.success) {
        setStep('success');
        onSuccess?.();
      } else {
        setErrorMessage(getErrorMessage(response.result.message));
        setStep('error');
      }
    } catch {
      setErrorMessage('Có lỗi xảy ra. Vui lòng thử lại.');
      setStep('error');
    }
  };

  const getErrorMessage = (code: string): string => {
    const messages: Record<string, string> = {
      NO_FACE_DETECTED: 'Không phát hiện khuôn mặt. Vui lòng thử lại.',
      MULTIPLE_FACES_DETECTED:
        'Phát hiện nhiều khuôn mặt. Chỉ được có một người.',
      FACE_TOO_SMALL: 'Khuôn mặt quá nhỏ. Vui lòng đến gần camera hơn.',
      FACE_ALREADY_ENROLLED: 'Khuôn mặt đã được đăng ký trước đó.',
      FACE_SERVICE_ERROR: 'Dịch vụ nhận diện khuôn mặt đang bảo trì.',
    };
    return messages[code] || 'Có lỗi xảy ra. Vui lòng thử lại.';
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
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <div className="p-6 max-w-lg mx-auto">
        {step === 'intro' && (
          <div className="text-center space-y-4">
            <h2 className="text-xl font-bold">Xác minh khuôn mặt</h2>
            <p className="text-muted-foreground">
              Để đảm bảo tính xác thực của chứng chỉ, vui lòng chụp ảnh khuôn
              mặt của bạn. Ảnh này sẽ được sử dụng để xác minh danh tính khi làm
              bài kiểm tra.
            </p>
            <div className="bg-amber-50 dark:bg-amber-900/20 p-4 rounded-lg text-sm text-amber-800 dark:text-amber-200">
              <p className="font-medium">Lưu ý:</p>
              <ul className="list-disc list-inside mt-2 space-y-1 text-left">
                <li>Đảm bảo ánh sáng đủ và đều</li>
                <li>Nhìn thẳng vào camera</li>
                <li>Không đeo kính râm hoặc khẩu trang</li>
                <li>Chỉ có một người trong khung hình</li>
              </ul>
            </div>
            <Button onClick={() => setStep('capture')} className="w-full">
              Tiếp tục
            </Button>
          </div>
        )}

        {step === 'capture' && (
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-center">Chụp ảnh khuôn mặt</h2>
            <FaceCapture
              onCapture={handleCapture}
              onError={(err) => {
                setErrorMessage(err);
                setStep('error');
              }}
            />
          </div>
        )}

        {step === 'processing' && (
          <div className="text-center space-y-4 py-8">
            <div className="animate-spin w-12 h-12 border-4 border-primary border-t-transparent rounded-full mx-auto" />
            <p>Đang xử lý...</p>
          </div>
        )}

        {step === 'success' && (
          <div className="text-center space-y-4 py-8">
            <div className="w-16 h-16 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto">
              <svg
                className="w-8 h-8 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h3 className="text-lg font-semibold">Đăng ký thành công!</h3>
            <p className="text-muted-foreground">
              Khuôn mặt của bạn đã được lưu. Bạn có thể bắt đầu học ngay.
            </p>
            <Button onClick={handleClose} className="w-full">
              Hoàn tất
            </Button>
          </div>
        )}

        {step === 'error' && (
          <div className="text-center space-y-4 py-8">
            <div className="w-16 h-16 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center mx-auto">
              <svg
                className="w-8 h-8 text-red-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </div>
            <h3 className="text-lg font-semibold">Có lỗi xảy ra</h3>
            <p className="text-muted-foreground">{errorMessage}</p>
            <div className="flex gap-2">
              <Button onClick={handleRetry} className="flex-1">
                Thử lại
              </Button>
              <Button onClick={handleClose} variant="secondary" className="flex-1">
                Đóng
              </Button>
            </div>
          </div>
        )}
      </div>
    </Dialog>
  );
}


