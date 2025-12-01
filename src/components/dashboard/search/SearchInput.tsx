'use client';

import React from 'react';

interface SearchInputProps {
  value: string;
  placeholder: string;
  onChange: (value: string) => void;
  onFocus: () => void;
}

export const SearchInput: React.FC<SearchInputProps> = ({
  value,
  placeholder,
  onChange,
  onFocus,
}) => {
  return (
    <div className="flex items-center gap-1 sm:gap-2 px-2 sm:px-3 md:px-4 py-2 sm:py-3 rounded-xl overflow-hidden bg-gray-200">
      {/* Search Icon */}
      <svg className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
      
      {/* Separator */}
      <div className="flex h-4 w-0.5 sm:w-1 text-gray-400 text-center font-bold items-center justify-center shrink-0">|</div>
      
      {/* Input Field */}
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={onFocus}
        placeholder={placeholder}
        className="flex-1 min-w-0 bg-transparent border-none outline-none text-xs sm:text-sm text-right placeholder-gray-400 truncate"
      />
      
      {/* Shift C Label */}
      <span className="text-[10px] sm:text-xs text-gray-500 px-1.5 sm:px-2 py-0.5 sm:py-1 bg-white rounded shrink-0 whitespace-nowrap">
        Shift C
      </span>
    </div>
  );
};

