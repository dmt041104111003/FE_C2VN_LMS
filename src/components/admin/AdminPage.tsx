'use client';

import { useState, useCallback, useEffect, useRef, useMemo } from 'react';
import { Dialog, useToast } from '@/components/ui';
import { PAGE } from '@/components/ui/ui.styles';
import { DEFAULT_PAGE_SIZE } from '@/constants/config';
import { ADMIN_LABELS, ADMIN_MODAL_CONFIG } from '@/constants/admin';
import { DEFAULT_MODAL_CONFIG } from '@/types/common';
import type { AdminUser, UserRole, UserStatus, AdminModalType, AdminModalState } from '@/types/admin';
import * as userService from '@/services/user';
import { AdminLayout } from './AdminLayout';
import { UserTable } from './UserTable';

const LABELS = ADMIN_LABELS.users;
const TOAST = ADMIN_LABELS.users.toast;

export function AdminPage() {
  const toast = useToast();
  const toastRef = useRef(toast);
  toastRef.current = toast;

  const [users, setUsers] = useState<AdminUser[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [keyword, setKeyword] = useState('');
  const [roleFilter, setRoleFilter] = useState<UserRole | ''>('');
  const [statusFilter, setStatusFilter] = useState<UserStatus | ''>('');
  const [page, setPage] = useState(1);
  const [modal, setModal] = useState<AdminModalState>({ type: null, userId: null });
  const isInitialMount = useRef(true);

  const fetchUsers = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await userService.getUsers({
        keyword: keyword || undefined,
        role: roleFilter || undefined,
        status: statusFilter || undefined,
        page: page - 1,
        size: DEFAULT_PAGE_SIZE,
      });
      setUsers(response.content);
      setTotalCount(response.totalElements);
      setTotalPages(response.totalPages);
    } catch {
      toastRef.current.error('Không thể tải danh sách người dùng');
    } finally {
      setIsLoading(false);
    }
  }, [keyword, roleFilter, statusFilter, page]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }
    setPage(1);
  }, [keyword, roleFilter, statusFilter]);

  const openModal = useCallback((type: AdminModalType, userId: string, newRole?: UserRole) => {
    setModal({ type, userId, newRole });
  }, []);

  const closeModal = useCallback(() => {
    setModal({ type: null, userId: null });
  }, []);

  const handleToggleStatus = useCallback((userId: string, isBan: boolean) => {
    openModal(isBan ? 'ban' : 'unban', userId);
  }, [openModal]);

  const handleDeleteClick = useCallback((userId: string) => {
    openModal('delete', userId);
  }, [openModal]);

  const handleChangeRoleClick = useCallback((userId: string, role: UserRole) => {
    openModal('changeRole', userId, role);
  }, [openModal]);

  const handleConfirm = useCallback(async () => {
    if (!modal.userId || !modal.type) return;

    try {
      switch (modal.type) {
        case 'ban':
          await userService.banUser(modal.userId);
          toastRef.current.success(TOAST.banSuccess);
          break;
        case 'unban':
          await userService.unbanUser(modal.userId);
          toastRef.current.success(TOAST.unbanSuccess);
          break;
        case 'delete':
          await userService.deleteUser(modal.userId);
          toastRef.current.success(TOAST.deleteSuccess);
          break;
        case 'changeRole':
          if (modal.newRole) {
            await userService.updateUserRole(modal.userId, modal.newRole);
            toastRef.current.success(TOAST.changeRoleSuccess);
          }
          break;
      }
      closeModal();
      await fetchUsers();
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Thao tác thất bại';
      toastRef.current.error(message);
    }
  }, [modal, closeModal, fetchUsers]);

  const modalConfig = modal.type ? ADMIN_MODAL_CONFIG[modal.type] : DEFAULT_MODAL_CONFIG;

  const searchSuggestions = useMemo(() => {
    const seen = new Set<string>();
    const suggestions: { text: string; type: 'USER' | 'INSTRUCTOR' | 'ADMIN' }[] = [];
    for (const user of users) {
      const roleType = user.role || 'USER';
      if (user.fullName && !seen.has(user.fullName)) {
        suggestions.push({ text: user.fullName, type: roleType });
        seen.add(user.fullName);
      }
      if (user.email && !seen.has(user.email)) {
        suggestions.push({ text: user.email, type: roleType });
        seen.add(user.email);
      }
    }
    return suggestions;
  }, [users]);

  return (
    <AdminLayout activeId="users" title={LABELS.title}>
      <div className={PAGE.CONTAINER}>
        <UserTable
          users={users}
          totalCount={totalCount}
          currentPage={page}
          totalPages={totalPages}
          startIndex={(page - 1) * DEFAULT_PAGE_SIZE}
          keyword={keyword}
          roleFilter={roleFilter}
          statusFilter={statusFilter}
          searchSuggestions={searchSuggestions}
          onKeywordChange={setKeyword}
          onRoleChange={setRoleFilter}
          onStatusChange={setStatusFilter}
          onPageChange={setPage}
          onToggleStatus={handleToggleStatus}
          onDelete={handleDeleteClick}
          onChangeRole={handleChangeRoleClick}
        />
        <Dialog
          isOpen={modal.type !== null}
          title={modalConfig.title}
          message={modalConfig.message}
          danger={modalConfig.danger}
          onPrimary={handleConfirm}
          onSecondary={closeModal}
        />
      </div>
    </AdminLayout>
  );
}
