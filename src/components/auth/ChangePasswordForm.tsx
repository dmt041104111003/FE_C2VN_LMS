'use client';

import { memo, useState, useCallback } from 'react';
import { Button, PasswordInput } from '@/components/ui';
import { CHANGE_PASSWORD } from '@/constants/auth';
import {
  AUTH_FORM_TITLE,
  AUTH_FORM_SUBTITLE,
  AUTH_FORM_HEADER_LG,
  AUTH_FORM_FIELD,
  AUTH_FORM_LABEL,
} from './auth.styles';

function ChangePasswordFormComponent() {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
  }, []);

  return (
    <>
      <div className={AUTH_FORM_HEADER_LG}>
        <h1 className={AUTH_FORM_TITLE}>{CHANGE_PASSWORD.title}</h1>
        <p className={AUTH_FORM_SUBTITLE}>{CHANGE_PASSWORD.subtitle}</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className={AUTH_FORM_FIELD}>
          <label className={AUTH_FORM_LABEL}>Mật khẩu hiện tại</label>
          <PasswordInput
            placeholder={CHANGE_PASSWORD.currentPasswordPlaceholder}
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            variant="minimal"
            size="md"
            required
          />
        </div>
        <div className={AUTH_FORM_FIELD}>
          <label className={AUTH_FORM_LABEL}>Mật khẩu mới</label>
          <PasswordInput
            placeholder={CHANGE_PASSWORD.newPasswordPlaceholder}
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            variant="minimal"
            size="md"
            required
          />
        </div>
        <div className={AUTH_FORM_FIELD}>
          <label className={AUTH_FORM_LABEL}>Xác nhận mật khẩu</label>
          <PasswordInput
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
