'use client';

import { useEffect, useCallback, useMemo, useState } from 'react';
import Link from 'next/link';
import { ChevronLeftIcon, FormModal, useToast } from '@/components/ui';
import { FILTER_COL, FILTER_LABEL, FILTER_SELECT, PAGE, ICON_SM } from '@/components/ui/ui.styles';
import { ROUTES } from '@/constants/navigation';
import { MessageItem, LoadingSpinner } from '@/components/inbox';
import { useInfiniteScroll, useMessages } from '@/hooks';
import {
  USER_INBOX_LABELS,
  USER_INBOX_STYLES,
  USER_INBOX_FILTER_OPTIONS,
  USER_INBOX_ITEMS_PER_PAGE,
  USER_INBOX_REPLY_LABELS,
  USER_INBOX_REPLY_FIELDS,
  USER_INBOX_REPLY_INITIAL_DATA,
  USER_INBOX_REPLY_DRAFT_KEY,
  USER_MESSAGE_TYPE_LABELS,
  USER_MESSAGE_TYPE_COLORS,
  formatTimeAgo,
  isReplyEmpty,
  isReplyValid,
} from '@/constants/user-inbox';
import type { InboxMessage, InboxFilter, FilterSectionProps, InboxMessageListProps } from '@/types/inbox';

const S = USER_INBOX_STYLES;
const LABELS = USER_INBOX_LABELS;
const REPLYABLE_TYPE = 'reply';

const MESSAGE_ITEM_LABELS = {
  on: LABELS.on,
  markAsRead: LABELS.markAsRead,
  reply: LABELS.reply,
};

export function UserInboxPage() {
  const toast = useToast();
  const [filter, setFilter] = useState<InboxFilter>('all');
  const [replyMessage, setReplyMessage] = useState<InboxMessage | null>(null);

  const { filteredMessages, markAsRead } = useMessages([], filter);

  const {
    visibleCount,
    isLoading,
    hasMore,
    loaderRef,
    resetVisibleCount,
  } = useInfiniteScroll({
    itemsPerPage: USER_INBOX_ITEMS_PER_PAGE,
    totalItems: filteredMessages.length,
  });

  const visibleMessages = useMemo(
    () => filteredMessages.slice(0, visibleCount),
    [filteredMessages, visibleCount]
  );

  useEffect(() => {
    resetVisibleCount();
  }, [filter, resetVisibleCount]);

  const handleReply = useCallback((message: InboxMessage) => {
    setReplyMessage(message);
  }, []);

  const handleCloseReply = useCallback(() => {
    setReplyMessage(null);
  }, []);

  const handleSubmitReply = useCallback(() => {
    if (!replyMessage) return;
    markAsRead(replyMessage.id);
    toast.success(LABELS.toast.replySuccess);
    setReplyMessage(null);
  }, [replyMessage, markAsRead, toast]);

  const replyStorageKey = replyMessage
    ? `${USER_INBOX_REPLY_DRAFT_KEY}_${replyMessage.id}`
    : USER_INBOX_REPLY_DRAFT_KEY;

  const replyLabels = useMemo(() => ({
    ...USER_INBOX_REPLY_LABELS,
    subtitle: replyMessage ? `${LABELS.on} ${replyMessage.courseName} - ${replyMessage.senderName}` : '',
  }), [replyMessage]);

  const isEmpty = filteredMessages.length === 0;

  return (
    <div className={PAGE.CONTAINER}>
      <Header />

      <div className={S.container}>
        <FilterSection filter={filter} onFilterChange={setFilter} />

        {isEmpty ? (
          <EmptyState />
        ) : (
          <MessageList
            messages={visibleMessages}
            hasMore={hasMore}
            isLoading={isLoading}
            loaderRef={loaderRef}
            onRead={markAsRead}
            onReply={handleReply}
          />
        )}
      </div>

      <FormModal
        isOpen={!!replyMessage}
        labels={replyLabels}
        fields={USER_INBOX_REPLY_FIELDS}
        storageKey={replyStorageKey}
        initialData={USER_INBOX_REPLY_INITIAL_DATA}
        isEmpty={isReplyEmpty}
        isValid={isReplyValid}
        onClose={handleCloseReply}
        onSubmit={handleSubmitReply}
      />
    </div>
  );
}

function Header() {
  return (
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
  );
}

function FilterSection({ filter, onFilterChange }: FilterSectionProps) {
  return (
    <div className={FILTER_COL}>
      <label className={FILTER_LABEL}>{LABELS.filter.label}</label>
      <select
        value={filter}
        onChange={e => onFilterChange(e.target.value as InboxFilter)}
        className={FILTER_SELECT}
      >
        {USER_INBOX_FILTER_OPTIONS.map(opt => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
    </div>
  );
}

function EmptyState() {
  return <div className={S.empty}>{LABELS.empty}</div>;
}

function MessageList({ messages, hasMore, isLoading, loaderRef, onRead, onReply }: InboxMessageListProps) {
  return (
    <>
      <div className={S.list}>
        {messages.map(message => (
          <MessageItem
            key={message.id}
            message={message}
            styles={S.item}
            labels={MESSAGE_ITEM_LABELS}
            typeLabels={USER_MESSAGE_TYPE_LABELS}
            typeColors={USER_MESSAGE_TYPE_COLORS}
            formatTime={formatTimeAgo}
            replyableType={REPLYABLE_TYPE}
            onRead={onRead}
            onReply={onReply}
          />
        ))}
      </div>

      {hasMore && <LoadingSpinner ref={loaderRef} isLoading={isLoading} />}
    </>
  );
}
