import type { InboxMessage, MessageType, InboxFilter } from '@/types/inbox';

export const INBOX_LABELS = {
  title: 'Hòm thư',
  empty: 'Không có tin nhắn nào',
  markAsRead: 'Đánh dấu đã đọc',
  reply: 'Trả lời',

  filter: {
    label: 'Trạng thái',
    all: 'Tất cả',
    unread: 'Chưa đọc',
    read: 'Đã đọc',
  },
  toast: {
    replySuccess: 'Đã gửi trả lời thành công',
    markReadSuccess: 'Đã đánh dấu đã đọc',
  },
  from: 'từ',
  on: 'trên khóa học',
  time: {
    justNow: 'Vừa xong',
    minutesAgo: 'phút trước',
    hoursAgo: 'giờ trước',
    daysAgo: 'ngày trước',
  },
};

export const REPLY_DRAFT_KEY = 'inbox_reply_draft';

export const REPLY_INITIAL_DATA = {
  content: '',
};

export const REPLY_LABELS = {
  title: 'Trả lời tin nhắn',
  tag: 'Hòm thư',
  submit: 'Gửi trả lời',
  cancel: 'Hủy',
  clearForm: 'Xóa nội dung',
  resumeDialog: {
    title: 'Tiếp tục soạn?',
    message: 'Bạn có nội dung trả lời chưa gửi. Bạn muốn tiếp tục soạn hay bắt đầu mới?',
    continueText: 'Tiếp tục soạn',
    newText: 'Soạn mới',
  },
};

export const REPLY_FIELDS = [
  {
    name: 'content',
    label: 'Nội dung trả lời',
    type: 'textarea' as const,
    placeholder: 'Nhập nội dung trả lời...',
    required: true,
    autoFocus: true,
  },
];

export const MESSAGE_TYPE_LABELS: Record<MessageType, string> = {
  comment: 'Bình luận mới',
  reply: 'Trả lời',
  system: 'Hệ thống',
};

export const MESSAGE_TYPE_COLORS: Record<MessageType, 'info' | 'success' | 'warning'> = {
  comment: 'info',
  reply: 'success',
  system: 'warning',
};

export const INBOX_FILTER_OPTIONS: { value: InboxFilter; label: string }[] = [
  { value: 'all', label: INBOX_LABELS.filter.all },
  { value: 'unread', label: INBOX_LABELS.filter.unread },
  { value: 'read', label: INBOX_LABELS.filter.read },
];

export const INBOX_ITEMS_PER_PAGE = 10;

