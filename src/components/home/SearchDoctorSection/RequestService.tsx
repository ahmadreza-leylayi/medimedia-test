'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';

interface Specialty {
    id: string;
    icon: string;
    title: string;
    qty: number;
}

const specialties: Specialty[] = [
    { id: '1', icon: '/request/icon.png', title: 'اپتومتری', qty: 192 },
    { id: '2', icon: '/request/icon.png', title: 'ایمنی شناسی', qty: 192 },
    { id: '3', icon: '/request/icon.png', title: 'بیهوشی و درد', qty: 192 },
    { id: '4', icon: '/request/icon.png', title: 'پرستاری', qty: 192 },
    { id: '5', icon: '/request/icon.png', title: 'رادیو اتوپدی', qty: 192 },
    { id: '6', icon: '/request/icon.png', title: 'جراحی توراکس', qty: 192 },
    { id: '7', icon: '/request/icon.png', title: 'جراحی دهان، فک و صورت', qty: 192 },
    { id: '8', icon: '/request/icon.png', title: 'آناتومی', qty: 192 },
    { id: '9', icon: '/request/icon.png', title: 'ارتوپدی', qty: 192 },
    { id: '10', icon: '/request/icon.png', title: 'اورولوژی', qty: 192 },
    { id: '11', icon: '/request/icon.png', title: 'پزشک قانونی', qty: 192 },
    { id: '12', icon: '/request/icon.png', title: 'پزشک خانواده', qty: 192 },
    { id: '13', icon: '/request/icon.png', title: 'پزشک عمومی', qty: 192 },
    { id: '14', icon: '/request/icon.png', title: 'پوست و مو', qty: 192 },
    { id: '15', icon: '/request/icon.png', title: 'تغذیه', qty: 192 },
    { id: '16', icon: '/request/icon.png', title: 'چشم پزشکی', qty: 192 },
    { id: '17', icon: '/request/icon.png', title: 'خون شناسی', qty: 192 },
    { id: '18', icon: '/request/icon.png', title: 'داروسازی', qty: 192 },
    { id: '19', icon: '/request/icon.png', title: 'دندان پزشکی', qty: 192 },
    { id: '20', icon: '/request/icon.png', title: 'جراحی مغز و عصاب', qty: 192 },
    { id: '21', icon: '/request/icon.png', title: 'جراحی پلاستیک زیبایی و بینی', qty: 192 },
    { id: '22', icon: '/request/icon.png', title: 'روانپزشکی', qty: 192 },
    { id: '23', icon: '/request/icon.png', title: 'قلب و عروق', qty: 192 },
    { id: '24', icon: '/request/icon.png', title: 'گوارش', qty: 192 },
];

export function RequestService() {
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const [showAll, setShowAll] = useState(false);
    const [isMobile, setIsMobile] = useState(true);
    
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []); 
    
    // تعداد آیتم‌های نمایش داده شده در موبایل
    const mobileItemsCount = 5;
    // در دسکتاپ همه نمایش داده می‌شوند، در موبایل فقط تعداد محدود
    const displayedSpecialties = showAll || !isMobile 
        ? specialties 
        : specialties.slice(0, mobileItemsCount);

    return (
        <div className="w-full my-1 ">
            <div className="w-full">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-2 mb-8">
                    <div className="flex items-center gap-2 md:shrink-0">
                        <Image
                            src="/request/subtitle.png"
                            alt="Request Service"
                            width={24}
                            height={24}
                            className="w-6 h-6 shrink-0"
                        />
                        <h2 className="text-xl md:text-2xl font-bold text-gray-900">
                            درخواست نوبت دهی
                        </h2>
                    </div>
                    <p className="text-[#7B7B7B] text-base md:text-lg md:mr-4">
                        تخصص پزشک خود را انتخاب نمایید
                    </p>
                </div>

                {/* Specialties Grid */}
                <div className="flex flex-wrap gap-2 w-full " >
                    {displayedSpecialties.map((specialty) => {
                        const isSelected = selectedId === specialty.id;
                        return (
                            <button
                                key={specialty.id}
                                onClick={() => setSelectedId(specialty.id)}
                                className={`
                  flex items-center gap-2
                  rounded-[20px] border
                  transition-all duration-200
                  hover:shadow-md
                  text-right
                  ${isSelected
                                        ? 'bg-[#1B1B1B] text-white border-[#1B1B1B]'
                                        : 'bg-[#FCFCFC] text-gray-900 border-gray-200'
                                    }
                `}
                                style={{ padding: '16px 14px 16px 18px' }}
                            >
                                {/* Icon - Right side */}
                                <div className={`shrink-0 ml-auto ${isSelected ? 'opacity-100' : 'opacity-40'}`}>
                                    <Image
                                        src={specialty.icon}
                                        alt={specialty.title}
                                        width={20}
                                        height={20}
                                        className="w-5 h-5"
                                    />
                                </div>

                                {/* Content  */}
                                <div className="flex items-center gap-2 flex-1 min-w-0">
                                    <span className="text-sm md:text-base font-medium whitespace-nowrap">
                                        {specialty.title}
                                    </span>
                                    <span className={`text-xs md:text-sm whitespace-nowrap ${isSelected ? 'text-gray-300' : 'text-gray-500'}`}>
                                        {specialty.qty} پزشک
                                    </span>
                                </div>
                                    
                            </button>
                        );
                    })}
                </div>

                {/* View More and View Less Button - Only show on mobile */}
                {isMobile && (
                    <div className="flex justify-center mt-6">
                        {!showAll && specialties.length > mobileItemsCount ? (
                            <button
                                onClick={(e) => {
                                    e.preventDefault();
                                    setShowAll(true);
                           
                                }}
                                className="bg-[#1B1B1B] text-white px-6 py-3 rounded-[20px] font-medium hover:bg-gray-800 transition-colors"
                            >
                                مشاهده بیشتر
                            </button>
                        ) : showAll && (
                            <button
                                onClick={(e) => {
                                    e.preventDefault();
                                    setShowAll(false);
                          
                                }}
                                className="bg-[#1B1B1B] text-white px-6 py-3 rounded-[20px] font-medium hover:bg-gray-800 transition-colors"
                            >
                                مشاهده کمتر
                            </button>
                        )}
                    </div>
                )}
            </div>
            <Image src={'/request/doctor.png'} alt="doctor" width={1000} height={1000} className='w-[80%] mx-auto mt-12 border-b-2 border-[#FFFFFF] md:hidden' />
        </div>
    );
}

