'use client';

import { useState, memo, useEffect } from 'react';
import { Input, Button, useToast } from '@/components/ui';
import { VERIFY_LABELS, VERIFY_FORM } from '@/constants/verify';
import type { VerifyFormProps } from './verify.types';

function VerifyFormComponent({ onVerify, initialWallet = '', initialCourse = '' }: VerifyFormProps) {
  const [walletAddress, setWalletAddress] = useState(initialWallet);
  const [courseTitle, setCourseTitle] = useState(initialCourse);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const toast = useToast();

  useEffect(() => {
    if (initialWallet) setWalletAddress(initialWallet);
  }, [initialWallet]);

  useEffect(() => {
    if (initialCourse) setCourseTitle(initialCourse);
  }, [initialCourse]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;
    if (!walletAddress.trim() || !courseTitle.trim()) {
      toast.error(VERIFY_LABELS.required);
      return;
    }
    setIsSubmitting(true);
    await onVerify(walletAddress.trim(), courseTitle.trim());
    setIsSubmitting(false);
  };

  return (
    <form onSubmit={handleSubmit} className={VERIFY_FORM.WRAPPER}>
      <div>
        <label className={VERIFY_FORM.LABEL}>{VERIFY_LABELS.walletAddress}</label>
        <Input
          value={walletAddress}
          onChange={e => setWalletAddress(e.target.value)}
          placeholder={VERIFY_LABELS.walletPlaceholder}
          variant="minimal"
          size="md"
        />
      </div>
      <div>
        <label className={VERIFY_FORM.LABEL}>{VERIFY_LABELS.courseTitle}</label>
        <Input
          value={courseTitle}
          onChange={e => setCourseTitle(e.target.value)}
          placeholder={VERIFY_LABELS.coursePlaceholder}
          variant="minimal"
          size="md"
        />
      </div>
      <Button type="submit" variant="primary" size="md" className="w-full" disabled={isSubmitting}>
        {VERIFY_LABELS.verify}
      </Button>
    </form>
  );
}

export const VerifyForm = memo(VerifyFormComponent);
