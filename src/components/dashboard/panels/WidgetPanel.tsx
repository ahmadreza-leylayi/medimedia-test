'use client';

import React, { useState } from 'react';
import { Sidebar, SidebarItem } from '@/components/dashboard/ui/Sidebar';
import { availableWidgets, WidgetType } from '@/components/dashboard/ui/AddWidgetModal';
import { ConfirmModal } from '@/components/dashboard/ui/Modal';

interface WidgetSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  existingWidgets: string[];
  onAddWidget: (widgetId: string) => void;
}

export const WidgetSidebar: React.FC<WidgetSidebarProps> = ({ 
  isOpen, 
  onClose, 
  existingWidgets,
  onAddWidget 
}) => {
  const [selectedWidget, setSelectedWidget] = useState<WidgetType | null>(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  // فیلتر کردن ویجت‌هایی که در صفحه نیستند (در panelOrder نیستند)
  const availableWidgetsList = availableWidgets.filter(
    (widget) => !existingWidgets.includes(widget.id)
  );

  const handleWidgetClick = (widget: WidgetType) => {
    setSelectedWidget(widget);
    setShowConfirmModal(true);
  };

  const handleConfirm = () => {
    if (selectedWidget) {
      onAddWidget(selectedWidget.id);
      setSelectedWidget(null);
      setShowConfirmModal(false);
      onClose();
    }
  };

  const handleCancel = () => {
    setSelectedWidget(null);
    setShowConfirmModal(false);
  };

  const handleDragStart = (e: React.DragEvent, widget: WidgetType) => {
    e.dataTransfer.setData('widgetId', widget.id);
    e.dataTransfer.setData('source', 'sidebar');
    e.dataTransfer.effectAllowed = 'copy';
  };

  return (
    <>
      <Sidebar isOpen={isOpen} onClose={onClose} title="افزودن ویجت">
        <div className="space-y-2">
          {availableWidgetsList.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <p>همه ویجت‌ها قبلاً اضافه شده‌اند</p>
            </div>
          ) : (
            availableWidgetsList.map((widget) => (
              <div
                key={widget.id}
                data-widget-item
                draggable
                onDragStart={(e) => handleDragStart(e, widget)}
                className="cursor-grab active:cursor-grabbing"
              >
                <SidebarItem
                  icon={<span className="text-2xl">{widget.icon}</span>}
                  label={widget.name}
                  onClick={() => handleWidgetClick(widget)}
                />
              </div>
            ))
          )}
        </div>
      </Sidebar>

      <ConfirmModal
        isOpen={showConfirmModal}
        onClose={handleCancel}
        onConfirm={handleConfirm}
        title="افزودن ویجت"
        message={selectedWidget ? `آیا می‌خواهید "${selectedWidget.name}" را به داشبورد اضافه کنید؟` : ''}
        confirmText="افزودن"
        cancelText="لغو"
      />
    </>
  );
};

interface CustomizationPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CustomizationPanel: React.FC<CustomizationPanelProps> = ({ isOpen, onClose }) => {
  const [settings, setSettings] = useState({
    theme: 'light',
    fontSize: 'medium',
    compactMode: false,
    showSidebar: true,
    primaryColor: '#06B6D4',
  });
  

  return (
    <Sidebar isOpen={isOpen} onClose={onClose} title="شخصی‌سازی رابط کاربری">
      <div className="space-y-6">
        {/* Theme Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            تم رنگی
          </label>
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => setSettings({ ...settings, theme: 'light' })}
              className={`p-4 rounded-lg border-2 transition-all ${
                settings.theme === 'light'
                  ? 'border-cyan-500 bg-cyan-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="text-center">
                <div className="w-12 h-12 mx-auto mb-2 bg-white rounded-lg border border-gray-200 flex items-center justify-center">
                  ☀️
                </div>
                <p className="text-sm text-gray-700">
                  روشن
                </p>
              </div>
            </button>
            <button
              onClick={() => setSettings({ ...settings, theme: 'dark' })}
              className={`p-4 rounded-lg border-2 transition-all ${
                settings.theme === 'dark'
                  ? 'border-cyan-500 bg-cyan-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="text-center">
                <div className="w-12 h-12 mx-auto mb-2 bg-gray-800 rounded-lg border border-gray-700 flex items-center justify-center">
                  🌙
                </div>
                <p className="text-sm text-gray-700">
                  تیره
                </p>
              </div>
            </button>
          </div>
        </div>

        {/* Font Size */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            اندازه فونت
          </label>
          <select
            value={settings.fontSize}
            onChange={(e) => setSettings({ ...settings, fontSize: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
          >
            <option value="small">کوچک</option>
            <option value="medium">متوسط</option>
            <option value="large">بزرگ</option>
          </select>
        </div>

        {/* Primary Color */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            رنگ اصلی
          </label>
          <div className="grid grid-cols-5 gap-2">
            {['#06B6D4', '#8B5CF6', '#EF4444', '#10B981', '#F59E0B'].map((color) => (
              <button
                key={color}
                onClick={() => setSettings({ ...settings, primaryColor: color })}
                className={`w-full aspect-square rounded-lg transition-all ${
                  settings.primaryColor === color ? 'ring-2 ring-offset-2 ring-gray-400' : ''
                }`}
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
        </div>

        {/* Toggle Options */}
        <div className="space-y-4 pt-4 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-700">
              حالت فشرده
            </span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.compactMode}
                onChange={(e) => setSettings({ ...settings, compactMode: e.target.checked })}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-cyan-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cyan-500"></div>
            </label>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-700">
              نمایش نوار کناری
            </span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.showSidebar}
                onChange={(e) => setSettings({ ...settings, showSidebar: e.target.checked })}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-cyan-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cyan-500"></div>
            </label>
          </div>
        </div>

        {/* Save Button */}
        <div className="pt-6">
          <button
            className="w-full px-6 py-3 bg-cyan-500 hover:bg-cyan-600 text-white rounded-lg font-medium transition-colors"
            onClick={onClose}
          >
            ذخیره تنظیمات
          </button>
        </div>
      </div>
    </Sidebar>
  );
};

