'use client';

import { memo, useState, useCallback, useMemo, useRef } from 'react';
import { Input, Button } from '@/components/ui';
import { TipTapEditor } from '@/components/editor';
import { USER_LABELS } from '@/constants/user';
import { getAvatarFromName } from '@/utils';
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

const ActionButtons = memo(function ActionButtons({ onCancel, onSave }: ActionButtonsProps) {
  return (
    <div className={S.USER_EDIT.ACTIONS}>
      <Button variant="ghost" size="md" onClick={onCancel}>
        {USER_LABELS.cancel}
      </Button>
      <Button variant="primary" size="md" onClick={onSave}>
        {USER_LABELS.saveChanges}
      </Button>
    </div>
  );
});

function UserProfileEditComponent({ user, onSave, onCancel }: UserProfileEditProps) {
  const [fullName, setFullName] = useState(user.fullName);
  const [bio, setBio] = useState(user.bio || '');
  const [avatar, setAvatar] = useState(user.avatar);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const avatarSrc = useMemo(
    () => avatar || getAvatarFromName(fullName || user.fullName),
    [avatar, fullName, user.fullName]
  );

  const handleAvatarClick = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      setAvatar(event.target?.result as string);
    };
    reader.readAsDataURL(file);
  }, []);

  const handleSave = useCallback(() => {
    onSave?.({ fullName, bio, avatar });
  }, [fullName, bio, avatar, onSave]);

  const handleCancel = useCallback(() => onCancel?.(), [onCancel]);

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
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
            <Button variant="ghost" size="sm" onClick={handleAvatarClick}>
              {USER_LABELS.changeAvatar}
            </Button>
          </div>
        </FormSection>

        <FormSection label={USER_LABELS.fullNameLabel}>
          <Input
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder={USER_LABELS.fullNamePlaceholder}
            variant="minimal"
            size="lg"
          />
        </FormSection>

        <FormSection label={USER_LABELS.bioLabel}>
          <TipTapEditor
            content={bio}
            onChange={setBio}
            placeholder={USER_LABELS.bioPlaceholder}
            minHeight="150px"
          />
        </FormSection>

        <ActionButtons onCancel={handleCancel} onSave={handleSave} />
      </div>
    </div>
  );
}

export const UserProfileEdit = memo(UserProfileEditComponent);
