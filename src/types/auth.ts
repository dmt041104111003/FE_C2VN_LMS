import type { ReactNode } from 'react';
import type { UserRole } from './core.types';

export interface LoginEmailRequest {
  email: string;
  password: string;
  loginMethod: 'EMAIL_PASSWORD';
}

export interface LoginWalletRequest {
  address: string;
  signature: string;
  key: string;
  nonce: string;
  loginMethod: 'WALLET';
}

export type LoginRequest = LoginEmailRequest | LoginWalletRequest;

export interface LoginResponse {
  token: string;
  authenticated: boolean;
}

export interface RegisterRequest {
  email: string;
  password: string;
  fullName: string;
}

export interface VerifyEmailRequest {
  email: string;
  code: string;
}

export interface ResendCodeRequest {
  email: string;
}

export interface ForgotPasswordRequest {
  email: string;
}

export interface ResetPasswordRequest {
  email: string;
  code: string;
  newPassword: string;
}

export interface ChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
}

export interface NonceRequest {
  address: string;
}

export interface NonceResponse {
  nonce: string;
  address: string;
}

export interface UserResponse {
  id: string;
  email?: string;
  fullName?: string;
  bio?: string;
  walletAddress?: string;
  role?: {
    name: string;
  };
  loginMethod?: {
    name: string;
  };
  hasPassword?: boolean;
  createdAt?: string;
}

export interface IntrospectRequest {
  token: string;
}

export interface IntrospectResponse {
  valid: boolean;
}

export interface User {
  id: string;
  email?: string;
  fullName?: string;
  bio?: string;
  walletAddress?: string;
  role?: string;
  loginMethod?: string;
  hasPassword?: boolean;
  createdAt?: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface AuthContextValue extends AuthState {
  loginWithEmail: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, fullName: string) => Promise<void>;
  verifyEmail: (email: string, code: string) => Promise<void>;
  resendCode: (email: string) => Promise<void>;
  forgotPassword: (email: string) => Promise<void>;
  resetPassword: (email: string, code: string, newPassword: string) => Promise<void>;
  changePassword: (currentPassword: string, newPassword: string) => Promise<void>;
  loginWithWallet: (walletKey: string) => Promise<void>;
  loginWithGoogle: () => void;
  loginWithGithub: () => void;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
}

export interface LoginFormState {
  email: string;
  password: string;
}

export interface RegisterFormState {
  email: string;
  password: string;
  fullName: string;
}

export interface VerifyEmailFormState {
  email: string;
  code: string;
}

export interface ForgotPasswordFormState {
  email: string;
}

export interface ResetPasswordFormState {
  email: string;
  code: string;
  newPassword: string;
}

export interface ChangePasswordFormState {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export interface WalletSelectHandler {
  (wallet: { key: string; name: string }): void;
}

export interface AuthFormProps {
  onSubmit?: () => void;
  isLoading?: boolean;
}

export interface AuthGuardProps {
  children: ReactNode;
  allowedRoles?: UserRole[];
  redirectTo?: string;
}
