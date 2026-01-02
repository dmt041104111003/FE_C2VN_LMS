import { memo } from 'react';
import { TextareaProps } from './ui.types';
import {
  TEXTAREA_BASE,
  TEXTAREA_VARIANTS,
  TEXTAREA_SIZES,
} from './ui.styles';

const TEXTAREA_DISABLED = 'disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-[var(--bg-alt)]';

function TextareaComponent({
  placeholder,
  value,
  onChange,
  variant = 'default',
  size = 'md',
  className = '',
  rows = 4,
  required,
  disabled,
}: TextareaProps) {
  const textareaClass = `${TEXTAREA_BASE} ${TEXTAREA_VARIANTS[variant]} ${TEXTAREA_SIZES[size]} ${TEXTAREA_DISABLED} ${className}`;

  return (
    <textarea
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={textareaClass}
      rows={rows}
      required={required}
      disabled={disabled}
    />
  );
}

export const Textarea = memo(TextareaComponent);
