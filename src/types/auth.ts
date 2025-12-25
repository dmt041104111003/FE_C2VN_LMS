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

