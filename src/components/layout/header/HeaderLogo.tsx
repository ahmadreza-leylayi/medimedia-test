'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface HeaderLogoProps {
  className?: string;
}

export const HeaderLogo: React.FC<HeaderLogoProps> = ({ className = '' }) => {
  return (
    <div className={`shrink-0 ${className}`}>
      <Link
        href="/"
        className="flex items-center gap-2 hover:opacity-80 transition-opacity"
        aria-label="Medimedia - صفحه اصلی"
      >
        <Image
          src="/logo/logo.svg"
          alt="Medimedia"
          width={141}
          height={65}
          className="h-7 lg:h-9 xl:h-10 w-auto"
          priority
        />
      </Link>
    </div>
  );
};

