'use client';

import React, { useMemo, useState, useEffect, useRef } from 'react';
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
import { mockDoctors, type Doctor } from '@/mocks/doctors';
import Image from 'next/image';
import Link from 'next/link';

const columns: ListColumn[] = [
  { key: 'id', label: 'شناسه', width: '80px' },
  { key: 'avatar', label: 'تصویر', width: '100px' },
  { key: 'name', label: 'نام دکتر', width: '150px' },
  { key: 'specialty', label: 'تخصص', width: '150px' },
  { key: 'phone', label: 'تلفن تماس', width: '130px' },
  { key: 'medicalNumber', label: 'شماره نظام پزشکی', width: '150px' },
  { key: 'city', label: 'شهر', width: '100px' },
  { key: 'hasActiveAppointment', label: 'وضعیت نوبت', width: '120px' },
  { key: 'actions', label: 'عملیات', width: '120px' },
];

export const EmployeeListPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { selectedEmployees, pagination, modalOpen, filters } = useAppSelector(
    (state) => state.dashboard
  );

  const [searchQuery, setSearchQuery] = useState('');
  const [showSpecialtyDropdown, setShowSpecialtyDropdown] = useState(false);
  const [showCityDropdown, setShowCityDropdown] = useState(false);
  const specialtyDropdownRef = useRef<HTMLDivElement>(null);
  const cityDropdownRef = useRef<HTMLDivElement>(null);

  // بستن dropdown ها هنگام کلیک خارج
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (specialtyDropdownRef.current && !specialtyDropdownRef.current.contains(event.target as Node)) {
        setShowSpecialtyDropdown(false);
      }
      if (cityDropdownRef.current && !cityDropdownRef.current.contains(event.target as Node)) {
        setShowCityDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // استفاده از mockDoctors به جای employees
  const doctors = mockDoctors;

  // Filter doctors based on filters and search
  const filteredDoctors = useMemo(() => {
    return doctors.filter((doctor) => {
      // جستجو بر اساس نام یا تخصص
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const matchesName = doctor.name.toLowerCase().includes(query);
        const matchesSpecialty = doctor.specialty.toLowerCase().includes(query);
        const matchesMedicalNumber = doctor.medicalNumber?.toLowerCase().includes(query);
        if (!matchesName && !matchesSpecialty && !matchesMedicalNumber) {
          return false;
        }
      }

      // فیلتر وضعیت نوبت
      if (filters.status && filters.status !== 'all') {
        const hasActive = doctor.hasActiveAppointment === true;
        if (filters.status === 'active' && !hasActive) return false;
        if (filters.status === 'inactive' && hasActive) return false;
      }

      // فیلتر تخصص
      if (filters.position && doctor.specialty !== filters.position) {
        return false;
      }

      // فیلتر شهر
      if (filters.city && doctor.city !== filters.city) {
        return false;
      }

      return true;
    });
  }, [doctors, filters, searchQuery]);

  // Reset currentPage if it's greater than totalPages
  React.useEffect(() => {
    const totalPages = Math.ceil(filteredDoctors.length / pagination.itemsPerPage) || 1;
    if (pagination.currentPage > totalPages && totalPages > 0) {
      dispatch(setCurrentPage(1));
    }
  }, [filteredDoctors.length, pagination.itemsPerPage, pagination.currentPage, dispatch]);

  // Update pagination based on filtered doctors
  const filteredPagination = useMemo(() => {
    const totalPages = Math.ceil(filteredDoctors.length / pagination.itemsPerPage) || 1;
    return {
      ...pagination,
      totalPages,
      totalItems: filteredDoctors.length,
    };
  }, [filteredDoctors.length, pagination.itemsPerPage, pagination.currentPage]);

  // Paginate doctors
  const paginatedDoctors = useMemo(() => {
    const startIndex = (filteredPagination.currentPage - 1) * filteredPagination.itemsPerPage;
    const endIndex = startIndex + filteredPagination.itemsPerPage;
    return filteredDoctors.slice(startIndex, endIndex);
  }, [filteredDoctors, filteredPagination.currentPage, filteredPagination.itemsPerPage]);

  // Get unique specialties and cities for filter
  const uniqueSpecialties = useMemo(() => {
    return Array.from(new Set(doctors.map(doctor => doctor.specialty))).sort();
  }, [doctors]);

  const uniqueCities = useMemo(() => {
    return Array.from(new Set(doctors.map(doctor => doctor.city).filter((city): city is string => !!city))).sort();
  }, [doctors]);

  // Get active filters count
  const activeFiltersCount = useMemo(() => {
    let count = 0;
    if (filters.status && filters.status !== 'all') count++;
    if (filters.position) count++;
    if (filters.city) count++;
    if (searchQuery.trim()) count++;
    return count;
  }, [filters, searchQuery]);

  const clearAllFilters = () => {
    setSearchQuery('');
    dispatch(setFilters({ status: 'all', position: undefined, city: undefined }));
  };

  const handleSelectAll = () => {
    if (selectedEmployees.length === doctors.length) {
      dispatch(deselectAllEmployees());
    } else {
      dispatch(selectAllEmployees());
    }
  };


  const getAppointmentStatusBadge = (hasActive: boolean | undefined) => {
    if (hasActive) {
      return (
        <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
          فعال
        </span>
      );
    }
    return (
      <span className="px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
        غیرفعال
      </span>
    );
  };

  const renderCell = (item: Doctor, columnKey: string) => {
    switch (columnKey) {
      case 'avatar':
        return (
          <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
            {item.avatar ? (
              <Image src={item.avatar} alt={item.name} width={40} height={40} className="object-cover" />
            ) : (
              <div className="w-full h-full bg-teal-100 flex items-center justify-center text-teal-600 font-bold">
                {item.name.charAt(item.name.indexOf(' ') + 1) || item.name.charAt(0)}
              </div>
            )}
          </div>
        );
      case 'hasActiveAppointment':
        return getAppointmentStatusBadge(item.hasActiveAppointment);
      case 'medicalNumber':
        return item.medicalNumber || '-';
      case 'phone':
        return item.phone || '-';
      case 'actions':
        return (
          <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
            <Link
              href={`/doctors/${item.id}`}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              title="مشاهده"
            >
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
            </Link>
          </div>
        );
      default:
        return (item as any)[columnKey] || '-';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 sm:px-6 md:px-8 py-4 sm:py-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-800">
            لیست دکترها
          </h1>
        </div>
      </div>

      {/* Advanced Filters */}
      <div className="bg-white border-b border-gray-200 px-4 sm:px-6 md:px-8 py-4 sm:py-5">
        <div className="space-y-4">
          {/* Search Bar */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <div className="flex-1 relative">
              <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="جستجو بر اساس نام، تخصص یا شماره نظام پزشکی..."
                className="w-full pr-10 pl-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all text-sm"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
          </div>

          {/* Filter Controls */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Status Filter */}
            <div className="relative">
              <select
                value={filters.status || 'all'}
                onChange={(e) => dispatch(setFilters({ status: e.target.value as any }))}
                className="appearance-none bg-white border border-gray-300 rounded-xl py-2.5 pr-4 pl-10 text-sm focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all cursor-pointer min-w-[140px] text-right"
              >
                <option value="all">همه وضعیت‌ها</option>
                <option value="active">نوبت فعال</option>
                <option value="inactive">نوبت غیرفعال</option>
              </select>
              <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>

            {/* Specialty Filter */}
            <div className="relative" ref={specialtyDropdownRef}>
              <button
                onClick={() => {
                  setShowSpecialtyDropdown(!showSpecialtyDropdown);
                  setShowCityDropdown(false);
                }}
                className={`flex items-center gap-2 bg-white border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all min-w-[180px] justify-between ${
                  filters.position ? 'text-cyan-700 border-cyan-500 bg-cyan-50' : 'text-gray-700'
                }`}
              >
                <span>{filters.position || 'همه تخصص‌ها'}</span>
                <svg className={`w-4 h-4 text-gray-400 transition-transform ${showSpecialtyDropdown ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {showSpecialtyDropdown && (
                <div className="absolute top-full right-0 mt-2 w-64 bg-white border border-gray-200 rounded-xl shadow-lg z-20 max-h-80 overflow-y-auto">
                    <div className="p-2">
                      <button
                        onClick={() => {
                          dispatch(setFilters({ position: undefined }));
                          setShowSpecialtyDropdown(false);
                        }}
                        className={`w-full text-right px-4 py-2 rounded-lg text-sm transition-colors ${
                          !filters.position
                            ? 'bg-cyan-100 text-cyan-700 font-medium'
                            : 'hover:bg-gray-50 text-gray-700'
                        }`}
                      >
                        همه تخصص‌ها
                      </button>
                      {uniqueSpecialties.map((specialty) => (
                        <button
                          key={specialty}
                          onClick={() => {
                            dispatch(setFilters({ position: specialty }));
                            setShowSpecialtyDropdown(false);
                          }}
                          className={`w-full text-right px-4 py-2 rounded-lg text-sm transition-colors ${
                            filters.position === specialty
                              ? 'bg-cyan-100 text-cyan-700 font-medium'
                              : 'hover:bg-gray-50 text-gray-700'
                          }`}
                        >
                          {specialty}
                        </button>
                      ))}
                    </div>
                  </div>
              )}
            </div>

            {/* City Filter */}
            <div className="relative" ref={cityDropdownRef}>
              <button
                onClick={() => {
                  setShowCityDropdown(!showCityDropdown);
                  setShowSpecialtyDropdown(false);
                }}
                className={`flex items-center gap-2 bg-white border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all min-w-[140px] justify-between ${
                  filters.city ? 'text-cyan-700 border-cyan-500 bg-cyan-50' : 'text-gray-700'
                }`}
              >
                <span>{filters.city || 'همه شهرها'}</span>
                <svg className={`w-4 h-4 text-gray-400 transition-transform ${showCityDropdown ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {showCityDropdown && (
                <div className="absolute top-full right-0 mt-2 w-48 bg-white border border-gray-200 rounded-xl shadow-lg z-20 max-h-80 overflow-y-auto">
                    <div className="p-2">
                      <button
                        onClick={() => {
                          dispatch(setFilters({ city: undefined }));
                          setShowCityDropdown(false);
                        }}
                        className={`w-full text-right px-4 py-2 rounded-lg text-sm transition-colors ${
                          !filters.city
                            ? 'bg-cyan-100 text-cyan-700 font-medium'
                            : 'hover:bg-gray-50 text-gray-700'
                        }`}
                      >
                        همه شهرها
                      </button>
                      {uniqueCities.map((city) => (
                        <button
                          key={city}
                          onClick={() => {
                            dispatch(setFilters({ city }));
                            setShowCityDropdown(false);
                          }}
                          className={`w-full text-right px-4 py-2 rounded-lg text-sm transition-colors ${
                            filters.city === city
                              ? 'bg-cyan-100 text-cyan-700 font-medium'
                              : 'hover:bg-gray-50 text-gray-700'
                          }`}
                        >
                          {city}
                        </button>
                      ))}
                    </div>
                  </div>
              )}
            </div>

            {/* Active Filters & Clear */}
            {activeFiltersCount > 0 && (
              <button
                onClick={clearAllFilters}
                className="flex items-center gap-2 px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl text-sm transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                پاک کردن فیلترها ({activeFiltersCount})
              </button>
            )}

            {/* Results Count */}
            <div className="flex-1" />
            <div className="px-4 py-2.5 bg-cyan-50 text-cyan-700 rounded-xl text-sm font-medium">
              {filteredDoctors.length} نتیجه
            </div>
          </div>

          {/* Active Filters Tags */}
          {activeFiltersCount > 0 && (
            <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-gray-100">
              <span className="text-xs text-gray-500">فیلترهای فعال:</span>
              {filters.status && filters.status !== 'all' && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-cyan-100 text-cyan-700 rounded-lg text-xs">
                  {filters.status === 'active' ? 'نوبت فعال' : 'نوبت غیرفعال'}
                  <button
                    onClick={() => dispatch(setFilters({ status: 'all' }))}
                    className="hover:text-cyan-900"
                  >
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </span>
              )}
              {filters.position && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-cyan-100 text-cyan-700 rounded-lg text-xs">
                  {filters.position}
                  <button
                    onClick={() => dispatch(setFilters({ position: undefined }))}
                    className="hover:text-cyan-900"
                  >
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </span>
              )}
              {filters.city && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-cyan-100 text-cyan-700 rounded-lg text-xs">
                  {filters.city}
                  <button
                    onClick={() => dispatch(setFilters({ city: undefined }))}
                    className="hover:text-cyan-900"
                  >
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </span>
              )}
              {searchQuery && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-cyan-100 text-cyan-700 rounded-lg text-xs">
                  جستجو: {searchQuery}
                  <button
                    onClick={() => setSearchQuery('')}
                    className="hover:text-cyan-900"
                  >
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </span>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Table */}
      <div className="p-4 sm:p-6 md:p-8">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <Table
            data={paginatedDoctors}
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

