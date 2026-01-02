import { memo } from 'react';
import { ButtonProps } from './ui.types';
import {
  BUTTON_BASE,
  BUTTON_VARIANTS,
  BUTTON_SIZES,
} from './ui.styles';

function ButtonComponent({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  onClick,
  disabled = false,
  type = 'button',
}: ButtonProps) {
  const disabledClass = disabled ? 'opacity-50 cursor-not-allowed' : 'hover:opacity-90 transition-opacity';
  const combined = [
    BUTTON_BASE,
    BUTTON_VARIANTS[variant],
    BUTTON_SIZES[size],
    disabledClass,
    className,
  ].join(' ');

  return (
    <button
      type={type}
      className={combined}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

export const Button = memo(ButtonComponent);
