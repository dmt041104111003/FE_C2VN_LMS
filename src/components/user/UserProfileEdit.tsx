'use client';

import { memo, useState, useCallback, useMemo } from 'react';
import { Input, Button } from '@/components/ui';
import { TipTapEditor } from '@/components/editor';
import { USER_LABELS } from '@/constants/user';
import { getUserAvatar } from '@/utils';
import type { UserProfileEditProps, FormSectionProps, ActionButtonsProps } from '@/types/user';
import * as S from './user.styles';

const FormSection = memo(function FormSection({ label, children }: FormSectionProps) {
  return (
    <div className={S.USER_EDIT.SECTION}>
      <label className={S.USER_EDIT.LABEL}>{label}</label>
      {children}
    </div>
  );
});

interface ActionButtonsPropsWithDisabled extends ActionButtonsProps {
  disabled?: boolean;
}

const ActionButtons = memo(function ActionButtons({ onCancel, onSave, disabled }: ActionButtonsPropsWithDisabled) {
  return (
    <div className={S.USER_EDIT.ACTIONS}>
      <Button variant="ghost" size="md" onClick={onCancel} disabled={disabled}>
        {USER_LABELS.cancel}
      </Button>
      <Button variant="primary" size="md" onClick={onSave} disabled={disabled}>
        {USER_LABELS.saveChanges}
      </Button>
    </div>
  );
});

function UserProfileEditComponent({ user, onSave, onCancel, disabled }: UserProfileEditProps) {
  const [fullName, setFullName] = useState(user?.fullName || '');
  const [bio, setBio] = useState(user?.bio || '');

  const avatarSrc = useMemo(
    () => getUserAvatar({
      walletAddress: user?.walletAddress,
      fullName: fullName || user?.fullName,
      email: user?.email,
    }),
    [user?.walletAddress, fullName, user?.fullName, user?.email]
  );

  const handleSave = useCallback(() => {
    if (disabled) return;
    onSave?.({ fullName, bio });
  }, [fullName, bio, onSave, disabled]);

  const handleCancel = useCallback(() => {
    if (disabled) return;
    onCancel?.();
  }, [onCancel, disabled]);

  return (
    <div className={S.USER_EDIT.CONTAINER}>
      <header className={S.USER_EDIT.HEADER}>
        <h1 className={S.USER_EDIT.TITLE}>{USER_LABELS.editProfileTitle}</h1>
        <p className={S.USER_EDIT.SUBTITLE}>{USER_LABELS.editProfileSubtitle}</p>
      </header>

      <div className={S.USER_EDIT.FORM}>
        <FormSection label={USER_LABELS.avatarLabel}>
          <div className={S.USER_EDIT.AVATAR_SECTION}>
            <img src={avatarSrc} alt="" className={S.USER_EDIT.AVATAR} />
          </div>
        </FormSection>

        <FormSection label={USER_LABELS.fullNameLabel}>
          <Input
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder={USER_LABELS.fullNamePlaceholder}
            variant="minimal"
            size="lg"
            disabled={disabled}
          />
        </FormSection>

        <FormSection label={USER_LABELS.bioLabel}>
          <TipTapEditor
            content={bio}
            onChange={setBio}
            placeholder={USER_LABELS.bioPlaceholder}
            minHeight="150px"
            disabled={disabled}
          />
        </FormSection>

        <ActionButtons onCancel={handleCancel} onSave={handleSave} disabled={disabled} />
      </div>
    </div>
  );
}

export const UserProfileEdit = memo(UserProfileEditComponent);
