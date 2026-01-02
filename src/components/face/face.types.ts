export type CameraState = 'idle' | 'streaming' | 'captured' | 'error';

export interface CameraConfig {
  width?: number;
  height?: number;
  facingMode?: 'user' | 'environment';
  frameRate?: number;
}

export const DEFAULT_CAMERA_CONFIG: CameraConfig = {
  width: 640,
  height: 480,
  facingMode: 'user',
};

export interface UseCameraOptions {
  config?: CameraConfig;
  autoStart?: boolean;
  onError?: (error: string) => void;
}

export interface FaceCaptureProps {
  onCapture: (imageBase64: string) => void;
  onError?: (error: string) => void;
  buttonText?: string;
  captureButtonText?: string;
  retakeButtonText?: string;
  config?: CameraConfig;
}

export interface FaceCaptureModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCapture: (imageBase64: string) => void;
  isProcessing?: boolean;
}

export interface FaceEnrollModalProps {
  isOpen: boolean;
  onClose: () => void;
  enrollmentId: number;
  walletAddress: string;
  onSuccess?: () => void;
}

export interface FaceProctorProps {
  enrollmentId: number;
  testId?: number;
  intervalMs?: number;
  onVerificationResult?: (result: FaceVerifyResult) => void;
  onNoFace?: () => void;
  onMultipleFaces?: () => void;
  onMismatch?: () => void;
  enabled?: boolean;
}

export interface FaceVerifyResult {
  success: boolean;
  message: string;
  isMatch: boolean;
  similarity: number;
}

export type CaptureStep = 'intro' | 'camera' | 'preview';
export type EnrollStep = 'intro' | 'capture' | 'processing' | 'success' | 'error';
export type ProctorStatus = 'idle' | 'active' | 'paused' | 'error';

export const CAMERA_ERRORS = {
  NOT_SUPPORTED: 'Trình duyệt không hỗ trợ camera.',
  PERMISSION_DENIED: 'Quyền camera bị từ chối. Vui lòng cấp quyền và thử lại.',
  NOT_FOUND: 'Không tìm thấy camera. Vui lòng kết nối camera.',
  IN_USE: 'Camera đang được sử dụng bởi ứng dụng khác.',
  GENERIC: 'Không thể truy cập camera. Vui lòng thử lại.',
} as const;

export const FACE_ERRORS: Record<string, string> = {
  NO_FACE_DETECTED: 'Không phát hiện khuôn mặt. Vui lòng thử lại.',
  MULTIPLE_FACES_DETECTED: 'Phát hiện nhiều khuôn mặt. Chỉ được có một người.',
  FACE_TOO_SMALL: 'Khuôn mặt quá nhỏ. Vui lòng đến gần camera hơn.',
  FACE_ALREADY_ENROLLED: 'Khuôn mặt đã được đăng ký trước đó.',
  FACE_SERVICE_ERROR: 'Dịch vụ nhận diện khuôn mặt đang bảo trì.',
};

export const getFaceErrorMessage = (code: string): string => FACE_ERRORS[code] || 'Có lỗi xảy ra. Vui lòng thử lại.';

export const FACE_INSTRUCTIONS = {
  TITLE: 'Xác minh khuôn mặt',
  CAPTURE_TITLE: 'Chụp ảnh khuôn mặt',
  PREVIEW_TITLE: 'Xác nhận ảnh',
  INTRO_DESC: 'Để đảm bảo tính xác thực của chứng chỉ NFT, vui lòng chụp ảnh khuôn mặt trước khi thanh toán.',
  ENROLL_DESC: 'Để đảm bảo tính xác thực của chứng chỉ, vui lòng chụp ảnh khuôn mặt của bạn. Ảnh này sẽ được sử dụng để xác minh danh tính khi làm bài kiểm tra.',
  PREVIEW_DESC: 'Kiểm tra khuôn mặt rõ ràng. Nếu OK, nhấn xác nhận để thanh toán.',
  NOTE_TITLE: 'Lưu ý:',
  NOTES: [
    'Đảm bảo ánh sáng đủ và đều',
    'Nhìn thẳng vào camera',
    'Không đeo kính râm hoặc khẩu trang',
    'Chỉ có một người trong khung hình',
  ],
  CAPTURED_BADGE: 'Đã chụp',
  SUCCESS_TITLE: 'Đăng ký thành công!',
  SUCCESS_DESC: 'Khuôn mặt của bạn đã được lưu. Bạn có thể bắt đầu học ngay.',
  ERROR_TITLE: 'Có lỗi xảy ra',
  GENERIC_ERROR: 'Có lỗi xảy ra. Vui lòng thử lại.',
  BTN_CANCEL: 'Hủy',
  BTN_CONTINUE: 'Tiếp tục',
  BTN_RETRY: 'Thử lại',
  BTN_CAPTURE: 'Chụp ảnh',
  BTN_RETAKE: 'Chụp lại',
  BTN_CONFIRM_PAY: 'Xác nhận & Thanh toán',
  BTN_PROCESSING: 'Đang xử lý...',
  BTN_DONE: 'Hoàn tất',
  BTN_CLOSE: 'Đóng',
  BTN_START_CAMERA: 'Bật Camera',
} as const;
