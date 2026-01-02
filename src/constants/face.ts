export const FACE_MESSAGES: Record<string, string> = {
  NO_FACE_DETECTED: 'Không phát hiện khuôn mặt',
  MULTIPLE_FACES_DETECTED: 'Phát hiện nhiều người',
  LOOKING_AWAY: 'Vui lòng nhìn vào màn hình',
  HEAD_POSE_INVALID: 'Vui lòng giữ đầu thẳng',
  FACE_TOO_SMALL: 'Vui lòng ngồi gần camera hơn',
  FACE_MISMATCH: 'Khuôn mặt không khớp',
  SUCCESS: 'Thành công',
} as const;

export const getFaceMessage = (code: string): string => 
  FACE_MESSAGES[code] || code;

export const FACE_CONFIG = {
  MAX_MISMATCH: 10,
  WARNING_THRESHOLD: 3,
  VERIFY_INTERVAL_MS: 5000,
} as const;

