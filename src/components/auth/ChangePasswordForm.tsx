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
      <div className="mb-12">
        <h1 className="text-2xl sm:text-3xl font-light text-[var(--text)] mb-3 tracking-wide">
          {CHANGE_PASSWORD.title}
        </h1>
        <p className="text-sm text-[var(--text)]/50">
          {CHANGE_PASSWORD.subtitle}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-1">
          <label className="text-xs text-[var(--text)]/40 uppercase tracking-wider">Mật khẩu hiện tại</label>
          <Input
            type="password"
            placeholder={CHANGE_PASSWORD.currentPasswordPlaceholder}
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            variant="minimal"
            size="md"
            required
          />
        </div>
        <div className="space-y-1">
          <label className="text-xs text-[var(--text)]/40 uppercase tracking-wider">Mật khẩu mới</label>
          <Input
            type="password"
            placeholder={CHANGE_PASSWORD.newPasswordPlaceholder}
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            variant="minimal"
            size="md"
            required
          />
        </div>
        <div className="space-y-1">
          <label className="text-xs text-[var(--text)]/40 uppercase tracking-wider">Xác nhận mật khẩu</label>
          <Input
            type="password"
            placeholder={CHANGE_PASSWORD.confirmPasswordPlaceholder}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            variant="minimal"
            size="md"
            required
          />
        </div>
        <Button type="submit" variant="primary" size="lg" className="w-full mt-8">
          {CHANGE_PASSWORD.submitText}
        </Button>
      </form>
    </>
  );
}

export const ChangePasswordForm = memo(ChangePasswordFormComponent);

