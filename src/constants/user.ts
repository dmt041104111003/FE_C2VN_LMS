import {
  UserProfile,
  UserStats,
  UserCourse,
  UserCertificate,
  UserRole,
  LoginMethod,
  StatsKey,
} from '@/types/user';
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

export const MOCK_USER_PROFILE: UserProfile = {
  id: 'user-1',
  email: 'nguyenvana@example.com',
  fullName: 'Nguyễn Văn A',
  bio: 'Đam mê công nghệ blockchain và Web3. Đang học tập và nghiên cứu về Cardano ecosystem.',
  role: 'USER',
  loginMethod: 'GOOGLE',
  walletAddress: 'addr1qx2fxv2umyhttkxyxp8x0dlpdt3k6cwng5pxj3jhsydzer3jcu5d8ps7zex2k2xt3uqxgjqnnj83ws8lhrn648jjxtwq2ytjqp',
  status: 'ACTIVE',
  createdAt: '2024-06-15',
};

export const MOCK_USER_STATS: UserStats = {
  enrolledCourses: 8,
  completedCourses: 5,
  certificates: 5,
  totalLearningHours: 124,
};

export const MOCK_USER_COURSES: UserCourse[] = [
  {
    id: 'uc1',
    courseId: '1',
    courseTitle: 'Blockchain cơ bản cho người mới bắt đầu',
    courseThumbnail: '',
    instructorName: 'Nguyễn Văn AA',
    progress: 100,
    enrolledAt: '2024-07-01',
    completedAt: '2024-08-15',
    certificateId: 'cert1',
  },
  {
    id: 'uc2',
    courseId: '2',
    courseTitle: 'Smart Contract với Aiken',
    courseThumbnail: '',
    instructorName: 'Trần Thị BB',
    progress: 75,
    enrolledAt: '2024-08-20',
  },
  {
    id: 'uc3',
    courseId: '3',
    courseTitle: 'DeFi trên Cardano',
    courseThumbnail: '',
    instructorName: 'Lê Văn CC',
    progress: 100,
    enrolledAt: '2024-09-01',
    completedAt: '2024-10-20',
    certificateId: 'cert2',
  },
  {
    id: 'uc4',
    courseId: '4',
    courseTitle: 'NFT Marketplace Development',
    courseThumbnail: '',
    instructorName: 'Phạm Thị DD',
    progress: 45,
    enrolledAt: '2024-10-15',
  },
  {
    id: 'uc5',
    courseId: '5',
    courseTitle: 'Cardano Node Operation',
    courseThumbnail: '',
    instructorName: 'Hoàng Văn EE',
    progress: 100,
    completedAt: '2024-11-10',
    enrolledAt: '2024-09-25',
    certificateId: 'cert3',
  },
  {
    id: 'uc6',
    courseId: '6',
    courseTitle: 'Plutus Core Fundamentals',
    courseThumbnail: '',
    instructorName: 'Vũ Thị FF',
    progress: 20,
    enrolledAt: '2024-11-20',
  },
];

export const MOCK_USER_CERTIFICATES: UserCertificate[] = [
  {
    id: 'cert1',
    courseId: '1',
    courseTitle: 'Blockchain cơ bản cho người mới bắt đầu',
    issuedAt: '2024-08-15',
    transactionHash: '7f4e8d2a1b3c5f6e9a8b7c6d5e4f3a2b1c0d9e8f7a6b5c4d3e2f1a0b9c8d7e6f',
    policyId: 'policy123abc',
    assetName: 'BlockchainBasics001',
  },
  {
    id: 'cert2',
    courseId: '3',
    courseTitle: 'DeFi trên Cardano',
    issuedAt: '2024-10-20',
    transactionHash: '8e5f9d3b2c4a6e7f0a9b8c7d6e5f4a3b2c1d0e9f8a7b6c5d4e3f2a1b0c9d8e7f',
    policyId: 'policy456def',
    assetName: 'DeFiCardano002',
  },
  {
    id: 'cert3',
    courseId: '5',
    courseTitle: 'Cardano Node Operation',
    issuedAt: '2024-11-10',
    transactionHash: '9f6e0d4c3b5a7f8e1a0b9c8d7e6f5a4b3c2d1e0f9a8b7c6d5e4f3a2b1c0d9e8f',
    policyId: 'policy789ghi',
    assetName: 'NodeOps003',
  },
];
