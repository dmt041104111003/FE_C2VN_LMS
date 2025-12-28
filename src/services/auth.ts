import { api } from './api';
import { API_BASE_URL, API_ENDPOINTS } from '@/constants/api';
import type {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  VerifyEmailRequest,
  ResendCodeRequest,
  ForgotPasswordRequest,
  ResetPasswordRequest,
  ChangePasswordRequest,
  NonceRequest,
  NonceResponse,
  UserResponse,
  IntrospectRequest,
  IntrospectResponse,
} from '@/types/auth';

export async function login(request: LoginRequest): Promise<LoginResponse> {
  return api.post<LoginResponse>(API_ENDPOINTS.AUTH.TOKEN, request);
}

export async function register(request: RegisterRequest): Promise<string> {
  return api.post<string>(API_ENDPOINTS.AUTH.REGISTER, request);
}

export async function verifyEmail(request: VerifyEmailRequest): Promise<string> {
  return api.post<string>(API_ENDPOINTS.AUTH.VERIFY_EMAIL, request);
}

export async function resendCode(request: ResendCodeRequest): Promise<string> {
  return api.post<string>(API_ENDPOINTS.AUTH.RESEND_CODE, request);
}

export async function forgotPassword(request: ForgotPasswordRequest): Promise<string> {
  return api.post<string>(API_ENDPOINTS.AUTH.FORGOT_PASSWORD, request);
}

export async function resetPassword(request: ResetPasswordRequest): Promise<string> {
  return api.post<string>(API_ENDPOINTS.AUTH.RESET_PASSWORD, request);
}

export async function changePassword(request: ChangePasswordRequest): Promise<string> {
  return api.put<string>(API_ENDPOINTS.USERS.CHANGE_PASSWORD, request);
}

export async function getNonce(request: NonceRequest): Promise<NonceResponse> {
  return api.post<NonceResponse>(API_ENDPOINTS.NONCE, request);
}

export async function introspect(request: IntrospectRequest): Promise<IntrospectResponse> {
  return api.post<IntrospectResponse>(API_ENDPOINTS.AUTH.INTROSPECT, request);
}

export async function logout(): Promise<void> {
  await api.post<void>(API_ENDPOINTS.AUTH.LOGOUT);
}

export async function getCurrentUser(): Promise<UserResponse> {
  return api.get<UserResponse>(API_ENDPOINTS.USERS.MY_INFO);
}

export async function refreshToken(token: string): Promise<LoginResponse> {
  return api.post<LoginResponse>(API_ENDPOINTS.AUTH.REFRESH, { token });
}

export const getGoogleOAuthUrl = () => `${API_BASE_URL}${API_ENDPOINTS.OAUTH.GOOGLE}`;
export const getGithubOAuthUrl = () => `${API_BASE_URL}${API_ENDPOINTS.OAUTH.GITHUB}`;
