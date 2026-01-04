import type { ReactNode } from 'react';
import type { UserRole, UserStatus, LoginMethod, SearchSuggestion } from './core.types';
export type { UserRole, UserStatus, LoginMethod, SearchSuggestion } from './core.types';

export interface AdminUser {
  id: string;
  email: string;
  fullName: string;
  avatar?: string;
  role: UserRole;
  status: UserStatus;
  loginMethod?: LoginMethod;
  createdAt: string;
  lastLogin?: string;
}

export interface UserSearchParams {
  keyword?: string;
  role?: UserRole | '';
  status?: UserStatus | '';
  page?: number;
  size?: number;
}

export interface UserSearchResponse {
  users: AdminUser[];
  total: number;
  page: number;
  totalPages: number;
}

export interface UpdateRoleRequest {
  role: UserRole;
}

export type AdminModalType = 'ban' | 'unban' | 'delete' | 'changeRole' | null;

export interface AdminModalState {
  type: AdminModalType;
  userId: string | null;
  newRole?: UserRole;
}

export interface UserRowProps {
  index: number;
  user: AdminUser;
  onToggleStatus: (userId: string, isBan: boolean) => void;
  onDelete: (userId: string) => void;
  onChangeRole: (userId: string, role: UserRole) => void;
}

export interface UserFiltersProps {
  keyword: string;
  roleFilter: UserRole | '';
  statusFilter: UserStatus | '';
  searchSuggestions?: SearchSuggestion[];
  onKeywordChange: (value: string) => void;
  onRoleChange: (value: UserRole | '') => void;
  onStatusChange: (value: UserStatus | '') => void;
}

export interface UserTableProps {
  users: AdminUser[];
  totalCount: number;
  currentPage: number;
  totalPages: number;
  startIndex: number;
  keyword: string;
  roleFilter: UserRole | '';
  statusFilter: UserStatus | '';
  searchSuggestions?: SearchSuggestion[];
  action?: ReactNode;
  onKeywordChange: (value: string) => void;
  onRoleChange: (value: UserRole | '') => void;
  onStatusChange: (value: UserStatus | '') => void;
  onPageChange: (page: number) => void;
  onToggleStatus: (userId: string, isBan: boolean) => void;
  onDelete: (userId: string) => void;
  onChangeRole: (userId: string, role: UserRole) => void;
}

export interface AddUserFormData {
  fullName: string;
  contactType: string;
  contactValue: string;
  role: string;
  [key: string]: unknown;
}

export interface AdminLayoutProps {
  children: ReactNode;
  activeId: string;
  title?: string;
}
