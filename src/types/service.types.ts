import type { UserRole, UserStatus, LoginMethod, AdminUser, UserSearchParams } from './admin';
export type { UserSearchParams } from './admin';

export interface ApiUserResponse {
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

export interface UserListResponse {
  content: AdminUser[];
  totalElements: number;
  totalPages: number;
  number: number;
  size: number;
}

export interface UpdateProfileData {
  fullName?: string;
  bio?: string;
}

export interface ContactMessageRequest {
  email: string;
  content: string;
}

export interface ContactMessage {
  id: number;
  email: string;
  content: string;
  isRead: boolean;
  createdAt: string;
}

export interface TagResponse {
  id: number;
  name: string;
  slug: string;
  createdAt?: string;
  numOfCourses?: number;
}

export interface TagRequest {
  name: string;
}

export const mapApiUserToAdminUser = (user: ApiUserResponse): AdminUser => ({
  id: user.id,
  email: user.email || '',
  fullName: user.fullName || '',
  role: (user.role?.name as UserRole) || 'USER',
  status: (user.status as UserStatus) || 'ACTIVE',
  loginMethod: (user.loginMethod?.name as LoginMethod) || 'EMAIL_PASSWORD',
  createdAt: user.createdAt || '',
  lastLogin: user.lastLogin,
});

