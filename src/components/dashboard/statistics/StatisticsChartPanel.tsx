'use client';

import React, { useMemo } from 'react';
import { StatsChart } from '@/components/dashboard/charts/StatsChart';
import type { ChartData } from '@/types/dashboard';
import { getMockAppointmentData } from '@/mocks/chart';

interface StatisticsChartPanelProps {
  activePeriod: 'day' | 'week' | 'month' | 'year';
  onPeriodChange: (period: 'day' | 'week' | 'month' | 'year') => void;
}

const LEGEND_ITEMS = [
  { label: 'تامین اجتماعی', color: 'bg-purple-600' },
  { label: 'پزشک تامین اجتماعی', color: 'bg-green-500' },
  { label: 'پزشک سلامت', color: 'bg-orange-500' },
  { label: 'سلامت', color: 'bg-blue-500' },
] as const;

const PERIODS = [
  { key: 'year' as const, label: 'سال' },
  { key: 'month' as const, label: 'ماه' },
  { key: 'week' as const, label: 'هفته' },
  { key: 'day' as const, label: 'روز' },
] as const;

export const StatisticsChartPanel: React.FC<StatisticsChartPanelProps> = ({
  activePeriod,
  onPeriodChange,
}) => {
  const chartData = useMemo(() => getMockAppointmentData(activePeriod), [activePeriod]);

  return (
    <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-5 md:p-6 flex flex-col h-fit">
      {/* Header with title */}
      <div className="mb-3 sm:mb-4">
        <h3 className="text-sm sm:text-base font-bold text-gray-800 mb-3 sm:mb-4">
          آمار و ارقام نسخه های ثبت شده
        </h3>
        
        {/* Legend with colored dots */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs text-gray-600 mb-3 sm:mb-4">
          {LEGEND_ITEMS.map((item, index) => (
            <div key={index} className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded-full ${item.color}`}></div>
              <span>{item.label}</span>
            </div>
          ))}
        </div>
      </div>
      
      {/* Period selection buttons - Tab style */}
      <div className="flex items-center mb-3 sm:mb-4 rounded-lg overflow-hidden bg-gray-200">
        {PERIODS.map((period) => (
          <button
            key={period.key}
            onClick={() => onPeriodChange(period.key)}
            className={`flex-1 px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 text-xs sm:text-sm transition-colors ${
              activePeriod === period.key
                ? 'bg-white text-gray-800 font-bold rounded-2xl my-1 mx-1'
                : 'text-gray-600 hover:bg-gray-300'
            }`}
          >
            {period.label}
          </button>
        ))}
      </div>
      
      {/* Chart */}
      <StatsChart data={chartData} />
    </div>
  );
};

