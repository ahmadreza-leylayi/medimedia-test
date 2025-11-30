'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface NewsItem {
  id: string;
  title: string;
  preview: string; // پیش‌نمایش متن خبر
  date: string; // تاریخ
  href: string; // لینک خبر
  menuOptions?: {
    label: string;
    action: () => void;
  }[]; // گزینه‌های منوی سه نقطه
}

interface HealthNewsProps {
  news?: NewsItem[];
  title?: string;
  viewAllHref?: string;
  viewAllLabel?: string;
}

export default function HealthNews({
  news = [
    {
      id: '1',
      title: 'خبر 1',
      preview: 'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها روزنامه و مجله ...',
      date: '۲۴ مهر ۱۴۰۴',
      href: '/news/1',
    },
    {
      id: '2',
      title: 'خبر 2',
      preview: 'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها روزنامه و مجله ...',
      date: '۲۴ مهر ۱۴۰۴',
      href: '/news/2',
    },
    {
      id: '3',
      title: 'خبر 3',
      preview: 'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها روزنامه و مجله ...',
      date: '۲۴ مهر ۱۴۰۴',
      href: '/news/3',
    },
 
  ],
  title = 'اخبار سلامت',
  viewAllHref = '/news',
  viewAllLabel = 'مشاهده همه اخبار',
}: HealthNewsProps) {
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const menuRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  // بستن منو با کلیک خارج از آن
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (openMenuId) {
        const menuElement = menuRefs.current[openMenuId];
        if (menuElement && !menuElement.contains(event.target as Node)) {
          setOpenMenuId(null);
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [openMenuId]);

  const toggleMenu = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setOpenMenuId(openMenuId === id ? null : id);
  };

  const defaultMenuOptions = [
    {
      label: 'اشتراک‌گذاری',
      action: () => console.log('اشتراک‌گذاری'),
    },
    {
      label: 'ذخیره',
      action: () => console.log('ذخیره'),
    },
    {
      label: 'گزارش',
      action: () => console.log('گزارش'),
    },
  ];

  return (
    <div className="w-full py-8 md:py-12">
      <div className="w-full">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Image
              src="/health-news/fire.png"
              alt="fire"
              width={20}
              height={20}
              className="w-5 h-5 text-gray-400"
            />
            <h2 className="text-xl md:text-2xl font-bold text-[#1B1B1B]">{title}</h2>
          </div>
          <Link
            href={viewAllHref}
            className="px-4 py-2 bg-[#1B1B1B] text-white rounded-3xl text-sm font-medium hover:bg-[#2D2D2D] transition-colors "
          >
            {viewAllLabel}
          </Link>
        </div>

        {/* News List Container */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden ">
          {news && news.length > 0 ? (
            news.map((item, index) => (
            <React.Fragment key={item.id}>
              <Link
                href={item.href}
                className="block px-6 py-4 hover:bg-gray-50 transition-colors group "
              >
                <div className="flex items-center justify-between gap-4 ">
                  {/* Content Section */}
                  <div className="flex min-w-0 w-full items-center justify-between gap-4 ">
                    <p className="text-sm md:text-base text-gray-700 leading-relaxed line-clamp-1 ">
                      {item.preview}
                    </p>
                    <div className="flex items-center gap-2 text-gray-500 justify-center shrink-0">
                      <Image
                        src="/health-news/clock.png"
                        alt="Date"
                        width={14}
                        height={14}
                        className="w-3.5 h-3.5"
                      />
                      <span className="text-xs md:text-sm text-center text-nowrap">{item.date}</span>
                    </div>
                  </div>

                  {/* Three Dots Menu */}
                  <div className="relative shrink-0">
                    <button
                      onClick={(e) => toggleMenu(item.id, e)}
                      className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                      aria-label="Menu options"
                    >
                      <svg
                        className="w-5 h-5 text-gray-400"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
                      </svg>
                    </button>

                    {/* Dropdown Menu */}
                    {openMenuId === item.id && (
                      <div
                        ref={(el) => {
                          menuRefs.current[item.id] = el;
                        }}
                        className="absolute left-0 top-full mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50"
                      >
                        {(item.menuOptions || defaultMenuOptions).map((option, optIndex) => (
                          <button
                            key={optIndex}
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              option.action();
                              setOpenMenuId(null);
                            }}
                            className="w-full text-right px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-teal-600 transition-colors"
                          >
                            {option.label}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </Link>

              {/* Divider */}
              {index < news.length - 1 && (
                <div className="h-px bg-gray-200 mx-6" />
              )}
            </React.Fragment>
            ))
          ) : (
            <div className="px-6 py-8 text-center text-gray-500">
              <p>هیچ خبری یافت نشد</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

