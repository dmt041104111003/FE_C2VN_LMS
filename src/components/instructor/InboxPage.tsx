'use client';

import { useEffect, useCallback, useMemo, useState } from 'react';
import { FormModal, useToast } from '@/components/ui';
import { PAGE, FILTER_COL, FILTER_LABEL, FILTER_SELECT } from '@/components/ui/ui.styles';
import { MessageItem, LoadingSpinner } from '@/components/inbox';
import { useInfiniteScroll, useMessages } from '@/hooks';
import {
  INBOX_LABELS,
  INBOX_STYLES,
  INBOX_FILTER_OPTIONS,
  MESSAGE_TYPE_LABELS,
  MESSAGE_TYPE_COLORS,
  REPLY_LABELS,
  REPLY_FIELDS,
  REPLY_INITIAL_DATA,
  REPLY_DRAFT_KEY,
  INBOX_ITEMS_PER_PAGE,
  formatTimeAgo,
  isReplyEmpty,
  isReplyValid,
} from '@/constants/inbox';
import type { InboxMessage, InboxFilter, FilterSectionProps, InboxMessageListProps } from '@/types/inbox';
import { InstructorLayout } from './InstructorLayout';

const S = INBOX_STYLES;
const LABELS = INBOX_LABELS;
const REPLYABLE_TYPE = 'comment';

const MESSAGE_ITEM_LABELS = {
  on: LABELS.on,
  markAsRead: LABELS.markAsRead,
  reply: LABELS.reply,
};

export function InboxPage() {
  const toast = useToast();
  const [filter, setFilter] = useState<InboxFilter>('all');
  const [replyMessage, setReplyMessage] = useState<InboxMessage | null>(null);

  const { filteredMessages, unreadCount, markAsRead } = useMessages([], filter);

  const {
    visibleCount,
    isLoading,
    hasMore,
    loaderRef,
    resetVisibleCount,
  } = useInfiniteScroll({
    itemsPerPage: INBOX_ITEMS_PER_PAGE,
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

  const titleWithBadge = unreadCount > 0 ? `${LABELS.title} (${unreadCount})` : LABELS.title;

  const replyStorageKey = replyMessage
    ? `${REPLY_DRAFT_KEY}_${replyMessage.id}`
    : REPLY_DRAFT_KEY;

  const replyLabels = useMemo(() => ({
    ...REPLY_LABELS,
    subtitle: replyMessage ? `${LABELS.from} ${replyMessage.senderName} ${LABELS.on} ${replyMessage.courseName}` : '',
  }), [replyMessage]);

  const isEmpty = filteredMessages.length === 0;

  return (
    <InstructorLayout activeId="inbox" title={titleWithBadge} inboxUnreadCount={unreadCount}>
      <div className={PAGE.CONTAINER}>
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
      </div>

      <FormModal
        isOpen={!!replyMessage}
        labels={replyLabels}
        fields={REPLY_FIELDS}
        storageKey={replyStorageKey}
        initialData={REPLY_INITIAL_DATA}
        isEmpty={isReplyEmpty}
        isValid={isReplyValid}
        onClose={handleCloseReply}
        onSubmit={handleSubmitReply}
      />
    </InstructorLayout>
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
        {INBOX_FILTER_OPTIONS.map(opt => (
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
            typeLabels={MESSAGE_TYPE_LABELS}
            typeColors={MESSAGE_TYPE_COLORS}
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
