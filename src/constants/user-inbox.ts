import type { InboxMessage, InboxFilter } from '@/types/inbox';

export const USER_INBOX_LABELS = {
  back: 'Quay lại',
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
  from: 'từ',
  on: 'khóa học',
  time: {
    justNow: 'Vừa xong',
    minutesAgo: 'phút trước',
    hoursAgo: 'giờ trước',
    daysAgo: 'ngày trước',
  },
  toast: {
    replySuccess: 'Đã gửi câu hỏi thành công',
  },
};

export const USER_INBOX_REPLY_DRAFT_KEY = 'user_inbox_reply_draft';

export const USER_INBOX_REPLY_INITIAL_DATA = {
  content: '',
};

export const USER_INBOX_REPLY_LABELS = {
  title: 'Gửi câu hỏi',
  tag: 'Hòm thư',
  submit: 'Gửi',
  cancel: 'Hủy',
  clearForm: 'Xóa nội dung',
  resumeDialog: {
    title: 'Tiếp tục soạn?',
    message: 'Bạn có nội dung chưa gửi. Bạn muốn tiếp tục soạn hay bắt đầu mới?',
    continueText: 'Tiếp tục soạn',
    newText: 'Soạn mới',
  },
};

export const USER_INBOX_REPLY_FIELDS = [
  {
    name: 'content',
    label: 'Nội dung câu hỏi',
    type: 'textarea' as const,
    placeholder: 'Nhập câu hỏi của bạn...',
    required: true,
    autoFocus: true,
  },
];

export const USER_INBOX_FILTER_OPTIONS: { value: InboxFilter; label: string }[] = [
  { value: 'all', label: USER_INBOX_LABELS.filter.all },
  { value: 'unread', label: USER_INBOX_LABELS.filter.unread },
  { value: 'read', label: USER_INBOX_LABELS.filter.read },
];

export const USER_INBOX_ITEMS_PER_PAGE = 10;

export const USER_MESSAGE_TYPE_LABELS: Record<string, string> = {
  reply: 'Trả lời từ giảng viên',
  system: 'Hệ thống',
};

export const USER_MESSAGE_TYPE_COLORS: Record<string, 'info' | 'success' | 'warning'> = {
  reply: 'success',
  system: 'warning',
};

export const USER_INBOX_STYLES = {
  container: 'space-y-4 mt-6',
  list: 'space-y-3',
  item: {
    wrapper: 'p-4 rounded-lg border transition-colors cursor-pointer',
    unread: 'bg-[var(--accent)]/5 border-[var(--accent)]/20 hover:border-[var(--accent)]/40',
    read: 'bg-[var(--bg-alt)] border-[var(--border)] hover:border-[var(--text)]/20',
    header: 'flex items-start justify-between gap-4 mb-2',
    content: 'flex-1 min-w-0',
    sender: 'font-medium text-sm text-[var(--text)]',
    course: 'text-xs text-[var(--text)]/50 mt-0.5',
    message: 'text-sm text-[var(--text)]/70 mt-2',
    footer: 'flex items-center justify-between mt-3 pt-3 border-t border-[var(--border)]',
    time: 'text-xs text-[var(--text)]/40',
    badge: 'flex-shrink-0',
    actions: 'flex items-center gap-2',
  },
  empty: 'text-center py-12 text-[var(--text)]/50',
};

