/**
 * Mock Data for Charts
 * داده‌های تستی برای نمودارها
 */

import type { ChartData } from '@/types/dashboard';

/**
 * Generate mock chart data based on period
 * تولید داده‌های تستی نمودار بر اساس دوره
 */
export const getMockAppointmentData = (
  period: 'day' | 'week' | 'month' | 'year'
): ChartData[] => {
  const baseData: Record<string, ChartData[]> = {
    day: [
      { name: 'تامین اجتماعی', value: 79239, color: '#9333EA' }, // Purple
      { name: 'پزشک تامین اجتماعی', value: 12, color: '#10B981' }, // Green
      { name: 'پزشک سلامت', value: 31241, color: '#F97316' }, // Orange
      { name: 'سلامت', value: 4, color: '#3B82F6' }, // Blue
    ],
    week: [
      { name: 'تامین اجتماعی', value: 150000, color: '#9333EA' },
      { name: 'پزشک تامین اجتماعی', value: 250, color: '#10B981' },
      { name: 'پزشک سلامت', value: 60000, color: '#F97316' },
      { name: 'سلامت', value: 50, color: '#3B82F6' },
    ],
    month: [
      { name: 'تامین اجتماعی', value: 500000, color: '#9333EA' },
      { name: 'پزشک تامین اجتماعی', value: 1000, color: '#10B981' },
      { name: 'پزشک سلامت', value: 200000, color: '#F97316' },
      { name: 'سلامت', value: 200, color: '#3B82F6' },
    ],
    year: [
      { name: 'تامین اجتماعی', value: 6000000, color: '#9333EA' },
      { name: 'پزشک تامین اجتماعی', value: 12000, color: '#10B981' },
      { name: 'پزشک سلامت', value: 2400000, color: '#F97316' },
      { name: 'سلامت', value: 2400, color: '#3B82F6' },
    ],
  };

  return baseData[period] || [];
};
