'use client';

import React from 'react';
import Image from 'next/image';

export const EmptySearchState: React.FC = () => {
  return (
    <div className="h-32 sm:h-40 bg-gray-200 rounded-xl flex items-center justify-center overflow-hidden">
      <Image
        src="/dashboard/box.png"
        alt="Box"
        width={80}
        height={80}
        className="object-contain w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20"
      />
    </div>
  );
};

