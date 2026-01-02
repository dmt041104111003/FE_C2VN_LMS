import { api } from './api';
import type { TagResponse, TagRequest } from '@/types/service.types';

export type { TagResponse, TagRequest };

const ENDPOINT = '/api/tags';

export const tagService = {
  getAll: (): Promise<TagResponse[]> => api.get<TagResponse[]>(ENDPOINT),
  create: (data: TagRequest): Promise<TagResponse> => api.post<TagResponse>(ENDPOINT, data),
  delete: (id: number): Promise<void> => api.delete(`${ENDPOINT}/${id}`),
};
