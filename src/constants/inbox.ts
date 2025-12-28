import type { MessageType, InboxFilter } from '@/types/inbox';

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

