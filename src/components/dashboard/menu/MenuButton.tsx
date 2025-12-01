'use client';

import React from 'react';

interface MenuButtonProps {
  title: string;
  icon: React.ReactNode;
  onClick?: () => void;
}

export const MenuButton: React.FC<MenuButtonProps> = ({
  title,
  icon,
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      className="bg-white rounded-2xl shadow-lg p-3 sm:p-4 flex items-center gap-2 sm:gap-3 hover:bg-gray-50 transition-colors text-right w-full"
    >
      <span className="text-sm sm:text-base font-bold text-gray-800 flex-1">
        {title}
      </span>
      {icon}
    </button>
  );
};

