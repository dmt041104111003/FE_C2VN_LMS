'use client';

import { useCallback, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Header, Footer } from '@/components/ui';
import { UserProfileEdit } from '@/components/user';
import { AuthGuard } from '@/components/auth';
import { ROUTES, mapAuthUserToProfile } from '@/constants';
import { HEADER_SPACER } from '@/components/ui/ui.styles';
import { useAuth } from '@/contexts';
import { updateProfile } from '@/services/user';
import type { UserProfileEditData } from '@/types/user';

function ProfileEditContent() {
  const router = useRouter();
  const { user, refreshUser } = useAuth();
  const [isSaving, setIsSaving] = useState(false);

  const navigateToProfile = useCallback(() => router.push(ROUTES.PROFILE), [router]);

  const handleSave = useCallback(async (data: UserProfileEditData) => {
    if (isSaving) return;
    
    setIsSaving(true);
    try {
      await updateProfile({
        fullName: data.fullName,
        bio: data.bio,
      });
      await refreshUser?.();
      navigateToProfile();
    } catch {
      alert('Không thể cập nhật hồ sơ. Vui lòng thử lại.');
    } finally {
      setIsSaving(false);
    }
  }, [isSaving, navigateToProfile, refreshUser]);

  if (!user) {
    return null;
  }

  return (
    <>
      <Header />
      <div className={HEADER_SPACER} />
      <main>
        <UserProfileEdit
          user={mapAuthUserToProfile(user)}
          onSave={handleSave}
          onCancel={navigateToProfile}
        />
      </main>
      <Footer />
    </>
  );
}

export default function ProfileEditPage() {
  return (
    <AuthGuard>
      <ProfileEditContent />
    </AuthGuard>
  );
}
