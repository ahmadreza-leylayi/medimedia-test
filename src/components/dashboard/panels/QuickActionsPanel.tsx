'use client';

import React from 'react';
import { SearchPanel } from './SearchPanel';
import { MenuPanel } from './MenuPanel';

export const QuickActionsPanel: React.FC = () => {
  return (
    <div className="col-span-1 md:col-span-4 lg:col-span-5 flex flex-col md:flex-row gap-3 sm:gap-4 md:gap-[14px]">
      {/* Search Panel - Right Side */}
      <div className="flex-1 w-full md:w-auto">
        <SearchPanel />
      </div>

      {/* Menu Panel - Left Side */}
      <div className="flex-1 w-full md:w-auto">
        <MenuPanel />
      </div>
    </div>
  );
};

