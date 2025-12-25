'use client';

import { memo, useState, useCallback } from 'react';
import { Input } from './Input';
import { EyeIcon, EyeOffIcon } from './icons';
import type { InputProps } from './ui.types';

interface PasswordInputProps extends Omit<InputProps, 'type'> {}

function PasswordInputComponent(props: PasswordInputProps) {
  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = useCallback(() => {
    setShowPassword(prev => !prev);
  }, []);

  return (
    <div className="relative">
      <Input
        {...props}
        type={showPassword ? 'text' : 'password'}
        className={`pr-10 ${props.className || ''}`}
      />
      <button
        type="button"
        onClick={togglePassword}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--text)]/40 hover:text-[var(--text)]/60 transition-colors"
        tabIndex={-1}
      >
        {showPassword ? (
          <EyeOffIcon className="w-5 h-5" />
        ) : (
          <EyeIcon className="w-5 h-5" />
        )}
      </button>
    </div>
  );
}

export const PasswordInput = memo(PasswordInputComponent);

