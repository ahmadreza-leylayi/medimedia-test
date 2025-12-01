'use client';

import React, { useState } from 'react';

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
      <button className="bg-white rounded-2xl shadow-lg p-3 sm:p-4 flex items-center gap-2 sm:gap-3 hover:bg-gray-50 transition-colors text-right">
        <span className="text-sm sm:text-base font-bold text-gray-800 flex-1">
          لیست بیماران
        </span>
        {/* 2x2 Grid Icon */}
        <svg className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
        </svg>
      </button>

      {/* Admission List Button */}
      <button className="bg-white rounded-2xl shadow-lg p-3 sm:p-4 flex items-center gap-2 sm:gap-3 hover:bg-gray-50 transition-colors text-right">
        <span className="text-sm sm:text-base font-bold text-gray-800 flex-1">
          لیست پذیرش
        </span>
        {/* Person Icon */}
        <svg className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      </button>

      {/* Menu List */}
      <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-5 md:p-6 pb-0 sm:pb-0 flex flex-col relative min-h-[300px]">
        <div className="space-y-2 pb-6">
          {menuItems.map((item, index) => (
            <div key={index} className="w-full">
              <button
                onClick={() => toggleMenu(index)}
                className="w-full flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors text-right"
              >
                {/* SVG Icon with color */}
                <svg 
                  width="17" 
                  height="15" 
                  viewBox="0 0 17 15" 
                  fill="none" 
                  xmlns="http://www.w3.org/2000/svg"
                  className="shrink-0"
                >
                  <path 
                    d="M0.75 2.41667V12C0.75 12.9205 1.49619 13.6667 2.41667 13.6667H14.5C15.4205 13.6667 16.1667 12.9205 16.1667 12V4.91667C16.1667 3.99619 15.4205 3.25 14.5 3.25H9.35031C8.79305 3.25 8.27267 2.9715 7.96356 2.50783L7.28644 1.49217C6.97734 1.0285 6.45695 0.75 5.89969 0.75H2.41667C1.49619 0.75 0.75 1.49619 0.75 2.41667Z" 
                    stroke={item.svgColor} 
                    strokeWidth="1.5" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  />
                </svg>
                {/* Text */}
                <span className={`flex-1 text-sm ${item.color}`}>
                  {item.title}
                </span>
                {/* Right Arrow - Rotate when open */}
                <svg 
                  className={`w-4 h-4 text-gray-400 shrink-0 transition-transform ${openMenuIndex === index ? 'rotate-90' : ''}`} 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
              
              {/* Submenu */}
              {openMenuIndex === index && (
                <div className="mt-2 mr-8 space-y-1">
                  <button className="w-full text-right px-3 py-2 text-xs text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
                    زیرمنوی تستی ۱
                  </button>
                  <button className="w-full text-right px-3 py-2 text-xs text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
                    زیرمنوی تستی ۲
                  </button>
                  <button className="w-full text-right px-3 py-2 text-xs text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
                    زیرمنوی تستی ۳
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
        <button className="bg-white rounded-full px-6 py-3 text-sm font-bold text-gray-700 hover:bg-gray-50 transition-colors self-center shadow-sm absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2">
          مدیریت منو
        </button>
      </div>
    </div>
  );
};