export const MOCK_INBOX_MESSAGES: InboxMessage[] = [
  {
    id: '1',
    type: 'comment',
    courseId: 'course-1',
    courseName: 'Blockchain cơ bản',
    senderId: 'user-1',
    senderName: 'Nguyễn Văn A',
    content: 'Thầy ơi, bài 3 phần Smart Contract em chưa hiểu lắm, thầy có thể giải thích thêm được không ạ?',
    timestamp: '2024-12-27T10:30:00',
    status: 'unread',
  },
  {
    id: '2',
    type: 'comment',
    courseId: 'course-1',
    courseName: 'Blockchain cơ bản',
    senderId: 'user-2',
    senderName: 'Trần Thị B',
    content: 'Em muốn hỏi về phần deploy contract lên testnet ạ',
    timestamp: '2024-12-27T09:15:00',
    status: 'unread',
  },
  {
    id: '3',
    type: 'comment',
    courseId: 'course-2',
    courseName: 'Web3 Development',
    senderId: 'user-3',
    senderName: 'Lê Văn C',
    content: 'Khóa học rất hay ạ, cảm ơn thầy!',
    timestamp: '2024-12-26T15:00:00',
    status: 'read',
  },
  {
    id: '4',
    type: 'comment',
    courseId: 'course-1',
    courseName: 'Blockchain cơ bản',
    senderId: 'user-4',
    senderName: 'Phạm Thị D',
    content: 'Thầy có thể cho thêm bài tập thực hành không ạ?',
    timestamp: '2024-12-26T11:20:00',
    status: 'read',
  },
  {
    id: '5',
    type: 'system',
    courseId: 'course-1',
    courseName: 'Blockchain cơ bản',
    senderId: 'system',
    senderName: 'Hệ thống',
    content: 'Có 5 học viên mới đăng ký khóa học của bạn',
    timestamp: '2024-12-25T08:00:00',
    status: 'read',
  },
  {
    id: '6',
    type: 'comment',
    courseId: 'course-2',
    courseName: 'Web3 Development',
    senderId: 'user-5',
    senderName: 'Hoàng Minh E',
    content: 'Thầy ơi, phần kết nối Metamask em làm theo nhưng bị lỗi ạ',
    timestamp: '2024-12-25T14:30:00',
    status: 'unread',
  },
  {
    id: '7',
    type: 'comment',
    courseId: 'course-1',
    courseName: 'Blockchain cơ bản',
    senderId: 'user-6',
    senderName: 'Vũ Thị F',
    content: 'Em cảm ơn thầy đã giải đáp thắc mắc ạ!',
    timestamp: '2024-12-25T10:00:00',
    status: 'read',
  },
  {
    id: '8',
    type: 'system',
    courseId: 'course-2',
    courseName: 'Web3 Development',
    senderId: 'system',
    senderName: 'Hệ thống',
    content: 'Có 3 học viên hoàn thành khóa học và chờ cấp chứng chỉ',
    timestamp: '2024-12-24T16:00:00',
    status: 'unread',
  },
  {
    id: '9',
    type: 'comment',
    courseId: 'course-3',
    courseName: 'Solidity nâng cao',
    senderId: 'user-7',
    senderName: 'Đặng Văn G',
    content: 'Thầy có thể giải thích thêm về gas optimization không ạ?',
    timestamp: '2024-12-24T11:45:00',
    status: 'read',
  },
  {
    id: '10',
    type: 'comment',
    courseId: 'course-1',
    courseName: 'Blockchain cơ bản',
    senderId: 'user-8',
    senderName: 'Bùi Thị H',
    content: 'Bài giảng rất dễ hiểu ạ, cảm ơn thầy!',
    timestamp: '2024-12-24T09:20:00',
    status: 'read',
  },
  {
    id: '11',
    type: 'comment',
    courseId: 'course-2',
    courseName: 'Web3 Development',
    senderId: 'user-9',
    senderName: 'Ngô Văn I',
    content: 'Em muốn hỏi về cách test smart contract với Hardhat ạ',
    timestamp: '2024-12-23T15:30:00',
    status: 'unread',
  },
  {
    id: '12',
    type: 'system',
    courseId: 'course-3',
    courseName: 'Solidity nâng cao',
    senderId: 'system',
    senderName: 'Hệ thống',
    content: 'Khóa học đã có 100 lượt đăng ký mới trong tuần',
    timestamp: '2024-12-23T08:00:00',
    status: 'read',
  },
  {
    id: '13',
    type: 'comment',
    courseId: 'course-1',
    courseName: 'Blockchain cơ bản',
    senderId: 'user-10',
    senderName: 'Đinh Thị K',
    content: 'Thầy có thể upload thêm tài liệu PDF không ạ?',
    timestamp: '2024-12-22T14:00:00',
    status: 'read',
  },
  {
    id: '14',
    type: 'comment',
    courseId: 'course-2',
    courseName: 'Web3 Development',
    senderId: 'user-11',
    senderName: 'Lý Văn L',
    content: 'Phần NFT marketplace em làm xong rồi ạ, cảm ơn thầy!',
    timestamp: '2024-12-22T11:30:00',
    status: 'read',
  },
  {
    id: '15',
    type: 'comment',
    courseId: 'course-3',
    courseName: 'Solidity nâng cao',
    senderId: 'user-12',
    senderName: 'Trịnh Thị M',
    content: 'Em bị stuck ở bài proxy contract ạ',
    timestamp: '2024-12-21T16:45:00',
    status: 'unread',
  },
  {
    id: '16',
    type: 'system',
    courseId: 'course-1',
    courseName: 'Blockchain cơ bản',
    senderId: 'system',
    senderName: 'Hệ thống',
    content: 'Doanh thu tháng 12 đạt 50 triệu đồng',
    timestamp: '2024-12-21T08:00:00',
    status: 'read',
  },
  {
    id: '17',
    type: 'comment',
    courseId: 'course-1',
    courseName: 'Blockchain cơ bản',
    senderId: 'user-13',
    senderName: 'Cao Văn N',
    content: 'Thầy ơi video bài 5 bị lỗi không xem được ạ',
    timestamp: '2024-12-20T13:20:00',
    status: 'read',
  },
  {
    id: '18',
    type: 'comment',
    courseId: 'course-2',
    courseName: 'Web3 Development',
    senderId: 'user-14',
    senderName: 'Đỗ Thị O',
    content: 'Em muốn hỏi về cách integrate với TheGraph ạ',
    timestamp: '2024-12-20T10:00:00',
    status: 'read',
  },
  {
    id: '19',
    type: 'comment',
    courseId: 'course-3',
    courseName: 'Solidity nâng cao',
    senderId: 'user-15',
    senderName: 'Hồ Văn P',
    content: 'Bài về assembly rất hay ạ!',
    timestamp: '2024-12-19T15:00:00',
    status: 'read',
  },
  {
    id: '20',
    type: 'system',
    courseId: 'course-2',
    courseName: 'Web3 Development',
    senderId: 'system',
    senderName: 'Hệ thống',
    content: 'Có 2 review mới 5 sao cho khóa học',
    timestamp: '2024-12-19T09:00:00',
    status: 'read',
  },
  {
    id: '21',
    type: 'comment',
    courseId: 'course-1',
    courseName: 'Blockchain cơ bản',
    senderId: 'user-16',
    senderName: 'Lưu Thị Q',
    content: 'Thầy có plan làm khóa học về DeFi không ạ?',
    timestamp: '2024-12-18T14:30:00',
    status: 'read',
  },
  {
    id: '22',
    type: 'comment',
    courseId: 'course-2',
    courseName: 'Web3 Development',
    senderId: 'user-17',
    senderName: 'Mai Văn R',
    content: 'Em đã deploy được contract lên mainnet rồi ạ!',
    timestamp: '2024-12-18T11:00:00',
    status: 'read',
  },
  {
    id: '23',
    type: 'comment',
    courseId: 'course-3',
    courseName: 'Solidity nâng cao',
    senderId: 'user-18',
    senderName: 'Tô Thị S',
    content: 'Phần upgradeable contract khó quá ạ',
    timestamp: '2024-12-17T16:00:00',
    status: 'read',
  },
  {
    id: '24',
    type: 'system',
    courseId: 'course-3',
    courseName: 'Solidity nâng cao',
    senderId: 'system',
    senderName: 'Hệ thống',
    content: 'Khóa học vừa được featured trên trang chủ',
    timestamp: '2024-12-17T08:00:00',
    status: 'read',
  },
  {
    id: '25',
    type: 'comment',
    courseId: 'course-1',
    courseName: 'Blockchain cơ bản',
    senderId: 'user-19',
    senderName: 'Dương Văn T',
    content: 'Cảm ơn thầy đã tạo khóa học tuyệt vời!',
    timestamp: '2024-12-16T13:00:00',
    status: 'read',
  },
];

