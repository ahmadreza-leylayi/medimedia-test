'use client';

import React, { useState, useMemo, useRef, useEffect } from 'react';
import { useAppSelector } from '@/redux/hooks';
import type { Employee } from '@/types/dashboard';
import { SearchInput } from './SearchInput';
import { SearchResultsDropdown } from './SearchResultsDropdown';
import { SelectedDoctorCard } from './SelectedDoctorCard';
import { EmptySearchState } from './EmptySearchState';

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
        <SearchInput
          value={searchQuery}
          placeholder={selectedDoctor ? selectedDoctor.name : "نسخه نویس سریع"}
          onChange={(value) => {
            setSearchQuery(value);
            setShowResults(true);
          }}
          onFocus={() => setShowResults(true)}
        />

        {/* Search Results Dropdown */}
        {showResults && filteredDoctors.length > 0 && (
          <SearchResultsDropdown
            doctors={filteredDoctors}
            onSelectDoctor={handleSelectDoctor}
          />
        )}
      </div>

      {/* Selected Doctor Display or Empty State */}
      {selectedDoctor ? (
        <SelectedDoctorCard
          doctor={selectedDoctor}
          onClear={handleClearSelection}
        />
      ) : (
        <EmptySearchState />
      )}
    </div>
  );
};

