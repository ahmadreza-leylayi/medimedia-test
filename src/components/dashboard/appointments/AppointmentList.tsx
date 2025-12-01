'use client';

import React from 'react';
import { AppointmentCard } from './AppointmentCard';
import type { Appointment } from './types';

interface AppointmentListProps {
  appointments: Appointment[];
  selectedAppointmentId: string | null;
  onAppointmentClick: (id: string) => void;
  cardRefs?: React.MutableRefObject<Map<string, HTMLDivElement>>;
}

export const AppointmentList: React.FC<AppointmentListProps> = ({
  appointments,
  selectedAppointmentId,
  onAppointmentClick,
  cardRefs,
}) => {
  if (appointments.length === 0) {
    return (
      <div className="text-center py-8 text-gray-400">
        نوبتی برای این تاریخ ثبت نشده است
      </div>
    );
  }

  return (
    <div className="space-y-3 overflow-y-auto pr-2 max-h-[450px]">
      {appointments.map((appointment) => (
        <AppointmentCard
          key={appointment.id}
          appointment={appointment}
          isSelected={selectedAppointmentId === appointment.id}
          onClick={onAppointmentClick}
          cardRef={(el) => {
            if (cardRefs) {
              if (el) {
                cardRefs.current.set(appointment.id, el);
              } else {
                cardRefs.current.delete(appointment.id);
              }
            }
          }}
        />
      ))}
    </div>
  );
};

