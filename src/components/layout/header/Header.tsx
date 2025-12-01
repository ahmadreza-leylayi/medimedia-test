'use client';

import React, { useState, useEffect } from 'react';
import { SearchBar } from '../SearchBar';
import { NavigationMenu } from '../NavigationMenu';
import { UserAccountButton } from '../UserAccountButton';
import { NotificationsDropdown } from '../NotificationsDropdown';
import { HeaderLogo } from './HeaderLogo';
import { MobileDrawer } from './MobileDrawer';
import { useAppSelector } from '@/redux/hooks';

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
      setShouldRenderDrawer(true);
      const timer = setTimeout(() => setIsDrawerVisible(true), 10);
      document.body.style.overflow = 'hidden';
      return () => clearTimeout(timer);
    } else {
      setIsDrawerVisible(false);
      const timer = setTimeout(() => {
        setShouldRenderDrawer(false);
        document.body.style.overflow = '';
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isMobileMenuOpen]);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

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
                <div className="flex items-center gap-2 lg:gap-3 min-w-0 flex-1">
                  <HeaderLogo />
                  <div className="flex-1 max-w-md mx-2 lg:mx-3 xl:mx-4 min-w-0">
                    <SearchBar />
                  </div>
                  <nav className="hidden lg:flex items-center gap-4 xl:gap-6 shrink-0">
                    <NavigationMenu />
                  </nav>
                </div>
                <div className="shrink-0 flex items-center gap-3 lg:gap-3 xl:gap-4 flex-nowrap">
                  <NotificationsDropdown />
                  <UserAccountButton />
                </div>
              </>
            ) : (
              <>
                <div className="flex items-center gap-2 lg:gap-3 min-w-0 flex-1">
                  <HeaderLogo />
                  <div className="flex-1 max-w-md mx-2 lg:mx-3 xl:mx-4 min-w-0">
                    <SearchBar />
                  </div>
                  <nav className="hidden lg:flex items-center gap-4 xl:gap-6 shrink-0">
                    <NavigationMenu />
                  </nav>
                </div>
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
            <button
              onClick={toggleMobileMenu}
              className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-2xl transition-colors text-sm font-medium shadow-[inset_0_1px_3px_0_rgba(18,18,18,0.1)] cursor-pointer"
              aria-label="منو"
              aria-expanded={isMobileMenuOpen}
            >
              <svg className="w-[18px] h-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <HeaderLogo className="h-15" />
            <div className="flex-1 max-w-md mx-4">
              <SearchBar />
            </div>
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
            <button
              onClick={toggleMobileMenu}
              className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-2xl transition-colors text-sm font-medium shadow-[inset_0_1px_3px_0_rgba(18,18,18,0.1)] cursor-pointer"
              aria-label="منو"
              aria-expanded={isMobileMenuOpen}
            >
              <svg className="w-[18px] h-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <div className="flex-1 flex justify-center">
              <HeaderLogo className="h-15" />
            </div>
            <div className="shrink-0 flex items-center gap-2">
              {isAuthenticated && <NotificationsDropdown />}
              <UserAccountButton />
            </div>
          </div>
        </div>
      </div>

      {/* Mobile & Tablet Menu Drawer */}
      <MobileDrawer
        isVisible={isDrawerVisible}
        shouldRender={shouldRenderDrawer}
        onClose={closeMobileMenu}
      />
    </header>
  );
}

