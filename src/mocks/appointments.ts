/**
 * Mock Data for Appointments
 * داده‌های تستی برای نوبت‌ها
 */

import type { Appointment } from '@/components/dashboard/panels/AppointmentPanel';
import { PATIENT_NAMES, APPOINTMENT_TIMES, APPOINTMENT_STATUSES } from '@/constants/dashboard';

/**
 * Generate mock appointments for multiple days
 * تولید نوبت‌های تستی برای چند روز
 */
export const generateMockAppointments = (): Appointment[] => {
  const appointments: Appointment[] = [];
  const today = new Date();

  // Generate appointments for 7 days before and 7 days after today
  for (let dayOffset = -7; dayOffset <= 7; dayOffset++) {
    const date = new Date(today);
    date.setDate(date.getDate() + dayOffset);
    const dateStr = date.toISOString().split('T')[0];

    // Generate 2-5 appointments per day
    const numAppointments = Math.floor(Math.random() * 4) + 2;
    const shuffledTimes = [...APPOINTMENT_TIMES].sort(() => Math.random() - 0.5);
    const shuffledNames = [...PATIENT_NAMES].sort(() => Math.random() - 0.5);

    for (let i = 0; i < numAppointments; i++) {
      const status = APPOINTMENT_STATUSES[
        Math.floor(Math.random() * APPOINTMENT_STATUSES.length)
      ] as Appointment['status'];
      
      appointments.push({
        id: `${dateStr}-${i}-${Math.random().toString(36).substr(2, 9)}`,
        name: shuffledNames[i % shuffledNames.length],
        time: shuffledTimes[i % shuffledTimes.length],
        status,
        date: dateStr,
      });
    }
  }

  return appointments;
};

