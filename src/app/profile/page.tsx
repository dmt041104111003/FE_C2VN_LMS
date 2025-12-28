'use client';

import { Header, Footer } from '@/components/ui';
import { UserProfile } from '@/components/user';
import { AuthGuard } from '@/components/auth';
import { HEADER_SPACER } from '@/components/ui/ui.styles';
import { useAuth } from '@/contexts';
import { mapAuthUserToProfile, DEFAULT_USER_STATS } from '@/constants';

function ProfileContent() {
  const { user } = useAuth();

  if (!user) {
    return null;
  }

  return (
    <>
      <Header />
      <div className={HEADER_SPACER} />
      <main>
        <UserProfile
          user={mapAuthUserToProfile(user)}
          stats={DEFAULT_USER_STATS}
          courses={[]}
          certificates={[]}
          isOwnProfile
        />
      </main>
      <Footer />
    </>
  );
}

export default function ProfilePage() {
  return (
    <AuthGuard>
      <ProfileContent />
    </AuthGuard>
  );
}
