import { api } from './api';
import { API_ENDPOINTS } from '@/constants/api';
import type { AdminUser, UserRole, UserStatus, LoginMethod } from '@/types/admin';

export interface UserSearchParams {
  keyword?: string;
  role?: UserRole | '';
  status?: UserStatus | '';
  page?: number;
  size?: number;
}

interface ApiUserResponse {
  id: string;
  email?: string;
  fullName?: string;
  imageUrl?: string;
  walletAddress?: string;
  role?: { name: string };
  loginMethod?: { name: string };
  status?: string;
  createdAt?: string;
  lastLogin?: string;
}

interface ApiUserListResponse {
  content: ApiUserResponse[];
  totalElements: number;
  totalPages: number;
  number: number;
  size: number;
}

export interface UserListResponse {
  content: AdminUser[];
  totalElements: number;
  totalPages: number;
  number: number;
  size: number;
}

const mapApiUserToAdminUser = (user: ApiUserResponse): AdminUser => ({
  id: user.id,
  email: user.email || '',
  fullName: user.fullName || '',
  avatar: user.imageUrl,
  role: (user.role?.name as UserRole) || 'USER',
  status: (user.status as UserStatus) || 'ACTIVE',
  loginMethod: (user.loginMethod?.name as LoginMethod) || 'EMAIL_PASSWORD',
  createdAt: user.createdAt || '',
  lastLogin: user.lastLogin,
});

export async function getUsers(params: UserSearchParams = {}): Promise<UserListResponse> {
  const queryParams: Record<string, string> = {};
  
  if (params.keyword) queryParams.keyword = params.keyword;
  if (params.role) queryParams.role = params.role;
  if (params.status) queryParams.status = params.status;
  if (params.page !== undefined) queryParams.page = String(params.page);
  if (params.size !== undefined) queryParams.size = String(params.size);

  const response = await api.get<ApiUserListResponse>(API_ENDPOINTS.USERS.BASE, { params: queryParams });
  
  return {
    ...response,
    content: response.content.map(mapApiUserToAdminUser),
  };
}

export async function getUserById(userId: string): Promise<AdminUser> {
  return api.get<AdminUser>(API_ENDPOINTS.USERS.BY_ID(userId));
}

export async function getUserByEmail(email: string): Promise<AdminUser> {
  return api.get<AdminUser>(API_ENDPOINTS.USERS.BY_EMAIL, { params: { email } });
}

export async function banUser(userId: string): Promise<void> {
  return api.put<void>(API_ENDPOINTS.USERS.BAN(userId));
}

export async function unbanUser(userId: string): Promise<void> {
  return api.put<void>(API_ENDPOINTS.USERS.UNBAN(userId));
}

export async function updateUserRole(userId: string, role: UserRole): Promise<void> {
  return api.put<void>(API_ENDPOINTS.USERS.UPDATE_ROLE(userId), { role });
}

export async function deleteUser(userId: string): Promise<void> {
  return api.delete<void>(API_ENDPOINTS.USERS.DELETE(userId));
}

