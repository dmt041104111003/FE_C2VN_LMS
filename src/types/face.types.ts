export interface FaceValidateRequest {
  imageBase64: string;
}

export interface FaceValidateResponse {
  success: boolean;
  message: string;
}

export interface FaceEnrollRequest {
  enrollmentId: number;
  embedding: string;
  walletAddress: string;
}

export interface FaceVerifyRequest {
  enrollmentId: number;
  testId?: number;
  imageBase64: string;
}

export interface FaceEnrollResponse {
  success: boolean;
  message: string;
}

export interface FaceVerifyResponse {
  success: boolean;
  message: string;
  isMatch: boolean;
  similarity: number;
}

