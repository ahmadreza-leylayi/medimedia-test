'use client';

import React from 'react';

interface MenuSubItemProps {
  title: string;
  onClick?: () => void;
}

export const MenuSubItem: React.FC<MenuSubItemProps> = ({
  title,
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      className="w-full text-right px-3 py-2 text-xs text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
    >
      {title}
    </button>
  );
};

