export const SECTION_LABELS = {
  introVideo: 'Video giới thiệu',
  objectives: 'Bạn sẽ học được gì',
  requirements: 'Yêu cầu',
  curriculum: 'Nội dung khóa học',
  instructor: 'Giảng viên',
  reviews: 'Đánh giá từ học viên',
  finalTests: 'Bài kiểm tra cuối khóa',
} as const;

export const ACTION_LABELS = {
  enroll: 'Đăng ký ngay',
  enrollFree: 'Đăng ký miễn phí',
  startLearning: 'Bắt đầu học',
  continueLearning: 'Tiếp tục học',
  preview: 'Xem trước',
  expandAll: 'Mở tất cả',
  collapseAll: 'Thu gọn',
} as const;

export const UNIT_LABELS = {
  lessons: 'bài học',
  lectures: 'bài giảng',
  hours: 'giờ',
  minutes: 'phút',
  students: 'học viên',
  total: 'Tổng cộng',
} as const;

export const STATUS_LABELS = {
  completed: 'Đã hoàn thành',
  inProgress: 'Đang học',
  notStarted: 'Chưa bắt đầu',
  locked: 'Đã khóa',
} as const;

export const SHOW_MORE_CONFIG = {
  instructorBio: {
    lineClamp: 2,
    showText: 'Xem thêm',
    hideText: 'Thu gọn',
  },
} as const;

export const DEFAULTS = {
  emptyArray: [] as const,
  emptyStats: { totalLectures: 0, totalDuration: 0 } as const,
} as const;

export const ENROLL_DIALOG = {
  title: 'Xác nhận đăng ký',
  freeMessage: 'Bạn muốn đăng ký khóa học này miễn phí?',
  confirmText: 'Đăng ký',
  cancelText: 'Hủy',
  noWallet: 'Không tìm thấy ví Cardano. Vui lòng cài đặt Nami, Eternl hoặc ví khác.',
  loginRequired: 'Vui lòng đăng nhập để đăng ký khóa học',
  processing: '',
  success: 'Đăng ký khóa học thành công!',
  paymentProcessing: '',
  walletConnectFailed: 'Không thể kết nối ví',
  walletAddressFailed: 'Không thể lấy địa chỉ ví',
  enrollFailed: 'Đăng ký thất bại',
  paymentFailed: 'Thanh toán thất bại',
} as const;

export const ENROLLMENT_CONFIG = {
  walletModalDelay: 100,
  cardanoPaymentMethodName: 'CARDANO_WALLET',
  pendingTxHash: 'pending',
  progressComplete: 100,
  progressNone: 0,
  percentDivisor: 100,
} as const;
