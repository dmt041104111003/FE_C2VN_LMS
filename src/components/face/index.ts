export { FaceCapture } from './FaceCapture';
export { FaceCaptureModal } from './FaceCaptureModal';
export { FaceEnrollModal } from './FaceEnrollModal';
export { FaceProctor } from './FaceProctor';

export type {
  FaceCaptureProps,
  FaceCaptureModalProps,
  FaceEnrollModalProps,
  FaceProctorProps,
  FaceVerifyResult,
  CameraConfig,
  CameraState,
  UseCameraOptions,
  CaptureStep,
  EnrollStep,
  ProctorStatus,
} from './face.types';

export {
  CAMERA_ERRORS,
  FACE_ERRORS,
  FACE_INSTRUCTIONS,
  DEFAULT_CAMERA_CONFIG,
  getFaceErrorMessage,
} from './face.types';
