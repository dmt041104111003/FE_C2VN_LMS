'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ChevronLeftIcon, StatusBadge, Dialog, useToast, TrashIcon, Loading } from '@/components/ui';
import { PAGE, ICON_SM } from '@/components/ui/ui.styles';
import { ROUTES } from '@/constants/navigation';
import { useInfiniteScroll, useAuth } from '@/hooks';
import { api } from '@/services/api';
import { getUserAvatar } from '@/utils';
import { 
  getAllContactMessages, 
  markContactMessageAsRead, 
  deleteContactMessage,
  type ContactMessage,
} from '@/services/contact';

const LABELS = {
  title: 'Hòm thư',
  back: 'Quay lại',
  empty: 'Chưa có tin nhắn nào',
  view: 'Xem',
  on: 'tại',
  lecture: 'Bài giảng',
  delete: 'Xóa',
  deleteTitle: 'Xóa tin nhắn',
  deleteMsg: 'Bạn có chắc chắn muốn xóa tin nhắn này?',
  deleteSuccess: 'Đã xóa tin nhắn',
  deleteError: 'Không thể xóa tin nhắn',
  messages: 'tin nhắn',
  repliedToYourComment: 'đã phản hồi bình luận của bạn',
  repliedToYourReview: 'đã phản hồi đánh giá của bạn',
  commentedOnLecture: 'đã bình luận trong bài giảng',
  reviewedCourse: 'đã đánh giá khóa học',
  and: 'và',
  others: 'người khác',
  you: 'Bạn',
  youCommented: 'đã bình luận',
  youReplied: 'đã phản hồi',
  youReviewed: 'đã đánh giá',
  certificateIssued: 'Bạn đã được cấp chứng chỉ',
  viewCertificate: 'Xem chứng chỉ',
};


const TYPE_CONFIG = {
  REVIEW: { label: 'Đánh giá', variant: 'success' as const },
  REVIEW_REPLY: { label: 'Phản hồi đánh giá', variant: 'info' as const },
  QNA: { label: 'Hỏi đáp', variant: 'warning' as const },
  QNA_REPLY: { label: 'Phản hồi hỏi đáp', variant: 'default' as const },
  CONTACT: { label: 'Liên hệ', variant: 'info' as const },
  CERTIFICATE: { label: 'Chứng chỉ', variant: 'success' as const },
} as const;


const UNREAD_BG = 'bg-[#FFF8F6] dark:bg-[#2D2424]';
const UNREAD_BORDER = 'border-[#FFEBE6] dark:border-[#3D2E2E]';

const STYLES = {
  container: 'space-y-4',
  list: 'space-y-3',
  item: {
    wrapper: 'p-4 rounded-xl border border-[var(--border)] bg-[var(--card)] hover:border-[var(--accent)]/30 transition-colors',
    wrapperUnread: `p-4 rounded-xl border ${UNREAD_BORDER} ${UNREAD_BG} hover:border-[#FFD4CC] dark:hover:border-[#4D3E3E] transition-colors`,
    header: 'flex items-start justify-between gap-3 mb-2',
    content: 'flex-1 min-w-0',
    title: 'font-medium text-[var(--text)] truncate',
    course: 'text-sm text-[var(--text)]/60',
    lecture: 'text-xs text-[var(--text)]/40 mt-0.5',
    badge: 'shrink-0',
    user: 'flex items-center gap-2 mb-2',
    avatar: 'w-8 h-8 rounded-full object-cover',
    userName: 'text-sm font-medium text-[var(--text)]',
    ownBadge: 'text-xs px-1.5 py-0.5 rounded bg-[var(--accent)]/10 text-[var(--accent)]',
    message: 'text-sm text-[var(--text)]/80 line-clamp-2 mb-3',
    footer: 'flex items-center justify-between',
    time: 'text-xs text-[var(--text)]/50',
    actions: 'flex items-center gap-2',
  },
  
  contact: {
    wrapper: 'rounded-xl border border-[var(--border)] bg-[var(--card)] overflow-hidden',
    header: 'p-4 flex items-center justify-between gap-3 border-b border-[var(--border)]',
    user: 'flex items-center gap-3',
    avatar: 'w-10 h-10 rounded-full object-cover',
    info: 'flex-1 min-w-0',
    email: 'font-medium text-[var(--text)] truncate',
    count: 'text-xs text-[var(--text)]/50',
    messageList: 'divide-y divide-[var(--border)]',
    messageItem: 'p-4 hover:bg-[var(--bg-alt)] transition-colors cursor-pointer',
    messageItemUnread: `${UNREAD_BG} hover:bg-[#FFEFEB] dark:hover:bg-[#3D2E2E]`,
    messageContent: 'text-sm text-[var(--text)]/80 mb-2',
    messageFooter: 'flex items-center justify-between',
    messageTime: 'text-xs text-[var(--text)]/50',
  },
};

