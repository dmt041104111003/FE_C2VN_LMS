'use client';

import { memo, useCallback, useEffect } from 'react';
import { Button } from './Button';
import { Badge } from './Badge';
import { Dialog } from './Dialog';
import { CloseIcon } from './icons';
import { FORM_MODAL } from './ui.styles';
import { useFormDraft } from '@/hooks';
import type { FormModalProps, FormFieldConfig } from './ui.types';

const ESCAPE_KEY = 'Escape';

function FormModalComponent<T extends Record<string, unknown>>({
  isOpen,
  labels,
  fields,
  storageKey,
  initialData,
  isEmpty,
  isValid,
  onClose,
  onSubmit,
}: FormModalProps<T>) {
  const {
    formData,
    setFormData,
    hasFormData,
    clearForm,
    showResumeDialog,
    handleContinueEditing,
    handleCreateNew,
    clearDraftStorage,
  } = useFormDraft({
    storageKey,
    initialData,
    isEmpty,
    enabled: isOpen,
  });

  useEffect(() => {
    if (!isOpen) return;

    const handleEscapeKey = (e: KeyboardEvent) => {
      if (e.key === ESCAPE_KEY && !showResumeDialog) onClose();
    };

    document.addEventListener('keydown', handleEscapeKey);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose, showResumeDialog]);

  const handleChange = useCallback((fieldName: string, value: string) => {
    setFormData(prev => ({ ...prev, [fieldName]: value }));
  }, [setFormData]);

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid(formData)) return;
    onSubmit(formData);
    clearDraftStorage();
    setFormData(initialData);
  }, [formData, isValid, onSubmit, clearDraftStorage, setFormData, initialData]);

  const handleOverlayClick = useCallback(() => {
    onClose();
  }, [onClose]);

  const handleContentClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
  }, []);

  const handleCancel = useCallback(() => {
    clearDraftStorage();
    setFormData(initialData);
    onClose();
  }, [clearDraftStorage, setFormData, initialData, onClose]);

  const handleClearForm = useCallback(() => {
    clearDraftStorage();
    clearForm();
  }, [clearDraftStorage, clearForm]);

  const renderField = useCallback((field: FormFieldConfig) => {
    const value = formData[field.name] as string || '';

    if (field.type === 'select' && field.options) {
      return (
        <select
          className={FORM_MODAL.SELECT}
          value={value}
          onChange={(e) => handleChange(field.name, e.target.value)}
        >
          {field.options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      );
    }

    if (field.type === 'textarea') {
      return (
        <textarea
          className={FORM_MODAL.TEXTAREA}
          placeholder={field.placeholder}
          value={value}
          onChange={(e) => handleChange(field.name, e.target.value)}
          rows={4}
        />
      );
    }

    return (
      <input
        type={field.type}
        className={FORM_MODAL.INPUT}
        placeholder={field.placeholder}
        value={value}
        onChange={(e) => handleChange(field.name, e.target.value)}
        autoFocus={field.autoFocus}
      />
    );
  }, [formData, handleChange]);

  if (!isOpen) return null;

  const valid = isValid(formData);

  return (
    <>
      <Dialog
        isOpen={showResumeDialog}
        title={labels.resumeDialog.title}
        message={labels.resumeDialog.message}
        primaryText={labels.resumeDialog.continueText}
        secondaryText={labels.resumeDialog.newText}
        onPrimary={handleContinueEditing}
        onSecondary={handleCreateNew}
      />

      <div className={FORM_MODAL.OVERLAY} onClick={handleOverlayClick}>
        <button className={FORM_MODAL.CLOSE} onClick={onClose}>
          <CloseIcon className={FORM_MODAL.CLOSE_ICON} />
        </button>

        <div className={FORM_MODAL.CONTAINER} onClick={handleContentClick}>
          <div className={FORM_MODAL.HEADER}>
            {labels.tag && (
              <Badge variant="accent" className={FORM_MODAL.TAG}>
                {labels.tag}
              </Badge>
            )}
            <h3 className={FORM_MODAL.TITLE}>{labels.title}</h3>
            {labels.subtitle && (
              <p className={FORM_MODAL.SUBTITLE}>{labels.subtitle}</p>
            )}
          </div>

          <form onSubmit={handleSubmit}>
            <div className={FORM_MODAL.BODY}>
              {fields.map((field) => (
                <div key={field.name} className={FORM_MODAL.FIELD}>
                  <label className={FORM_MODAL.LABEL}>{field.label}</label>
                  {renderField(field)}
                </div>
              ))}
            </div>

            <div className={FORM_MODAL.FOOTER}>
              {hasFormData && (
                <Button type="button" variant="ghost" onClick={handleClearForm} className="mr-auto text-[var(--incorrect)]">
                  {labels.clearForm}
                </Button>
              )}
              <Button type="button" variant="ghost" onClick={handleCancel}>
                {labels.cancel}
              </Button>
              <Button type="submit" variant="primary" disabled={!valid}>
                {labels.submit}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export const FormModal = memo(FormModalComponent) as <T extends Record<string, unknown>>(
  props: FormModalProps<T>
) => React.ReactElement | null;

