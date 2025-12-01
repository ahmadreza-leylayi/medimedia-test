'use client';

import React, { useState, useEffect, useRef } from 'react';
import { AppointmentPanel, AppointmentActionMenu, type Appointment } from '@/components/dashboard/appointments';
import { SearchPanel } from '@/components/dashboard/search';
import { MenuPanel } from '@/components/dashboard/menu';
import { StatisticsChartPanel } from '@/components/dashboard/statistics';
import { AddAppointmentForm } from '@/components/dashboard/appointments';
import { DraggablePanel } from '@/components/dashboard/ui/DraggablePanel';
import { useAppointments } from '@/hooks/useAppointments';
import { useDateTime } from '@/hooks/useDateTime';
import {
  normalizeTime,
  validateTime,
  formatMonthYear,
  isDateInPast,
  getDateString,
} from '@/lib/utils';

interface DashboardMainPageProps {
  isCustomizing: boolean;
  panelOrder: string[];
  hiddenPanels: string[];
  draggedPanelId: string | null;
  onDragStart: (id: string) => void;
  onDragOver: (e: React.DragEvent, targetId: string) => void;
  onDragEnd: () => void;
  onDrop: (e: React.DragEvent, targetId: string) => void;
  onHidePanel: (id: string) => void;
}

export const DashboardMainPage: React.FC<DashboardMainPageProps> = ({
  isCustomizing,
  panelOrder,
  hiddenPanels,
  draggedPanelId,
  onDragStart,
  onDragOver,
  onDragEnd,
  onDrop,
  onHidePanel,
}) => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [activePeriod, setActivePeriod] = useState<'day' | 'week' | 'month' | 'year'>('year');
  const [isAddAppointmentOpen, setIsAddAppointmentOpen] = useState(false);
  const [newAppointment, setNewAppointment] = useState({ name: '', time: '' });
  const [selectedAppointmentId, setSelectedAppointmentId] = useState<string | null>(null);
  const [menuPosition, setMenuPosition] = useState<{ top: number; left: number; width: number } | null>(null);
  const appointmentCardRefs = useRef<Map<string, HTMLDivElement>>(new Map());

  // Use custom hooks
  const { appointments, addAppointment, updateAppointmentStatus } = useAppointments();
  const { currentTime, currentDate } = useDateTime(selectedDate);

  // Calculate and update menu position - update on scroll and resize to keep it attached to the item
  useEffect(() => {
    if (selectedAppointmentId) {
      const updatePosition = () => {
        const cardElement = appointmentCardRefs.current.get(selectedAppointmentId);
        if (cardElement) {
          const rect = cardElement.getBoundingClientRect();
          const menuHeight = 150; // Approximate menu height
          const viewportHeight = window.innerHeight;
          const spaceBelow = viewportHeight - rect.bottom;
          const spaceAbove = rect.top;
          
          // Determine if menu should be above or below
          const showAbove = spaceBelow < menuHeight && spaceAbove > spaceBelow;
          
          setMenuPosition({
            top: showAbove ? rect.top - menuHeight - 8 : rect.bottom + 8,
            left: rect.left,
            width: rect.width,
          });
        }
      };

      // Calculate position initially
      updatePosition();

      // Update position on scroll and resize to keep menu attached to item
      window.addEventListener('scroll', updatePosition, true);
      window.addEventListener('resize', updatePosition);

      return () => {
        window.removeEventListener('scroll', updatePosition, true);
        window.removeEventListener('resize', updatePosition);
      };
    } else {
      setMenuPosition(null);
    }
  }, [selectedAppointmentId]);

  // Handle click outside to close menu
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (selectedAppointmentId) {
        const target = event.target as HTMLElement;
        // Don't close if clicking on menu or buttons
        if (
          !target.closest('[data-appointment-menu]') &&
          target.tagName !== 'BUTTON' &&
          !target.closest('button')
        ) {
          console.log('❌ Click outside menu, closing');
          setSelectedAppointmentId(null);
        }
      }
    };

    if (selectedAppointmentId) {
      // Use setTimeout to ensure this runs after button click handlers
      const timeoutId = setTimeout(() => {
        document.addEventListener('mousedown', handleClickOutside);
      }, 0);

      return () => {
        clearTimeout(timeoutId);
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }
  }, [selectedAppointmentId]);

  // Navigate to today
  const navigateToToday = () => {
    setSelectedDate(new Date());
  };

  // Navigate dates
  const navigateDate = (direction: 'prev' | 'next') => {
    setSelectedDate((prev) => {
      const newDate = new Date(prev);
      if (direction === 'prev') {
        newDate.setDate(newDate.getDate() - 1);
      } else {
        newDate.setDate(newDate.getDate() + 1);
      }
      return newDate;
    });
  };

  const handleAddAppointment = () => {
    if (newAppointment.name.trim() && newAppointment.time.trim()) {
      // Normalize the time format (ensure it has : separator)
      let timeToNormalize = newAppointment.time;
      if (!timeToNormalize.includes(':')) {
        // If no colon, try to split by position
        const numbers = timeToNormalize.replace(/\D/g, '');
        if (numbers.length >= 2) {
          timeToNormalize = `${numbers.slice(0, 2)}:${numbers.slice(2, 4)}`;
        } else {
          alert('لطفاً ساعت را به صورت صحیح وارد کنید (مثال: ۱۴:۰۴)');
          return;
        }
      }
      
      const normalizedTime = normalizeTime(timeToNormalize);
      
      if (!validateTime(timeToNormalize)) {
        alert('فرمت ساعت نامعتبر است. لطفاً ساعت را به صورت صحیح وارد کنید (مثال: ۱۴:۰۴)');
        return;
      }
      
      const appointment: Appointment = {
        id: Date.now().toString(),
        name: newAppointment.name.trim(),
        time: normalizedTime,
        status: 'inactive',
        date: getDateString(selectedDate),
      };
      addAppointment(appointment);
      setNewAppointment({ name: '', time: '' });
      setIsAddAppointmentOpen(false);
    }
  };

  const handleHourChange = (hour: string) => {
    const currentMinute = newAppointment.time.split(':')[1] || '';
    setNewAppointment({ 
      ...newAppointment, 
      time: hour ? `${hour}:${currentMinute}` : `:${currentMinute}`
    });
  };

  const handleMinuteChange = (minute: string) => {
    const currentHour = newAppointment.time.split(':')[0] || '';
    setNewAppointment({ 
      ...newAppointment, 
      time: currentHour ? `${currentHour}:${minute}` : `:${minute}`
    });
  };

  const handleAppointmentAction = (id: string, action: 'completed' | 'cancelled' | 'delete') => {
    updateAppointmentStatus(id, action);
    setSelectedAppointmentId(null);
  };

  return (
    <div className="min-h-screen bg-[#F5F5F5] p-3 sm:p-4 md:p-6" dir="rtl">
      <div className="grid grid-cols-1 md:grid-cols-6 lg:grid-cols-12 gap-3 sm:gap-4 md:gap-[14px] max-w-[1400px] mx-auto">
        {panelOrder.map((panelId) => {
          const getColumnSpan = () => {
            if (panelId === 'appointments') return 'col-span-1 md:col-span-2 lg:col-span-3';
            if (panelId === 'search') return 'col-span-1 md:col-span-2 lg:col-span-3';
            if (panelId === 'menu') return 'col-span-1 md:col-span-2 lg:col-span-2';
            if (panelId === 'statistics') return 'col-span-1 md:col-span-6 lg:col-span-4';
            return 'col-span-1 md:col-span-6 lg:col-span-4';
          };

          const panelContent = () => {
            if (panelId === 'appointments') {
              return (
                <AppointmentPanel
                  currentTime={currentTime}
                  currentDate={currentDate}
                  selectedDate={selectedDate}
                  appointments={appointments}
                  selectedAppointmentId={selectedAppointmentId}
                  onNavigateDate={navigateDate}
                  onNavigateToToday={navigateToToday}
                  isDateInPast={isDateInPast(selectedDate)}
                  onAddAppointmentClick={() => setIsAddAppointmentOpen(true)}
                  onAppointmentClick={(id) => setSelectedAppointmentId(selectedAppointmentId === id ? null : id)}
                  formatMonthYear={formatMonthYear}
                  cardRefs={appointmentCardRefs}
                />
              );
            }
            if (panelId === 'search') {
              return <SearchPanel />;
            }
            if (panelId === 'menu') {
              return <MenuPanel />;
            }
            if (panelId === 'statistics') {
              return (
                <StatisticsChartPanel
                  activePeriod={activePeriod}
                  onPeriodChange={setActivePeriod}
                />
              );
            }
            return null;
          };

          const isDragging = draggedPanelId === panelId;
          
          return (
            <div 
              key={panelId} 
              className={`${getColumnSpan()} transition-all duration-300 ease-in-out ${
                isDragging ? 'opacity-50 scale-95' : 'opacity-100 scale-100'
              }`}
            >
              <DraggablePanel
                id={panelId}
                isCustomizing={isCustomizing}
                isHidden={hiddenPanels.includes(panelId)}
                isDragging={isDragging}
                onDragStart={onDragStart}
                onDragOver={(e) => onDragOver(e, panelId)}
                onDragEnd={onDragEnd}
                onDrop={onDrop}
                onHide={onHidePanel}
              >
                {panelContent()}
              </DraggablePanel>
            </div>
          );
        })}
      </div>

      {/* Appointment Action Menu */}
      {selectedAppointmentId && menuPosition && (
        <AppointmentActionMenu
          appointmentId={selectedAppointmentId}
          position={menuPosition}
          onAction={handleAppointmentAction}
        />
      )}

      {/* Add Appointment Form */}
      <AddAppointmentForm
        isOpen={isAddAppointmentOpen}
        newAppointment={newAppointment}
        onClose={() => {
          setIsAddAppointmentOpen(false);
          setNewAppointment({ name: '', time: '' });
        }}
        onNameChange={(name) => setNewAppointment({ ...newAppointment, name })}
        onTimeChange={(time) => setNewAppointment({ ...newAppointment, time })}
        onHourChange={handleHourChange}
        onMinuteChange={handleMinuteChange}
        onSubmit={handleAddAppointment}
      />
    </div>
  );
};
