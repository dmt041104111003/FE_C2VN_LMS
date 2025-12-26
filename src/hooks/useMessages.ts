import { useState, useMemo, useCallback } from 'react';
import type { InboxMessage, InboxFilter } from '@/types/inbox';
import type { UseMessagesResult } from '@/types/hooks';

export function useMessages(
  initialMessages: InboxMessage[],
  filter: InboxFilter
): UseMessagesResult {
  const [messages, setMessages] = useState<InboxMessage[]>(initialMessages);

  const messagesMap = useMemo(
    () => new Map(messages.map(m => [m.id, m])),
    [messages]
  );

  const unreadCount = useMemo(
    () => messages.reduce((count, m) => count + (m.status === 'unread' ? 1 : 0), 0),
    [messages]
  );

  const filteredMessages = useMemo(() => {
    if (filter === 'all') return messages;
    return messages.filter(m => m.status === filter);
  }, [messages, filter]);

  const markAsRead = useCallback((id: string) => {
    setMessages(prev => {
      const index = prev.findIndex(m => m.id === id);
      if (index === -1 || prev[index].status === 'read') return prev;
      
      const updated = [...prev];
      updated[index] = { ...updated[index], status: 'read' };
      return updated;
    });
  }, []);

  return {
    messages,
    messagesMap,
    unreadCount,
    filteredMessages,
    markAsRead,
  };
}
