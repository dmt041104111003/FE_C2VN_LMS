import type { User } from '@/types/auth';
import type { UserRole, LoginMethod, StatsKey, UserProfile, UserStats } from '@/types/user';
import {
  GoogleIcon,
  GitHubIcon,
  WalletIcon,
  MailIcon,
} from '@/components/ui/icons';

export const USER_LABELS = {
  profileTitle: 'Hồ sơ cá nhân',
  editProfile: 'Chỉnh sửa',
  editProfileTitle: 'Chỉnh sửa hồ sơ',
  editProfileSubtitle: 'Cập nhật thông tin cá nhân của bạn',
  fullNameLabel: 'Họ và tên',
  fullNamePlaceholder: 'Nhập họ và tên',
  bioLabel: 'Giới thiệu bản thân',
  bioPlaceholder: 'Viết vài dòng giới thiệu về bản thân...',
  avatarLabel: 'Ảnh đại diện',
  changeAvatar: 'Đổi ảnh',
  saveChanges: 'Lưu thay đổi',
  cancel: 'Hủy',
  statsTitle: 'Thống kê học tập',
  coursesTitle: 'Khóa học đã đăng ký',
  certificatesTitle: 'Chứng chỉ NFT',
  inbox: 'Hòm thư',
  enrolledCourses: 'Khóa học',
  completedCourses: 'Hoàn thành',
  certificates: 'Chứng chỉ',
  totalLearningHours: 'Giờ học',
  progress: 'Tiến độ',
  viewCourse: 'Tiếp tục học',
  viewCertificate: 'Xem chứng chỉ',
  completedText: 'Đã hoàn thành',
  enrolledAt: 'Đăng ký',
  issuedAt: 'Cấp ngày',
  noCourses: 'Chưa đăng ký khóa học nào',
  noCertificates: 'Chưa có chứng chỉ nào',
  memberSince: 'Thành viên từ',
  walletConnected: 'Ví đã kết nối',
  showMore: 'Xem thêm',
  showLess: 'Thu gọn',
} as const;

export const ROLE_LABELS: Record<UserRole, string> = {
  USER: 'Học viên',
  INSTRUCTOR: 'Giảng viên',
  ADMIN: 'Quản trị viên',
} as const;

export const LOGIN_METHOD_ICONS: Record<LoginMethod, React.FC<{ className?: string }>> = {
  WALLET: WalletIcon,
  GOOGLE: GoogleIcon,
  GITHUB: GitHubIcon,
  EMAIL_PASSWORD: MailIcon,
} as const;

export const LOGIN_METHOD_LABELS: Record<LoginMethod, string> = {
  WALLET: 'Ví Cardano',
  GOOGLE: 'Google',
  GITHUB: 'GitHub',
  EMAIL_PASSWORD: 'Email',
} as const;

export const STATS_ITEMS: { key: StatsKey; label: string }[] = [
  { key: 'enrolledCourses', label: USER_LABELS.enrolledCourses },
  { key: 'completedCourses', label: USER_LABELS.completedCourses },
  { key: 'certificates', label: USER_LABELS.certificates },
  { key: 'totalLearningHours', label: USER_LABELS.totalLearningHours },
] as const;

export const USER_CONFIG = {
  INITIAL_COURSES_COUNT: 2,
  INCREMENT_COURSES_COUNT: 10,
  INITIAL_CERTIFICATES_COUNT: 2,
  INCREMENT_CERTIFICATES_COUNT: 10,
  WALLET_SLICE_START: 8,
  WALLET_SLICE_END: 6,
  PROGRESS_COMPLETE: 100,
  DEFAULT_COURSE_IMAGE: '/loading.png',
  DEFAULT_CERTIFICATE_IMAGE: '/background.png',
} as const;

export const truncateWalletAddress = (address: string): string => {
  const { WALLET_SLICE_START, WALLET_SLICE_END } = USER_CONFIG;
  return `${address.slice(0, WALLET_SLICE_START)}...${address.slice(-WALLET_SLICE_END)}`;
};

export const DEFAULT_USER_STATS: UserStats = {
  enrolledCourses: 0,
  completedCourses: 0,
  certificates: 0,
  totalLearningHours: 0,
};

export const mapAuthUserToProfile = (user: User): UserProfile => ({
  id: user.id,
  email: user.email || '',
  fullName: user.fullName || '',
  bio: '',
  role: (user.role as UserRole) || 'USER',
  loginMethod: (user.loginMethod as LoginMethod) || 'EMAIL_PASSWORD',
  walletAddress: user.walletAddress,
  avatar: user.imageUrl,
  status: 'ACTIVE',
  createdAt: user.createdAt || '',
});

