'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Button from '@/components/ui/Button';

interface Blogs {
    id: string;
    image: string;
    title: string;
    description: string;
    date: string;
    category: string;
}

const blogs: Blogs[] = [
    {
        id: '1',
        image: '/blogs-slider/1.png',
        title: 'سینوزیت',
        description: ' سینوس چیست؟ در بدن ما انسان ها حفراتی در استخوان جمجمه و…',
        date: '۲۴ مهر ۱۴۰۴',
        category: 'مغز و اعصاب',
    },
    {
        id: '2',
        image: '/blogs-slider/2.png',
        title: 'سینوزیت',
        description: ' سینوس چیست؟ در بدن ما انسان ها حفراتی در استخوان جمجمه و…',
        date: '۲۴ مهر ۱۴۰۴',
        category: 'گوارش و کبد',
    },
    {
        id: '3',
        image: '/blogs-slider/3.png',
        title: 'سینوزیت',
        description: ' سینوس چیست؟ در بدن ما انسان ها حفراتی در استخوان جمجمه و…',
        date: '۲۴ مهر ۱۴۰۴',
        category: 'ریه و نوزاد',
    },
];

export default function NewsSlider() {
    const scrollLeft = () => {
        const container = document.getElementById('blogs-slider-container');
        if (container) {
            container.scrollBy({ left: -300, behavior: 'smooth' });
        }
    };


    const scrollRight = () => {
        const container = document.getElementById('blogs-slider-container');
        if (container) {
            container.scrollBy({ left: 300, behavior: 'smooth' });
        }
    };

    return (
        <div className="w-full py-8 md:py-5 border-black">
            <div className="w-full ">
                {/* Header Section */}
                <div className="flex items-center justify-between mb-6 gap-4 ">
                    {/* Title with Icon */}
                    <div className="flex items-center gap-2 shrink-0">
                        <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center shrink-0">
                            <Image
                                src="/news-slider/subtitle.png"
                                alt="Media"
                                width={17}
                                height={9}
                                className="w-4 h-4"
                            />
                        </div>
                        <h3 className="text-base md:text-lg font-bold  text-gray-900">
                            مقالات            </h3>

                            
                    </div>
                                 {/* more blogs button */}
                <div className="flex items-center justify-end gap-[14px] my-[14px]">
                    <Link href="/blogs">
                        <Button className="bg-black text-white px-4 py-2 rounded-full cursor-pointer">
                            <span className="text-sm font-bold text-white">
                                مشاهده همه مقالات
                            </span>
                        </Button>
                    </Link>
                    {/* Navigation Arrows */}
                    <div className="flex items-center gap-4 shrink-0 lg:ml-10">
                        <button
                            onClick={scrollLeft}
                            className="w-16 h-10 bg-white rounded-3xl shadow-md flex items-center justify-center hover:shadow-lg transition-shadow cursor-pointer"
                            aria-label="Previous"
                        >
                            <svg className="w-4 h-4 text-[#7B7B7B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                        <button
                            onClick={scrollRight}
                            className="w-16 h-10 bg-white rounded-3xl shadow-md flex items-center justify-center hover:shadow-lg transition-shadow cursor-pointer"
                            aria-label="Next"
                        >
                            <svg className="w-4 h-4 text-[#7B7B7B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                        </button>
                    </div>
                </div>
                </div>
   

                {/* Blogs Carousel */}
                <div
                    id="blogs-slider-container"
                    className="flex gap-[14px] overflow-x-auto scrollbar-hide pb-2 scroll-smooth [scrollbar-width:none] [-ms-overflow-style:none]"
                >
                    {blogs.map((item) => (
                        <div
                            key={item.id}
                            className="bg-[#FCFCFC] rounded-[20px] border border-gray-200 shrink-0 flex flex-col hover:shadow-md transition-shadow cursor-pointer w-[320px] p-6 gap-[14px]"
                        >
                            <Image
                                src={item.image}
                                alt={item.title}
                                width={272}
                                height={180}
                                className="w-full h-auto object-cover rounded-lg"
                            />
                            <div className="flex flex-col gap-[14px]">
                                <h3 className="text-base font-bold text-gray-900">{item.title}</h3>
                                <p className="text-sm text-gray-600 leading-relaxed">{item.description}</p>
                                <div className="flex items-center justify-between gap-2 w-full">
                                    <div className="flex items-center gap-2">
                                        <Image
                                            src="/blogs-slider/clock.png"
                                            alt="date"
                                            width={14}
                                            height={14}
                                            className="w-3.5 h-3.5"
                                        />
                                        <p className="text-xs text-gray-500">{item.date}</p>
                                    </div>
                                    <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                                        {item.category}
                                    </span>

                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

        </div>
    );
}

