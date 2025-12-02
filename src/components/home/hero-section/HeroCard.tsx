'use client';


import Image from 'next/image';

interface HeroCardProps {
  image: string;
  topText: string;
  bottomText: string;
  highlighted?: boolean;
}

function HeroCard({ image, topText, bottomText, highlighted = false }: HeroCardProps) {
  return (
    <div
      className="bg-white rounded-lg shadow-md p-2 lg:p-4 flex items-center gap-2 lg:gap-3 w-auto hover:shadow-lg transition-shadow cursor-pointer border border-transparent"
    >
      <div className="shrink-0">
        <Image
          src={image}
          alt={topText}
          width={36}
          height={36}
          className="w-7 h-7 lg:w-9 lg:h-9 rounded-lg"
        />
      </div>
      <div className="flex flex-col gap-0.5 lg:gap-1 min-w-0">
        <span className="text-sm lg:text-base font-bold text-gray-900 whitespace-nowrap">
          {topText}
        </span>
        <span className="text-[10px] lg:text-xs font-normal text-[#7B7B7B] whitespace-nowrap">
          {bottomText}
        </span>
      </div>
    </div>
  );
}

export default HeroCard;