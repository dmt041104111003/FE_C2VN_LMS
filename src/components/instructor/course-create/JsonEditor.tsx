'use client';

import { useCallback, useState } from 'react';
import { Button, Textarea, useToast } from '@/components/ui';
import { JSON_TEMPLATE, COURSE_IMPORT_LABELS as LABELS } from '@/constants/course-import';
import { normalizeFormData } from '@/utils/course-form';
import type { JsonEditorProps } from '@/types/course-create';

export function JsonEditor({ value, onChange, onParsed, disabled }: JsonEditorProps) {
  const toast = useToast();
  const [error, setError] = useState<string | null>(null);

  const handleParse = useCallback(() => {
    setError(null);
    try {
      const parsed = JSON.parse(value);
      if (!parsed || typeof parsed !== 'object') {
        setError(LABELS.toast.parseError);
        return;
      }
      const normalized = normalizeFormData(parsed);
      onParsed(normalized);
      toast.success(LABELS.toast.parseSuccess);
    } catch {
      setError(LABELS.toast.parseError);
      toast.error(LABELS.toast.parseError);
    }
  }, [value, onParsed, toast]);

  const handleCopyTemplate = useCallback(async () => {
    const template = JSON.stringify(JSON_TEMPLATE, null, 2);
    await navigator.clipboard.writeText(template);
    onChange(template);
    toast.success(LABELS.toast.copySuccess);
  }, [onChange, toast]);

  const handleClear = useCallback(() => {
    onChange('');
    setError(null);
  }, [onChange]);

  return (
    <div className="space-y-4">
      <Textarea
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={LABELS.jsonTab.placeholder}
        rows={20}
        className="font-mono text-sm"
        disabled={disabled}
      />
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <div className="flex gap-2 flex-wrap">
        <Button onClick={handleParse} variant="primary" disabled={disabled || !value.trim()}>
          {LABELS.jsonTab.parseButton}
        </Button>
        <Button onClick={handleCopyTemplate} variant="secondary" disabled={disabled}>
          {LABELS.jsonTab.copyTemplate}
        </Button>
        <Button onClick={handleClear} variant="ghost" disabled={disabled || !value}>
          {LABELS.jsonTab.clearButton}
        </Button>
      </div>
    </div>
  );
}
