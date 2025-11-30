/**
 * Mock Data for Tasks
 * داده‌های تستی برای وظایف
 */

import type { Task } from '@/types/dashboard';

/**
 * Generate mock tasks
 * تولید داده‌های تستی وظایف
 */
export const generateMockTasks = (): Task[] => {
  return [
    { id: '1', title: 'گزارش روزانه پزشکی', category: 'medical' as const, completed: false, priority: 'high' as const },
    { id: '2', title: 'بررسی بیمه‌ها', category: 'insurance' as const, completed: true, priority: 'medium' as const },
    { id: '3', title: 'مدیریت داروخانه', category: 'pharmacy' as const, completed: false, priority: 'high' as const },
    { id: '4', title: 'گزارش مالی', category: 'management' as const, completed: false, priority: 'low' as const },
    { id: '5', title: 'بررسی پرونده‌های بیمارستانی', category: 'hospital' as const, completed: true, priority: 'medium' as const },
  ];
};

