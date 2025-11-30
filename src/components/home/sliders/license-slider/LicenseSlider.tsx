'use client';

import React, { useState } from 'react';
import { DoctorAnimation, LicenseCircles, HonorsCertificate, certificates } from '.';
import type { License } from '.';

// داده‌های مجوزها - بر اساس تصویر واقعی
const licenses: License[] = [
  {
    id: '1',
    image: '/lisence-slider/senfi.png', 
    title: 'سازمان نظام صنفی رایانه‌ای کشور استان تهران',
  },
  {
    id: '2',
    image: '/lisence-slider/enamad.png', 
    title: 'eNAMAD',
    description: 'مرکز توسعه تجارت الکترونیک',
  },
  {
    id: '3',
    image: '/lisence-slider/tamin-ejtemaei.png', 
    title: 'سازمان تامین اجتماعی',
  },
  {
    id: '4',
    image: '/lisence-slider/bime-salamat.png', 
    title: 'سازمان بیمه سلامت ایران',
  },
  {
    id: '5',
    image: '/lisence-slider/behdasht.png', 
    title: 'وزارت بهداشت، درمان و آموزش پزشکی',
    description: 'جمهوری اسلامی ایران',
  },
  {
    id: '6',
    image: '/lisence-slider/nezam-pezeshki.png', 
    title: 'سازمان نظام پزشکی اسلامی ایران',
  },
  {
    id: '7',
    image: '/lisence-slider/jashnvareh.png', 
    title: 'چهاردهمین جشنواره وب و موبایل ایران',
  },
  {
    id: '8',
    image: '/lisence-slider/samandehi.png', 
    title: 'samandehi.ir',
    description: 'در حال بررسی',
  },
];

export default function LicenseSlider() {
  const [certificateIndex, setCertificateIndex] = useState(0);

  const scrollCertificateLeft = () => {
    setCertificateIndex((prev) => (prev > 0 ? prev - 1 : certificates.length - 1));
  };

  const scrollCertificateRight = () => {
    setCertificateIndex((prev) => (prev < certificates.length - 1 ? prev + 1 : 0));
  };

  return (
    <div className="w-full py-8 md:py-12 ">
      <div className="container mx-auto px-4 md:px-6 lg:px-[9%]">
        {/* Header Section */}
        <div className="flex items-center justify-between mb-8 gap-4">
          <div className="flex items-center gap-2 shrink-0">
            <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center shrink-0">
              <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
              </svg>
            </div>
            <h2 className="text-xl md:text-2xl font-bold text-gray-900">
              مجوزها و افتخارات
            </h2>
          </div>
        </div>

        {/* Main Content - Three Sections in a row */}
        <div className="flex flex-col lg:flex-row gap-[14px] items-stretch">
          {/* Doctor Animation Section - Left */}
          <div className="w-full lg:w-[300px] xl:w-[350px] lg:shrink-0 relative h-[400px] md:h-[450px] lg:h-[465px]">
            <div className="relative w-full h-full">
              <DoctorAnimation />
            </div>
          </div>

          {/* مجوزها Section - Middle */}
          <div className="w-full lg:w-auto lg:flex-1 relative h-[400px] md:h-[450px] lg:h-[465px]">
            <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-6 text-center lg:text-right">
              مجوزها
            </h3>
            <div className="relative h-[calc(100%-60px)]">
              {/* License Circles */}
              <div className="relative z-10 h-full">
                <LicenseCircles licenses={licenses} />
              </div>
            </div>
          </div>

          {/* افتخارات Section - Right */}
          <div className="w-full lg:w-auto lg:flex-1 h-[400px] md:h-[450px] lg:h-[465px] flex flex-col">
            <div className="flex items-center justify-between mb-6 gap-4">
              <h3 className="text-lg md:text-xl font-bold text-gray-900 text-center lg:text-right">
                افتخارات
              </h3>
              {/* Navigation Arrows */}
              <div className="flex items-center gap-2 shrink-0">
              <button
                  onClick={scrollCertificateRight}
                  className="w-18 h-12 bg-white rounded-full shadow-md flex items-center justify-center hover:shadow-lg transition-shadow cursor-pointer"
                  aria-label="Next Certificate"
                >
                  <svg className="w-5 h-5 text-[#7B7B7B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
                <button
                  onClick={scrollCertificateLeft}
                  className="w-18 h-12 bg-white rounded-full shadow-md flex items-center justify-center hover:shadow-lg transition-shadow cursor-pointer"
                  aria-label="Previous Certificate"
                >
                  <svg className="w-5 h-5 text-[#7B7B7B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>

              </div>
            </div>
            <div className="flex-1 flex items-center justify-center">
              <HonorsCertificate 
                currentIndex={certificateIndex}
                onIndexChange={setCertificateIndex}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

