import { memo } from 'react';
import { InputProps } from './ui.types';
import {
  INPUT_BASE,
  INPUT_VARIANTS,
  INPUT_SIZES,
} from './ui.styles';

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
}: InputProps) {
  const inputClass = `${INPUT_BASE} ${INPUT_VARIANTS[variant]} ${INPUT_SIZES[size]} ${className}`;

  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={inputClass}
      autoFocus={autoFocus}
      required={required}
    />
  );
}

export const Input = memo(InputComponent);

