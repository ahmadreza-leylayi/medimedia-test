'use client';

import React from 'react';

interface AppointmentDateNavigatorProps {
  isToday: boolean;
  onNavigateDate: (direction: 'prev' | 'next') => void;
  onNavigateToToday: () => void;
}

export const AppointmentDateNavigator: React.FC<AppointmentDateNavigatorProps> = ({
  isToday,
  onNavigateDate,
  onNavigateToToday,
}) => {
  return (
    <div className="flex items-center justify-between mb-4">
      <button
        onClick={() => onNavigateDate('next')}
        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        aria-label="روز بعد"
      >
        <svg className="w-4 h-4 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      <div className="flex items-center gap-2">
        {!isToday && (
          <button
            onClick={onNavigateToToday}
            className="px-3 py-1.5 bg-cyan-500 hover:bg-cyan-600 text-white text-xs font-bold rounded-lg transition-colors flex items-center gap-1.5 shadow-sm"
            aria-label="برو به امروز"
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            برو به امروز
          </button>
        )}
        {isToday && (
          <div className="flex items-center gap-1">
            <div className="w-1 h-4 bg-gray-300 rounded"></div>
            <div className="w-1 h-4 bg-gray-300 rounded"></div>
            <div className="w-1 h-4 bg-gray-300 rounded"></div>
          </div>
        )}
      </div>

      <button
        onClick={() => onNavigateDate('prev')}
        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        aria-label="روز قبل"
      >
        <svg className="w-4 h-4 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
    </div>
  );
};

