'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Button from '@/components/ui/Button';

interface BannerProps {
  icon: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  searchPlaceholder: string;
  exampleText: string;
  searchIcon: string;
  buttonIcon: string;
}

export function Banner({
  icon,
  title,
  description,
  image,
  imageAlt,
  searchPlaceholder,
  exampleText,
  searchIcon,
  buttonIcon,
}: BannerProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = () => {
    // Handle search logic here
    console.log('Searching for:', searchQuery);
  };

  return (
    <div className="bg-[#FCFCFC] rounded-[20px]  w-full p-4 md:p-5 lg:p-4 pb-8 md:pb-10 ">
      <div className="flex flex-col gap-4 md:gap-5 lg:gap-7  ">
        {/* Image Section */}
        <div className="w-full bg-[#F5F5F5] rounded-lg overflow-hidden">
          <Image
            src={image}
            alt={imageAlt}
            width={500}
            height={300}
            className="w-[70%] md:w-[75%] lg:w-[80%] mx-auto h-auto object-contain"
            priority={false}
          />
        </div>
        {/* Description Section */}
        <div className="flex flex-col gap-3 md:gap-4">
          <div className="flex items-center gap-2">

            <h3 className="text-xs md:text-sm lg:text-base font-bold text-[#1B1B1B] leading-tight wrap-break-words">
              {title}
            </h3>
          </div>

          <p className="text-[10px] md:text-xs lg:text-sm text-[#1B1B1B] leading-relaxed wrap-break-words">
            {description}
          </p>
        </div>



        {/* Search Section */}
        <div className="flex flex-col gap-2">
          {/* Search Input */}
          <div className="relative">
            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
              <Image
                src={searchIcon}
                alt="Search"
                width={20}
                height={20}
                className="w-4 h-4 md:w-5 md:h-5 opacity-60"
              />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={searchPlaceholder}
              className="w-full bg-gray-100 rounded-2xl pr-8 md:pr-10 lg:pr-12 pl-3 md:pl-4 py-2 md:py-2.5 lg:py-3 text-[10px] md:text-xs lg:text-sm text-center text-gray-900 placeholder:text-center md:placeholder:text-[10px] lg:placeholder:text-[12px] placeholder:text-[8px] placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#1B1B1B] focus:border-transparent min-w-0"
            />
          </div>

          {/* Example Text */}
          <p className="text-[9px] md:text-[10px] lg:text-xs text-gray-500 pr-1">
            {exampleText}
          </p>
        </div>

        {/* Search Button */}
        <button className="flex text-nowrap items-center justify-center gap-1 md:gap-2 bg-gradient-to-b from-[#E04A3C] to-[#ED6A5E] text-white px-2 md:px-3 lg:px-4 py-1.5 md:py-2 lg:py-2.5 rounded-3xl font-medium hover:bg-red-700 transition-colors h-8 md:h-9 lg:h-10 w-full cursor-pointer">
          <Image
            src="/search-doctor-section/icons/search-start.png"
            alt="Search"
            width={20}
            height={20}
            className="w-3 h-3 md:w-4 md:h-4 lg:w-5 lg:h-5 shrink-0"
          />
          <span className="whitespace-nowrap text-[10px] md:text-xs lg:text-sm">شروع جستجو</span>
        </button>
      </div>
    </div>
  );
}

