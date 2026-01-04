export type { UserRole, LoginMethod, UserStatus } from './core.types';
import type { UserRole, LoginMethod, UserStatus } from './core.types';

export interface UserProfile {
  id: string;
  email: string;
  fullName: string;
  avatar?: string;
  walletAddress?: string;
  bio?: string;
  role: UserRole;
  loginMethod: LoginMethod;
  status: UserStatus;
  createdAt: string;
  updatedAt?: string;
}

export interface UserStats {
  enrolledCourses: number;
  completedCourses: number;
  certificates: number;
  totalLearningHours: number;
}

export interface UserCourse {
  id: string;
  courseId: string;
  courseTitle: string;
  courseThumbnail?: string;
  instructorName: string;
  progress: number;
  enrolledAt: string;
  completedAt?: string;
  certificateId?: string;
  enrollmentId?: number;
  walletAddress?: string;
}

export interface UserCertificate {
  id: string | number;
  courseId: string;
  courseTitle: string;
  issuedAt: string;
  txHash?: string;
  policyId?: string;
  assetName?: string;
  imgUrl?: string;
  qrUrl?: string;
  name?: string;
  enrollmentId?: number;
  walletAddress?: string;
}

export type CertificateResponse = UserCertificate;

export interface UserProfilePageProps {
  user: UserProfile;
  stats: UserStats;
  courses: UserCourse[];
  certificates: UserCertificate[];
  isOwnProfile?: boolean;
}

export type StatsKey = keyof UserStats;

export interface UserProfileEditData {
  fullName: string;
  bio: string;
}

export interface UserProfileEditProps {
  user: UserProfile;
  onSave?: (data: UserProfileEditData) => void;
  onCancel?: () => void;
  disabled?: boolean;
}