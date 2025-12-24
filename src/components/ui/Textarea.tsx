import { memo } from 'react';
import { TextareaProps } from './ui.types';
import {
  TEXTAREA_BASE,
  TEXTAREA_VARIANTS,
  TEXTAREA_SIZES,
} from './ui.styles';

function TextareaComponent({
  placeholder,
  value,
  onChange,
  variant = 'default',
  size = 'md',
  className = '',
  rows = 4,
  required,
}: TextareaProps) {
  const textareaClass = `${TEXTAREA_BASE} ${TEXTAREA_VARIANTS[variant]} ${TEXTAREA_SIZES[size]} ${className}`;

  return (
    <textarea
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={textareaClass}
      rows={rows}
      required={required}
    />
  );
}

export const Textarea = memo(TextareaComponent);

