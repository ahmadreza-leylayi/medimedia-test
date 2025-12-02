'use client';

import React from 'react';
import Image from 'next/image';
import HeroCard from '@/components/home/hero-section/HeroCard' ;
import Button from '@/components/ui/Button';

const services = [
  {
    image: '/hero-section/visit-darman-daroo.png',
    topText: 'مشاوره و ویزیت ( متخصص / عمومی )',
    bottomText: 'مشاوره و ویزیت ( ۳۰ تخصص )',

  },
  {
    image: '/hero-section/azma-khedmat.png',
    topText: 'درخواست نسخه آزمایش چکاپ',
    bottomText: 'ثبت نسخه الکترونیکی ( درخواست آزمایش چکاپ )',

  },

  {
    image: '/hero-section/visit-darman-daroo.png',
    topText: 'ارسال دارو',
    bottomText: 'مشاوره و ویزیت ( ۳۰ تخصص )',
  },
  {
    image: '/hero-section/azma-khedmat.png',
    topText: 'خدمت در مراکز درمانی',
    bottomText: 'ثبت نسخه الکترونیکی ( درخواست آزمایش چکاپ )',
  },

  {
    image: '/hero-section/visit-darman-daroo.png',
    topText: 'خدمت درمانی در محل',
    bottomText: 'مشاوره و ویزیت ( ۳۰ تخصص )',
  },
];

export default function HeroSection() {
  return (
    <div className="relative w-full  py-12 ">




      <div className="container mx-auto px-4 md:px-[15%] relative z-10 ">
        {/* Mobile Layout */}
        <div className="lg:hidden ">
          {/* logo */}
          <div className="flex  mb-8">
            <Image
              src="/hero-section/mobile-logo.png"
              alt="logo"
              width={84}
              height={84}
              className="w-21 h-21"
            />
          </div>
          {/* Main Title */}
          <h1 className="text-4xl md:text-4xl font-bold  text-gray-900 mb-4">
            <span className="text-[#197BBD]">مدی </span>
            <span className="text-[#19ADBD] ">مدیا </span>
            نوبت دهی
          </h1>

          {/* Sub-headlines */}
          <div className="mb-4  font-bold  text-3xl gap-2 flex flex-col">
            <p className="text-2xl md:text-3xl font-bold  text-gray-900 leading-[1.2]">
              پزشکی، مشاوره و ویزیت
              آنلاین پزشکی، نسخه و
              پرونده الکترونیکی
            </p>
          </div>

          {/* Description */}
          <p className="text-base md:text-lg text-[#1B1B1B] mb-6 w-[85%] leading-relaxed">
            بیش از<span className="font-bold"> ۳۳۰ هزار </span> پروفایل پزشک، دندانپزشک، روانشناس، آزمایشگاه، پرستار و ....
          </p>

          {/* circle pics */}
          <div className="flex  mb-6">
            {[1, 2, 3, 4, 5].map((num) => (
              <div 
                key={num} 
                className="relative -ml-6 first:-ml-6"
                style={{ zIndex: 6 - num }}
              >
                <Image
                  src={`/hero-section/rec${num}.png`}
                  alt={`Profile ${num}`}
                  width={80}
                  height={80}
                  className="w-20 h-20 rounded-full object-cover border-2 border-white"
                />
              </div>
            ))}
          </div>
          {/* CTA Button */}
          <Button className="w-fit bg-linear-to-r from-[#19ADBD] to-[#197BBD] text-white py-3 text-md font-thin rounded-3xl h-12 shadow-lg cursor-pointer px-4">
            شروع کار از اینجا
          </Button>
        </div>

        {/* Desktop Layout */}
        <div className="hidden lg:flex flex-row-reverse items-start gap-8 lg:gap-8 border-b-3 border-gray-50">
          {/* Left Side (RTL) - Doctor Image */}
          <div className="shrink-0 lg:w-2/5 flex justify-center lg:justify-end ">
            <div className="relative w-[360px] h-[590px] lg:bottom-20">
              {/* Grid Background */}
              <Image
                src="/hero-section/grid.png"
                alt=""
                width={300}
                height={480}
                className="absolute inset-0 w-full h-full object-cover z-10 -top-12"
              />
              {/* Doctor Image */}
              <Image
                src="/hero-section/doctor.png"
                alt="دکتر"
                width={900}
                height={900}
                className="relative w-full max-w-[900px] h-auto z-10"
                priority
              />
            </div>
          </div>

          {/* Right Side (RTL) - Services Grid */}
          <div className="flex-1 w-full lg:w-3/5 relative">
            {/* Title Section */}
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 rounded-full flex items-center justify-center">
                <Image
                  src="/hero-section/subtitle.svg"
                  alt=""
                  width={24}
                  height={24}
                  className="w-6 h-6"
                />
              </div>
              <h2 className="text-lg md:text-[18px] font-bold  text-gray-900">
                درخواست خدمت آنلاین
              </h2>
            </div>

            {/* Services Grid */}
            <div className="flex flex-wrap gap-3 w-full relative">
              {services.map((service, index) => (
                <div key={index} className="relative">
                  <HeroCard
                    image={service.image}
                    topText={service.topText}
                    bottomText={service.bottomText}
                  />
                  {/* vector - only for last card (خدمت درمانی در محل) - hidden between 1286px and 1527px */}
                  {index === services.length - 1 && (
                    <div className="absolute -bottom-16 right-30 hidden xl:block hide-vector-range ">
                      <Image
                        src="/hero-section/vector.png"
                        alt=""
                        width={50}
                        height={66}
                        className="w-auto h-auto"
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
