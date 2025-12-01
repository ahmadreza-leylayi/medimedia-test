'use client';

import React, { useMemo } from 'react';
import { getDateString, parsePersianTime } from '@/lib/utils';
import { AppointmentDateNavigator } from './AppointmentDateNavigator';
import { AppointmentDateTimeDisplay } from './AppointmentDateTimeDisplay';
import { AppointmentAddButton } from './AppointmentAddButton';
import { AppointmentList } from './AppointmentList';
import type { Appointment } from './types';

interface AppointmentPanelProps {
  currentTime: string;
  currentDate: string;
  selectedDate: Date;
  appointments: Appointment[];
  selectedAppointmentId: string | null;
  onNavigateDate: (direction: 'prev' | 'next') => void;
  onNavigateToToday: () => void;
  isDateInPast: boolean;
  onAddAppointmentClick: () => void;
  onAppointmentClick: (id: string) => void;
  formatMonthYear: (date: Date) => string;
  cardRefs?: React.MutableRefObject<Map<string, HTMLDivElement>>;
}

export const AppointmentPanel: React.FC<AppointmentPanelProps> = ({
  currentTime,
  currentDate,
  selectedDate,
  appointments,
  selectedAppointmentId,
  onNavigateDate,
  onNavigateToToday,
  isDateInPast,
  onAddAppointmentClick,
  onAppointmentClick,
  formatMonthYear,
  cardRefs,
}) => {
  const isToday = selectedDate.toDateString() === new Date().toDateString();

  // Filter and sort appointments for selected date
  const appointmentsForDate = useMemo(() => {
    const dateStr = getDateString(selectedDate);
    const filtered = appointments
      .filter((apt) => apt.date === dateStr)
      .sort((a, b) => {
        const timeA = parsePersianTime(a.time);
        const timeB = parsePersianTime(b.time);
        return timeA - timeB;
      });
    return filtered;
  }, [appointments, selectedDate]);

  return (
    <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-5 md:p-6 flex flex-col gap-3 sm:gap-4 md:gap-[14px]">
      {/* Date Navigation Section */}
      <div>
        <AppointmentDateNavigator
          isToday={isToday}
          onNavigateDate={onNavigateDate}
          onNavigateToToday={onNavigateToToday}
        />
        <AppointmentDateTimeDisplay
          currentDate={currentDate}
          currentTime={currentTime}
          monthYear={formatMonthYear(selectedDate)}
        />
      </div>

      {/* Add Appointment Button */}
      <AppointmentAddButton
        isDisabled={isDateInPast}
        onClick={onAddAppointmentClick}
      />

      {/* Appointments List */}
      <div className="flex flex-col min-h-[300px] max-h-[500px]">
        <AppointmentList
          appointments={appointmentsForDate}
          selectedAppointmentId={selectedAppointmentId}
          onAppointmentClick={onAppointmentClick}
          cardRefs={cardRefs}
        />
      </div>
    </div>
  );
};