interface InboxItem {
  id: number;
  type: 'REVIEW' | 'REVIEW_REPLY' | 'QNA' | 'QNA_REPLY' | 'CONTACT' | 'CERTIFICATE';
  content: string;
  rate: number | null;
  createdAt: string;
  courseId: string | null;
  courseTitle: string | null;
  courseSlug: string | null;
  lectureId: number | null;
  lectureTitle: string | null;
  parentId: number | null;
  userId: string | null;
  userName: string | null;
  userEmail: string | null;
  userWalletAddress: string | null;
  own: boolean;  
  read: boolean;
  certificateId?: number;
  imgUrl?: string;
}


interface GroupedNotification {
  groupKey: string;
  type: 'REVIEW_REPLY' | 'QNA_REPLY' | 'QNA' | 'REVIEW' | 'CONTACT' | 'CERTIFICATE';
  items: InboxItem[];
  users: { name: string; email: string | null; wallet: string | null }[];
  latestAt: string;
  courseTitle: string | null;
  courseSlug: string | null;
  lectureTitle: string | null;
  lectureId: number | null;
  parentId: number | null;
  hasUnread: boolean;
  isOwn: boolean;
  certificateId?: number;
  imgUrl?: string;
}

interface ContactGroup {
  email: string;
  messages: ContactMessage[];
  unreadCount: number;
  latestAt: string;
}

const ITEMS_PER_PAGE = 10;

function formatTimeAgo(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return 'Vừa xong';
  if (diffMins < 60) return `${diffMins} phút trước`;
  if (diffHours < 24) return `${diffHours} giờ trước`;
  if (diffDays < 7) return `${diffDays} ngày trước`;
  return date.toLocaleDateString('vi-VN');
}


function groupNotifications(items: InboxItem[]): GroupedNotification[] {
  const groupMap = new Map<string, GroupedNotification>();
  
  for (const item of items) {
    let groupKey: string;
    
    if (item.type === 'CERTIFICATE') {
      groupKey = `CERTIFICATE-${item.id}`;
    } else if (item.own) {
      groupKey = `OWN-${item.type}-${item.id}`;
    } else if (item.type === 'QNA_REPLY' || item.type === 'REVIEW_REPLY') {
      groupKey = `${item.type}-${item.parentId}`;
    } else if (item.type === 'QNA') {
      groupKey = `QNA-lecture-${item.lectureId}`;
    } else if (item.type === 'REVIEW') {
      groupKey = `REVIEW-course-${item.courseId}`;
    } else {
      groupKey = `CONTACT-${item.id}`;
    }
    
    const existing = groupMap.get(groupKey);
    if (existing && !item.own && item.type !== 'CERTIFICATE') {
      existing.items.push(item);
      
      if (!existing.users.find(u => u.name === item.userName)) {
        existing.users.push({
          name: item.userName || item.userEmail || 'Người dùng',
          email: item.userEmail,
          wallet: item.userWalletAddress,
        });
      }
      
      if (new Date(item.createdAt) > new Date(existing.latestAt)) {
        existing.latestAt = item.createdAt;
      }
      
      if (!item.read) {
        existing.hasUnread = true;
      }
    } else {
      groupMap.set(groupKey, {
        groupKey,
        type: item.type,
        items: [item],
        users: [{
          name: item.userName || item.userEmail || 'Người dùng',
          email: item.userEmail,
          wallet: item.userWalletAddress,
        }],
        latestAt: item.createdAt,
        courseTitle: item.courseTitle,
        courseSlug: item.courseSlug,
        lectureTitle: item.lectureTitle,
        lectureId: item.lectureId,
        parentId: item.parentId,
        hasUnread: !item.read,
        isOwn: item.own,
        certificateId: item.certificateId,
        imgUrl: item.imgUrl,
      });
    }
  }
  
  return Array.from(groupMap.values())
    .sort((a, b) => new Date(b.latestAt).getTime() - new Date(a.latestAt).getTime());
}

