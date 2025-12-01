'use client';

import React, { useState } from 'react';
import { MenuButton } from './MenuButton';
import { MenuItem } from './MenuItem';
import { MenuSubItem } from './MenuSubItem';

export const MenuPanel: React.FC = () => {
  const [openMenuIndex, setOpenMenuIndex] = useState<number | null>(null);

  const menuItems = [
    { title: 'کارتابل پزشکی', color: 'text-purple-600', svgColor: '#9333EA' },
    { title: 'مدیریت مطب و کلینیک', color: 'text-green-600', svgColor: '#10B981' },
    { title: 'مدیریت مالی و حسابداری', color: 'text-blue-600', svgColor: '#3B82F6' },
    { title: 'کارتابل پزشکی', color: 'text-orange-600', svgColor: '#F97316' },
    { title: 'مدیریت بیمه ها', color: 'text-pink-600', svgColor: '#EC4899' },
  ];

  const toggleMenu = (index: number) => {
    setOpenMenuIndex(openMenuIndex === index ? null : index);
  };

  return (
    <div className="flex flex-col gap-3 sm:gap-4 md:gap-[14px] mb-4 sm:mb-0">
      {/* Patient List Button */}
      <MenuButton
        title="لیست بیماران"
        icon={
          <svg className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
          </svg>
        }
      />

      {/* Admission List Button */}
      <MenuButton
        title="لیست پذیرش"
        icon={
          <svg className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        }
      />

      {/* Menu List */}
      <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-5 md:p-6 pb-0 flex flex-col relative min-h-[300px]">
        <div className="space-y-2 pb-6">
          {menuItems.map((item, index) => (
            <MenuItem
              key={index}
              title={item.title}
              color={item.color}
              svgColor={item.svgColor}
              isOpen={openMenuIndex === index}
              onToggle={() => toggleMenu(index)}
            >
              <MenuSubItem title="زیرمنوی تستی ۱" />
              <MenuSubItem title="زیرمنوی تستی ۲" />
              <MenuSubItem title="زیرمنوی تستی ۳" />
            </MenuItem>
          ))}
        </div>
        <button className="bg-white rounded-full px-6 py-3 text-sm font-bold text-gray-700 hover:bg-gray-50 transition-colors self-center shadow-sm absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2">
          مدیریت منو
        </button>
      </div>
    </div>
  );
};

