'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useAppSelector } from '@/redux/hooks';
import { getMessages, markMessageAsRead, getUnreadCount } from '@/mocks/messages';
import type { Message } from '@/types/message';
import Link from 'next/link';

export function NotificationsDropdown() {
  const router = useRouter();
  const { user } = useAppSelector((state) => state.auth);
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isMounted, setIsMounted] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Fix hydration mismatch: only render after client-side mount
  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (user) {
      const loadMessages = () => {
        const userMessages = getMessages(user.id);
        setMessages(userMessages);
        setUnreadCount(getUnreadCount(user.id));
      };
      
      loadMessages();
      
      // Refresh messages every 5 seconds
      const interval = setInterval(loadMessages, 5000);
      
      return () => clearInterval(interval);
    }
  }, [user]);

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

  const handleMessageClick = (message: Message) => {
    if (user) {
      if (!message.read) {
        markMessageAsRead(message.id, user.id);
        const updatedMessages = getMessages(user.id);
        setMessages(updatedMessages);
        setUnreadCount(getUnreadCount(user.id));
      }
      setIsOpen(false);
      router.push(`/messages?messageId=${message.id}`);
    }
  };

  // Prevent hydration mismatch by not rendering until client-side
  if (!isMounted || !user) return null;

  const getTypeColor = (type: Message['type']) => {
    switch (type) {
      case 'success':
        return 'bg-green-100 text-green-800';
      case 'warning':
        return 'bg-yellow-100 text-yellow-800';
      case 'error':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-blue-100 text-blue-800';
    }
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 60) {
      return `${minutes} دقیقه پیش`;
    } else if (hours < 24) {
      return `${hours} ساعت پیش`;
    } else {
      return `${days} روز پیش`;
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative w-10 h-10 rounded-full bg-red-100 hover:bg-red-200 flex items-center justify-center transition-colors"
        aria-label="پیام‌ها"
      >
        <svg
          className="w-5 h-5 text-red-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
          />
        </svg>
        {unreadCount > 0 && (
          <span className="absolute top-0 right-0 w-5 h-5 bg-red-600 text-white text-xs rounded-full flex items-center justify-center border-2 border-white">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-40 bg-black/50 md:bg-transparent"
            onClick={() => setIsOpen(false)}
          />
          
          {/* Dropdown - Mobile: Fixed bottom sheet, Desktop: Absolute dropdown */}
          <div className="fixed bottom-0 left-0 right-0 md:absolute md:bottom-auto md:left-0 md:right-auto md:top-full md:mt-2 md:w-80 md:rounded-xl md:shadow-2xl md:border md:border-gray-200 bg-white rounded-t-2xl md:rounded-t-xl shadow-2xl border-t border-r border-l border-gray-200 z-50 max-h-[85vh] md:max-h-96 overflow-hidden flex flex-col">
            {/* Mobile: Drag Handle */}
            <div className="md:hidden pt-3 pb-2 flex justify-center">
              <div className="w-12 h-1 bg-gray-300 rounded-full"></div>
            </div>
            
            {/* Header */}
            <div className="px-4 py-3 border-b border-gray-200 flex flex-col items-center justify-center relative">
              {/* Mobile: Close button */}
              <button
                onClick={() => setIsOpen(false)}
                className="md:hidden absolute left-4 p-2 -ml-2 text-gray-500 hover:text-gray-700"
                aria-label="بستن"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <h3 className="font-semibold text-gray-900">پیام‌ها</h3>
              {unreadCount > 0 && (
                <span className="text-xs text-gray-500 mt-1">
                  {unreadCount} پیام خوانده نشده
                </span>
              )}
            </div>

            {/* Messages List */}
            <div className="overflow-y-auto flex-1">
              {messages.length === 0 ? (
                <div className="px-4 py-8 text-center text-gray-500">
                  پیامی وجود ندارد
                </div>
              ) : (
                <div className="divide-y divide-gray-100">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      onClick={() => handleMessageClick(message)}
                      className={`px-4 py-3 hover:bg-gray-50 cursor-pointer transition-colors ${
                        !message.read ? 'bg-blue-50' : ''
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div
                          className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                            !message.read ? 'bg-blue-600' : 'bg-transparent'
                          }`}
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <h4 className="text-sm font-semibold text-gray-900 truncate">
                              {message.title}
                            </h4>
                            <span
                              className={`text-xs px-2 py-0.5 rounded-full flex-shrink-0 ${getTypeColor(
                                message.type
                              )}`}
                            >
                              {message.type === 'success' && 'موفقیت'}
                              {message.type === 'warning' && 'هشدار'}
                              {message.type === 'error' && 'خطا'}
                              {message.type === 'info' && 'اطلاعیه'}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 line-clamp-2 mb-1">
                            {message.content}
                          </p>
                          <span className="text-xs text-gray-400">
                            {formatTime(message.createdAt)}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {messages.length > 0 && (
              <div className="px-4 py-2 border-t border-gray-200 text-center">
                <Link
                  href="/messages"
                  onClick={() => setIsOpen(false)}
                  className="text-sm text-teal-600 hover:text-teal-700 font-medium inline-block"
                >
                  مشاهده همه پیام‌ها
                </Link>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}

