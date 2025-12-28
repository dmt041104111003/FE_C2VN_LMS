'use client';

import { memo } from 'react';
import { SearchInput } from '@/components/ui';
import { ROLE_OPTIONS, STATUS_OPTIONS, ADMIN_LABELS } from '@/constants/admin';
import type { UserFiltersProps, UserRole, UserStatus } from '@/types/admin';
import {
  FILTER_WRAPPER,
  FILTER_ROW,
  FILTER_COL,
  FILTER_LABEL,
  FILTER_SELECT,
} from '@/components/ui/ui.styles';

const LABELS = ADMIN_LABELS.users;

export const UserFilters = memo(function UserFilters({
  keyword,
  roleFilter,
  statusFilter,
  searchSuggestions,
  onKeywordChange,
  onRoleChange,
  onStatusChange,
}: UserFiltersProps) {
  return (
    <div className={`${FILTER_WRAPPER} mb-8`}>
      <SearchInput
        value={keyword}
        onChange={onKeywordChange}
        suggestions={searchSuggestions}
        placeholder={LABELS.searchPlaceholder}
        showIcon
      />

      <div className={FILTER_ROW}>
        <div className={FILTER_COL}>
          <label className={FILTER_LABEL}>{LABELS.filterRole}</label>
          <select
            value={roleFilter}
            onChange={e => onRoleChange(e.target.value as UserRole | '')}
            className={FILTER_SELECT}
          >
            {ROLE_OPTIONS.map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>

        <div className={FILTER_COL}>
          <label className={FILTER_LABEL}>{LABELS.filterStatus}</label>
          <select
            value={statusFilter}
            onChange={e => onStatusChange(e.target.value as UserStatus | '')}
            className={FILTER_SELECT}
          >
            {STATUS_OPTIONS.map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
});
