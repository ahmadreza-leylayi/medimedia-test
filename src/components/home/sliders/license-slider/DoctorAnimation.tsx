'use client';

import React from 'react';
import Image from 'next/image';

export default function DoctorAnimation() {
  return (
    <div className="relative w-full h-full flex items-center justify-center lg:justify-start">
      {/* 3D Doctor Character */}
      <div className="relative z-10 flex items-center justify-center h-full">
        <Image
          src="/lisence-slider/doctorr.png"
          alt="Doctor pointing"
          width={300}
          height={400}
          className="w-auto h-full max-h-[300px] md:max-h-[400px] lg:max-h-[465px] object-contain"
          priority
        />
      </div>
      
      {/* Grid Background Pattern */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: 'url("/hero-section/grid.png")',
          backgroundRepeat: 'repeat',
          backgroundSize: '20px 20px',
        }}
      />
    </div>
  );
}

