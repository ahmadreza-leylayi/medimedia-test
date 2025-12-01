'use client';

import React, { useMemo } from 'react';
import { StatsChart } from '@/components/dashboard/charts/StatsChart';
import type { ChartData } from '@/types/dashboard';
import { getMockAppointmentData } from '@/mocks/chart';

interface StatisticsChartPanelProps {
  activePeriod: 'day' | 'week' | 'month' | 'year';
  onPeriodChange: (period: 'day' | 'week' | 'month' | 'year') => void;
}

export const StatisticsChartPanel: React.FC<StatisticsChartPanelProps> = ({
  activePeriod,
  onPeriodChange,
}) => {
  const chartData = useMemo(() => getMockAppointmentData(activePeriod), [activePeriod]);

  return (
    <div>
      <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-5 md:p-6 flex flex-col h-fit">
        {/* Header with title */}
        <div className="mb-3 sm:mb-4">
          <h3 className="text-sm sm:text-base font-bold text-gray-800 mb-3 sm:mb-4">
            آمار و ارقام نسخه های ثبت شده
          </h3>
          
          {/* Legend with colored dots */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs text-gray-600 mb-3 sm:mb-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-purple-600"></div>
              <span>تامین اجتماعی</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <span>پزشک تامین اجتماعی</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-orange-500"></div>
              <span>پزشک سلامت</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-blue-500"></div>
              <span>سلامت</span>
            </div>
          </div>
        </div>
        
        {/* Period selection buttons - Tab style */}
        <div className="flex items-center mb-3 sm:mb-4 rounded-lg overflow-hidden bg-[#ECECEC]">
          {[
            { key: 'year', label: 'سال' },
            { key: 'month', label: 'ماه' },
            { key: 'week', label: 'هفته' },
            { key: 'day', label: 'روز' },
          ].map((period) => (
            <button
              key={period.key}
              onClick={() => onPeriodChange(period.key as any)}
              className={`flex-1 px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 text-xs sm:text-sm transition-colors ${
                activePeriod === period.key
                  ? 'bg-white text-gray-800 font-bold rounded-2xl my-1 mx-1'
                  : 'text-gray-600 hover:bg-gray-200 bg-transparent'
              }`}
            >
              {period.label}
            </button>
          ))}
        </div>
        
        {/* Chart */}
        <StatsChart data={chartData} />
      </div>
    </div>
  );
};

