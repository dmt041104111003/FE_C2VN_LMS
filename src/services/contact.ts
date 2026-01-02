import { api } from './api';
import type { ContactMessageRequest, ContactMessage } from '@/types/service.types';

export type { ContactMessageRequest, ContactMessage };

const ENDPOINTS = {
  base: '/api/contact',
  unreadCount: '/api/contact/unread/count',
  read: (id: number) => `/api/contact/${id}/read`,
  delete: (id: number) => `/api/contact/${id}`,
} as const;

export const submitContactMessage = (request: ContactMessageRequest): Promise<ContactMessage> =>
  api.post<ContactMessage>(ENDPOINTS.base, request);

export const getAllContactMessages = (): Promise<ContactMessage[]> =>
  api.get<ContactMessage[]>(ENDPOINTS.base);

export const getUnreadContactCount = (): Promise<number> =>
  api.get<number>(ENDPOINTS.unreadCount);

export const markContactMessageAsRead = (id: number): Promise<ContactMessage> =>
  api.put<ContactMessage>(ENDPOINTS.read(id));

export const deleteContactMessage = (id: number): Promise<void> =>
  api.delete(ENDPOINTS.delete(id));
