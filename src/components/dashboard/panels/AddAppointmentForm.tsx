'use client';

import React from 'react';
import { Sidebar } from '@/components/dashboard/ui';

interface AddAppointmentFormProps {
  isOpen: boolean;
  newAppointment: { name: string; time: string };
  onClose: () => void;
  onNameChange: (name: string) => void;
  onTimeChange: (time: string) => void;
  onHourChange: (hour: string) => void;
  onMinuteChange: (minute: string) => void;
  onSubmit: () => void;
}

export const AddAppointmentForm: React.FC<AddAppointmentFormProps> = ({
  isOpen,
  newAppointment,
  onClose,
  onNameChange,
  onTimeChange,
  onHourChange,
  onMinuteChange,
  onSubmit,
}) => {
  return (
    <Sidebar
      isOpen={isOpen}
      onClose={onClose}
      title="افزودن نوبت جدید"
      position="right"
    >
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">
            نام بیمار
          </label>
          <input
            type="text"
            value={newAppointment.name}
            onChange={(e) => onNameChange(e.target.value)}
            placeholder="نام بیمار را وارد کنید"
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-sm text-right"
          />
        </div>

        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">
            ساعت نوبت
          </label>
          <div className="flex items-center gap-2 justify-center">
            <input
              id="minute-input"
              type="text"
              inputMode="numeric"
              maxLength={2}
              value={newAppointment.time.split(':')[1] || ''}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, '').slice(0, 2);
                onMinuteChange(value);
              }}
              onKeyDown={(e) => {
                if (e.key === 'ArrowLeft' || (e.key === 'Backspace' && !newAppointment.time.split(':')[1])) {
                  e.preventDefault();
                  const hourInput = document.getElementById('hour-input') as HTMLInputElement;
                  hourInput?.focus();
                }
              }}
              placeholder="۰۴"
              className="w-20 px-3 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-sm text-center"
              style={{ direction: 'ltr' }}
            />
            <span className="text-2xl font-bold text-gray-600">
              :
            </span>
            <input
              id="hour-input"
              type="text"
              inputMode="numeric"
              maxLength={2}
              value={newAppointment.time.split(':')[0] || ''}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, '').slice(0, 2);
                onHourChange(value);
              }}
              onKeyDown={(e) => {
                if (e.key === 'ArrowRight' || e.key === 'Tab') {
                  e.preventDefault();
                  const minuteInput = document.getElementById('minute-input') as HTMLInputElement;
                  minuteInput?.focus();
                }
              }}
              placeholder="۱۴"
              className="w-20 px-3 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-sm text-center"
              style={{ direction: 'ltr' }}
            />
          </div>
          <p className="text-xs text-gray-500 mt-1 text-center">
            دقیقه و ساعت را وارد کنید
          </p>
        </div>

        <div className="flex gap-4 pt-4">
          <button
            onClick={onSubmit}
            disabled={!newAppointment.name.trim() || !newAppointment.time.trim()}
            className="flex-1 px-6 py-3 bg-purple-500 hover:bg-purple-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-xl font-bold transition-colors"
          >
            افزودن نوبت
          </button>
          <button
            onClick={onClose}
            className="flex-1 px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-xl font-bold transition-colors"
          >
            لغو
          </button>
        </div>
      </div>
    </Sidebar>
  );
};

