import type { InboxFilter } from '@/types/inbox';

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

