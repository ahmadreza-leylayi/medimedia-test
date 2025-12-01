'use client';

import Image from 'next/image';

interface MediaOutlet {
  id: string;
  logo: string;
  name: string;
  nameEn?: string;
  subtitle?: string;
}

const mediaOutlets: MediaOutlet[] = [
  {
    id: '1',
    logo: '/news-slider/borna.png',
    name: 'خبر گزاری برنا',
   
  },
  {
    id: '2',
    logo: '/news-slider/mardom.png',
    name: 'مردم سالاری',
  },
  {
    id: '3',
    logo: '/news-slider/fars.png',
    name: 'فارس',
  },
  {
    id: '4',
    logo: '/news-slider/tasnim.png',
    name: 'تسنیم',
  },
  {
    id: '5',
    logo: '/news-slider/mehr.png',
    name: 'خبرگزاری مهر',
  },
  {
    id: '6',
    logo: '/news-slider/salamat.png',
    name: 'سلامت نیوز',
  },
];

export default function NewsSlider() {
  const scrollLeft = () => {
    const container = document.getElementById('news-slider-container');
    if (container) {
      container.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    const container = document.getElementById('news-slider-container');
    if (container) {
      container.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  return (
    <div className="w-full py-8 md:py-5">
      <div className="w-full">
        {/* Header Section */}
        <div className="flex items-center justify-between mb-4 gap-4">
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
              مدی مدیا در رسانه ها
            </h3>
          </div>

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

        {/* Media Logos Carousel */}
        <div
          id="news-slider-container"
          className="flex gap-[20px] overflow-x-auto scrollbar-hide pb-2 scroll-smooth [scrollbar-width:none] [-ms-overflow-style:none]"
        >
          {mediaOutlets.map((item) => (
            <div
              key={item.id}
              className="w-[135px] h-24 p-4  bg-[#FCFCFC] rounded-[20px] border border-gray-200 shrink-0 flex flex-col items-center justify-center gap-[14px] hover:shadow-md transition-shadow cursor-pointer"
            >
              <Image
                src={item.logo}
                alt={item.name}
                width={100}
                height={60}
                className="w-auto h-auto max-w-full max-h-[60px] object-contain"
              />

            </div>
          ))}
        </div>
      </div>

    </div>
  );
}

