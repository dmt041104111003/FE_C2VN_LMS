'use client';

import { memo, useState, useEffect } from 'react';
import Link from 'next/link';
import { Button, Input, GoogleIcon, GitHubIcon, WalletModal } from '@/components/ui';
import { LOGIN } from '@/constants/login';
import { ROUTES } from '@/constants/navigation';
import { getAvailableWallets, CardanoWallet } from '@/constants/wallet';

function LoginFormComponent() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [wallets, setWallets] = useState<CardanoWallet[]>([]);
  const [showWalletModal, setShowWalletModal] = useState(false);

  useEffect(() => {
    const detected = getAvailableWallets();
    setWallets(detected);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  const handleWalletSelect = (wallet: { key: string; name: string }) => {
    console.log('Connect wallet:', wallet.key);
    setShowWalletModal(false);
  };

  return (
    <>
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-[var(--text)] mb-2">
          {LOGIN.title}
        </h1>
        <p className="text-sm text-[var(--text)]/60">
          {LOGIN.subtitle}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <Input
          type="email"
          placeholder={LOGIN.emailPlaceholder}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Input
          type="password"
          placeholder={LOGIN.passwordPlaceholder}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <div className="text-right">
          <Link href="/auth/forgot-password" className="text-sm text-[var(--link)]">
            {LOGIN.forgotPassword}
          </Link>
        </div>
        <Button type="submit" variant="primary" size="lg" className="w-full">
          {LOGIN.submitText}
        </Button>
      </form>

      <div className="flex items-center gap-4 my-6">
        <div className="flex-1 h-px bg-[var(--text)]/10" />
        <span className="text-sm text-[var(--text)]/50">{LOGIN.orText}</span>
        <div className="flex-1 h-px bg-[var(--text)]/10" />
      </div>

      <div className="flex flex-col gap-3">
        <button
          type="button"
          className="flex items-center justify-center gap-3 w-full py-3 bg-[var(--bg-alt)] border border-[var(--text)]/10 rounded-full text-sm font-medium text-[var(--text)]"
        >
          <GoogleIcon />
          {LOGIN.googleText}
        </button>
        <button
          type="button"
          className="flex items-center justify-center gap-3 w-full py-3 bg-[var(--bg-alt)] border border-[var(--text)]/10 rounded-full text-sm font-medium text-[var(--text)]"
        >
          <GitHubIcon />
          {LOGIN.githubText}
        </button>
        <button
          type="button"
          onClick={() => setShowWalletModal(true)}
          className="flex items-center justify-center gap-3 w-full py-3 bg-[var(--bg-alt)] border border-[var(--text)]/10 rounded-full text-sm font-medium text-[var(--text)]"
        >
          <img src="/loading.png" alt="" className="w-5 h-5" />
          {LOGIN.walletText}
        </button>
      </div>

      <div className="text-center mt-6">
        <p className="text-sm text-[var(--text)]/60">
          {LOGIN.noAccount}{' '}
          <Link href={ROUTES.REGISTER} className="text-[var(--link)] font-medium">
            {LOGIN.registerLink}
          </Link>
        </p>
      </div>

      <WalletModal
        isOpen={showWalletModal}
        wallets={wallets}
        emptyText={LOGIN.noWalletText}
        onClose={() => setShowWalletModal(false)}
        onSelect={handleWalletSelect}
      />
    </>
  );
}

export const LoginForm = memo(LoginFormComponent);
