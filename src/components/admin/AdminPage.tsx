'use client';

import { useState, useCallback, useMemo } from 'react';
import { ConfirmModal } from '@/components/ui';
import { ADMIN_LABELS, MOCK_USERS, DEFAULT_PAGE_SIZE } from '@/constants/admin';
import type { AdminUser, UserRole, UserStatus, AdminModalType, AdminModalState } from '@/types/admin';
import { AdminLayout } from './AdminLayout';
import { UserTable } from './UserTable';

const LABELS = ADMIN_LABELS.users;

export function AdminPage() {
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

  const handleBan = useCallback((userId: string) => {
    setUsers(prev => prev.map(u => u.id === userId ? { ...u, status: 'BANNED' as const } : u));
    closeModal();
  }, [closeModal]);

  const handleUnban = useCallback((userId: string) => {
    setUsers(prev => prev.map(u => u.id === userId ? { ...u, status: 'ACTIVE' as const } : u));
    closeModal();
  }, [closeModal]);

  const handleDelete = useCallback((userId: string) => {
    setUsers(prev => prev.filter(u => u.id !== userId));
    closeModal();
  }, [closeModal]);

  const handleChangeRole = useCallback((userId: string, role: UserRole) => {
    setUsers(prev => prev.map(u => u.id === userId ? { ...u, role } : u));
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
    if (!modal.userId) return;
    switch (modal.type) {
      case 'ban': handleBan(modal.userId); break;
      case 'unban': handleUnban(modal.userId); break;
      case 'delete': handleDelete(modal.userId); break;
      case 'changeRole': modal.newRole && handleChangeRole(modal.userId, modal.newRole); break;
    }
  }, [modal, handleBan, handleUnban, handleDelete, handleChangeRole]);

  const getModalConfig = () => {
    switch (modal.type) {
      case 'ban': return { title: LABELS.confirm.banTitle, message: LABELS.confirm.banMessage, danger: true };
      case 'unban': return { title: LABELS.confirm.unbanTitle, message: LABELS.confirm.unbanMessage, danger: false };
      case 'delete': return { title: LABELS.confirm.deleteTitle, message: LABELS.confirm.deleteMessage, danger: true };
      case 'changeRole': return { title: LABELS.confirm.changeRoleTitle, message: LABELS.confirm.changeRoleMessage, danger: false };
      default: return { title: '', message: '', danger: false };
    }
  };

  const modalConfig = getModalConfig();

  return (
    <AdminLayout activeId="users" title={LABELS.title}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <UserTable
          users={paginatedUsers}
          totalCount={filteredUsers.length}
          currentPage={page}
          totalPages={totalPages}
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
        <ConfirmModal
          isOpen={modal.type !== null}
          title={modalConfig.title}
          message={modalConfig.message}
          danger={modalConfig.danger}
          onConfirm={handleConfirm}
          onCancel={closeModal}
        />
      </div>
    </AdminLayout>
  );
}
