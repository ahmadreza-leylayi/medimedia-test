'use client';

import React from 'react';

interface AppointmentActionMenuProps {
  appointmentId: string;
  position: { top: number; left: number; width: number };
  onAction: (id: string, action: 'completed' | 'cancelled' | 'delete') => void;
}

export const AppointmentActionMenu: React.FC<AppointmentActionMenuProps> = ({
  appointmentId,
  position,
  onAction,
}) => {
  return (
    <div
      data-appointment-menu
      className="fixed bg-white rounded-xl shadow-lg border border-gray-200 z-50 overflow-hidden pointer-events-auto"
      onClick={(e) => e.stopPropagation()}
      onMouseDown={(e) => e.stopPropagation()}
      style={{
        top: `${position.top}px`,
        left: `${position.left}px`,
        width: `${position.width}px`,
      }}
    >
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onAction(appointmentId, 'completed');
        }}
        className="w-full px-4 py-3 text-right hover:bg-green-50 active:bg-green-100 transition-colors flex items-center gap-3 cursor-pointer"
      >
        <div className="w-2 h-2 rounded-full bg-green-500"></div>
        <span className="text-sm font-bold text-gray-800">
          انجام شده
        </span>
      </button>
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onAction(appointmentId, 'cancelled');
        }}
        className="w-full px-4 py-3 text-right hover:bg-orange-50 active:bg-orange-100 transition-colors flex items-center gap-3 border-t border-gray-200 cursor-pointer"
      >
        <div className="w-2 h-2 rounded-full bg-orange-500"></div>
        <span className="text-sm font-bold text-gray-800">
          لغو شده
        </span>
      </button>
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onAction(appointmentId, 'delete');
        }}
        className="w-full px-4 py-3 text-right hover:bg-red-50 active:bg-red-100 transition-colors flex items-center gap-3 border-t border-gray-200 cursor-pointer"
      >
        <svg className="w-4 h-4 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>
        <span className="text-sm font-bold text-red-600">
          حذف از لیست
        </span>
      </button>
    </div>
  );
};

