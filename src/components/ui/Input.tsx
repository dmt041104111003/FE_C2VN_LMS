import { memo } from 'react';
import { InputProps } from './ui.types';
import {
  INPUT_BASE,
  INPUT_VARIANTS,
  INPUT_SIZES,
} from './ui.styles';

const INPUT_DISABLED = 'disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-[var(--bg-alt)]';

function InputComponent({
  type = 'text',
  placeholder,
  value,
  onChange,
  variant = 'default',
  size = 'md',
  className = '',
  autoFocus,
  required,
  disabled,
}: InputProps) {
  const inputClass = `${INPUT_BASE} ${INPUT_VARIANTS[variant]} ${INPUT_SIZES[size]} ${INPUT_DISABLED} ${className}`;

  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={inputClass}
      autoFocus={autoFocus}
      required={required}
      disabled={disabled}
    />
  );
}

export const Input = memo(InputComponent);
