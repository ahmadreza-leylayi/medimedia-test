'use client';

import React from 'react';
import Image from 'next/image';
import type { Employee } from '@/types/dashboard';

interface SearchResultsDropdownProps {
  doctors: Employee[];
  onSelectDoctor: (doctor: Employee) => void;
}

export const SearchResultsDropdown: React.FC<SearchResultsDropdownProps> = ({
  doctors,
  onSelectDoctor,
}) => {
  if (doctors.length === 0) return null;

  return (
    <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-lg border border-gray-200 z-50 max-h-60 overflow-y-auto">
      {doctors.map((doctor) => (
        <button
          key={doctor.id}
          onClick={() => onSelectDoctor(doctor)}
          className="w-full px-4 py-3 text-right hover:bg-gray-50 transition-colors flex items-center gap-3 border-b border-gray-100 last:border-b-0"
        >
          <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden shrink-0">
            {doctor.avatar ? (
              <Image src={doctor.avatar} alt={doctor.name} width={40} height={40} className="rounded-full" />
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
          <div className="flex-1 text-right">
            <p className="text-sm font-bold text-gray-800">
              {doctor.name}
            </p>
            <p className="text-xs text-gray-500">
              {doctor.position} - {doctor.phoneNumber}
            </p>
          </div>
        </button>
      ))}
    </div>
  );
};

