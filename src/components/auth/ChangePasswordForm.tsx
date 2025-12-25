'use client';

import { memo, useState } from 'react';
import { Button, Input } from '@/components/ui';
import { CHANGE_PASSWORD } from '@/constants/auth';

function ChangePasswordFormComponent() {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <>
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-[var(--text)] mb-2">
          {CHANGE_PASSWORD.title}
        </h1>
        <p className="text-sm text-[var(--text)]/60">
          {CHANGE_PASSWORD.subtitle}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <Input
          type="password"
          placeholder={CHANGE_PASSWORD.currentPasswordPlaceholder}
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          required
        />
        <Input
          type="password"
          placeholder={CHANGE_PASSWORD.newPasswordPlaceholder}
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />
        <Input
          type="password"
          placeholder={CHANGE_PASSWORD.confirmPasswordPlaceholder}
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <Button type="submit" variant="primary" size="lg" className="w-full mt-2">
          {CHANGE_PASSWORD.submitText}
        </Button>
      </form>
    </>
  );
}

export const ChangePasswordForm = memo(ChangePasswordFormComponent);

