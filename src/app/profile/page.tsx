import { Header, Footer } from '@/components/ui';
import { UserProfile } from '@/components/user';
import {
  MOCK_USER_PROFILE,
  MOCK_USER_STATS,
  MOCK_USER_COURSES,
  MOCK_USER_CERTIFICATES,
} from '@/constants/user';
import { HEADER_SPACER } from '@/components/ui/ui.styles';

export default function ProfilePage() {
  return (
    <>
      <Header />
      <div className={HEADER_SPACER} />
      <main>
        <UserProfile
          user={MOCK_USER_PROFILE}
          stats={MOCK_USER_STATS}
          courses={MOCK_USER_COURSES}
          certificates={MOCK_USER_CERTIFICATES}
          isOwnProfile
        />
      </main>
      <Footer />
    </>
  );
}

