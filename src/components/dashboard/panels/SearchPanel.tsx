'use client';

import React, { useState, useMemo, useRef, useEffect } from 'react';
import Image from 'next/image';
import { useAppSelector } from '@/redux/hooks';
import type { Employee } from '@/types/dashboard';

export const SearchPanel: React.FC = () => {
  const { employees } = useAppSelector((state) => state.dashboard);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDoctor, setSelectedDoctor] = useState<Employee | null>(null);
  const [showResults, setShowResults] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  // Filter doctors based on search query
  const filteredDoctors = useMemo(() => {
    if (!searchQuery.trim()) return [];
    
    const query = searchQuery.toLowerCase();
    return employees
      .filter((emp) => {
        const nameMatch = emp.name.toLowerCase().includes(query);
        const positionMatch = emp.position.toLowerCase().includes(query);
        const phoneMatch = emp.phoneNumber.includes(query);
        return nameMatch || positionMatch || phoneMatch;
      })
      .slice(0, 5); // Limit to 5 results
  }, [employees, searchQuery]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowResults(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelectDoctor = (doctor: Employee) => {
    setSelectedDoctor(doctor);
    setSearchQuery('');
    setShowResults(false);
  };

  const handleClearSelection = () => {
    setSelectedDoctor(null);
    setSearchQuery('');
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-5 md:p-6 overflow-hidden">
      <div className="mb-3 sm:mb-4 relative" ref={searchRef}>
        <div 
          className="flex items-center gap-1 sm:gap-2 px-2 sm:px-3 md:px-4 py-2 sm:py-3 rounded-xl overflow-hidden bg-[#E2E2E2]"
        >
          {/* Search Icon */}
          <svg className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          
          {/* Separator */}
          <div className="flex h-4 w-0.5 sm:w-1 text-gray-400 text-center font-bold items-center justify-center shrink-0">|</div>
          
          {/* Input Field */}
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setShowResults(true);
            }}
            onFocus={() => setShowResults(true)}
            placeholder={selectedDoctor ? selectedDoctor.name : "نسخه نویس سریع"}
            className="flex-1 min-w-0 bg-transparent border-none outline-none text-xs sm:text-sm text-right placeholder-gray-400 truncate"
          />
          
          {/* Shift C Label */}
          <span className="text-[10px] sm:text-xs text-gray-500 px-1.5 sm:px-2 py-0.5 sm:py-1 bg-white rounded shrink-0 whitespace-nowrap">
            Shift C
          </span>
        </div>

        {/* Search Results Dropdown */}
        {showResults && filteredDoctors.length > 0 && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-lg border border-gray-200 z-50 max-h-60 overflow-y-auto">
            {filteredDoctors.map((doctor) => (
              <button
                key={doctor.id}
                onClick={() => handleSelectDoctor(doctor)}
                className="w-full px-4 py-3 text-right hover:bg-gray-50 transition-colors flex items-center gap-3 border-b border-gray-100 last:border-b-0"
              >
                <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden shrink-0">
                  {doctor.avatar ? (
                    <Image src={doctor.avatar} alt={doctor.name} width={40} height={40} />
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
        )}
      </div>

      {/* Selected Doctor Display */}
      {selectedDoctor ? (
        <div className="h-32 sm:h-40 bg-[#E2E2E2] rounded-xl p-3 sm:p-4 flex flex-col gap-2 sm:gap-3 overflow-hidden">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white flex items-center justify-center overflow-hidden shrink-0">
                {selectedDoctor.avatar ? (
                  <Image src={selectedDoctor.avatar} alt={selectedDoctor.name} width={48} height={48} />
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
                <p className="text-xs sm:text-sm font-bold text-gray-800 truncate" title={selectedDoctor.name}>
                  {selectedDoctor.name}
                </p>
                <p className="text-[10px] sm:text-xs text-gray-600 truncate" title={selectedDoctor.position}>
                  {selectedDoctor.position}
                </p>
              </div>
            </div>
            <button
              onClick={handleClearSelection}
              className="p-1.5 sm:p-2 hover:bg-gray-300 rounded-lg transition-colors shrink-0"
              title="حذف انتخاب"
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
      ) : (
        /* Box image */
        <div className="h-32 sm:h-40 bg-[#E2E2E2] rounded-xl flex items-center justify-center overflow-hidden">
          <Image
            src="/dashboard/box.png"
            alt="Box"
            width={80}
            height={80}
            className="object-contain w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20"
          />
        </div>
      )}
    </div>
  );
};

