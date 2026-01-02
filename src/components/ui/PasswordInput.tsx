'use client';

import { memo, useState, useCallback } from 'react';
import { Input } from './Input';
import { EyeIcon, EyeOffIcon } from './icons';
import type { InputProps } from './ui.types';

interface PasswordInputProps extends Omit<InputProps, 'type'> {}

function PasswordInputComponent(props: PasswordInputProps) {
  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = useCallback(() => {
    if (props.disabled) return;
    setShowPassword(prev => !prev);
  }, [props.disabled]);

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
        disabled={props.disabled}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--text)]/40 hover:text-[var(--text)]/60 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
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
