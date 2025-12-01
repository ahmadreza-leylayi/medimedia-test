'use client';

import React from 'react';

interface AppointmentAddButtonProps {
  isDisabled: boolean;
  onClick: () => void;
}

export const AppointmentAddButton: React.FC<AppointmentAddButtonProps> = ({
  isDisabled,
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      disabled={isDisabled}
      className={`rounded-2xl shadow-sm p-4 text-center transition-opacity bg-gray-200 ${
        isDisabled
          ? 'opacity-50 cursor-not-allowed'
          : 'hover:opacity-90 cursor-pointer hover:bg-gray-300'
      }`}
      title={isDisabled ? 'نمی‌توان برای روزهای گذشته نوبت ثبت کرد' : 'افزودن نوبت جدید'}
      aria-label="افزودن نوبت جدید"
    >
      <span className={`text-base font-bold ${isDisabled ? 'text-gray-400' : 'text-gray-800'}`}>
        افزودن نوبت جدید
      </span>
    </button>
  );
};

