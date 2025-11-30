'use client';

import React from 'react';
import Image from 'next/image';

export interface Certificate {
  id: string;
  image: string;
  title: string;
  description?: string;
}

// داده‌های افتخارات
export const certificates: Certificate[] = [
  {
    id: '1',
    image: '/lisence-slider/taghdir.png',
    title: 'تقدیر نامه انجمن علمی تجارت الکترونیک ایران',
  },
  {
    id: '2',
    image: '/logo/logo.svg',
    title: 'مدی مدیا',
  },
];

interface HonorsCertificateProps {
  currentIndex: number;
  onIndexChange: (index: number) => void;
}

export default function HonorsCertificate({ currentIndex, onIndexChange }: HonorsCertificateProps) {
  if (certificates.length === 0) return null;

  const currentCertificate = certificates[currentIndex];

  return (
    <div className="w-full h-full flex flex-col items-center justify-between">
      {/* Image Slider */}
      <div className="relative w-full flex-1 flex items-center justify-center">
        <Image
          src={currentCertificate.image}
          alt={currentCertificate.title}
          fill
          className="object-contain"
          priority={currentIndex === 0}
        />
      </div>

      {/* Title and Dots */}
      <div className="mt-2 flex flex-col items-center gap-2">
        {/* Title */}
        {currentCertificate.title && (
          <div className="text-center">
            <p className="text-xs md:text-sm font-semibold text-gray-900">
              {currentCertificate.title}
            </p>
          </div>
        )}

        {/* Dots Indicator */}
        {certificates.length > 1 && (
          <div className="flex items-center justify-center gap-2">
            {certificates.map((_, index) => (
              <button
                key={index}
                onClick={() => onIndexChange(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentIndex ? 'bg-gray-900 w-6' : 'bg-gray-300'
                }`}
                aria-label={`Go to certificate ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

