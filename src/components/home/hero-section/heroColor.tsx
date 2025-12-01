'use client';

import React from 'react';

interface HeroColorProps {
  className?: string;
}

export function HeroColor({ className }: HeroColorProps) {
  return (
    <div
      className={`relative w-full min-h-[212px] h-[215px]  -mt-20 mb-8 lg:mb-20 pb-20 md:pb-16 lg:pb-40${className ? ` ${className}` : ''}`}
    >
      {/* First SVG - Base layer (solid teal) - moves left */}
      <div 
        className="absolute top-[-80px] md:top-[-60px] lg:-top-3 left-0 right-0 w-full h-full wave-animation-left overflow-hidden origin-center"
      >
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 1728 242"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          className="w-full h-full"
        >
          <path
            d="M-6 -30H1734V242L1614.95 203.684C1550.93 183.082 1482.07 183.082 1418.05 203.684L1403.47 208.379C1336.28 230.003 1263.42 225.642 1199.29 196.156C1124.53 161.782 1038.47 161.782 963.71 196.156C899.58 225.642 826.723 230.003 759.533 208.379L646.5 172L429 192L295.797 222.621C239.955 235.459 182.426 239.327 125.368 234.08L-6 222V-30Z"
            fill="#19ADBD"
          />
        </svg>
      </div>

      {/* Second SVG - Middle layer with opacity - moves right */}
      <div 
        className="absolute top-[-82px] md:top-[-62px] lg:top-0 left-0 right-0 w-full h-full -mt-2 lg:-mt-2 wave-animation-right overflow-hidden origin-center"
      >
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 1728 242"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          className="w-full h-full"
        >
          <path
            d="M1734 -30H-6V242L137.716 222.177C186.673 215.424 236.326 215.424 285.284 222.177L367.545 233.523C408.381 239.156 449.727 240.094 490.776 236.319L597.053 226.547C629.948 223.522 663.052 223.522 695.947 226.547L754.138 231.898C826.63 238.564 899.723 230.503 969.021 208.2L989.591 201.58C1049.35 182.346 1113.65 182.346 1173.41 201.58L1181.77 204.272C1258.93 229.105 1340.7 236.249 1420.99 225.173L1442.72 222.177C1491.67 215.424 1541.33 215.424 1590.28 222.177L1734 242V-30Z"
            fill="#19ADBD"
            fillOpacity="0.3"
          />
        </svg>
      </div>

      {/* Third SVG - Top layer with opacity - moves left with delay */}
      <div 
        className="absolute top-[-75px] md:top-[-55px] lg:top-0 left-0 right-0 w-full h-full mt-5 lg:mt-5 wave-animation-left-delayed overflow-hidden origin-center"
      >
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 1728 272"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          className="w-full h-full"
        >
          <path
            d="M-6 -50H1734V192L1625.33 216.982C1553.54 233.486 1479.12 235.126 1406.67 221.802L1347.43 210.907C1315.21 204.981 1282.52 202 1249.76 202H1130.74C1097.98 202 1065.29 204.981 1033.07 210.907L1000.92 216.819C911.548 233.256 819.328 223.515 735.361 188.77C677.992 165.031 614.057 162.441 554.956 181.462L509.68 196.034C456.221 213.239 400.404 222 344.244 222H272.77C232.054 222 191.469 226.605 151.788 235.727L-6 272V-50Z"
            fill="#19ADBD"
            fillOpacity="0.3"
          />
        </svg>
      </div>
    </div>
  );
}
