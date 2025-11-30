'use client';

import Image from 'next/image';

export interface License {
  id: string;
  image: string;
  title: string;
  description?: string;
}

interface LicenseCirclesProps {
  licenses: License[];
}

// Positioning classes for each license circle - adjusted to prevent overflow
// Circle size: 118px, so radius is 59px - need safe margins from edges
// Using percentages that ensure circles stay within bounds
// All circles moved down and right slightly to avoid sticking to edges
const licensePositions = [
  // License 0 - Top Left (سازمان نظام صنفی)
  {
    mobile: 'top-[18%] left-[24%] rotate-0',
    desktop: 'md:top-[15%] md:left-[21%] md:rotate-[-2deg]',
  },
  // License 1 - Top Center (eNAMAD)
  {
    mobile: 'top-[16%] left-[54%] rotate-0',
    desktop: 'md:top-[15%] md:left-[54%] md:rotate-[3deg]',
  },
  // License 2 - Top Right (سازمان تامین اجتماعی)
  {
    mobile: 'top-[18%] left-[84%] rotate-0',
    desktop: 'md:top-[17%] md:left-[86%] md:rotate-[-1deg]',
  },
  // License 3 - Middle Left (سازمان بیمه سلامت)
  {
    mobile: 'top-[44%] left-[21%] rotate-0',
    desktop: 'md:top-[44%] md:left-[18%] md:rotate-[2deg]',
  },
  // License 4 - Middle Center (وزارت بهداشت)
  {
    mobile: 'top-[48%] left-[56%] rotate-0',
    desktop: 'md:top-[48%] md:left-[56%] md:rotate-[-3deg]',
  },
  // License 5 - Middle Right (سازمان نظام پزشکی)
  {
    mobile: 'top-[52%] left-[86%] rotate-0',
    desktop: 'md:top-[52%] md:left-[88%] md:rotate-[1deg]',
  },
  // License 6 - Bottom Left (جشنواره وب)
  {
    mobile: 'top-[78%] left-[26%] rotate-0',
    desktop: 'md:top-[78%] md:left-[26%] md:rotate-[-2deg]',
  },
  // License 7 - Bottom Center (samandehi)
  {
    mobile: 'top-[82%] left-[61%] rotate-0',
    desktop: 'md:top-[82%] md:left-[64%] md:rotate-[2deg]',
  },
  // License 8 - Bottom Right (if exists)
  {
    mobile: 'top-[86%] left-[84%] rotate-0',
    desktop: 'md:top-[86%] md:left-[88%] md:rotate-[-1deg]',
  },
];

export default function LicenseCircles({ licenses }: LicenseCirclesProps) {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {licenses.map((license, index) => {
        const position = licensePositions[index % licensePositions.length];
        
        return (
          <div
            key={license.id}
            className={`absolute ${position.mobile} ${position.desktop} -translate-x-1/2 -translate-y-1/2 group cursor-pointer transition-all duration-300 hover:scale-110 hover:z-20 z-10`}
          >
            <div className="relative">
              {/* License Circle - Fixed size based on design: 118px */}
              <div className="w-[118px] h-[118px] rounded-[99px] bg-[#FCFCFC] shadow-lg border border-gray-200 overflow-hidden flex items-center justify-center p-[14px] hover:shadow-xl transition-all duration-300">
                <Image
                  src={license.image}
                  alt={license.title}
                  width={90}
                  height={90}
                  className="w-full h-full object-contain"
                  priority={index < 3}
                  loading={index < 3 ? undefined : "eager"}
                  sizes="118px"
                  
                />
              </div>
              
              {/* Tooltip on hover - Hidden on mobile, shown on desktop */}
              <div className="hidden md:block absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-20">
                <div className="bg-gray-900 text-white text-xs rounded-lg px-3 py-2 max-w-[200px] text-center shadow-lg">
                  <div className="font-semibold">{license.title}</div>
                  {license.description && (
                    <div className="text-[10px] text-gray-300 mt-1">
                      {license.description}
                    </div>
                  )}
                </div>
                <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-900"></div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

