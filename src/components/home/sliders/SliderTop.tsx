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
    <div className="w-full py-8 hidden lg:block px-2">
      <div className="container mx-auto px-4 md:px-[15%]">
        {/* Header Section */}
        <div className="flex items-center justify-between mb-6 gap-4 ">
          {/* Title with Location Icon */}
          <div className="flex items-center gap-2 shrink-0">
            <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center ">

              <Image src="/slider-top/subtitle.png" alt="location" width={17} height={9} className="w-4 h-4" />
            </div>
            <h3 className="text-lg font-bold font-serif text-gray-900 whitespace-nowrap">
              درخواست خدمت حضوری در مرکز درمانی
            </h3>
          </div>

          {/* View All Services Button and Navigation Arrows */}
          <div className="flex items-center gap-[14px] shrink-0 ">
            <button className="bg-[#1B1B1B] text-[#FFFFFF] px-6 py-2 rounded-3xl font-light hover:bg-gray-800 transition-colors whitespace-nowrap text-sm ">
              مشاهده همه سرویس ها
            </button>
            <div className="flex items-center gap-2">
              <button
                onClick={scrollLeft}
                className="w-15 h-10 bg-white rounded-full shadow-md flex items-center justify-center hover:shadow-lg transition-shadow"
                aria-label="Previous"
              >
                <svg className="w-4 h-8 text-[#7B7B7B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
              <button
                onClick={scrollRight}
                className="w-15 h-10 bg-white rounded-full shadow-md flex items-center justify-center hover:shadow-lg transition-shadow"
                aria-label="Next"
              >
                <svg className="w-4 h-8 text-[#7B7B7B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
            </div>
          </div>
        </div>

       
      </div>
 {/* Service Cards - Horizontal Scrollable */}
 <div
          ref={scrollContainerRef}
          className="flex gap-[14px] overflow-x-auto scrollbar-hide pb-2 scroll-smooth [scrollbar-width:none] [-ms-overflow-style:none]"
        >
          {services.map((service) => (
            <div
              key={service.id}
              className="flex flex-col items-center gap-3 bg-white rounded-xl shadow-md p-4 min-w-[160px] max-w-[180px] hover:shadow-lg transition-shadow cursor-pointer shrink-0"
            >
         
                <Image
                  src={service.imageUrl}
                  alt={service.text}
                  width={74}
                  height={74}
                  className="w-[74px] h-[74px] "
                />
           
              <p className="text-sm  text-gray-900 text-center leading-tight ">
                {service.text}
              </p>
            </div>
          ))}
        </div>
    </div>
  );
}

export default SliderTop;