export const MOCK_USER_INBOX_MESSAGES: InboxMessage[] = [
  { id: '1', type: 'reply', courseId: 'course-1', courseName: 'Blockchain cơ bản', senderId: 'instructor-1', senderName: 'Nguyễn Văn AA', content: 'Chào bạn, phần Smart Contract bạn có thể xem lại video bài 3.2, mình đã giải thích chi tiết ở đó nhé!', timestamp: '2024-12-27T14:30:00', status: 'unread' },
  { id: '2', type: 'system', courseId: 'course-1', courseName: 'Blockchain cơ bản', senderId: 'system', senderName: 'Hệ thống', content: 'Chúc mừng bạn đã hoàn thành khóa học! Chứng chỉ NFT đang được xử lý.', timestamp: '2024-12-27T10:00:00', status: 'unread' },
  { id: '3', type: 'reply', courseId: 'course-2', courseName: 'Web3 Development', senderId: 'instructor-2', senderName: 'Trần Thị BB', content: 'Cảm ơn bạn đã góp ý! Mình sẽ bổ sung thêm bài tập trong tuần sau nhé.', timestamp: '2024-12-26T16:45:00', status: 'unread' },
  { id: '4', type: 'system', courseId: 'course-2', courseName: 'Web3 Development', senderId: 'system', senderName: 'Hệ thống', content: 'Khóa học có cập nhật mới: Bài 5 - Deploy lên Mainnet', timestamp: '2024-12-26T09:00:00', status: 'unread' },
  { id: '5', type: 'reply', courseId: 'course-1', courseName: 'Blockchain cơ bản', senderId: 'instructor-1', senderName: 'Nguyễn Văn AA', content: 'Bạn có thể dùng Remix IDE để test, rất tiện lợi cho người mới bắt đầu.', timestamp: '2024-12-25T11:20:00', status: 'unread' },
  { id: '6', type: 'system', courseId: 'course-1', courseName: 'Blockchain cơ bản', senderId: 'system', senderName: 'Hệ thống', content: 'Bạn đã đạt 80% tiến độ khóa học. Cố lên!', timestamp: '2024-12-25T08:00:00', status: 'read' },
  { id: '7', type: 'reply', courseId: 'course-3', courseName: 'Solidity nâng cao', senderId: 'instructor-3', senderName: 'Lê Văn CC', content: 'Proxy contract là pattern phức tạp, bạn nên đọc thêm về EIP-1967 nhé.', timestamp: '2024-12-24T10:30:00', status: 'read' },
  { id: '8', type: 'system', courseId: 'course-3', courseName: 'Solidity nâng cao', senderId: 'system', senderName: 'Hệ thống', content: 'Chào mừng bạn đến với khóa học Solidity nâng cao!', timestamp: '2024-12-24T08:00:00', status: 'read' },
  { id: '9', type: 'reply', courseId: 'course-1', courseName: 'Blockchain cơ bản', senderId: 'instructor-1', senderName: 'Nguyễn Văn AA', content: 'Về câu hỏi gas fee, bạn có thể tham khảo thêm tài liệu ở phần resource của bài 4 nhé.', timestamp: '2024-12-23T15:00:00', status: 'read' },
  { id: '10', type: 'reply', courseId: 'course-2', courseName: 'Web3 Development', senderId: 'instructor-2', senderName: 'Trần Thị BB', content: 'Ethers.js và Web3.js đều tốt, nhưng mình recommend Ethers.js vì documentation tốt hơn.', timestamp: '2024-12-23T11:00:00', status: 'read' },
  { id: '11', type: 'system', courseId: 'course-1', courseName: 'Blockchain cơ bản', senderId: 'system', senderName: 'Hệ thống', content: 'Bạn đã đạt 50% tiến độ khóa học!', timestamp: '2024-12-22T14:00:00', status: 'read' },
  { id: '12', type: 'reply', courseId: 'course-3', courseName: 'Solidity nâng cao', senderId: 'instructor-3', senderName: 'Lê Văn CC', content: 'Để optimize gas, bạn nên xem xét việc pack storage variables nhé.', timestamp: '2024-12-22T10:00:00', status: 'read' },
  { id: '13', type: 'reply', courseId: 'course-1', courseName: 'Blockchain cơ bản', senderId: 'instructor-1', senderName: 'Nguyễn Văn AA', content: 'Testnet faucet bạn có thể dùng link này: https://faucet.sepolia.dev', timestamp: '2024-12-21T16:30:00', status: 'read' },
  { id: '14', type: 'system', courseId: 'course-2', courseName: 'Web3 Development', senderId: 'system', senderName: 'Hệ thống', content: 'Khóa học có bài mới: Kết nối với TheGraph', timestamp: '2024-12-21T09:00:00', status: 'read' },
  { id: '15', type: 'reply', courseId: 'course-2', courseName: 'Web3 Development', senderId: 'instructor-2', senderName: 'Trần Thị BB', content: 'Metamask extension bạn nên cài từ Chrome Web Store chính thức nhé, tránh scam.', timestamp: '2024-12-20T14:00:00', status: 'read' },
  { id: '16', type: 'reply', courseId: 'course-3', courseName: 'Solidity nâng cao', senderId: 'instructor-3', senderName: 'Lê Văn CC', content: 'Về upgradeable contracts, bạn nên dùng OpenZeppelin Upgrades plugin.', timestamp: '2024-12-20T11:00:00', status: 'read' },
  { id: '17', type: 'system', courseId: 'course-3', courseName: 'Solidity nâng cao', senderId: 'system', senderName: 'Hệ thống', content: 'Bạn đã hoàn thành quiz chương 2 với 90% điểm!', timestamp: '2024-12-19T15:00:00', status: 'read' },
  { id: '18', type: 'reply', courseId: 'course-1', courseName: 'Blockchain cơ bản', senderId: 'instructor-1', senderName: 'Nguyễn Văn AA', content: 'Private key nhớ giữ kỹ, không share với ai nhé bạn!', timestamp: '2024-12-19T10:00:00', status: 'read' },
  { id: '19', type: 'reply', courseId: 'course-2', courseName: 'Web3 Development', senderId: 'instructor-2', senderName: 'Trần Thị BB', content: 'IPFS là giải pháp tốt cho việc lưu trữ metadata NFT.', timestamp: '2024-12-18T16:00:00', status: 'read' },
  { id: '20', type: 'system', courseId: 'course-1', courseName: 'Blockchain cơ bản', senderId: 'system', senderName: 'Hệ thống', content: 'Chào mừng bạn đến với khóa học Blockchain cơ bản!', timestamp: '2024-12-18T08:00:00', status: 'read' },
  { id: '21', type: 'reply', courseId: 'course-3', courseName: 'Solidity nâng cao', senderId: 'instructor-3', senderName: 'Lê Văn CC', content: 'Assembly trong Solidity rất powerful nhưng cần cẩn thận khi sử dụng.', timestamp: '2024-12-17T14:00:00', status: 'read' },
  { id: '22', type: 'reply', courseId: 'course-1', courseName: 'Blockchain cơ bản', senderId: 'instructor-1', senderName: 'Nguyễn Văn AA', content: 'Consensus mechanism của Ethereum đã chuyển sang PoS từ The Merge.', timestamp: '2024-12-17T10:00:00', status: 'read' },
  { id: '23', type: 'system', courseId: 'course-2', courseName: 'Web3 Development', senderId: 'system', senderName: 'Hệ thống', content: 'Nhắc nhở: Bạn chưa hoàn thành bài tập tuần này', timestamp: '2024-12-16T09:00:00', status: 'read' },
  { id: '24', type: 'reply', courseId: 'course-2', courseName: 'Web3 Development', senderId: 'instructor-2', senderName: 'Trần Thị BB', content: 'React + Wagmi là combo tuyệt vời cho Web3 frontend development.', timestamp: '2024-12-15T15:00:00', status: 'read' },
  { id: '25', type: 'reply', courseId: 'course-3', courseName: 'Solidity nâng cao', senderId: 'instructor-3', senderName: 'Lê Văn CC', content: 'Slither là tool tốt để audit smart contract, bạn nên học cách sử dụng.', timestamp: '2024-12-15T11:00:00', status: 'read' },
];

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

  if (diffMins < 1) return USER_INBOX_LABELS.time.justNow;
  if (diffMins < MINUTES_PER_HOUR) return `${diffMins} ${USER_INBOX_LABELS.time.minutesAgo}`;
  if (diffHours < HOURS_PER_DAY) return `${diffHours} ${USER_INBOX_LABELS.time.hoursAgo}`;
  return `${diffDays} ${USER_INBOX_LABELS.time.daysAgo}`;
};

const getContentTrimmed = (data: Record<string, unknown>): string =>
  ((data.content as string) || '').trim();

export const isReplyEmpty = (data: Record<string, unknown>): boolean =>
  !getContentTrimmed(data);

export const isReplyValid = (data: Record<string, unknown>): boolean =>
  Boolean(getContentTrimmed(data));

