'use client';

import React, { useRef, useMemo, useEffect, useState } from 'react';
import { getDateString, parsePersianTime } from '@/lib/utils';

export interface Appointment {
  id: string;
  name: string;
  time: string;
  status: 'active' | 'pending' | 'inactive' | 'completed' | 'cancelled';
  date: string; // Format: YYYY-MM-DD
}

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
  onAppointmentAction: (id: string, action: 'completed' | 'cancelled' | 'delete') => void;
  formatMonthYear: (date: Date) => string;
  menuPosition?: { top: number; left: number; width: number } | null;
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
  onAppointmentAction,
  formatMonthYear,
  menuPosition,
  cardRefs,
}) => {
  // Check if selected date is today
  const isToday = selectedDate.toDateString() === new Date().toDateString();
  
  // Refs for menu positioning
  const menuRef = useRef<HTMLDivElement>(null);
  const localCardRefs = cardRefs || useRef<Map<string, HTMLDivElement>>(new Map());
  
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
    console.log('📅 appointmentsForDate updated:', filtered.map(a => ({ id: a.id, status: a.status })));
    return filtered;
  }, [appointments, selectedDate]);
  
  // Debug: log when appointments prop changes
  useEffect(() => {
    console.log('🔄 appointments prop changed:', appointments.length, 'items');
    console.log('📋 Appointments statuses:', appointments.map(a => ({ id: a.id, status: a.status })));
  }, [appointments]);

  return (
    <div>
      {/* All in one white card */}
      <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-5 md:p-6 flex flex-col gap-3 sm:gap-4 md:gap-[14px]">
        {/* Date and Time Section */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <button 
              onClick={() => onNavigateDate('next')}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <svg className="w-4 h-4 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
            <div className="flex items-center gap-2">
              {!isToday && (
                <button
                  onClick={onNavigateToToday}
                  className="px-3 py-1.5 bg-cyan-500 hover:bg-cyan-600 text-white text-xs font-bold rounded-lg transition-colors flex items-center gap-1.5 shadow-sm"
                >
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  برو به امروز
                </button>
              )}
              {isToday && (
                <div className="flex items-center gap-1">
                  <div className="w-1 h-4 bg-gray-300 rounded"></div>
                  <div className="w-1 h-4 bg-gray-300 rounded"></div>
                  <div className="w-1 h-4 bg-gray-300 rounded"></div>
                </div>
              )}
            </div>
            <button 
              onClick={() => onNavigateDate('prev')}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <svg className="w-4 h-4 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          </div>
          <div className="text-center">
            <p className="text-xs sm:text-sm text-gray-500 mb-2">
              {currentDate}
            </p>
            {currentTime && (
              <p className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 mb-2">
                {currentTime}
              </p>
            )}
            <p className="text-xs text-gray-400">
              {formatMonthYear(selectedDate)}
            </p>
          </div>
        </div>

        {/* Add Appointment Button */}
        <button 
          onClick={onAddAppointmentClick}
          disabled={isDateInPast}
          className={`rounded-2xl shadow-sm p-4 text-center transition-opacity bg-[#E5E5E5] ${
            isDateInPast 
              ? 'opacity-50 cursor-not-allowed' 
              : 'hover:opacity-90 cursor-pointer'
          }`}
          title={isDateInPast ? 'نمی‌توان برای روزهای گذشته نوبت ثبت کرد' : ''}
        >
          <span className={`text-base font-bold ${isDateInPast ? 'text-gray-400' : 'text-gray-800'}`}>
            افزودن نوبت جدید
          </span>
        </button>

        {/* Appointments List */}
        <div className="flex flex-col min-h-[300px] max-h-[500px]">
          <div className="space-y-3 overflow-y-auto pr-2 max-h-[450px]">
            {appointmentsForDate.length === 0 ? (
              <div className="text-center py-8 text-gray-400">
                نوبتی برای این تاریخ ثبت نشده است
              </div>
            ) : (
              appointmentsForDate.map((appointment) => {
                // ============================================
                // 📌 قسمت تغییر رنگ کارت‌های نوبت بر اساس وضعیت
                // ============================================
                // رنگ‌ها بر اساس وضعیت: فقط completed سبز، cancelled نارنجی، بقیه سفید
                const statusColors: Record<string, { dot: string; borderColor: string; time: string; cardBg: string; hoverBg: string }> = {
                  active: { dot: 'bg-gray-400', borderColor: 'border-gray-300', time: 'text-gray-600', cardBg: 'bg-white', hoverBg: 'hover:bg-gray-50' },
                  pending: { dot: 'bg-gray-400', borderColor: 'border-gray-300', time: 'text-gray-600', cardBg: 'bg-white', hoverBg: 'hover:bg-gray-50' },
                  inactive: { dot: 'bg-gray-400', borderColor: 'border-gray-300', time: 'text-gray-600', cardBg: 'bg-white', hoverBg: 'hover:bg-gray-50' },
                  completed: { dot: 'bg-green-500', borderColor: 'border-green-500', time: 'text-green-600', cardBg: 'bg-green-50', hoverBg: 'hover:bg-green-100' },
                  cancelled: { dot: 'bg-orange-500', borderColor: 'border-orange-500', time: 'text-orange-600', cardBg: 'bg-orange-50', hoverBg: 'hover:bg-orange-100' },
                };
                const colors = statusColors[appointment.status] || statusColors.inactive;
                
                return (
                  <div 
                    key={appointment.id} 
                    className="relative"
                    ref={(el) => {
                      if (el) {
                        localCardRefs.current.set(appointment.id, el);
                      } else {
                        localCardRefs.current.delete(appointment.id);
                      }
                    }}
                  >
                    {/* ============================================ */}
                    {/* 📌 اعمال رنگ‌ها بر روی کارت نوبت */}
                    {/* ============================================ */}
                    {/* رنگ‌های تعریف شده در statusColors بر اساس appointment.status اعمال می‌شوند */}
                    <div
                      onClick={(e) => {
                        e.stopPropagation();
                        onAppointmentClick(appointment.id);
                      }}
                      className={`p-4 rounded-xl flex flex-col items-center 2xl:flex-row 2xl:items-center gap-3 2xl:gap-3 cursor-pointer transition-all duration-300 ${colors.cardBg} ${colors.hoverBg} border-r-4 ${colors.borderColor}`}
                    >
                      {/* بخش بالا: زمان و آیکون */}
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2">
                          <div className={`w-2 h-2 rounded-full ${colors.dot}`}></div>
                          <span 
                            className={`text-sm font-bold ${colors.time} px-3 py-1 rounded-lg bg-[#F1F1F1] dir-ltr text-center inline-block`}
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
                          {(appointment.status === 'active' || appointment.status === 'completed') && (
                            <div className="absolute -bottom-1 -left-1 w-4 h-4 bg-cyan-500 rounded-full border-2 border-white flex items-center justify-center">
                              <svg className="w-2 h-2 text-white" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                                <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                              </svg>
                            </div>
                          )}
                        </div>
                      </div>
                      
                      {/* بخش پایین: نام بیمار - فقط در تبلت و لپتاپ کوچک */}
                      <div className="text-center 2xl:hidden w-full">
                        <p className="text-xs text-gray-500 mb-1">
                          نام بیمار
                        </p>
                        <p className="text-sm font-bold text-gray-800 wrap-break-word" title={appointment.name}>
                          {appointment.name}
                        </p>
                      </div>
                      
                      {/* بخش نام بیمار - فقط در دسکتاپ بزرگ (حالت قبلی) */}
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
                    
                    {/* Action Menu - Rendered outside container in DashboardMainPage */}
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

