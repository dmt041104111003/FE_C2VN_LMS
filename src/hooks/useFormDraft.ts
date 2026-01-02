import { useState, useCallback, useEffect, useRef } from 'react';
import type { UseFormDraftOptions, UseFormDraftReturn } from '@/types/hooks';

export function useFormDraft<T>({
  storageKey,
  initialData,
  isEmpty,
  enabled = true,
}: UseFormDraftOptions<T>): UseFormDraftReturn<T> {
  const [formData, setFormData] = useState<T>(initialData);
  const [showResumeDialog, setShowResumeDialog] = useState(false);
  const [pendingDraft, setPendingDraft] = useState<T | null>(null);
  const prevStorageKey = useRef<string | null>(null);
  const prevEnabled = useRef<boolean | null>(null);
  const isInitialized = useRef(false);

  const loadDraft = useCallback((): T | null => {
    if (typeof window === 'undefined') return null;
    try {
      const stored = localStorage.getItem(storageKey);
      if (!stored) return null;
      return JSON.parse(stored);
    } catch {
      return null;
    }
  }, [storageKey]);

  const saveDraft = useCallback((data: T): void => {
    if (typeof window === 'undefined' || !enabled) return;
    if (isEmpty(data)) {
      localStorage.removeItem(storageKey);
      return;
    }
    localStorage.setItem(storageKey, JSON.stringify(data));
  }, [storageKey, isEmpty, enabled]);

  const clearDraftStorage = useCallback((): void => {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(storageKey);
  }, [storageKey]);

  useEffect(() => {
    const isFirstRun = prevStorageKey.current === null;
    const storageKeyChanged = prevStorageKey.current !== storageKey;
    const justEnabled = enabled && prevEnabled.current === false;

    prevStorageKey.current = storageKey;
    prevEnabled.current = enabled;

    if (!enabled) return;

    
    if (isFirstRun || storageKeyChanged || justEnabled) {
      isInitialized.current = true;
      const draft = loadDraft();
      if (draft && !isEmpty(draft)) {
        setPendingDraft(draft);
        setShowResumeDialog(true);
      } else {
        setFormData(initialData);
        setShowResumeDialog(false);
      }
    }
  }, [enabled, storageKey, loadDraft, isEmpty, initialData]);

  useEffect(() => {
    if (!showResumeDialog && enabled && isInitialized.current) {
      saveDraft(formData);
    }
  }, [formData, showResumeDialog, enabled, saveDraft]);

  const hasFormData = !isEmpty(formData);

  const clearForm = useCallback(() => {
    setFormData(initialData);
    clearDraftStorage();
  }, [initialData, clearDraftStorage]);

  const handleContinueEditing = useCallback(() => {
    if (pendingDraft) {
      setFormData(pendingDraft);
    }
    setPendingDraft(null);
    setShowResumeDialog(false);
  }, [pendingDraft]);

  const handleCreateNew = useCallback(() => {
    setFormData(initialData);
    clearDraftStorage();
    setPendingDraft(null);
    setShowResumeDialog(false);
  }, [initialData, clearDraftStorage]);

  const resetWithData = useCallback((data: T) => {
    setFormData(data);
    clearDraftStorage();
  }, [clearDraftStorage]);

  return {
    formData,
    setFormData,
    hasFormData,
    clearForm,
    showResumeDialog,
    handleContinueEditing,
    handleCreateNew,
    resetWithData,
    clearDraftStorage,
  };
}
