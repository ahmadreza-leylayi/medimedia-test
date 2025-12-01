'use client';

import React, { useState, useEffect, useRef } from 'react';

interface EyeIconProps {
  isOpen: boolean;
  onClick: () => void;
  className?: string;
}

export const EyeIcon: React.FC<EyeIconProps> = ({ isOpen, onClick, className = '' }) => {
  const eyeRef = useRef<HTMLDivElement>(null);
  const [pupilPosition, setPupilPosition] = useState({ x: 0, y: 0 });

  // محاسبه موقعیت مردمک بر اساس موقعیت موس در کل صفحه
  useEffect(() => {
    if (!isOpen || !eyeRef.current) return;

    const handleMouseMove = (e: MouseEvent) => {
      const eye = eyeRef.current;
      if (!eye) return;

      const rect = eye.getBoundingClientRect();
      const eyeCenterX = rect.left + rect.width / 2;
      const eyeCenterY = rect.top + rect.height / 2;

      // محاسبه فاصله از مرکز چشم
      const deltaX = e.clientX - eyeCenterX;
      const deltaY = e.clientY - eyeCenterY;

      // محدود کردن حرکت مردمک به داخل چشم (حداکثر 8px از مرکز)
      const maxDistance = 8;
      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
      const limitedDistance = Math.min(distance, maxDistance);

      if (distance > 0) {
        const angle = Math.atan2(deltaY, deltaX);
        const x = Math.cos(angle) * limitedDistance;
        const y = Math.sin(angle) * limitedDistance;
        setPupilPosition({ x, y });
      } else {
        setPupilPosition({ x: 0, y: 0 });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isOpen]);

  // بازگشت مردمک به مرکز وقتی چشم بسته است
  useEffect(() => {
    if (!isOpen) {
      setPupilPosition({ x: 0, y: 0 });
    }
  }, [isOpen]);

  return (
    <div
      ref={eyeRef}
      className={`relative cursor-pointer ${className}`}
      onClick={onClick}
    >
      {/* چشم */}
      <div className="relative w-6 h-6 overflow-visible border border-gray-400 rounded-full">
        {/* دایره چشم */}
        <div className="absolute inset-0 bg-white rounded-full border-2 border-gray-400 overflow-hidden z-0"></div>
        
        {/* مردمک - فقط وقتی چشم باز است */}
        {isOpen && (
          <div
            className="absolute w-3 h-3 bg-gray-800 rounded-full transition-all duration-200 ease-out z-10 left-1/2 top-1/2"
            style={{
              transform: `translate(calc(-50% + ${pupilPosition.x}px), calc(-50% + ${pupilPosition.y}px))`,
            }}
          ></div>
        )}

        {/* خط افقی وسط چشم (وقتی بسته است) */}
        {!isOpen && (
          <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-0.5 bg-gray-600 z-5"></div>
        )}

        {/* پلک بالا */}
        <div
          className={`absolute inset-x-0 top-0 bg-white rounded-t-full z-20 eye-lid-top ${
            isOpen ? 'eye-open-top' : 'eye-closed-top'
          }`}
        ></div>

        {/* پلک پایین */}
        <div
          className={`absolute inset-x-0 bottom-0 bg-white rounded-b-full z-20 eye-lid-bottom ${
            isOpen ? 'eye-open-bottom' : 'eye-closed-bottom'
          }`}
        ></div>

        {/* مژه‌ها - در حالت بسته: وسط دایره به سمت پایین، در حالت باز: بالای دایره به سمت بالا */}
        <div className="absolute inset-0 z-30">
          {[...Array(7)].map((_, i) => {
            // در حالت بسته: مژه‌ها در مرکز و به سمت پایین
            // در حالت باز: مژه‌ها در بالای دایره و به سمت بالا
            const baseX = (i - 3) * 2.5; // فاصله افقی بین مژه‌ها
            const closedY = 0; // وسط دایره
            const openY = -14; // بالاتر از دایره (خارج از دایره)
            
            return (
              <div
                key={i}
                className={`absolute w-0.5 h-[7px] bg-gray-600 transition-all duration-400 ease-out origin-top -translate-x-1/2 -translate-y-1/2 ${
                  isOpen ? 'rotate-0 eye-lash-open' : 'rotate-180 eye-lash-closed'
                }`}
                style={{
                  left: `calc(53% + ${baseX}px)`,
                  top: isOpen ? `calc(50% + ${openY}px)` : `calc(100% + ${closedY}px)`,
                }}
              ></div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

