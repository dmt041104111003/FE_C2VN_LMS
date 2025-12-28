'use client';

import { createContext, useContext, useState, useEffect, useCallback, useMemo, type ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import * as authService from '@/services/auth';
import { connectWallet, getWalletAddress, signMessage, type WalletApi } from '@/constants/wallet';
import { ROUTES } from '@/constants/navigation';
import type { User, AuthState, AuthContextValue } from '@/types/auth';

const AuthContext = createContext<AuthContextValue | undefined>(undefined);
const AUTH_SYNC_KEY = 'auth_sync';

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const router = useRouter();
  const [state, setState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true,
  });

  useEffect(() => {
    checkAuth();
  }, []);

  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === AUTH_SYNC_KEY && e.newValue) {
        if (e.newValue.startsWith('logout')) {
          setState({
            user: null,
            isAuthenticated: false,
            isLoading: false,
          });
          router.push(ROUTES.LOGIN);
        } else if (e.newValue.startsWith('login')) {
          checkAuth();
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [router]);

  const checkAuth = async () => {
    try {
      const user = await authService.getCurrentUser();
      setState({
        user: {
          id: user.id,
          email: user.email,
          fullName: user.fullName,
          walletAddress: user.walletAddress,
          imageUrl: user.imageUrl,
          role: user.role?.name,
          loginMethod: user.loginMethod?.name,
          createdAt: user.createdAt,
        },
        isAuthenticated: true,
        isLoading: false,
      });
    } catch {
      setState({
        user: null,
        isAuthenticated: false,
        isLoading: false,
      });
    }
  };

  const syncAuthTabs = useCallback((action: 'login' | 'logout') => {
    localStorage.setItem(AUTH_SYNC_KEY, `${action}_${Date.now()}`);
  }, []);

  const refreshUser = useCallback(async () => {
    await checkAuth();
    syncAuthTabs('login');
  }, [syncAuthTabs]);

  const loginWithEmail = useCallback(async (email: string, password: string) => {
    setState(prev => ({ ...prev, isLoading: true }));
    try {
      await authService.login({
        email,
        password,
        loginMethod: 'EMAIL_PASSWORD',
      });
      await checkAuth();
      syncAuthTabs('login');
      router.push(ROUTES.HOME);
    } finally {
      setState(prev => ({ ...prev, isLoading: false }));
    }
  }, [router, syncAuthTabs]);

  const loginWithWallet = useCallback(async (walletKey: string) => {
    setState(prev => ({ ...prev, isLoading: true }));
    try {
      const walletApi: WalletApi | null = await connectWallet(walletKey);
      if (!walletApi) {
        throw new Error('Không thể kết nối ví');
      }

      const address = await getWalletAddress(walletApi);
      if (!address) {
        throw new Error('Không thể lấy địa chỉ ví');
      }

      const { nonce } = await authService.getNonce({ address });

      const signResult = await signMessage(walletApi, address, nonce);
      if (!signResult) {
        throw new Error('Không thể ký tin nhắn');
      }

      await authService.login({
        address,
        signature: signResult.signature,
        key: signResult.key,
        nonce,
        loginMethod: 'WALLET',
      });

      await checkAuth();
      syncAuthTabs('login');
      router.push(ROUTES.HOME);
    } finally {
      setState(prev => ({ ...prev, isLoading: false }));
    }
  }, [router, syncAuthTabs]);

  const loginWithGoogle = useCallback(() => {
    window.location.href = authService.getGoogleOAuthUrl();
  }, []);

  const loginWithGithub = useCallback(() => {
    window.location.href = authService.getGithubOAuthUrl();
  }, []);

  const register = useCallback(async (email: string, password: string, fullName: string) => {
    setState(prev => ({ ...prev, isLoading: true }));
    try {
      await authService.register({ email, password, fullName });
      router.push(`${ROUTES.VERIFY_EMAIL}?email=${encodeURIComponent(email)}`);
    } finally {
      setState(prev => ({ ...prev, isLoading: false }));
    }
  }, [router]);

  const verifyEmail = useCallback(async (email: string, code: string) => {
    setState(prev => ({ ...prev, isLoading: true }));
    try {
      await authService.verifyEmail({ email, code });
      router.push(ROUTES.LOGIN);
    } finally {
      setState(prev => ({ ...prev, isLoading: false }));
    }
  }, [router]);

  const resendCode = useCallback(async (email: string) => {
    await authService.resendCode({ email });
  }, []);

  const forgotPassword = useCallback(async (email: string) => {
    setState(prev => ({ ...prev, isLoading: true }));
    try {
      await authService.forgotPassword({ email });
    } finally {
      setState(prev => ({ ...prev, isLoading: false }));
    }
  }, []);

  const resetPassword = useCallback(async (email: string, code: string, newPassword: string) => {
    setState(prev => ({ ...prev, isLoading: true }));
    try {
      await authService.resetPassword({ email, code, newPassword });
      router.push(ROUTES.LOGIN);
    } finally {
      setState(prev => ({ ...prev, isLoading: false }));
    }
  }, [router]);

  const changePassword = useCallback(async (currentPassword: string, newPassword: string) => {
    setState(prev => ({ ...prev, isLoading: true }));
    try {
      await authService.changePassword({ currentPassword, newPassword });
    } finally {
      setState(prev => ({ ...prev, isLoading: false }));
    }
  }, []);

  const logout = useCallback(async () => {
    setState(prev => ({ ...prev, isLoading: true }));
    try {
      await authService.logout();
    } finally {
      setState({
        user: null,
        isAuthenticated: false,
        isLoading: false,
      });
      syncAuthTabs('logout');
      router.push(ROUTES.LOGIN);
    }
  }, [router, syncAuthTabs]);

  const value = useMemo<AuthContextValue>(() => ({
    ...state,
    loginWithEmail,
    loginWithWallet,
    loginWithGoogle,
    loginWithGithub,
    register,
    verifyEmail,
    resendCode,
    forgotPassword,
    resetPassword,
    changePassword,
    logout,
    refreshUser,
  }), [
    state,
    loginWithEmail,
    loginWithWallet,
    loginWithGoogle,
    loginWithGithub,
    register,
    verifyEmail,
    resendCode,
    forgotPassword,
    resetPassword,
    changePassword,
    logout,
    refreshUser,
  ]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth phải được sử dụng trong AuthProvider');
  }
  return context;
}
