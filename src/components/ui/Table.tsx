'use client';

import { memo, ReactNode } from 'react';
import type { DataTableProps, TableCellProps } from './ui.types';
import { TABLE } from './ui.styles';

export const DataTable = memo(function DataTable({ headers, children, emptyMessage, isEmpty }: DataTableProps) {
  if (isEmpty) {
    return <div className={TABLE.EMPTY}>{emptyMessage || 'Không có dữ liệu'}</div>;
  }

  return (
    <div className={TABLE.WRAPPER}>
      <table className={TABLE.BASE}>
        <thead className={TABLE.THEAD}>
          <tr>
            {headers.map((h, i) => <th key={i} className={TABLE.TH}>{h}</th>)}
          </tr>
        </thead>
        <tbody className={TABLE.TBODY}>{children}</tbody>
      </table>
    </div>
  );
});

export const TableRow = memo(function TableRow({ children }: { children: ReactNode }) {
  return <tr className={TABLE.TR}>{children}</tr>;
});

export const TableCell = memo(function TableCell({ children, className = '' }: TableCellProps) {
  return <td className={`${TABLE.TD} ${className}`}>{children}</td>;
});

