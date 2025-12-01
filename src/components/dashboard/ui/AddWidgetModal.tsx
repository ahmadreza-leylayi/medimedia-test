'use client';

import React, { useState } from 'react';

export interface WidgetType {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: 'medical' | 'statistics' | 'management' | 'other';
}

export const availableWidgets: WidgetType[] = [
  {
    id: 'appointments',
    name: 'لیست نوبت‌ها',
    description: 'نمایش و مدیریت نوبت‌های روزانه',
    icon: '📅',
    category: 'medical',
  },
  {
    id: 'search',
    name: 'نسخه نویس سریع',
    description: 'جستجو و انتخاب سریع پزشک برای نسخه نویسی',
    icon: '🔍',
    category: 'medical',
  },
  {
    id: 'menu',
    name: 'منوی دسترسی سریع',
    description: 'دسترسی سریع به بخش‌های مختلف سیستم',
    icon: '📋',
    category: 'management',
  },
  {
    id: 'statistics',
    name: 'آمار و ارقام',
    description: 'نمایش آمار نسخه‌های ثبت شده',
    icon: '📊',
    category: 'statistics',
  },
  {
    id: 'patients-list',
    name: 'لیست بیماران',
    description: 'مدیریت و مشاهده لیست بیماران',
    icon: '👥',
    category: 'medical',
  },
  {
    id: 'reports',
    name: 'گزارش‌ها',
    description: 'گزارش‌های مالی و آماری',
    icon: '📈',
    category: 'statistics',
  },
  {
    id: 'notifications',
    name: 'اعلان‌ها',
    description: 'نمایش اعلان‌ها و پیام‌های مهم',
    icon: '🔔',
    category: 'other',
  },
  {
    id: 'calendar',
    name: 'تقویم',
    description: 'نمایش تقویم و رویدادها',
    icon: '🗓️',
    category: 'management',
  },
];

interface AddWidgetModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddWidget: (widgetId: string) => void;
  existingWidgets: string[];
}

export const AddWidgetModal: React.FC<AddWidgetModalProps> = ({
  isOpen,
  onClose,
  onAddWidget,
  existingWidgets,
}) => {
  const [selectedWidget, setSelectedWidget] = useState<string | null>(null);
  const [hoveredWidget, setHoveredWidget] = useState<string | null>(null);

  if (!isOpen) return null;

  const availableWidgetsFiltered = availableWidgets.filter(
    (widget) => !existingWidgets.includes(widget.id)
  );

  const handleWidgetClick = (widgetId: string) => {
    setSelectedWidget(widgetId);
    // تست: نمایش پیام
    console.log('ویجت انتخاب شد:', widgetId);
    alert(`ویجت "${availableWidgets.find((w) => w.id === widgetId)?.name}" انتخاب شد!`);
  };

  const handleAdd = () => {
    if (selectedWidget) {
      onAddWidget(selectedWidget);
      setSelectedWidget(null);
      onClose();
    }
  };

  const handleCancel = () => {
    setSelectedWidget(null);
    onClose();
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-50 transition-opacity"
        onClick={handleCancel}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
        <div
          className="bg-white rounded-2xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col pointer-events-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <div>
              <h2 className="text-xl font-bold text-gray-900">افزودن آیتم</h2>
              <p className="text-sm text-gray-500 mt-1">
                انتخاب نوع نمایش آیتم در داشبورد
              </p>
            </div>
            <button
              onClick={handleCancel}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              aria-label="بستن"
            >
              <svg
                className="w-6 h-6 text-gray-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6">
            {availableWidgetsFiltered.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500">همه ویجت‌ها قبلاً اضافه شده‌اند</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {availableWidgetsFiltered.map((widget) => {
                  const isSelected = selectedWidget === widget.id;
                  const isHovered = hoveredWidget === widget.id;

                  return (
                    <div
                      key={widget.id}
                      className={`
                        relative border-2 rounded-xl p-4 cursor-pointer transition-all duration-200
                        ${
                          isSelected
                            ? 'border-cyan-500 bg-cyan-50 shadow-md'
                            : isHovered
                            ? 'border-gray-300 bg-gray-50 shadow-sm'
                            : 'border-gray-200 bg-white hover:border-gray-300'
                        }
                      `}
                      onClick={() => handleWidgetClick(widget.id)}
                      onMouseEnter={() => setHoveredWidget(widget.id)}
                      onMouseLeave={() => setHoveredWidget(null)}
                    >
                      {/* Selection Indicator */}
                      {isSelected && (
                        <div className="absolute top-2 left-2 w-6 h-6 bg-cyan-500 rounded-full flex items-center justify-center">
                          <svg
                            className="w-4 h-4 text-white"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                        </div>
                      )}

                      {/* Widget Preview */}
                      <div className="flex flex-col items-center justify-center min-h-[200px] text-center">
                        <div className="text-5xl mb-4">{widget.icon}</div>
                        <h3 className="text-lg font-bold text-gray-900 mb-2">{widget.name}</h3>
                        <p className="text-sm text-gray-500">{widget.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200">
            <button
              onClick={handleCancel}
              className="px-6 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
            >
              لغو
            </button>
            <button
              onClick={handleAdd}
              disabled={!selectedWidget}
              className={`
                px-6 py-2 rounded-lg transition-colors font-medium
                ${
                  selectedWidget
                    ? 'bg-red-500 hover:bg-red-600 text-white'
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }
              `}
            >
              افزودن آیتم
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

