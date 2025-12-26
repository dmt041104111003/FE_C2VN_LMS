export type MessageType = 'comment' | 'reply' | 'system';
export type MessageStatus = 'unread' | 'read';
export type InboxFilter = 'all' | 'unread' | 'read';

export interface InboxMessage {
  id: string;
  type: MessageType;
  courseId: string;
  courseName: string;
  senderId: string;
  senderName: string;
  senderAvatar?: string;
  content: string;
  timestamp: string;
  status: MessageStatus;
  parentId?: string;
}

export interface InboxPageProps {
  userId?: string;
}

export interface MessageItemStyles {
  wrapper: string;
  unread: string;
  read: string;
  header: string;
  content: string;
  sender: string;
  course: string;
  message: string;
  footer: string;
  time: string;
  badge: string;
  actions: string;
}

export interface MessageItemLabels {
  on: string;
  markAsRead: string;
  reply: string;
}

export interface MessageItemProps {
  message: InboxMessage;
  styles: MessageItemStyles;
  labels: MessageItemLabels;
  typeLabels: Record<string, string>;
  typeColors: Record<string, 'info' | 'success' | 'warning'>;
  formatTime: (timestamp: string) => string;
  replyableType: string;
  onRead: (id: string) => void;
  onReply: (message: InboxMessage) => void;
}

export interface MessageListProps {
  messages: InboxMessage[];
  onRead: (id: string) => void;
  onReply: (message: InboxMessage) => void;
}

export interface ReplyModalProps {
  isOpen: boolean;
  message: InboxMessage | null;
  onClose: () => void;
  onSubmit: (content: string) => void;
}

export interface LoadingSpinnerProps {
  isLoading: boolean;
}

export interface FilterSectionProps {
  filter: InboxFilter;
  onFilterChange: (filter: InboxFilter) => void;
}

export interface InboxMessageListProps {
  messages: InboxMessage[];
  hasMore: boolean;
  isLoading: boolean;
  loaderRef: React.RefObject<HTMLDivElement>;
  onRead: (id: string) => void;
  onReply: (message: InboxMessage) => void;
}

