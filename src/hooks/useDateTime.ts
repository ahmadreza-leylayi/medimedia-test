/**
 * Custom Hook for Date and Time Management
 * هوک سفارشی برای مدیریت تاریخ و زمان
 */

import { useState, useEffect } from 'react';
import {
  formatSelectedDate,
  formatTime,
  isToday,
} from '@/lib/utils/date';

/**
 * Hook to manage current date and time display
 * هوک برای مدیریت نمایش تاریخ و زمان فعلی
 */
export function useDateTime(selectedDate: Date) {
  const [currentTime, setCurrentTime] = useState('');
  const [currentDate, setCurrentDate] = useState('');

  useEffect(() => {
    const isSelectedToday = isToday(selectedDate);
    
    if (!isSelectedToday) {
      setCurrentTime('');
      setCurrentDate(formatSelectedDate(selectedDate));
      return;
    }

    const updateDateTime = () => {
      const now = new Date();
      setCurrentTime(formatTime(now));
      setCurrentDate(formatSelectedDate(now));
    };

    updateDateTime();
    const interval = setInterval(updateDateTime, 1000);
    
    return () => clearInterval(interval);
  }, [selectedDate]);

  return { currentTime, currentDate };
}

