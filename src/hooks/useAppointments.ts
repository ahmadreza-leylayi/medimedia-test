/**
 * Custom Hook for Appointments Management
 * هوک سفارشی برای مدیریت نوبت‌ها
 */

import { useState, useEffect, useRef } from 'react';
import type { Appointment } from '@/components/dashboard/panels/AppointmentPanel';
import { generateMockAppointments } from '@/mocks/appointments';
import { useLocalStorage } from './useLocalStorage';

const STORAGE_KEY = 'dashboard-appointments';

/**
 * Hook to manage appointments with localStorage persistence
 * هوک برای مدیریت نوبت‌ها با ذخیره‌سازی در localStorage
 */
export function useAppointments() {
  const [appointments, setAppointments] = useLocalStorage<Appointment[]>(
    STORAGE_KEY,
    []
  );
  const isInitialized = useRef(false);

  // Initialize with mock data if localStorage is empty (only once)
  useEffect(() => {
    if (!isInitialized.current) {
      // Check localStorage directly to avoid dependency on appointments
      if (typeof window !== 'undefined') {
        const stored = window.localStorage.getItem(STORAGE_KEY);
        if (!stored || stored === '[]' || stored === 'null') {
          isInitialized.current = true;
          const mockAppointments = generateMockAppointments();
          setAppointments(mockAppointments);
        } else {
          isInitialized.current = true;
        }
      }
    }
  }, []); // Only run once on mount

  const addAppointment = (appointment: Appointment) => {
    setAppointments((prev) => [...prev, appointment]);
  };

  const updateAppointment = (id: string, updates: Partial<Appointment>) => {
    setAppointments((prev) =>
      prev.map((apt) => (apt.id === id ? { ...apt, ...updates } : apt))
    );
  };

  const deleteAppointment = (id: string) => {
    setAppointments((prev) => prev.filter((apt) => apt.id !== id));
  };

  // ============================================
  // 📌 قسمت تغییر وضعیت و رنگ کارت‌های نوبت
  // ============================================
  // این تابع وضعیت نوبت را تغییر می‌دهد که باعث تغییر رنگ کارت می‌شود
  // - اگر action === 'delete' → نوبت حذف می‌شود
  // - اگر status فعلی همان action باشد → به 'inactive' تغییر می‌کند (toggle - سفید می‌شود)
  // - در غیر این صورت → status به action تغییر می‌کند (completed = سبز، cancelled = نارنجی)
  const updateAppointmentStatus = (
    id: string,
    action: 'completed' | 'cancelled' | 'delete'
  ) => {
    console.log('🔄 updateAppointmentStatus called:', { id, action });
    
    if (action === 'delete') {
      deleteAppointment(id);
      return;
    }

    setAppointments((prev) => {
      const updated = prev.map((apt) => {
        if (apt.id === id) {
          // اگر status فعلی همان action است، به inactive تغییر بده (toggle)
          if (apt.status === action) {
            console.log('✅ Toggling status to inactive for:', id);
            return { ...apt, status: 'inactive' as const };
          }
          // در غیر این صورت، status را به action تغییر بده
          console.log('✅ Updating status to:', action, 'for:', id);
          return { ...apt, status: action as 'completed' | 'cancelled' };
        }
        return apt;
      });
      console.log('📋 Updated appointments:', updated);
      return updated;
    });
  };

  return {
    appointments,
    setAppointments,
    addAppointment,
    updateAppointment,
    deleteAppointment,
    updateAppointmentStatus,
  };
}

