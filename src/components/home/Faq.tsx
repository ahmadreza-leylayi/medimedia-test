'use client';

import React, { useState } from 'react';
import Image from 'next/image';

const faqItems = [
    {
        question: ' آیا نوبت دهی پزشکی قابل پیگیری است؟',
        answer: ' بله، بعد از نوبت دهی آنلاین سامانه مدی مدیا به شما کد پیگیری ارائه می دهد.',
    },
    {
        question: ' آیا نوبت دهی پزشکی قابل پیگیری است؟',
        answer: ' بله، بعد از نوبت دهی آنلاین سامانه مدی مدیا به شما کد پیگیری ارائه می دهد.',
    },
    {
        question: ' آیا نوبت دهی پزشکی قابل پیگیری است؟',
        answer: ' بله، بعد از نوبت دهی آنلاین سامانه مدی مدیا به شما کد پیگیری ارائه می دهد.',
    },
]

function Faq() {
  // state برای نگهداری index آیتم باز شده (null یعنی هیچکدام باز نیست)
  const [openIndex, setOpenIndex] = useState<number | null>(0); // اولین آیتم به صورت پیش‌فرض باز است

  // تابع برای باز/بسته کردن accordion
  const toggleAccordion = (index: number) => {
    // اگر آیتم فعلی باز است، آن را ببند (null) وگرنه آن را باز کن
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className='w-full py-8 md:py-5'>
        {/* faq header */}
        <div className='flex items-center gap-2 mb-6'>
            <Image src="/faq/checked.png" alt="faq" width={18} height={18} className="w-4 h-4 md:w-5 md:h-5"/>
            <h3 className="text-xl md:text-xl font-bold text-[#1B1B1B]">سوالات متداول</h3>
        </div>
        
        {/* faq items */}
        <div className='flex flex-col gap-4'>
            {faqItems.map((item, index) =>(
                <div 
                    key={index}
                    className='bg-white rounded-2xl shadow-sm overflow-hidden transition-all '
                >
                    {/* دکمه سوال - قابل کلیک برای باز/بسته کردن */}
                    <button
                        onClick={() => toggleAccordion(index)}
                        className='w-full flex items-center justify-between  p-4 md:p-6 text-right hover:bg-gray-50 transition-colors cursor-pointer'
                        aria-expanded={openIndex === index}
                    >
                        {/* متن سوال */}
                        <span className='text-sm md:text-base  text-gray-900 flex-1 font-bold'>
                            {item.question}
                        </span>
                        
                        {/* آیکون chevron - چرخش می‌کند وقتی باز است */}
                        <svg
                            className={`w-5 h-5 md:w-6 md:h-6 text-gray-600 transition-transform duration-300 shrink-0 mr-2 ${
                                openIndex === index ? 'rotate-90' : '-rotate-90'
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

                    {/* محتوای جواب - با انیمیشن باز/بسته می‌شود */}
                    <div
                        className={`overflow-hidden transition-all duration-300 ease-in-out ${
                            openIndex === index 
                                ? 'max-h-96 opacity-100' 
                                : 'max-h-0 opacity-0'
                        }`}
                    >
                        <div className='px-4 md:px-6 pb-4 md:pb-6 text-sm md:text-base text-[#7B7B7B] leading-relaxed'>
                            {item.answer}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    </div>
  )
}

export default Faq