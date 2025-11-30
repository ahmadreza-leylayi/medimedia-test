/**
 * Mock Data for Employees
 * داده‌های تستی برای کارمندان
 */

import type { Employee } from '@/types/dashboard';

/**
 * Generate mock employees
 * تولید داده‌های تستی کارمندان
 */
export const generateMockEmployees = (): Employee[] => {
  return Array.from({ length: 50 }, (_, i) => ({
    id: String(i + 1),
    name: `پزشک محمدی`,
    phoneNumber: '۰۹۱۲۱۲۳۴۵۶۷',
    phoneNumber2: i % 3 === 0 ? '۰۹۱۲۱۲۳۴۵۶۸' : undefined,
    position: ['پزشک', 'کارشناس', 'پرستار'][i % 3],
    city: 'تهران',
    province: 'تهران',
    status: (['active', 'inactive', 'pending'] as const)[i % 3],
    joinDate: `۲۶ خرداد ۱۴۰۴`,
  }));
};

