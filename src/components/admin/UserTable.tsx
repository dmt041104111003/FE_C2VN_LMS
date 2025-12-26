'use client';

import { memo } from 'react';
import { DataTable, Pagination, Panel } from '@/components/ui';
import { ADMIN_LABELS, TABLE_HEADERS } from '@/constants/admin';
import type { UserTableProps } from '@/types/admin';
import { UserRow } from './UserRow';
import { UserFilters } from './UserFilters';

const LABELS = ADMIN_LABELS.users;

export const UserTable = memo(function UserTable({
  users,
  totalCount,
  currentPage,
  totalPages,
  startIndex,
  keyword,
  roleFilter,
  statusFilter,
  searchSuggestions,
  action,
  onKeywordChange,
  onRoleChange,
  onStatusChange,
  onPageChange,
  onToggleStatus,
  onDelete,
  onChangeRole,
  onAddUser,
}: UserTableProps) {
  return (
    <>
      <UserFilters
        keyword={keyword}
        roleFilter={roleFilter}
        statusFilter={statusFilter}
        searchSuggestions={searchSuggestions}
        onKeywordChange={onKeywordChange}
        onRoleChange={onRoleChange}
        onStatusChange={onStatusChange}
        onAddUser={onAddUser}
      />

      <Panel
        title={LABELS.title}
        action={action}
        footer={
          <div className="flex items-center justify-between">
            <span className="text-sm text-[var(--text)]/50">
              {LABELS.total}: {totalCount} {LABELS.users}
            </span>
            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={onPageChange} />
          </div>
        }
      >
        <DataTable
          headers={TABLE_HEADERS}
          isEmpty={users.length === 0}
          emptyMessage={LABELS.empty}
        >
          {users.map((user, idx) => (
            <UserRow
              key={user.id}
              index={startIndex + idx + 1}
              user={user}
              onToggleStatus={onToggleStatus}
              onDelete={onDelete}
              onChangeRole={onChangeRole}
            />
          ))}
        </DataTable>
      </Panel>
    </>
  );
});
