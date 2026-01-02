export type UserRole = 'USER' | 'INSTRUCTOR' | 'ADMIN';
export type LoginMethod = 'EMAIL_PASSWORD' | 'WALLET' | 'GOOGLE' | 'GITHUB';
export type UserStatus = 'ACTIVE' | 'INACTIVE' | 'BANNED';

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
}

export interface UserCertificate {
  id: string;
  courseId: string;
  courseTitle: string;
  issuedAt: string;
  transactionHash?: string;
  policyId?: string;
  assetName?: string;
  imageUrl?: string;
  qrCodeUrl?: string;
}

export interface UserProfilePageProps {
  user: UserProfile;
  stats: UserStats;
  courses: UserCourse[];
  certificates: UserCertificate[];
  isOwnProfile?: boolean;
}

export interface UserCourseItemProps {
  course: UserCourse;
}

export interface UserCertificateItemProps {
  certificate: UserCertificate;
}

export interface LoginMethodInfo {
  icon: React.FC<{ className?: string }>;
  text: string;
}

export type StatsKey = keyof UserStats;

export interface CourseImageProps {
  thumbnail?: string;
  title: string;
}

export interface UserProgressBarProps {
  progress: number;
}

export interface StatsSectionProps {
  stats: UserStats;
}

export interface ListSectionProps<T> {
  title: string;
  items: T[];
  emptyText: string;
  initialCount: number;
  incrementCount: number;
  renderItem: (item: T) => React.ReactNode;
  getKey: (item: T) => string;
}

export interface UserProfileEditProps {
  user: UserProfile;
  onSave?: (data: UserProfileEditData) => void;
  onCancel?: () => void;
  disabled?: boolean;
}

export interface UserProfileEditData {
  fullName: string;
  bio: string;
}

export interface FormSectionProps {
  label: string;
  children: React.ReactNode;
}

export interface ActionButtonsProps {
  onCancel: () => void;
  onSave: () => void;
}
