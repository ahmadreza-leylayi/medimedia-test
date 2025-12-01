'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useAppSelector, useAppDispatch } from '@/redux/hooks';
import { logout } from '@/redux/slices/authSlice';
import Link from 'next/link';
import Image from 'next/image';

interface UserAccountButtonProps {
  className?: string;
}

export function UserAccountButton({ className }: UserAccountButtonProps) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { user, isAuthenticated } = useAppSelector((state) => state.auth);
  const [isOpen, setIsOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Fix hydration mismatch: only render after client-side mount
  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleLogout = () => {
    dispatch(logout());
    setIsOpen(false);
    router.push('/login');
  };

  // Prevent hydration mismatch by not rendering until client-side
  if (!isMounted || !isAuthenticated || !user) {
    return (
      <Link
        href="/login"
        className={`px-4 py-2 bg-[#E5E5E5] hover:bg-gray-200 text-gray-700 rounded-2xl transition-colors text-sm font-medium shadow-[inset_0_1px_3px_0_rgba(18,18,18,0.1)] cursor-pointer inline-block${className ? ` ${className}` : ''}`}
      >
        حساب کاربری
      </Link>
    );
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-2 px-3 py-2 bg-[#E5E5E5] hover:bg-gray-200 rounded-2xl transition-colors text-sm font-medium shadow-[inset_0_1px_3px_0_rgba(18,18,18,0.1)] cursor-pointer${className ? ` ${className}` : ''}`}
      >
        {user.avatar ? (
          <img
            src={user.avatar}
            alt={user.firstName}
            className="w-8 h-8 rounded-full object-cover"
          />
        ) : (
          <div className="w-8 h-8 rounded-full bg-teal-600 flex items-center justify-center text-white text-xs font-bold">
            {user.firstName?.charAt(0) || 'U'}
          </div>
        )}
        <span className="hidden md:block text-gray-700">
          {user.firstName} {user.lastName}
        </span>
        <svg
          className={`w-4 h-4 text-gray-600 transition-transform${isOpen ? ' rotate-180' : ''}`}
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
      </button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          
          {/* Dropdown */}
          <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-xl shadow-2xl border border-gray-200 z-50 overflow-hidden">
            {/* User Info */}
            <div className="px-4 py-3 border-b border-gray-200 bg-gray-50">
              <p className="text-sm font-semibold text-gray-900">
                {user.firstName} {user.lastName}
              </p>
              <p className="text-xs text-gray-500 mt-1">{user.username}</p>
            </div>

            {/* Menu Items */}
            <div className="py-2">
              <Link
                href="/profile"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
              >
                <svg
                  className="w-5 h-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
                پنل کاربری
              </Link>
              <Link
                href="/dashboard"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
              >
                <svg
                  className="w-5 h-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
                داشبورد
              </Link>
            </div>

            {/* Logout Button */}
            <div className="border-t border-gray-200 pt-2">
              <button
                onClick={handleLogout}
                className="flex items-center gap-3 w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                  />
                </svg>
                خروج از حساب کاربری
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

