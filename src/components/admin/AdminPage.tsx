'use client';

import { useState, useCallback, useMemo } from 'react';
import { Dialog, useToast } from '@/components/ui';
import { PAGE } from '@/components/ui/ui.styles';
import { DEFAULT_PAGE_SIZE } from '@/constants/config';
import { ADMIN_LABELS, MOCK_USERS, ADMIN_MODAL_CONFIG } from '@/constants/admin';
import { DEFAULT_MODAL_CONFIG } from '@/types/common';
import type { AdminUser, UserRole, UserStatus, AdminModalType, AdminModalState } from '@/types/admin';
import { AdminLayout } from './AdminLayout';
import { UserTable } from './UserTable';

const LABELS = ADMIN_LABELS.users;

const TOAST = ADMIN_LABELS.users.toast;

export function AdminPage() {
  const toast = useToast();
  const [users, setUsers] = useState<AdminUser[]>(MOCK_USERS);
  const [keyword, setKeyword] = useState('');
  const [roleFilter, setRoleFilter] = useState<UserRole | ''>('');
  const [statusFilter, setStatusFilter] = useState<UserStatus | ''>('');
  const [page, setPage] = useState(1);
  const [modal, setModal] = useState<AdminModalState>({ type: null, userId: null });

  const filteredUsers = useMemo(() => {
    return users.filter(user => {
      const matchKeyword = !keyword ||
        user.fullName.toLowerCase().includes(keyword.toLowerCase()) ||
        user.email.toLowerCase().includes(keyword.toLowerCase());
      const matchRole = !roleFilter || user.role === roleFilter;
      const matchStatus = !statusFilter || user.status === statusFilter;
      return matchKeyword && matchRole && matchStatus;
    });
  }, [users, keyword, roleFilter, statusFilter]);

  const totalPages = Math.ceil(filteredUsers.length / DEFAULT_PAGE_SIZE);
  const paginatedUsers = useMemo(() => {
    const start = (page - 1) * DEFAULT_PAGE_SIZE;
    return filteredUsers.slice(start, start + DEFAULT_PAGE_SIZE);
  }, [filteredUsers, page]);

  const searchSuggestions = useMemo(() => {
    const seen = new Set<string>();
    const suggestions: { text: string; type: 'course' | 'instructor' | 'tag' }[] = [];
    for (const user of users) {
      if (!seen.has(user.fullName)) {
        suggestions.push({ text: user.fullName, type: 'instructor' });
        seen.add(user.fullName);
      }
      if (!seen.has(user.email)) {
        suggestions.push({ text: user.email, type: 'tag' });
        seen.add(user.email);
      }
    }
    return suggestions;
  }, [users]);

  const openModal = useCallback((type: AdminModalType, userId: string, newRole?: UserRole) => {
    setModal({ type, userId, newRole });
  }, []);

  const closeModal = useCallback(() => {
    setModal({ type: null, userId: null });
  }, []);

  const updateUser = useCallback((userId: string, updates: Partial<AdminUser>) => {
    setUsers(prev => prev.map(u => u.id === userId ? { ...u, ...updates } : u));
    closeModal();
  }, [closeModal]);

  const removeUser = useCallback((userId: string) => {
    setUsers(prev => prev.filter(u => u.id !== userId));
    closeModal();
  }, [closeModal]);

  const handleToggleStatus = useCallback((userId: string, isBan: boolean) => {
    openModal(isBan ? 'ban' : 'unban', userId);
  }, [openModal]);

  const handleDeleteClick = useCallback((userId: string) => {
    openModal('delete', userId);
  }, [openModal]);

  const handleChangeRoleClick = useCallback((userId: string, role: UserRole) => {
    openModal('changeRole', userId, role);
  }, [openModal]);

  const handleConfirm = useCallback(() => {
    if (!modal.userId || !modal.type) return;
    const actions: Record<NonNullable<AdminModalType>, () => void> = {
      ban: () => {
        updateUser(modal.userId!, { status: 'BANNED' });
        toast.success(TOAST.banSuccess);
      },
      unban: () => {
        updateUser(modal.userId!, { status: 'ACTIVE' });
        toast.success(TOAST.unbanSuccess);
      },
      delete: () => {
        removeUser(modal.userId!);
        toast.success(TOAST.deleteSuccess);
      },
      changeRole: () => {
        if (modal.newRole) {
          updateUser(modal.userId!, { role: modal.newRole });
          toast.success(TOAST.changeRoleSuccess);
        }
      },
    };
    actions[modal.type]?.();
  }, [modal, updateUser, removeUser, toast]);

  const modalConfig = modal.type ? ADMIN_MODAL_CONFIG[modal.type] : DEFAULT_MODAL_CONFIG;

  return (
    <AdminLayout activeId="users" title={LABELS.title}>
      <div className={PAGE.CONTAINER}>
        <UserTable
          users={paginatedUsers}
          totalCount={filteredUsers.length}
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
