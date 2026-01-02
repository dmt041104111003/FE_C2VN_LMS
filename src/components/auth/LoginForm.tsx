'use client';

import { memo, useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button, Input, PasswordInput, GoogleIcon, GitHubIcon, WalletModal } from '@/components/ui';
import { useToast } from '@/components/ui/Toast';
import { LOGIN } from '@/constants/login';
import { ROUTES } from '@/constants/navigation';
import { getAvailableWallets, CardanoWallet } from '@/constants/wallet';
import { useAuth } from '@/contexts';
import { ApiException } from '@/services/api';
import { translateError } from '@/constants/auth';
import {
  AUTH_FORM_TITLE,
  AUTH_FORM_SUBTITLE,
  AUTH_FORM_HEADER,
  AUTH_FORM_WRAPPER,
  AUTH_FORM_FIELD,
  AUTH_FORM_LABEL,
  AUTH_FORM_FORGOT,
  AUTH_FORM_FORGOT_LINK,
  AUTH_DIVIDER,
  AUTH_DIVIDER_LINE,
  AUTH_DIVIDER_TEXT,
  AUTH_SOCIAL_BTN,
  AUTH_SOCIAL_LIST,
  AUTH_SOCIAL_ICON,
  AUTH_FOOTER,
  AUTH_FOOTER_TEXT,
  AUTH_FOOTER_LINK,
  AUTH_ERROR_MSG,
} from './auth.styles';

function LoginFormComponent() {
  const router = useRouter();
  const { loginWithEmail, loginWithWallet, loginWithGoogle, loginWithGithub, isLoading, isAuthenticated } = useAuth();
  const toast = useToast();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [wallets, setWallets] = useState<CardanoWallet[]>([]);
  const [showWalletModal, setShowWalletModal] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      router.replace(ROUTES.HOME);
    }
  }, [isAuthenticated, isLoading, router]);

  useEffect(() => {
    setWallets(getAvailableWallets());
  }, []);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!email || !password) {
      setError('Vui lòng nhập email và mật khẩu');
      return;
    }

    try {
      await loginWithEmail(email, password);
      toast.success('Đăng nhập thành công!');
    } catch (err) {
      const errorMsg = err instanceof ApiException 
        ? translateError(err.message) 
        : 'Đăng nhập thất bại. Vui lòng thử lại.';
      toast.error(errorMsg);
      setError(errorMsg);
    }
  }, [email, password, loginWithEmail, toast]);

  const handleWalletSelect = useCallback(async (wallet: { key: string; name: string }) => {
    setShowWalletModal(false);
    setError('');
    
    try {
      await loginWithWallet(wallet.key);
      toast.success('Đăng nhập thành công!');
    } catch (err) {
      const errorMsg = err instanceof ApiException 
        ? translateError(err.message)
        : err instanceof Error 
          ? translateError(err.message)
          : 'Đăng nhập ví thất bại. Vui lòng thử lại.';
      toast.error(errorMsg);
      setError(errorMsg);
    }
  }, [loginWithWallet, toast]);

  const openWalletModal = useCallback(() => setShowWalletModal(true), []);
  const closeWalletModal = useCallback(() => setShowWalletModal(false), []);

  return (
    <>
      <div className={AUTH_FORM_HEADER}>
        <h1 className={AUTH_FORM_TITLE}>{LOGIN.title}</h1>
        <p className={AUTH_FORM_SUBTITLE}>{LOGIN.subtitle}</p>
      </div>

      {error && <p className={AUTH_ERROR_MSG}>{error}</p>}

      <form onSubmit={handleSubmit} className={AUTH_FORM_WRAPPER}>
        <div className={AUTH_FORM_FIELD}>
          <label className={AUTH_FORM_LABEL}>Email</label>
          <Input
            type={email === 'admin' ? 'text' : 'email'}
            placeholder={LOGIN.emailPlaceholder}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            variant="minimal"
            size="md"
            required
            disabled={isLoading}
          />
        </div>
        <div className={AUTH_FORM_FIELD}>
          <label className={AUTH_FORM_LABEL}>Mật khẩu</label>
          <PasswordInput
            placeholder={LOGIN.passwordPlaceholder}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            variant="minimal"
            size="md"
            required
            disabled={isLoading}
          />
        </div>
        <div className={AUTH_FORM_FORGOT}>
          <Link href="/auth/forgot-password" className={AUTH_FORM_FORGOT_LINK}>
            {LOGIN.forgotPassword}
          </Link>
        </div>
        <Button 
          type="submit" 
          variant="primary" 
          size="lg" 
          className="w-full mt-2"
          disabled={isLoading}
        >
          {LOGIN.submitText}
        </Button>
      </form>

      <div className={AUTH_DIVIDER}>
        <div className={AUTH_DIVIDER_LINE} />
        <span className={AUTH_DIVIDER_TEXT}>{LOGIN.orText}</span>
        <div className={AUTH_DIVIDER_LINE} />
      </div>

      <div className={AUTH_SOCIAL_LIST}>
        <Button 
          type="button"
          variant="secondary"
          size="md"
          className={AUTH_SOCIAL_BTN}
          onClick={loginWithGoogle}
          disabled={isLoading}
        >
          <GoogleIcon />
          {LOGIN.googleText}
        </Button>
        <Button 
          type="button"
          variant="secondary"
          size="md"
          className={AUTH_SOCIAL_BTN}
          onClick={loginWithGithub}
          disabled={isLoading}
        >
          <GitHubIcon />
          {LOGIN.githubText}
        </Button>
        <Button 
          type="button"
          variant="secondary"
          size="md"
          onClick={openWalletModal}
          className={AUTH_SOCIAL_BTN}
          disabled={isLoading}
        >
          <img src="/loading.png" alt="" className={AUTH_SOCIAL_ICON} />
          {LOGIN.walletText}
        </Button>
      </div>

      <div className={AUTH_FOOTER}>
        <p className={AUTH_FOOTER_TEXT}>
          {LOGIN.noAccount}{' '}
          <Link href={ROUTES.REGISTER} className={AUTH_FOOTER_LINK}>
            {LOGIN.registerLink}
          </Link>
        </p>
      </div>

      <WalletModal
        isOpen={showWalletModal}
        wallets={wallets}
        emptyText={LOGIN.noWalletText}
        onClose={closeWalletModal}
        onSelect={handleWalletSelect}
      />
    </>
  );
}

export const LoginForm = memo(LoginFormComponent);
