'use client';

import { memo, useState } from 'react';
import { FormProps } from './ui.types';
import { Input } from './Input';
import { Textarea } from './Textarea';
import { Button } from './Button';
import { validateByType, filterByType } from '@/constants';
import {
  FORM_BASE,
  FORM_ROW,
  FORM_COLUMN,
} from './ui.styles';

function FormComponent({
  fields,
  textareaPlaceholder,
  submitText,
  minContentLength = 10,
  layout = 'row',
  showSubmitAlways = false,
  onSubmit,
  className = '',
  footer,
}: FormProps) {
  const [values, setValues] = useState<Record<string, string>>({});

  const [content, setContent] = useState('');

  const handleFieldChange = (name: string, type: string, value: string) => {
    const filtered = filterByType(type, value);

    setValues((prev) => ({
      ...prev,
      [name]: filtered,
    }));
  };

  const isFieldsValid = fields.every((field) => {
    const value = values[field.name] || '';

    return validateByType(field.type, value, field.minLength);
  });

  const isContentValid = !textareaPlaceholder || content.trim().length >= minContentLength;

  const isValid = isFieldsValid && isContentValid;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!isValid) return;

    const data = {
      ...values,
      ...(textareaPlaceholder ? { content } : {}),
    };

    onSubmit?.(data);

    setValues({});
    setContent('');
  };

  const formClass = `${FORM_BASE} ${className}`;

  const fieldsClass = layout === 'row' ? FORM_ROW : FORM_COLUMN;

  const showSubmit = showSubmitAlways || isValid;

  return (
    <form
      className={formClass}
      onSubmit={handleSubmit}
    >
      <div className={fieldsClass}>
        {fields.map((field) => (
          <Input
            key={field.name}
            type={field.type}
            placeholder={field.placeholder}
            variant="rounded"
            size="lg"
            className="flex-1"
            value={values[field.name] || ''}
            onChange={(e) => handleFieldChange(field.name, field.type, e.target.value)}
          />
        ))}
      </div>

      {textareaPlaceholder && (
        <Textarea
          placeholder={textareaPlaceholder}
          variant="rounded"
          size="lg"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      )}

      {footer}

      {showSubmit && (
        <Button
          type="submit"
          variant="primary"
          size="lg"
          className="w-full"
          disabled={!isValid}
        >
          {submitText}
        </Button>
      )}
    </form>
  );
}

export const Form = memo(FormComponent);
