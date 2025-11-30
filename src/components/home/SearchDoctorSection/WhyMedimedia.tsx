'use client';

import React from 'react';
import Image from 'next/image';

interface WhyMedimediaItem {
  id: string;
  icon: string;
  label: string;
  gradientFrom: string;
  gradientTo: string;
  gradientClass: string;
}

const whyMedimediaData: WhyMedimediaItem[] = [
  {
    id: '1',
    icon: '/why-medimedia/user-liked.png',
    label: 'کاربر پسند',
    gradientFrom: '#5DAAFF',
    gradientTo: '#3582FF',
    gradientClass: 'bg-gradient-to-b from-[#5DAAFF] to-[#3582FF]',
  },
  {
    id: '2',
    icon: '/why-medimedia/quality.png',
    label: 'تضمین کیفیت',
    gradientFrom: '#FF7F67',
    gradientTo: '#FF4D35',
    gradientClass: 'bg-gradient-to-b from-[#FF7F67] to-[#FF4D35]',
  },
  {
    id: '3',
    icon: '/why-medimedia/team.png',
    label: 'تیم متخصص',
    gradientFrom: '#35EBEB',
    gradientTo: '#17D0E1',
    gradientClass: 'bg-gradient-to-b from-[#35EBEB] to-[#17D0E1]',
  },
  {
    id: '4',
    icon: '/why-medimedia/startup.png',
    label: 'انگیزه استارتاپی',
    gradientFrom: '#FFD349',
    gradientTo: '#FFBF35',
    gradientClass: 'bg-gradient-to-b from-[#FFD349] to-[#FFBF35]',
  },
  {
    id: '5',
    icon: '/why-medimedia/speed.png',
    label: 'سرعت و دقت',
    gradientFrom: '#DD67FF',
    gradientTo: '#BF49FF',
    gradientClass: 'bg-gradient-to-b from-[#DD67FF] to-[#BF49FF]',
  },
  {
    id: '6',
    icon: '/why-medimedia/love.png',
    label: 'طراحی با عشق',
    gradientFrom: '#4DE869',
    gradientTo: '#25C041',
    gradientClass: 'bg-gradient-to-b from-[#4DE869] to-[#25C041]',
  },
];

export function WhyMedimedia() {
  return (
    <div className="w-full py-12 overflow-x-hidden">
      <div className="w-full justify-center">
        {/* Header */}
        <div className="flex items-center gap-2 mb-8 justify-start">
            <Image
              src="/why-medimedia/subtitle.png"
              alt="Why Medimedia"
              width={24}
              height={24}
              className="w-6 h-6"
            />
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 leading-none">
            چرا مدی مدیا
          </h2>
        
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-3 md:grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-3 md:gap-4 lg:gap-4 xl:gap-6 w-full">
          {whyMedimediaData.map((item) => (
            <div
              key={item.id}
              className="flex flex-col items-center gap-2 sm:gap-3 w-full min-w-0"
            >
              {/* Icon Container */}
              <div
                className={`w-[74px] h-[74px] md:w-20 md:h-20 rounded-[18px] flex items-center justify-center shadow-md p-[10px] shrink-0 mx-auto ${item.gradientClass}`}
              >
                <Image
                  src={item.icon}
                  alt={item.label}
                  width={48}
                  height={48}
                  className="w-12 h-12 md:w-14 md:h-14 object-contain"
                />
              </div>

              {/* Label */}
              <span className="text-xs sm:text-sm md:text-sm lg:text-base font-medium text-gray-900 text-center w-full px-1">
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    <Image
      src="/why-medimedia/doctor.png"
      alt="Why Medimedia"
      width={100}
      height={100}
      className="min-w-[70%] h-auto md:hidden mx-auto mt-5"
    />  
    </div>
  );
}

