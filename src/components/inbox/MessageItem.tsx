'use client';

import { memo } from 'react';
import { Button, StatusBadge } from '@/components/ui';
import type { MessageItemProps } from '@/types/inbox';

function MessageItemComponent({
  message,
  styles: S,
  labels,
  typeLabels,
  typeColors,
  formatTime,
  replyableType,
  onRead,
  onReply,
}: MessageItemProps) {
  const isUnread = message.status === 'unread';
  const wrapperClass = `${S.wrapper} ${isUnread ? S.unread : S.read}`;
  const canReply = message.type === replyableType;

  const handleWrapperClick = () => {
    if (isUnread) onRead(message.id);
  };

  const handleActionsClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <div className={wrapperClass} onClick={handleWrapperClick}>
      <div className={S.header}>
        <div className={S.content}>
          <p className={S.sender}>{message.senderName}</p>
          <p className={S.course}>{labels.on} {message.courseName}</p>
        </div>
        <StatusBadge variant={typeColors[message.type]} className={S.badge}>
          {typeLabels[message.type]}
        </StatusBadge>
      </div>

      <p className={S.message}>{message.content}</p>

      <div className={S.footer}>
        <span className={S.time}>{formatTime(message.timestamp)}</span>
        <div className={S.actions} onClick={handleActionsClick}>
          {isUnread && (
            <Button variant="ghost" size="sm" onClick={() => onRead(message.id)}>
              {labels.markAsRead}
            </Button>
          )}
          {canReply && (
            <Button variant="primary" size="sm" onClick={() => onReply(message)}>
              {labels.reply}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

export const MessageItem = memo(MessageItemComponent);
