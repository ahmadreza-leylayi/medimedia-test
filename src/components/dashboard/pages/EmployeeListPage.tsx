'use client';

import React, { useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import {
  toggleEmployeeSelection,
  selectAllEmployees,
  deselectAllEmployees,
  setCurrentPage,
  openModal,
  setSelectedEmployee,
  setFilters,
  setItemsPerPage,
} from '@/redux/slices/dashboardSlice';
import { Table, Pagination } from '@/components/dashboard/ui/Table';
import { DeleteModal } from '@/components/dashboard/ui/Modal';
import type { Employee, ListColumn } from '@/types/dashboard';
import Image from 'next/image';

const columns: ListColumn[] = [
  { key: 'id', label: 'شناسه', width: '80px' },
  { key: 'avatar', label: 'تصویر کاربر', width: '100px' },
  { key: 'name', label: 'نام کاربر', width: '150px' },
  { key: 'phoneNumber', label: 'تلفن تماس', width: '130px' },
  { key: 'phoneNumber2', label: 'تلفن تماس 2', width: '130px' },
  { key: 'position', label: 'نوع', width: '120px' },
  { key: 'city', label: 'شهر', width: '100px' },
  { key: 'province', label: 'استان', width: '100px' },
  { key: 'status', label: 'وضعیت', width: '100px' },
  { key: 'joinDate', label: 'تاریخ پذیرش', width: '130px' },
  { key: 'actions', label: 'عملیات', width: '120px' },
];

export const EmployeeListPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { employees, selectedEmployees, pagination, modalOpen, filters } = useAppSelector(
    (state) => state.dashboard
  );

  // Filter employees based on filters
  const filteredEmployees = useMemo(() => {
    return employees.filter((emp) => {
      if (filters.status && filters.status !== 'all' && emp.status !== filters.status) {
        return false;
      }
      if (filters.position && emp.position !== filters.position) {
        return false;
      }
      if (filters.city && emp.city !== filters.city) {
        return false;
      }
      return true;
    });
  }, [employees, filters]);

  // Update pagination based on filtered employees
  const filteredPagination = useMemo(() => {
    const totalPages = Math.ceil(filteredEmployees.length / pagination.itemsPerPage);
    return {
      ...pagination,
      totalPages,
      totalItems: filteredEmployees.length,
    };
  }, [filteredEmployees.length, pagination.itemsPerPage]);

  // Paginate employees
  const paginatedEmployees = useMemo(() => {
    const startIndex = (filteredPagination.currentPage - 1) * filteredPagination.itemsPerPage;
    const endIndex = startIndex + filteredPagination.itemsPerPage;
    return filteredEmployees.slice(startIndex, endIndex);
  }, [filteredEmployees, filteredPagination.currentPage, filteredPagination.itemsPerPage]);

  // Get unique positions for filter
  const uniquePositions = useMemo(() => {
    return Array.from(new Set(employees.map(emp => emp.position)));
  }, [employees]);

  const handleSelectAll = () => {
    if (selectedEmployees.length === employees.length) {
      dispatch(deselectAllEmployees());
    } else {
      dispatch(selectAllEmployees());
    }
  };

  const handleDeleteClick = (emp: Employee) => {
    dispatch(setSelectedEmployee(emp));
    dispatch(openModal('delete'));
  };

  const handleEditClick = (emp: Employee) => {
    dispatch(setSelectedEmployee(emp));
    dispatch(openModal('edit'));
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      active: { label: 'فعال', color: 'bg-green-100 text-green-700' },
      inactive: { label: 'غیرفعال', color: 'bg-red-100 text-red-700' },
      pending: { label: 'در انتظار', color: 'bg-yellow-100 text-yellow-700' },
    };

    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.pending;

    return (
      <span
        className={`px-3 py-1 rounded-full text-xs font-medium ${config.color}`}
      >
        {config.label}
      </span>
    );
  };

  const renderCell = (item: Employee, columnKey: string) => {
    switch (columnKey) {
      case 'avatar':
        return (
          <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
            {item.avatar ? (
              <Image src={item.avatar} alt={item.name} width={40} height={40} />
            ) : (
              <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                  clipRule="evenodd"
                />
              </svg>
            )}
          </div>
        );
      case 'status':
        return getStatusBadge(item.status);
      case 'phoneNumber2':
        return item.phoneNumber2 || '-';
      case 'actions':
        return (
          <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => handleEditClick(item)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              title="ویرایش"
            >
              <svg className="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                />
              </svg>
            </button>
            <button
              onClick={() => handleDeleteClick(item)}
              className="p-2 hover:bg-red-50 rounded-lg transition-colors"
              title="حذف"
            >
              <svg className="w-5 h-5 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors" title="مشاهده">
              <svg className="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                />
              </svg>
            </button>
          </div>
        );
      default:
        return (item as any)[columnKey];
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 sm:px-6 md:px-8 py-4 sm:py-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-800">
            لیست کاربران
          </h1>
          <button
            onClick={() => dispatch(openModal('add'))}
            className="px-4 sm:px-6 py-2 sm:py-3 bg-cyan-500 hover:bg-cyan-600 text-white rounded-lg font-medium transition-colors flex items-center gap-2 text-sm sm:text-base w-full sm:w-auto justify-center"
          >
            <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            افزودن کاربر جدید
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white border-b border-gray-200 px-4 sm:px-6 md:px-8 py-3 sm:py-4">
        <div className="flex flex-wrap items-center gap-2 sm:gap-4">
          <span className="px-4 py-2 rounded-lg bg-gray-100 text-gray-700">
            فیلتر
          </span>
          
          {/* Status Filters */}
          <button
            onClick={() => dispatch(setFilters({ status: 'all' }))}
            className={`px-4 py-2 rounded-lg transition-colors ${
              filters.status === 'all' || !filters.status
                ? 'bg-cyan-100 text-cyan-700 font-bold'
                : 'hover:bg-gray-100 text-gray-700'
            }`}
          >
            همه
          </button>
          <button
            onClick={() => dispatch(setFilters({ status: 'active' }))}
            className={`px-4 py-2 rounded-lg transition-colors ${
              filters.status === 'active'
                ? 'bg-cyan-100 text-cyan-700 font-bold'
                : 'hover:bg-gray-100 text-gray-700'
            }`}
          >
            فعال
          </button>
          <button
            onClick={() => dispatch(setFilters({ status: 'inactive' }))}
            className={`px-4 py-2 rounded-lg transition-colors ${
              filters.status === 'inactive'
                ? 'bg-cyan-100 text-cyan-700 font-bold'
                : 'hover:bg-gray-100 text-gray-700'
            }`}
          >
            غیرفعال
          </button>
          <button
            onClick={() => dispatch(setFilters({ status: 'pending' }))}
            className={`px-4 py-2 rounded-lg transition-colors ${
              filters.status === 'pending'
                ? 'bg-cyan-100 text-cyan-700 font-bold'
                : 'hover:bg-gray-100 text-gray-700'
            }`}
          >
            در انتظار
          </button>

          {/* Position Filters */}
          {uniquePositions.map((position) => (
            <button
              key={position}
              onClick={() => dispatch(setFilters({ position: filters.position === position ? undefined : position }))}
              className={`px-4 py-2 rounded-lg transition-colors ${
                filters.position === position
                  ? 'bg-cyan-100 text-cyan-700 font-bold'
                  : 'hover:bg-gray-100 text-gray-700'
              }`}
            >
              {position}
            </button>
          ))}

          {/* Item Count */}
          <span className="px-4 py-2 rounded-lg bg-gray-50 text-gray-700">
            تعداد آیتم: {filteredEmployees.length}
          </span>

          <div className="flex-1" />
          {selectedEmployees.length > 0 && (
            <button
              onClick={() => dispatch(openModal('delete'))}
              className="px-4 py-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg transition-colors"
            >
              حذف انتخاب شده ({selectedEmployees.length})
            </button>
          )}
        </div>
      </div>

      {/* Table */}
      <div className="p-4 sm:p-6 md:p-8">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <Table
            data={paginatedEmployees}
            columns={columns}
            selectedRows={selectedEmployees}
            onSelectRow={(id) => dispatch(toggleEmployeeSelection(id))}
            onSelectAll={handleSelectAll}
            renderCell={renderCell}
          />
          <div className="p-4 sm:p-5 md:p-6 border-t border-gray-100">
            <Pagination
              currentPage={filteredPagination.currentPage}
              totalPages={filteredPagination.totalPages}
              onPageChange={(page) => dispatch(setCurrentPage(page))}
            />
          </div>
        </div>
      </div>

      {/* Delete Modal */}
      <DeleteModal
        isOpen={modalOpen.delete}
        onClose={() => dispatch(openModal('delete'))}
        onConfirm={() => {
          // Handle delete
          dispatch(openModal('delete'));
        }}
      />
    </div>
  );
};

