import { api } from './api';
import { API_ENDPOINTS } from '@/constants/api';
import type { AdminUser, UserRole } from '@/types/admin';
import type { 
  UserSearchParams, 
  UserListResponse, 
  UpdateProfileData,
  ApiUserResponse 
} from '@/types/service.types';
import { mapApiUserToAdminUser } from '@/types/service.types';

export type { UserSearchParams, UserListResponse, UpdateProfileData };

interface ApiUserListResponse {
  content: ApiUserResponse[];
  totalElements: number;
  totalPages: number;
  number: number;
  size: number;
}

const buildQueryParams = (params: UserSearchParams): Record<string, string> => {
  const query: Record<string, string> = {};
  if (params.keyword) query.keyword = params.keyword;
  if (params.role) query.role = params.role;
  if (params.status) query.status = params.status;
  if (params.page !== undefined) query.page = String(params.page);
  if (params.size !== undefined) query.size = String(params.size);
  return query;
};

export const getUsers = async (params: UserSearchParams = {}): Promise<UserListResponse> => {
  const response = await api.get<ApiUserListResponse>(API_ENDPOINTS.USERS.BASE, { 
    params: buildQueryParams(params) 
  });
  return { ...response, content: response.content.map(mapApiUserToAdminUser) };
};

export const getUserById = (userId: string): Promise<AdminUser> =>
  api.get<AdminUser>(API_ENDPOINTS.USERS.BY_ID(userId));

export const getUserByEmail = (email: string): Promise<AdminUser> =>
  api.get<AdminUser>(API_ENDPOINTS.USERS.BY_EMAIL, { params: { email } });

export const banUser = (userId: string): Promise<void> =>
  api.put<void>(API_ENDPOINTS.USERS.BAN(userId));

export const unbanUser = (userId: string): Promise<void> =>
  api.put<void>(API_ENDPOINTS.USERS.UNBAN(userId));

export const updateUserRole = (userId: string, role: UserRole): Promise<void> =>
  api.put<void>(API_ENDPOINTS.USERS.UPDATE_ROLE(userId), { role });

export const deleteUser = (userId: string): Promise<void> =>
  api.delete<void>(API_ENDPOINTS.USERS.DELETE(userId));

export const updateProfile = async (data: UpdateProfileData): Promise<AdminUser> => {
  const response = await api.put<ApiUserResponse>(API_ENDPOINTS.USERS.UPDATE_PROFILE, data);
  return mapApiUserToAdminUser(response);
};
