'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';

interface NavItem {
  label: string;
  href: string;
  hasDropdown?: boolean;
  dropdownItems?: { label: string; href: string }[];
}

const navItems: NavItem[] = [
  {
    label: 'مرکز درمانی یک',
    href: '/medical-center',
    hasDropdown: true,
    dropdownItems: [
      { label: 'درباره مرکز', href: '/medical-center/about' },
      { label: 'خدمات', href: '/medical-center/services' },
      { label: 'پزشکان', href: '/medical-center/doctors' },
    ],
  },
  {
    label: 'پشتیبانی و آموزش',
    href: '/support',
    hasDropdown: true,
    dropdownItems: [
      { label: 'راهنمای استفاده', href: '/support/guide' },
      { label: 'سوالات متداول', href: '/support/faq' },
      { label: 'تماس با ما', href: '/support/contact' },
    ],
  },
  {
    label: 'مقالات',
    href: '/articles',
  },
];

interface NavigationMenuProps {
  className?: string;
  onClose?: () => void;
}

export function NavigationMenu({ className, onClose }: NavigationMenuProps) {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  // Cache media queries برای جلوگیری از صدا زدن مکرر window.matchMedia
  // این باعث بهبود performance می‌شود چون media query ها در هر render چک نمی‌شوند
  const mediaQueries = useMemo(() => ({
    isMobileOrTablet: typeof window !== 'undefined' 
      ? window.matchMedia('(max-width: 1023px)')
      : null,
    isDesktop: typeof window !== 'undefined'
      ? window.matchMedia('(min-width: 1024px)')
      : null,
  }), []);

  const handleMouseEnter = (label: string) => {
    setOpenDropdown(label);
  };

  const handleMouseLeave = () => {
    setOpenDropdown(null);
  };

  const handleClick = (e: React.MouseEvent, item: NavItem) => {
    // Only prevent default and toggle dropdown on mobile/tablet (when dropdown exists)
    if (item.hasDropdown) {
      // Check if we're on mobile/tablet (below lg breakpoint)
      const isMobileOrTablet = mediaQueries.isMobileOrTablet?.matches ?? false;
      if (isMobileOrTablet) {
        e.preventDefault();
        setOpenDropdown(openDropdown === item.label ? null : item.label);
      }
    } else {
      // If no dropdown, close the drawer on mobile/tablet
      const isMobileOrTablet = mediaQueries.isMobileOrTablet?.matches ?? false;
      if (onClose && isMobileOrTablet) {
        onClose();
      }
    }
  };

  return (
    <ul className={`flex flex-col lg:flex-row items-start lg:items-center gap-4 lg:gap-6${className ? ` ${className}` : ''}`}>
      {navItems.map((item) => (
        <li
          key={item.href}
          className="relative w-full lg:w-auto"
          onMouseEnter={() => {
            // Only handle hover on desktop (lg and above)
            if (mediaQueries.isDesktop?.matches && item.hasDropdown) {
              handleMouseEnter(item.label);
            }
          }}
          onMouseLeave={() => {
            // Only handle mouse leave on desktop (lg and above)
            if (mediaQueries.isDesktop?.matches) {
              handleMouseLeave();
            }
          }}
        >
          <Link
            href={item.href}
            className="flex items-center justify-between lg:justify-start gap-1 text-[#7B7B7B] hover:text-teal-600 transition-colors text-sm font-medium py-2 lg:py-0"
            onClick={(e) => handleClick(e, item)}
          >
            {item.label}
            {item.hasDropdown && (
              <svg
                className={`w-4 h-4 transition-transform${openDropdown === item.label ? ' rotate-180' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            )}
          </Link>

          {/* Dropdown Menu */}
          {item.hasDropdown && item.dropdownItems && (
            <div
              className={`lg:absolute lg:top-full lg:right-0 w-full lg:w-48 bg-white lg:rounded-lg lg:shadow-lg lg:border lg:border-gray-200 transition-all duration-200 overflow-hidden lg:opacity-0 lg:invisible${
                openDropdown === item.label
                  ? ' lg:opacity-100 lg:visible max-h-96 opacity-100 visible mt-2 py-2'
                  : ' max-h-0 opacity-0 invisible lg:max-h-none mt-0 py-0'
              }`}
            >
              {item.dropdownItems.map((dropdownItem) => (
                <Link
                  key={dropdownItem.href}
                  href={dropdownItem.href}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-teal-600 transition-colors"
                  onClick={() => {
                    // Close drawer when clicking dropdown item on mobile/tablet
                    const isMobileOrTablet = mediaQueries.isMobileOrTablet?.matches ?? false;
                    if (onClose && isMobileOrTablet) {
                      onClose();
                    }
                  }}
                >
                  {dropdownItem.label}
                </Link>
              ))}
            </div>
          )}
        </li>
      ))}
    </ul>
  );
}