export const INBOX_STYLES = {
  container: 'space-y-4',
  filterRow: 'mb-6',
  list: 'space-y-3',
  item: {
    wrapper: 'p-4 rounded-lg border transition-colors cursor-pointer',
    unread: 'bg-[var(--accent)]/5 border-[var(--accent)]/20 hover:border-[var(--accent)]/40',
    read: 'bg-[var(--bg-alt)] border-[var(--border)] hover:border-[var(--text)]/20',
    header: 'flex items-start justify-between gap-4 mb-2',
    badge: 'flex-shrink-0',
    content: 'flex-1 min-w-0',
    sender: 'font-medium text-sm text-[var(--text)]',
    course: 'text-xs text-[var(--text)]/50 mt-0.5',
    message: 'text-sm text-[var(--text)]/70 mt-2 line-clamp-2',
    footer: 'flex items-center justify-between mt-3 pt-3 border-t border-[var(--border)]',
    time: 'text-xs text-[var(--text)]/40',
    actions: 'flex items-center gap-2',
  },
  empty: 'text-center py-12 text-[var(--text)]/50',
};

const MS_PER_MINUTE = 60_000;
const MS_PER_HOUR = 3_600_000;
const MS_PER_DAY = 86_400_000;
const MINUTES_PER_HOUR = 60;
const HOURS_PER_DAY = 24;

export const formatTimeAgo = (timestamp: string): string => {
  const diffMs = Date.now() - new Date(timestamp).getTime();
  const diffMins = Math.floor(diffMs / MS_PER_MINUTE);
  const diffHours = Math.floor(diffMs / MS_PER_HOUR);
  const diffDays = Math.floor(diffMs / MS_PER_DAY);

  if (diffMins < 1) return INBOX_LABELS.time.justNow;
  if (diffMins < MINUTES_PER_HOUR) return `${diffMins} ${INBOX_LABELS.time.minutesAgo}`;
  if (diffHours < HOURS_PER_DAY) return `${diffHours} ${INBOX_LABELS.time.hoursAgo}`;
  return `${diffDays} ${INBOX_LABELS.time.daysAgo}`;
};

const getContentTrimmed = (data: Record<string, unknown>): string =>
  ((data.content as string) || '').trim();

export const isReplyEmpty = (data: Record<string, unknown>): boolean =>
  !getContentTrimmed(data);

export const isReplyValid = (data: Record<string, unknown>): boolean =>
  Boolean(getContentTrimmed(data));

