import { api } from './api';
import type {
  FaceValidateRequest,
  FaceValidateResponse,
  FaceEnrollRequest,
  FaceEnrollResponse,
  FaceVerifyRequest,
  FaceVerifyResponse,
} from '@/types/face.types';

export type { FaceValidateRequest, FaceValidateResponse, FaceEnrollRequest, FaceEnrollResponse, FaceVerifyRequest, FaceVerifyResponse };

const ENDPOINTS = {
  validate: '/api/face/validate',
  enroll: '/api/face/enroll',
  verify: '/api/face/verify',
  status: (id: number) => `/api/face/status/${id}`,
} as const;

export const faceService = {
  validate: (data: FaceValidateRequest) =>
    api.post<FaceValidateResponse>(ENDPOINTS.validate, data),

  enroll: (data: FaceEnrollRequest) =>
    api.post<FaceEnrollResponse>(ENDPOINTS.enroll, data),

  verify: (data: FaceVerifyRequest) =>
    api.post<FaceVerifyResponse>(ENDPOINTS.verify, data),

  getStatus: (enrollmentId: number) =>
    api.get<boolean>(ENDPOINTS.status(enrollmentId)),
};
