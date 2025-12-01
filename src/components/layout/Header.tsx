'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { SearchBar } from './SearchBar';
import { NavigationMenu } from './NavigationMenu';
import { UserAccountButton } from './UserAccountButton';
import { NotificationsDropdown } from './NotificationsDropdown';
import { useAppSelector } from '@/redux/hooks';
import Link from 'next/link';

interface HeaderProps {
  className?: string;
}

export function Header({ className }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);
  const [shouldRenderDrawer, setShouldRenderDrawer] = useState(false);
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (isMobileMenuOpen) {
      // Render drawer first
      setShouldRenderDrawer(true);
      // Small delay to trigger animation
      const timer = setTimeout(() => setIsDrawerVisible(true), 10);
      // Prevent body scroll when drawer is open
      document.body.style.overflow = 'hidden';
      return () => clearTimeout(timer);
    } else {
      // Start closing animation
      setIsDrawerVisible(false);
      // Remove from DOM after animation completes
      const timer = setTimeout(() => {
        setShouldRenderDrawer(false);
        document.body.style.overflow = '';
      }, 300); // Match transition duration
      return () => clearTimeout(timer);
    }
  }, [isMobileMenuOpen]);

  return (
    <header
      className={`sticky top-0 z-50 w-full bg-white border-b border-teal-200${className ? ` ${className}` : ''}`}
    >
      {/* Desktop & Tablet Header */}
      <div className="hidden lg:block">
        <div className="container mx-auto px-4 lg:px-6 xl:px-[15%] max-w-full">
          <div className="flex items-center justify-between h-16 gap-2 lg:gap-3 xl:gap-4 min-w-0">
            {isAuthenticated ? (
              <>
                <div className="flex items-center gap-2 lg:gap-3 min-w-0 flex-1 overflow-hidden">
                  {/* Right (RTL): Logo */}
                  <div className="shrink-0">
                    <Link
                      href="/"
                      className="flex items-center gap-2 hover:opacity-80 transition-opacity"
                      aria-label="Medimedia - صفحه اصلی"
                    >
                      <Image
                        src="/logo/logo.svg"
                        alt="Medimedia"
                        width={141}
                        height={65}
                        className="h-7 lg:h-9 xl:h-10 w-auto"
                        priority
                      />
                    </Link>
                  </div>

                  {/* Search Bar */}
                  <div className="flex-1 max-w-md mx-2 lg:mx-3 xl:mx-4 min-w-0 overflow-hidden">
                    <SearchBar />
                  </div>

                  {/* Center: Navigation Menu */}
                  <nav className="hidden lg:flex items-center gap-4 xl:gap-6 shrink-0">
                    <NavigationMenu />
                  </nav>
                </div>

                {/* Left (RTL): Notifications and User */}
                <div className="shrink-0 flex items-center gap-3 lg:gap-3 xl:gap-4 flex-nowrap">
                  <NotificationsDropdown />
                  <UserAccountButton />
                </div>
              </>
            ) : (
              <>
                <div className="flex items-center gap-2 lg:gap-3 min-w-0 flex-1">
                  {/* Logo */}
                  <div className="shrink-0">
                    <Link
                      href="/"
                      className="flex items-center gap-2 hover:opacity-80 transition-opacity"
                      aria-label="Medimedia - صفحه اصلی"
                    >
                      <Image
                        src="/logo/logo.svg"
                        alt="Medimedia"
                        width={141}
                        height={65}
                        className="h-7 lg:h-9 xl:h-10 w-auto"
                        priority
                      />
                    </Link>
                  </div>

                  {/* Search Bar */}
                  <div className="flex-1 max-w-md mx-2 lg:mx-3 xl:mx-4 min-w-0">
                    <SearchBar />
                  </div>

                  {/* Navigation Menu */}
                  <nav className="hidden lg:flex items-center gap-4 xl:gap-6 shrink-0">
                    <NavigationMenu />
                  </nav>
                </div>

                {/* User Account Button */}
                <div className="shrink-0">
                  <UserAccountButton />
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Tablet Header (md to lg) */}
      <div className="hidden md:flex lg:hidden">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex items-center justify-between h-16 gap-4">
                    {/* Burger Menu Button */}
                    <div className="shrink-0">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="px-4 py-2  bg-[#E5E5E5] hover:bg-gray-200 text-gray-700 rounded-2xl transition-colors text-sm font-medium shadow-[inset_0_1px_3px_0_rgba(18,18,18,0.1)] cursor-pointer"
                aria-label="منو"
                aria-expanded={isMobileMenuOpen}
              >
                <Image
                  src="/header/burger.png"
                  alt="منو"
                  width={18}
                  height={18}
                  className="w-[18px] h-[18px]"
                />
              </button>
            </div>
            {/* Logo */}
            <div className="shrink-0">
              <Link
                href="/"
                className="flex items-center gap-2 hover:opacity-80 transition-opacity"
                aria-label="Medimedia - صفحه اصلی"
              >
                <Image
                  src="/logo/logo.svg"
                  alt="Medimedia"
                  width={141}
                  height={65}
                  className="h-15 w-auto"
                  priority
                />
              </Link>
            </div>

            {/* Search Bar */}
            <div className="flex-1 max-w-md mx-4">
              <SearchBar />
            </div>

    

            {/* User Account Button or Notifications */}
            <div className="shrink-0 flex items-center gap-2">
              {isAuthenticated && <NotificationsDropdown />}
              <UserAccountButton />
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Header */}
      <div className="md:hidden">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16 gap-4">
            {/* Burger Menu Button - Right (RTL start) */}
            <div className="shrink-0">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="px-4 py-2 bg-[#E5E5E5] hover:bg-gray-200 text-gray-700 rounded-2xl transition-colors text-sm font-medium shadow-[inset_0_1px_3px_0_rgba(18,18,18,0.1)] cursor-pointer"
                aria-label="منو"
                aria-expanded={isMobileMenuOpen}
              >
                <Image
                  src="/header/burger.png"
                  alt="منو"
                  width={18}
                  height={18}
                  className="w-[18px] h-[18px]"
                />
              </button>
            </div>

            {/* Logo - Center */}
            <div className="flex-1 flex justify-center">
              <Link
                href="/"
                className="flex items-center gap-2 hover:opacity-80 transition-opacity"
                aria-label="Medimedia - صفحه اصلی"
              >
                <Image
                  src="/logo/logo.svg"
                  alt="Medimedia"
                  width={141}
                  height={65}
                  className="h-15 w-auto"
                  priority
                />
              </Link>
            </div>

            {/* User Account Button and Notifications - Left (RTL end) */}
            <div className="shrink-0 flex items-center gap-2 ">
              {isAuthenticated && <NotificationsDropdown />}
              <UserAccountButton />
            </div>
          </div>
        </div>
      </div>

      {/* Mobile & Tablet Menu Drawer - Slides from right (RTL) */}
      {shouldRenderDrawer && (
        <>
          {/* Backdrop */}
          <div
            className={`fixed inset-0 bg-black z-40 transition-opacity duration-300 ease-in-out lg:hidden${isDrawerVisible ? ' opacity-50' : ' opacity-0'}`}
            onClick={() => setIsMobileMenuOpen(false)}
          />
          {/* Drawer */}
          <div
            className={`fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-white shadow-xl z-50 transform transition-transform duration-300 ease-in-out lg:hidden${isDrawerVisible ? ' translate-x-0' : ' translate-x-full'}`}
          >
            <div className="flex flex-col h-full">
              {/* Drawer Header */}
              <div className="flex items-center justify-between p-4 border-b border-gray-200">
                <h2 className="text-lg font-bold font-serif text-gray-900">منو</h2>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                  aria-label="بستن منو"
                >
                  <svg
                    className="w-6 h-6 text-gray-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              {/* Drawer Content */}
              <div className="flex-1 overflow-y-auto p-4">
                <NavigationMenu onClose={() => setIsMobileMenuOpen(false)} />
              </div>
            </div>
          </div>
        </>
      )}
    </header>
  );
}

