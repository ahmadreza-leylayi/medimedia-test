'use client';

import React from 'react';
import type { Appointment } from './types';

interface AppointmentCardProps {
  appointment: Appointment;
  isSelected: boolean;
  onClick: (id: string) => void;
  cardRef?: (el: HTMLDivElement | null) => void;
}

const STATUS_COLORS = {
  active: {
    dot: 'bg-gray-400',
    border: 'border-r-4 border-gray-300',
    time: 'text-gray-600',
    card: 'bg-white hover:bg-gray-50',
  },
  pending: {
    dot: 'bg-gray-400',
    border: 'border-r-4 border-gray-300',
    time: 'text-gray-600',
    card: 'bg-white hover:bg-gray-50',
  },
  inactive: {
    dot: 'bg-gray-400',
    border: 'border-r-4 border-gray-300',
    time: 'text-gray-600',
    card: 'bg-white hover:bg-gray-50',
  },
  completed: {
    dot: 'bg-green-500',
    border: 'border-r-4 border-green-500',
    time: 'text-green-600',
    card: 'bg-green-50 hover:bg-green-100',
  },
  cancelled: {
    dot: 'bg-orange-500',
    border: 'border-r-4 border-orange-500',
    time: 'text-orange-600',
    card: 'bg-orange-50 hover:bg-orange-100',
  },
} as const;

export const AppointmentCard: React.FC<AppointmentCardProps> = ({
  appointment,
  isSelected,
  onClick,
  cardRef,
}) => {
  const colors = STATUS_COLORS[appointment.status] || STATUS_COLORS.inactive;
  const isActive = appointment.status === 'active' || appointment.status === 'completed';

  return (
    <div
      ref={cardRef}
      className="relative"
    >
      <div
        onClick={(e) => {
          e.stopPropagation();
          onClick(appointment.id);
        }}
        className={`p-4 rounded-xl flex flex-col items-center 2xl:flex-row 2xl:items-center gap-3 cursor-pointer transition-all duration-300 ${colors.card} ${colors.border}`}
      >
        {/* Time and Avatar Section */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${colors.dot}`}></div>
            <span
              className={`text-sm font-bold ${colors.time} px-3 py-1 rounded-lg bg-gray-100 dir-ltr text-center inline-block`}
            >
              {appointment.time}
            </span>
          </div>
          <div className="relative">
            <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
              <svg className="w-6 h-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            {isActive && (
              <div className="absolute -bottom-1 -left-1 w-4 h-4 bg-cyan-500 rounded-full border-2 border-white flex items-center justify-center">
                <svg className="w-2 h-2 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                  <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                </svg>
              </div>
            )}
          </div>
        </div>

        {/* Patient Name - Mobile/Tablet */}
        <div className="text-center 2xl:hidden w-full">
          <p className="text-xs text-gray-500 mb-1">
            نام بیمار
          </p>
          <p className="text-sm font-bold text-gray-800 wrap-break-word" title={appointment.name}>
            {appointment.name}
          </p>
        </div>

        {/* Patient Name - Desktop */}
        <div className="hidden 2xl:flex flex-1 text-right min-w-0">
          <div className="w-full">
            <p className="text-xs text-gray-500 mb-1 whitespace-nowrap">
              نام بیمار
            </p>
            <p className="text-sm font-bold text-gray-800 truncate" title={appointment.name}>
              {appointment.name}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