export function UserInboxPage() {
  const router = useRouter();
  const toast = useToast();
  const { user } = useAuth();
  const [items, setItems] = useState<InboxItem[]>([]);
  const [contactGroups, setContactGroups] = useState<ContactGroup[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null);
  
  const isInstructor = user?.role === 'INSTRUCTOR';
  const isAdmin = user?.role === 'ADMIN';

  useEffect(() => {
    const fetchInbox = async () => {
      try {
        if (isAdmin) {
          const contacts = await getAllContactMessages();
          
          const groupMap = new Map<string, ContactMessage[]>();
          for (const c of contacts) {
            const existing = groupMap.get(c.email) || [];
            existing.push(c);
            groupMap.set(c.email, existing);
          }
          
          const groups: ContactGroup[] = Array.from(groupMap.entries()).map(([email, messages]) => ({
            email,
            messages: messages.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()),
            unreadCount: messages.filter(m => !m.isRead).length,
            latestAt: messages[0]?.createdAt || '',
          }));
          
          groups.sort((a, b) => new Date(b.latestAt).getTime() - new Date(a.latestAt).getTime());
          setContactGroups(groups);
        } else {
          const inboxResult = await api.get<InboxItem[]>('/api/feedbacks/inbox');
          setItems(inboxResult || []);
        }
      } catch {
        setItems([]);
        setContactGroups([]);
      } finally {
        setLoading(false);
      }
    };
    fetchInbox();
  }, [isAdmin]);
  
  
  const groupedNotifications = useMemo(() => groupNotifications(items), [items]);

  const {
    visibleCount,
    hasMore,
    loaderRef,
  } = useInfiniteScroll({
    itemsPerPage: ITEMS_PER_PAGE,
    totalItems: isAdmin ? contactGroups.length : groupedNotifications.length,
  });

  const visibleNotifications = useMemo(
    () => groupedNotifications.slice(0, visibleCount),
    [groupedNotifications, visibleCount]
  );

  const visibleGroups = useMemo(
    () => contactGroups.slice(0, visibleCount),
    [contactGroups, visibleCount]
  );

  const handleViewGroup = async (group: GroupedNotification) => {
    if (group.type === 'CERTIFICATE') {
      if (group.certificateId && group.hasUnread) {
        try {
          await api.post(`/api/feedbacks/inbox/read?itemType=CERTIFICATE&itemId=${group.certificateId}`);
          setItems(prev => prev.map(i => 
            i.type === 'CERTIFICATE' && i.certificateId === group.certificateId 
              ? { ...i, read: true } 
              : i
          ));
        } catch {}
      }
      router.push(`${ROUTES.PROFILE}#certificate-${group.certificateId}`);
      return;
    }
    
    if (!group.courseSlug) return;
    
    if (group.hasUnread) {
      const itemType = group.type === 'QNA' || group.type === 'QNA_REPLY' ? 'LECTURE_COMMENT' : 'FEEDBACK';
      try {
        await Promise.all(
          group.items
            .filter(i => !i.read)
            .map(i => api.post(`/api/feedbacks/inbox/read?itemType=${itemType}&itemId=${i.id}`))
        );
        
        setItems(prev => prev.map(i => 
          group.items.some(gi => gi.id === i.id) ? { ...i, read: true } : i
        ));
      } catch {}
    }
    
    const isQna = group.type === 'QNA' || group.type === 'QNA_REPLY';
    const firstItem = group.items[0];
    const hash = isQna ? `#comment-${firstItem.id}` : `#review-${firstItem.id}`;
    
    if (isInstructor && isQna) {
      router.push(`/instructor/courses/${group.courseSlug}?tab=qna${hash}`);
    } else if (isQna && group.courseSlug && group.lectureId) {
      router.push(`/courses/${group.courseSlug}/learn?lessonId=${group.lectureId}${hash}`);
    } else {
      router.push(`/courses/${group.courseSlug}${hash}`);
    }
  };

  const handleMarkAsRead = async (id: number) => {
    try {
      await markContactMessageAsRead(id);
      
      setContactGroups(prev => prev.map(g => ({
        ...g,
        messages: g.messages.map(m => m.id === id ? { ...m, isRead: true } : m),
        unreadCount: g.messages.filter(m => m.id !== id && !m.isRead).length,
      })));
    } catch {
      
    }
  };

  const handleDeleteGroup = (email: string) => {
    setDeleteTarget(email);
  };

  const handleConfirmDelete = async () => {
    if (!deleteTarget) return;
    try {
      
      const group = contactGroups.find(g => g.email === deleteTarget);
      if (group) {
        
        await Promise.all(group.messages.map(m => deleteContactMessage(m.id)));
      }
      
      setContactGroups(prev => prev.filter(g => g.email !== deleteTarget));
      toast.success(LABELS.deleteSuccess);
    } catch {
      toast.error(LABELS.deleteError);
    } finally {
      setDeleteTarget(null);
    }
  };

  const isEmpty = isAdmin ? contactGroups.length === 0 : groupedNotifications.length === 0;

  return (
    <div className={PAGE.CONTAINER}>
      <div className="flex items-center justify-between mb-6">
        <Link
          href={ROUTES.PROFILE}
          className="flex items-center gap-1.5 text-sm text-[var(--text)]/60 hover:text-[var(--accent)] transition-colors"
        >
          <ChevronLeftIcon className={ICON_SM} />
          {LABELS.back}
        </Link>
        <h1 className="text-xl font-semibold text-[var(--text)]">{LABELS.title}</h1>
        <div className="w-20" />
      </div>

      <div className={STYLES.container}>
        {loading ? (
          <div className="py-16">
            <Loading size="lg" text="Đang tải tin nhắn..." />
          </div>
        ) : isEmpty ? (
          <div className="text-center py-8 text-[var(--text)]/50">{LABELS.empty}</div>
        ) : isAdmin ? (
          
          <>
            <div className={STYLES.list}>
              {visibleGroups.map(group => (
                <ContactGroupCard 
                  key={group.email} 
                  group={group}
                  onMarkAsRead={handleMarkAsRead}
                  onDeleteGroup={handleDeleteGroup}
                />
              ))}
            </div>
            {hasMore && <div ref={loaderRef} className="h-4" />}
          </>
        ) : (
          
          <>
            <div className={STYLES.list}>
              {visibleNotifications.map(group => (
                <GroupedNotificationCard 
                  key={group.groupKey} 
                  group={group}
                  onView={handleViewGroup}
                />
              ))}
            </div>
            {hasMore && <div ref={loaderRef} className="h-4" />}
          </>
        )}
      </div>

      {}
      <Dialog
        isOpen={deleteTarget !== null}
        title={LABELS.deleteTitle}
        message={LABELS.deleteMsg}
        danger
        onPrimary={handleConfirmDelete}
        onSecondary={() => setDeleteTarget(null)}
      />
    </div>
  );
}


