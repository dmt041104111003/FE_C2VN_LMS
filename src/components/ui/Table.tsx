'use client';

import { memo, createContext, useContext, Children, isValidElement, cloneElement } from 'react';
import type { DataTableProps, TableCellProps, TableRowProps } from './ui.types';
import { TABLE } from './ui.styles';

type RenderMode = 'desktop' | 'mobile';
const TableContext = createContext<{ mode: RenderMode; headers: string[] }>({ mode: 'desktop', headers: [] });

export const DataTable = memo(function DataTable({ headers, children, emptyMessage, isEmpty }: DataTableProps) {
  if (isEmpty) {
    return <div className={TABLE.EMPTY}>{emptyMessage || 'Không có dữ liệu'}</div>;
  }

  return (
    <>
      <div className={TABLE.WRAPPER}>
        <table className={TABLE.BASE}>
          <thead className={TABLE.THEAD}>
            <tr>
              {headers.map((h, i) => <th key={i} className={TABLE.TH}>{h}</th>)}
            </tr>
          </thead>
          <TableContext.Provider value={{ mode: 'desktop', headers }}>
            <tbody className={TABLE.TBODY}>{children}</tbody>
          </TableContext.Provider>
        </table>
      </div>
      <TableContext.Provider value={{ mode: 'mobile', headers }}>
        <div className={TABLE.MOBILE_LIST}>{children}</div>
      </TableContext.Provider>
    </>
  );
});

export const TableRow = memo(function TableRow({ children, mobileTitle }: TableRowProps) {
  const { mode, headers } = useContext(TableContext);
  const cells = Children.toArray(children);

  if (mode === 'desktop') {
    return <tr className={TABLE.TR}>{children}</tr>;
  }

  const titleCell = cells[0];
  const actionCell = cells.find((cell): cell is React.ReactElement<TableCellProps> => 
    isValidElement(cell) && cell.props.isActions
  );
  const dataCells = cells.filter((cell, idx) => 
    idx > 0 && !(isValidElement(cell) && cell.props.isActions)
  );

  return (
    <div className={TABLE.MOBILE_CARD}>
      <div className={TABLE.MOBILE_HEADER}>
        <div className={TABLE.MOBILE_TITLE}>
          {mobileTitle || (isValidElement(titleCell) ? titleCell.props.children : null)}
        </div>
      </div>
      {dataCells.map((cell, idx) => {
        if (!isValidElement(cell)) return null;
        const headerIdx = cells.indexOf(cell);
        const label = cell.props.label || headers[headerIdx] || '';
        if (cell.props.hideOnMobile) return null;
        return (
          <div key={idx} className={TABLE.MOBILE_ROW}>
            <span className={TABLE.MOBILE_LABEL}>{label}</span>
            <span className={TABLE.MOBILE_VALUE}>{cell.props.children}</span>
          </div>
        );
      })}
      {actionCell && (
        <div className={TABLE.MOBILE_ACTIONS}>
          {actionCell.props.children}
        </div>
      )}
    </div>
  );
});

export const TableCell = memo(function TableCell({ children, className = '' }: TableCellProps) {
  return <td className={`${TABLE.TD} ${className}`}>{children}</td>;
});

