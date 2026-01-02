'use client';

import { memo, useState, useCallback } from 'react';
import { Button, PasswordInput } from '@/components/ui';
import { useToast } from '@/components/ui/Toast';
import { CHANGE_PASSWORD } from '@/constants/login';
import { useAuth } from '@/contexts';
import { ApiException } from '@/services/api';
import {
  AUTH_FORM_TITLE,
  AUTH_FORM_SUBTITLE,
  AUTH_FORM_HEADER_LG,
  AUTH_FORM_FIELD,
  AUTH_FORM_LABEL,
  AUTH_ERROR_MSG,
  AUTH_SUCCESS_MSG,
} from './auth.styles';

function ChangePasswordFormComponent() {
  const { changePassword, isLoading } = useAuth();
  const toast = useToast();
  
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    if (!currentPassword || !newPassword || !confirmPassword) {
      setError('Vui lòng điền đầy đủ thông tin');
      return;
    }

    if (newPassword.length < 6) {
      setError('Mật khẩu mới phải có ít nhất 6 ký tự');
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('Mật khẩu xác nhận không khớp');
      return;
    }

    if (currentPassword === newPassword) {
      setError('Mật khẩu mới phải khác mật khẩu hiện tại');
      return;
    }

    try {
      await changePassword(currentPassword, newPassword);
      setSuccess(true);
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      toast.success('Đổi mật khẩu thành công!');
    } catch (err) {
      if (err instanceof ApiException) {
        setError(err.message);
      } else {
        setError('Đổi mật khẩu thất bại. Vui lòng thử lại.');
      }
    }
  }, [currentPassword, newPassword, confirmPassword, changePassword, toast]);

  return (
    <>
      <div className={AUTH_FORM_HEADER_LG}>
        <h1 className={AUTH_FORM_TITLE}>{CHANGE_PASSWORD.title}</h1>
        <p className={AUTH_FORM_SUBTITLE}>{CHANGE_PASSWORD.subtitle}</p>
      </div>

      {error && <p className={AUTH_ERROR_MSG}>{error}</p>}
      {success && <p className={AUTH_SUCCESS_MSG}>Đổi mật khẩu thành công!</p>}

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
            disabled={isLoading}
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
            disabled={isLoading}
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
            disabled={isLoading}
          />
        </div>
        <Button 
          type="submit" 
          variant="primary" 
          size="lg" 
          className="w-full mt-8"
          disabled={isLoading}
        >
          {CHANGE_PASSWORD.submitText}
        </Button>
      </form>
    </>
  );
}

export const ChangePasswordForm = memo(ChangePasswordFormComponent);
