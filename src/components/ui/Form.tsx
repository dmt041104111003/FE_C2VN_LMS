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
} from './ui.styles';

function FormComponent({
  fields,
  textareaPlaceholder,
  submitText,
  minContentLength = 10,
  onSubmit,
  className = '',
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

    return validateByType(field.type, value);
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

  return (
    <form
      className={formClass}
      onSubmit={handleSubmit}
    >
      <div className={FORM_ROW}>
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

      {isValid && (
        <Button
          type="submit"
          variant="primary"
          size="lg"
          className="w-full"
        >
          {submitText}
        </Button>
      )}
    </form>
  );
}

export const Form = memo(FormComponent);

