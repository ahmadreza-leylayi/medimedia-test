'use client';

import React from 'react';

interface AppointmentDateTimeDisplayProps {
  currentDate: string;
  currentTime: string;
  monthYear: string;
}

export const AppointmentDateTimeDisplay: React.FC<AppointmentDateTimeDisplayProps> = ({
  currentDate,
  currentTime,
  monthYear,
}) => {
  return (
    <div className="text-center">
      <p className="text-xs sm:text-sm text-gray-500 mb-2">
        {currentDate}
      </p>
      {currentTime && (
        <p className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 mb-2">
          {currentTime}
        </p>
      )}
      <p className="text-xs text-gray-400">
        {monthYear}
      </p>
    </div>
  );
};

