'use client';

import { useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Header, Footer } from '@/components/ui';
import { UserProfileEdit } from '@/components/user';
import { MOCK_USER_PROFILE } from '@/constants/user';
import { ROUTES } from '@/constants/navigation';
import { HEADER_SPACER } from '@/components/ui/ui.styles';
import type { UserProfileEditData } from '@/types/user';

export default function ProfileEditPage() {
  const router = useRouter();

  const navigateToProfile = useCallback(() => router.push(ROUTES.PROFILE), [router]);

  const handleSave = useCallback((data: UserProfileEditData) => {
    console.log('Save profile:', data);
    navigateToProfile();
  }, [navigateToProfile]);

  return (
    <>
      <Header />
      <div className={HEADER_SPACER} />
      <main>
        <UserProfileEdit
          user={MOCK_USER_PROFILE}
          onSave={handleSave}
          onCancel={navigateToProfile}
        />
      </main>
      <Footer />
    </>
  );
}