interface ContactGroupCardProps {
  group: ContactGroup;
  onMarkAsRead: (id: number) => void;
  onDeleteGroup: (email: string) => void;
}

function ContactGroupCard({ group, onMarkAsRead, onDeleteGroup }: ContactGroupCardProps) {
  const S = STYLES.contact;
  const avatarSrc = getUserAvatar({ email: group.email });

  return (
    <div className={S.wrapper}>
      <div className={S.header}>
        <div className={S.user}>
          <img src={avatarSrc} alt={group.email} className={S.avatar} />
          <div className={S.info}>
            <p className={S.email}>{group.email}</p>
            <p className={S.count}>
              {group.messages.length} {LABELS.messages}
              {group.unreadCount > 0 && ` · ${group.unreadCount} chưa đọc`}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <StatusBadge variant="info">Liên hệ</StatusBadge>
          <button 
            type="button"
            className="p-2 text-[var(--text)]/30 hover:text-red-500 transition-colors"
            onClick={() => onDeleteGroup(group.email)}
          >
            <TrashIcon className="w-4 h-4" />
          </button>
        </div>
      </div>
      <div className={S.messageList}>
        {group.messages.map(msg => (
          <div 
            key={msg.id} 
            className={`${S.messageItem} ${!msg.isRead ? S.messageItemUnread : ''}`}
            onClick={() => !msg.isRead && onMarkAsRead(msg.id)}
          >
            <p className={S.messageContent}>{msg.content}</p>
            <div className={S.messageFooter}>
              <span className={S.messageTime}>{formatTimeAgo(msg.createdAt)}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}


interface GroupedNotificationCardProps {
  group: GroupedNotification;
  onView: (group: GroupedNotification) => void;
}

function GroupedNotificationCard({ group, onView }: GroupedNotificationCardProps) {
  const S = STYLES.item;
  const config = TYPE_CONFIG[group.type] || TYPE_CONFIG.REVIEW;
  
  const buildUserNamesText = () => {
    if (group.type === 'CERTIFICATE') return '';
    if (group.isOwn) return LABELS.you;
    const names = group.users.map(u => u.name);
    if (names.length === 1) return names[0];
    if (names.length === 2) return `${names[0]} ${LABELS.and} ${names[1]}`;
    if (names.length <= 3) return `${names.slice(0, -1).join(', ')} ${LABELS.and} ${names[names.length - 1]}`;
    return `${names[0]}, ${names[1]} ${LABELS.and} ${names.length - 2} ${LABELS.others}`;
  };
  
  const buildActionText = () => {
    if (group.type === 'CERTIFICATE') {
      return LABELS.certificateIssued;
    }
    
    if (group.isOwn) {
      switch (group.type) {
        case 'QNA_REPLY':
        case 'REVIEW_REPLY':
          return LABELS.youReplied;
        case 'QNA':
          return LABELS.youCommented;
        case 'REVIEW':
          return LABELS.youReviewed;
        default:
          return '';
      }
    }
    
    switch (group.type) {
      case 'QNA_REPLY':
        return LABELS.repliedToYourComment;
      case 'REVIEW_REPLY':
        return LABELS.repliedToYourReview;
      case 'QNA':
        return LABELS.commentedOnLecture;
      case 'REVIEW':
        return LABELS.reviewedCourse;
      default:
        return '';
    }
  };
  
  const firstUser = group.users[0];
  const avatarSrc = group.type === 'CERTIFICATE' && group.imgUrl
    ? group.imgUrl
    : getUserAvatar({
        walletAddress: firstUser?.wallet || undefined,
        email: firstUser?.email || undefined,
        fullName: firstUser?.name || undefined,
      });
  
  const secondUser = group.users[1];
  const secondAvatarSrc = secondUser && group.type !== 'CERTIFICATE' ? getUserAvatar({
    walletAddress: secondUser?.wallet || undefined,
    email: secondUser?.email || undefined,
    fullName: secondUser?.name || undefined,
  }) : null;
  
  const latestItem = group.items.sort((a, b) => 
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  )[0];

  const isCertificate = group.type === 'CERTIFICATE';

  return (
    <div 
      className={group.hasUnread ? S.wrapperUnread : S.wrapper}
      onClick={() => onView(group)}
      style={{ cursor: 'pointer' }}
    >
      <div className="flex gap-3">
        <div className="relative shrink-0">
          {isCertificate ? (
            <div className="w-12 h-12 rounded-lg overflow-hidden bg-[var(--accent)]/10 flex items-center justify-center">
              {group.imgUrl ? (
                <img src={group.imgUrl} alt="Certificate" className="w-full h-full object-cover" />
              ) : (
                <span className="text-xs font-medium text-[var(--accent)]">CERT</span>
              )}
            </div>
          ) : (
            <>
              <img src={avatarSrc} alt={firstUser?.name} className="w-10 h-10 rounded-full object-cover" />
              {secondAvatarSrc && (
                <img 
                  src={secondAvatarSrc} 
                  alt={secondUser?.name} 
                  className="w-6 h-6 rounded-full object-cover absolute -bottom-1 -right-1 border-2 border-[var(--card)]" 
                />
              )}
              {group.users.length > 2 && (
                <span className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-[var(--accent)] text-white text-xs flex items-center justify-center border-2 border-[var(--card)]">
                  +{group.users.length - 1}
                </span>
              )}
            </>
          )}
        </div>
        
        <div className="flex-1 min-w-0">
          <p className="text-sm text-[var(--text)]">
            {isCertificate ? (
              <span className="font-semibold">{buildActionText()}</span>
            ) : (
              <>
                <span className="font-semibold">{buildUserNamesText()}</span>
                {' '}{buildActionText()}
              </>
            )}
          </p>
          <p className="text-xs text-[var(--text)]/60 mt-0.5">
            {group.courseTitle || 'Khóa học'}
          </p>
          {latestItem && !isCertificate && (
            <p className="text-sm text-[var(--text)]/70 mt-2 line-clamp-2" dangerouslySetInnerHTML={{ __html: latestItem.content }} />
          )}
          {isCertificate && (
            <p className="text-sm text-[var(--accent)] mt-2">{LABELS.viewCertificate}</p>
          )}
          <div className="flex items-center justify-between mt-2">
            <span className={S.time}>{formatTimeAgo(group.latestAt)}</span>
            <StatusBadge variant={config.variant}>{config.label}</StatusBadge>
          </div>
        </div>
      </div>
    </div>
  );
}
