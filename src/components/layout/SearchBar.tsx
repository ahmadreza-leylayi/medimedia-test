'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { searchDoctors, type Doctor } from '@/mocks/doctors';

interface SearchBarProps {
  placeholder?: string;
  onSearch?: (query: string) => void;
  className?: string;
}

export function SearchBar({
  placeholder = 'جستجوی پزشک',
  onSearch,
  className,
}: SearchBarProps) {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [results, setResults] = useState<Doctor[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // جستجوی پزشکان بر اساس query
  useEffect(() => {
    if (query.trim()) {
      const searchResults = searchDoctors(query);
      setResults(searchResults);
      setSelectedIndex(-1);
    } else {
      setResults([]);
      setSelectedIndex(-1);
    }
  }, [query]);

  // Keyboard shortcut (Shift+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.shiftKey && e.key === 'K') || (e.shiftKey && e.key === 'k')) {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Handle keyboard navigation in dropdown
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isFocused || results.length === 0) return;

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex(prev => (prev < results.length - 1 ? prev + 1 : prev));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex(prev => (prev > 0 ? prev - 1 : -1));
      } else if (e.key === 'Enter' && selectedIndex >= 0) {
        e.preventDefault();
        handleSelectDoctor(results[selectedIndex]);
      } else if (e.key === 'Escape') {
        setQuery('');
        setResults([]);
        inputRef.current?.blur();
      }
    };

    if (isFocused) {
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }
  }, [isFocused, results, selectedIndex]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsFocused(false);
        setResults([]);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelectDoctor = (doctor: Doctor) => {
    setQuery(doctor.name);
    setResults([]);
    setIsFocused(false);
    
    // Redirect to doctor page
    router.push(`/doctors/${doctor.id}`);
    onSearch?.(doctor.name);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedIndex >= 0 && results[selectedIndex]) {
      handleSelectDoctor(results[selectedIndex]);
    } else if (query.trim()) {
      router.push(`/doctors/search?q=${encodeURIComponent(query.trim())}`);
      onSearch?.(query);
    }
  };

  const showDropdown = isFocused && results.length > 0 && query.trim();

  return (
    <div ref={containerRef} className={`relative w-full min-w-0${className ? ` ${className}` : ''}`}>
      <form onSubmit={handleSubmit} className="relative w-full min-w-0">
        <div
          className={`flex items-center h-10 gap-1 lg:gap-2 bg-gray-100 rounded-2xl px-2 lg:px-4 py-2 transition-all shadow-[inset_0_1px_3px_0_rgba(18,18,18,0.1)] min-w-0${isFocused ? ' bg-[#F1F1F1] ring-2 ring-teal-500 ring-offset-2' : ''}`}
        >
          {/* Search Icon */}
          <svg
            className="w-6 h-6 lg:w-8 lg:h-8 text-gray-400 shrink-0 bg-[#FCFCFC] rounded-[8px] p-1 cursor-pointer shadow-md"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>

          {/* Separator */}
          <div className="w-px h-5 bg-[#1B1B1B] shrink-0" />

          {/* Input */}
          <input
            ref={inputRef}
            id="doctor-search"
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setIsFocused(true)}
            placeholder={placeholder}
            className="flex-1 bg-transparent outline-none text-gray-700 placeholder:text-gray-400 text-xs lg:text-sm min-w-0"
          />

          {/* Keyboard Shortcut */}
          <div className="hidden xl:flex items-center gap-1 text-sm text-[#7B7B7B] bg-gray-200 rounded-[6px] px-2 py-0.5 shadow-md shrink-0">
            <kbd className="font-mono text-[10px]">K</kbd>
            <span className="text-[10px]">+</span>
            <kbd className="font-mono text-[10px]">Shift</kbd>
          </div>
        </div>
      </form>

      {/* Dropdown Results */}
      {showDropdown && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-lg border border-gray-200 z-[60] max-h-96 overflow-y-auto">
          {results.map((doctor, index) => (
            <button
              key={doctor.id}
              type="button"
              onClick={() => handleSelectDoctor(doctor)}
              onMouseEnter={() => setSelectedIndex(index)}
              className={`w-full text-right px-4 py-3 hover:bg-teal-50 transition-colors border-b border-gray-100 last:border-b-0${
                selectedIndex === index ? ' bg-teal-50' : ''
              }`}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-gray-900 text-sm">{doctor.name}</div>
                  <div className="text-xs text-gray-500 mt-1">{doctor.specialty}</div>
                  {doctor.city && (
                    <div className="text-xs text-gray-400 mt-0.5">{doctor.city}</div>
                  )}
                </div>
                {doctor.medicalNumber && (
                  <div className="text-xs text-gray-400 shrink-0">
                    شماره نظام: {doctor.medicalNumber}
                  </div>
                )}
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

