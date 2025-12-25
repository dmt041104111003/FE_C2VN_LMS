'use client';

import { memo, useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { Button, Input, GoogleIcon, GitHubIcon, WalletModal } from '@/components/ui';
import { LOGIN } from '@/constants/login';
import { ROUTES } from '@/constants/navigation';
import { getAvailableWallets, CardanoWallet } from '@/constants/wallet';
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
} from './auth.styles';

function LoginFormComponent() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [wallets, setWallets] = useState<CardanoWallet[]>([]);
  const [showWalletModal, setShowWalletModal] = useState(false);

  useEffect(() => {
    setWallets(getAvailableWallets());
  }, []);

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
  }, []);

  const handleWalletSelect = useCallback((wallet: { key: string; name: string }) => {
    console.log('Connect wallet:', wallet.key);
    setShowWalletModal(false);
  }, []);

  const openWalletModal = useCallback(() => setShowWalletModal(true), []);
  const closeWalletModal = useCallback(() => setShowWalletModal(false), []);

  return (
    <>
      <div className={AUTH_FORM_HEADER}>
        <h1 className={AUTH_FORM_TITLE}>{LOGIN.title}</h1>
        <p className={AUTH_FORM_SUBTITLE}>{LOGIN.subtitle}</p>
      </div>

      <form onSubmit={handleSubmit} className={AUTH_FORM_WRAPPER}>
        <div className={AUTH_FORM_FIELD}>
          <label className={AUTH_FORM_LABEL}>Email</label>
          <Input
            type="email"
            placeholder={LOGIN.emailPlaceholder}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            variant="minimal"
            size="md"
            required
          />
        </div>
        <div className={AUTH_FORM_FIELD}>
          <label className={AUTH_FORM_LABEL}>Mật khẩu</label>
          <Input
            type="password"
            placeholder={LOGIN.passwordPlaceholder}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            variant="minimal"
            size="md"
            required
          />
        </div>
        <div className={AUTH_FORM_FORGOT}>
          <Link href="/auth/forgot-password" className={AUTH_FORM_FORGOT_LINK}>
            {LOGIN.forgotPassword}
          </Link>
        </div>
        <Button type="submit" variant="primary" size="lg" className="w-full mt-2">
          {LOGIN.submitText}
        </Button>
      </form>

      <div className={AUTH_DIVIDER}>
        <div className={AUTH_DIVIDER_LINE} />
        <span className={AUTH_DIVIDER_TEXT}>{LOGIN.orText}</span>
        <div className={AUTH_DIVIDER_LINE} />
      </div>

      <div className={AUTH_SOCIAL_LIST}>
        <button type="button" className={AUTH_SOCIAL_BTN}>
          <GoogleIcon />
          {LOGIN.googleText}
        </button>
        <button type="button" className={AUTH_SOCIAL_BTN}>
          <GitHubIcon />
          {LOGIN.githubText}
        </button>
        <button type="button" onClick={openWalletModal} className={AUTH_SOCIAL_BTN}>
          <img src="/loading.png" alt="" className={AUTH_SOCIAL_ICON} />
          {LOGIN.walletText}
        </button>
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
