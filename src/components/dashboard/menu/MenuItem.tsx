'use client';

import React from 'react';

interface MenuItemProps {
  title: string;
  color: string;
  svgColor: string;
  isOpen: boolean;
  onToggle: () => void;
  children?: React.ReactNode;
}

export const MenuItem: React.FC<MenuItemProps> = ({
  title,
  color,
  svgColor,
  isOpen,
  onToggle,
  children,
}) => {
  return (
    <div className="w-full">
      <button
        onClick={onToggle}
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
            stroke={svgColor}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        {/* Text */}
        <span className={`flex-1 text-sm ${color}`}>
          {title}
        </span>
        {/* Right Arrow - Rotate when open */}
        <svg
          className={`w-4 h-4 text-gray-400 shrink-0 transition-transform ${isOpen ? 'rotate-90' : ''}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Submenu */}
      {isOpen && children && (
        <div className="mt-2 mr-8 space-y-1">
          {children}
        </div>
      )}
    </div>
  );
};

