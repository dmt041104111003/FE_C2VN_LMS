'use client';

import { useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Header, Footer } from '@/components/ui';
import { UserProfileEdit } from '@/components/user';
import { AuthGuard } from '@/components/auth';
import { ROUTES, mapAuthUserToProfile } from '@/constants';
import { HEADER_SPACER } from '@/components/ui/ui.styles';
import { useAuth } from '@/contexts';
import type { UserProfileEditData } from '@/types/user';

function ProfileEditContent() {
  const router = useRouter();
  const { user } = useAuth();

  const navigateToProfile = useCallback(() => router.push(ROUTES.PROFILE), [router]);

  const handleSave = useCallback((data: UserProfileEditData) => {
    console.log('Save profile:', data);
    navigateToProfile();
  }, [navigateToProfile]);

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
