'use client';

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface FooterLink {
  text: string;
  href?: string;
}

interface FooterColumn {
  title: string;
  links: FooterLink[];
  showLogo?: boolean;
}

const footerData: FooterColumn[] = [
  {
    title: '',
    showLogo: true,
    links: [
      { text: 'نرم افزار مطب کلینیک و درمانگاه' },
      { text: 'نسخه نویسی الکترونیک' },
      { text: 'پرونده الکترونیک سلامت' },
      { text: 'امکانات و تعرفه ها' },
      { text: 'نوبت دهی تلفنی پزشکان' },
    ],
  },
  {
    title: 'ارتباط با ما',
    links: [
      { text: 'درباره ما' },
      { text: 'تماس با ما' },
      { text: 'پنل کاربری مشترکین' },
      { text: 'پنل کاربری پزشکان' },
    ],
  },
  {
    title: 'نرم افزارهای کاربردی',
    links: [
      { text: 'دانلود Teamviewer' },
      { text: 'دانلود Any Desk' },
    ],
  },
  {
    title: 'ویژه پزشکان',
    links: [
      { text: 'نرم افزار مطب کلینیک و درمانگاه' },
      { text: 'نسخه نویسی الکترونیک' },
      { text: 'پرونده الکترونیک سلامت' },
      { text: 'امکانات و تعرفه ها' },
      { text: 'نوبت دهی تلفنی پزشکان' },
    ],
  },
];

export default function Footer() {
  // نگهداری وضعیت باز/بسته بودن هر لینک
  const [openItems, setOpenItems] = useState<{ [key: string]: boolean }>({});

  // محاسبه اینکه کدام ستون‌ها حداقل یک آیتم باز دارند
  // این برای تغییر رنگ پس‌زمینه ستون استفاده می‌شود
  const openColumns = useMemo(() => {
    const result: { [key: number]: boolean } = {};
    
    footerData.forEach((column, columnIndex) => {
      // بررسی می‌کنیم آیا حداقل یک لینک در این ستون باز است؟
      const hasOpenItem = column.links.some((_, linkIndex) => {
        const itemKey = `${columnIndex}-${linkIndex}`;
        return openItems[itemKey];
      });
      
      result[columnIndex] = hasOpenItem;
    });
    
    return result;
  }, [openItems]);

  // باز/بسته کردن یک لینک خاص
  const toggleItem = (columnIndex: number, linkIndex: number) => {
    const itemKey = `${columnIndex}-${linkIndex}`;
    setOpenItems((prev) => ({
      ...prev,
      [itemKey]: !prev[itemKey], // اگر باز بود ببند، اگر بسته بود باز کن
    }));
  };

  return (
    <footer className="relative w-full overflow-hidden bg-[#F1F1F1]">
      {/* Background Images - Stacked - Positioned at bottom */}
      <div className="absolute bottom-0 left-0 right-0 w-full h-[100px] md:h-[500px] lg:h-[300px]">
        <div className="absolute inset-0 w-full h-full">
          <Image
            src="/footer/color1.png"
            alt="Footer background 1"
            fill
            className="object-cover object-bottom"
            priority
          />
        </div>
        <div className="absolute inset-0 w-full h-full">
          <Image
            src="/footer/color2.png"
            alt="Footer background 2"
            fill
            className="object-cover object-bottom"
            priority
          />
        </div>
        <div className="absolute inset-0 w-full h-full">
          <Image
            src="/footer/color3.png"
            alt="Footer background 3"
            fill
            className="object-cover object-bottom"
            priority
          />
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 w-full">
        {/* Main Footer Content */}
        <div className="container mx-auto px-4 md:px-6 lg:px-[9%] py-6 md:py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
            {footerData.map((column, columnIndex) => {
              const isColumnOpen = openColumns[columnIndex];
              
              return (
                <div
                  key={columnIndex}
                  className={`flex flex-col gap-3 md:gap-4 p-3 md:p-4 rounded-lg transition-all duration-300 ${
                    isColumnOpen ? 'bg-[#FCFCFC]' : 'bg-transparent'
                  }`}
                >
                  {/* Title with Logo */}
                  <div className="flex items-center gap-2 md:gap-3">
                    {column.showLogo && (
                      <Image
                        src="/footer/logo.png"
                        alt="Medi Media Logo"
                        width={100}
                        height={35}
                        className="w-12 h-3 md:w-20 md:h-6"
                      />
                    )}
                    <h3 className="text-base md:text-lg font-bold text-[#1B1B1B]">
                      {column.title}
                    </h3>
                  </div>

                  {/* Links with Accordion */}
                  <ul className="flex flex-col gap-2">
                    {column.links.map((link, linkIndex) => {
                      const key = `${columnIndex}-${linkIndex}`;
                      const isOpen = openItems[key];

                      return (
                        <li key={linkIndex}>
                          <div className="transition-all duration-300 rounded-lg">
                            <button
                              onClick={() => toggleItem(columnIndex, linkIndex)}
                              className="w-full flex items-center justify-between gap-2 text-sm md:text-base text-[#1B1B1B] hover:text-[#555] transition-colors group cursor-pointer p-2 -mr-2"
                            >
                              <span className="flex-1 text-right">{link.text}</span>
                              <svg
                                className={`w-5 h-5 md:w-6 md:h-6 text-gray-600 transition-transform duration-300 shrink-0 ${
                                  isOpen ? 'rotate-90' : 'rotate-180'
                                }`}
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M9 5l7 7-7 7"
                                />
                              </svg>
                            </button>
                            {isOpen && (
                              <div className="px-2 pb-2 pt-1">
                                <Link
                                  href={link.href || '#'}
                                  className="block text-sm text-[#555] hover:text-[#1B1B1B] transition-colors"
                                >
                                  مشاهده بیشتر
                                </Link>
                              </div>
                            )}
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>

        {/* Copyright Section - Full width with #D3D3D3 background */}
        <div className="relative z-10 w-full bg-[#D3D3D3] mt-6">
          <div className="container mx-auto px-4 md:px-6 lg:px-[9%] py-4 md:py-6">
            <p className="text-xs md:text-sm text-[#1B1B1B] text-center font-medium">
              تمامی حقوق مادی و معنوی متعلق به شرکت دانش بنیان آبادیس سلامت امروز می باشد
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
