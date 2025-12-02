'use client';

import React, { useRef } from 'react';
import Image from 'next/image';

// آرایه داده‌های سرویس‌ها
const services = [
  {
    id: 1,
    text: 'درخواست نسخه آزمایش چکاپ',
    bgColor: 'bg-pink-500',
    imageUrl: '/slider-top/azmayesh.png', // آدرس تصویر را اینجا قرار دهید (باید با / شروع شود)
  },
  {
    id: 2,
    text: 'پرستاری',
    bgColor: 'bg-orange-500',
    imageUrl: '/slider-top/nurse.png', // آدرس تصویر را اینجا قرار دهید (باید با / شروع شود)
  },
  {
    id: 3,
    text: 'سونوگرافی',
    bgColor: 'bg-blue-500',
    imageUrl: '/slider-top/sono.png', // آدرس تصویر را اینجا قرار دهید (باید با / شروع شود)
  },
  {
    id: 4,
    text: 'فیبرو اسکن کبدی',
    bgColor: 'bg-purple-500',
    imageUrl: '/slider-top/fibro.png', // آدرس تصویر را اینجا قرار دهید (باید با / شروع شود)
  },
  {
    id: 5,
    text: 'نوار مغز و تفسیر',
    bgColor: 'bg-blue-700',
    imageUrl: '/slider-top/brain.png', // آدرس تصویر را اینجا قرار دهید (باید با / شروع شود)
  },
  {
    id: 6,
    text: 'اکوکاردیوگرافی',
    bgColor: 'bg-green-500',
    imageUrl: '/slider-top/echo.png', // آدرس تصویر را اینجا قرار دهید (باید با / شروع شود)
  },
  {
    id: 7,
    text: 'چکاپ کامل بدن با هوش مصنوعی',
    bgColor: 'bg-teal-500',
    imageUrl: '/slider-top/checkup.png', // آدرس تصویر را اینجا قرار دهید (باید با / شروع شود)
  },
  {
    id: 8,
    text: 'درخواست نسخه آزمایش چکاپ',
    bgColor: 'bg-pink-500',
    imageUrl: '/slider-top/azmayesh.png', // آدرس تصویر را اینجا قرار دهید (باید با / شروع شود)
  },
  {
    id: 9,
    text: 'پرستاری',
    bgColor: 'bg-orange-500',
    imageUrl: '/slider-top/nurse.png', // آدرس تصویر را اینجا قرار دهید (باید با / شروع شود)
  },
  {
        id: 10,
    text: 'سونوگرافی',
    bgColor: 'bg-blue-500',
    imageUrl: '/slider-top/sono.png', // آدرس تصویر را اینجا قرار دهید (باید با / شروع شود)
  },
];

function SliderTop() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  return (
    <div className="w-full py-8 md:hidden px-2">
      <div className="w-full">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-3 sm:gap-4">
          {/* Title with Location Icon */}
          <div className="flex items-center gap-2 min-w-0 flex-1">
            <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center shrink-0">
              <Image src="/slider-top/subtitle.png" alt="location" width={17} height={9} className="w-4 h-4" />
            </div>
            <h3 className="text-base sm:text-lg font-bold  text-gray-900 leading-tight">
              درخواست خدمت حضوری در مرکز درمانی
            </h3>
          </div>

          {/* View All Services Button and Navigation Arrows */}
          <div className="flex items-center gap-2 sm:gap-[14px] shrink-0 w-full sm:w-auto">
            <button className="bg-[#1B1B1B] text-[#FFFFFF] px-3 sm:px-6 py-2 rounded-3xl font-light hover:bg-gray-800 transition-colors text-xs sm:text-sm whitespace-nowrap flex-1 sm:flex-none text-center">
              مشاهده همه سرویس ها
            </button>
            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={scrollLeft}
                className="w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center hover:shadow-lg transition-shadow shrink-0"
                aria-label="Previous"
              >
                <svg className="w-4 h-4 text-[#7B7B7B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
              <button
                onClick={scrollRight}
                className="w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center hover:shadow-lg transition-shadow shrink-0"
                aria-label="Next"
              >
                <svg className="w-4 h-4 text-[#7B7B7B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Service Cards - Horizontal Scrollable */}
        <div
          ref={scrollContainerRef}
          className="flex gap-3 sm:gap-[14px] overflow-x-auto scrollbar-hide pb-2 scroll-smooth pl-4 sm:pl-0 [scrollbar-width:none] [-ms-overflow-style:none]"
        >
          {services.map((service) => (
            <div
              key={service.id}
              className="flex flex-col items-center gap-2 sm:gap-3 bg-white rounded-xl shadow-md p-3 sm:p-4 min-w-[140px] sm:min-w-[160px] max-w-[140px] sm:max-w-[180px] hover:shadow-lg transition-shadow cursor-pointer shrink-0"
            >
              <Image
                src={service.imageUrl}
                alt={service.text}
                width={74}
                height={74}
                className="w-16 h-16 sm:w-[74px] sm:h-[74px] object-contain"
              />
              <p className="text-xs sm:text-sm font-bold  text-gray-900 text-center leading-tight">
                {service.text}
              </p>
            </div>
          ))}
        </div>
      </div>
      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}

export default SliderTop;
