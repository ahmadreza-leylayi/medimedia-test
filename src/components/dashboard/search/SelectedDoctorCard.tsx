'use client';

import React from 'react';
import Image from 'next/image';
import type { Employee } from '@/types/dashboard';

interface SelectedDoctorCardProps {
  doctor: Employee;
  onClear: () => void;
}

export const SelectedDoctorCard: React.FC<SelectedDoctorCardProps> = ({
  doctor,
  onClear,
}) => {
  return (
    <div className="h-32 sm:h-40 bg-gray-200 rounded-xl p-3 sm:p-4 flex flex-col gap-2 sm:gap-3 overflow-hidden">
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white flex items-center justify-center overflow-hidden shrink-0">
            {doctor.avatar ? (
              <Image src={doctor.avatar} alt={doctor.name} width={48} height={48} className="rounded-full" />
            ) : (
              <svg className="w-6 h-6 sm:w-8 sm:h-8 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                  clipRule="evenodd"
                />
              </svg>
            )}
          </div>
          <div className="text-right min-w-0 flex-1">
            <p className="text-xs sm:text-sm font-bold text-gray-800 truncate" title={doctor.name}>
              {doctor.name}
            </p>
            <p className="text-[10px] sm:text-xs text-gray-600 truncate" title={doctor.position}>
              {doctor.position}
            </p>
          </div>
        </div>
        <button
          onClick={onClear}
          className="p-1.5 sm:p-2 hover:bg-gray-300 rounded-lg transition-colors shrink-0"
          title="حذف انتخاب"
          aria-label="حذف انتخاب"
        >
          <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      <div className="flex-1 flex items-center justify-center">
        <p className="text-[10px] sm:text-xs text-gray-500 text-center px-2">
          پزشک انتخاب شده آماده برای نسخه نویسی
        </p>
      </div>
    </div>
  );
};

