'use client';

import { useState, useEffect, useMemo } from 'react';
import { Header, Footer } from '@/components/ui';
import { UserProfile } from '@/components/user';
import { AuthGuard } from '@/components/auth';
import { HEADER_SPACER } from '@/components/ui/ui.styles';
import { useAuth } from '@/contexts';
import { mapAuthUserToProfile } from '@/constants';
import { getMyEnrollments, MyEnrollmentResponse } from '@/services/course';
import { api } from '@/services/api';
import type { UserCourse, UserStats, UserCertificate } from '@/types/user';

interface CertificateResponse {
  id: number;
  courseId: string;
  courseTitle: string;
  issuedAt: string;
}

function mapEnrollmentToUserCourse(e: MyEnrollmentResponse): UserCourse {
  return {
    id: e.courseSlug || e.courseId,
    courseId: e.courseId,
    courseTitle: e.courseTitle,
    courseThumbnail: e.courseImage,
    instructorName: e.instructorName || '',
    progress: Math.min(e.progressPercent || 0, 100),
    enrolledAt: e.enrolledAt,
  };
}

function ProfileContent() {
  const { user } = useAuth();
  const [courses, setCourses] = useState<UserCourse[]>([]);
  const [certificates, setCertificates] = useState<UserCertificate[]>([]);
  const [totalHours, setTotalHours] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [enrollments, certs] = await Promise.all([
          getMyEnrollments(),
          api.get<CertificateResponse[]>('/api/certificates/me').catch(() => []),
        ]);
        
        setCourses(enrollments.map(mapEnrollmentToUserCourse));
        setCertificates((certs || []).map(c => ({
          id: String(c.id),
          courseId: c.courseId,
          courseTitle: c.courseTitle,
          issuedAt: c.issuedAt,
        })));
        
        
        const totalCompletedLectures = enrollments.reduce((sum, e) => sum + (e.completedLectures || 0), 0);
        setTotalHours(totalCompletedLectures);
      } catch {
        setCourses([]);
        setCertificates([]);
      }
    };
    fetchData();
  }, []);

  const stats: UserStats = useMemo(() => ({
    enrolledCourses: courses.length,
    completedCourses: courses.filter(c => c.progress >= 100).length,
    certificates: certificates.length,
    totalLearningHours: totalHours,
  }), [courses, certificates, totalHours]);

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
          stats={stats}
          courses={courses}
          certificates={certificates}
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
