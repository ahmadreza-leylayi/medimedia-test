'use client';

import React from 'react';
import type { ListColumn } from '@/types/dashboard';

interface TableProps<T> {
  data: T[];
  columns: ListColumn[];
  onRowClick?: (item: T) => void;
  selectedRows?: string[];
  onSelectRow?: (id: string) => void;
  onSelectAll?: () => void;
  renderCell?: (item: T, columnKey: string) => React.ReactNode;
  className?: string;
}

export function Table<T extends { id: string }>({
  data,
  columns,
  onRowClick,
  selectedRows = [],
  onSelectRow,
  onSelectAll,
  renderCell,
  className = '',
}: TableProps<T>) {
  const allSelected = selectedRows.length === data.length && data.length > 0;

  return (
    <div className={`overflow-x-auto ${className}`}>
      <table className="w-full min-w-[800px] border-collapse">
        <thead>
          <tr className="border-b border-gray-200">
            {onSelectRow && (
              <th className="p-2 text-right w-12">
                <input
                  type="checkbox"
                  checked={allSelected}
                  onChange={onSelectAll}
                  className="w-4 h-4 rounded border-gray-300 text-cyan-500 focus:ring-cyan-500"
                />
              </th>
            )}
            {columns.map((column) => (
              <th
                key={column.key}
                className="p-3 text-right text-sm font-bold text-gray-700 whitespace-nowrap"
                style={column.width ? { width: column.width } : undefined}
              >
                {column.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr
              key={item.id}
              className={`border-b border-gray-100 hover:bg-gray-50 transition-colors ${
                onRowClick ? 'cursor-pointer' : ''
              } ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}`}
              onClick={() => onRowClick?.(item)}
            >
              {onSelectRow && (
                <td className="p-2 w-12" onClick={(e) => e.stopPropagation()}>
                  <input
                    type="checkbox"
                    checked={selectedRows.includes(item.id)}
                    onChange={() => onSelectRow(item.id)}
                    className="w-4 h-4 rounded border-gray-300 text-cyan-500 focus:ring-cyan-500"
                  />
                </td>
              )}
              {columns.map((column) => (
                <td
                  key={column.key}
                  className="p-3 text-sm text-gray-700 whitespace-nowrap"
                >
                  {renderCell ? renderCell(item, column.key) : (item as any)[column.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {data.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          هیچ داده‌ای یافت نشد
        </div>
      )}
    </div>
  );
}

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  const visiblePages = pages.filter(
    (page) => page === 1 || page === totalPages || Math.abs(page - currentPage) <= 1
  );

  return (
    <div className="flex flex-wrap items-center justify-center gap-2 mt-4 sm:mt-6">
      <button
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        className="px-3 sm:px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm sm:text-base"
      >
        قبلی
      </button>
      
      {visiblePages.map((page, index) => {
        const prevPage = visiblePages[index - 1];
        const showEllipsis = prevPage && page - prevPage > 1;
        
        return (
          <React.Fragment key={page}>
            {showEllipsis && <span className="px-1 sm:px-2 text-gray-500 text-sm">...</span>}
            <button
              onClick={() => onPageChange(page)}
              className={`min-w-[36px] sm:min-w-[40px] h-8 sm:h-10 rounded-lg transition-colors text-sm sm:text-base ${
                currentPage === page
                  ? 'bg-cyan-500 text-white font-bold'
                  : 'border border-gray-300 text-gray-700 hover:bg-gray-50'
              }`}
            >
              {page}
            </button>
          </React.Fragment>
        );
      })}
      
      <button
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
        className="px-3 sm:px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm sm:text-base"
      >
        بعدی
      </button>
    </div>
  );
};

