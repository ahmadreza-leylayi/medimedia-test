'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAppSelector } from '@/redux/hooks';
import { getMessages, markMessageAsRead } from '@/mocks/messages';
import type { Message } from '@/types/message';
import Link from 'next/link';

function MessagesContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user } = useAppSelector((state) => state.auth);
  const [messages, setMessages] = useState<Message[]>([]);
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);

  useEffect(() => {
    if (!user) {
      router.push('/login');
      return;
    }

    const userMessages = getMessages(user.id);
    setMessages(userMessages);

    // Check if messageId is in query params
    const messageId = searchParams.get('messageId');
    if (messageId) {
      const message = userMessages.find(m => m.id === messageId);
      if (message) {
        setSelectedMessage(message);
        if (!message.read) {
          markMessageAsRead(message.id, user.id);
          const updatedMessages = getMessages(user.id);
          setMessages(updatedMessages);
        }
      }
    }
  }, [user, router, searchParams]);

  const handleMessageClick = (message: Message) => {
    if (user && !message.read) {
      markMessageAsRead(message.id, user.id);
      const updatedMessages = getMessages(user.id);
      setMessages(updatedMessages);
    }
    setSelectedMessage(message);
  };

  const getTypeColor = (type: Message['type']) => {
    switch (type) {
      case 'success':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'warning':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'error':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-blue-100 text-blue-800 border-blue-200';
    }
  };

  const getTypeLabel = (type: Message['type']) => {
    switch (type) {
      case 'success':
        return 'موفقیت';
      case 'warning':
        return 'هشدار';
      case 'error':
        return 'خطا';
      default:
        return 'اطلاعیه';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('fa-IR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4" dir="rtl">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-6">
          <Link
            href="/dashboard"
            className="text-teal-600 hover:text-teal-700 mb-4 inline-block"
          >
            ← بازگشت به داشبورد
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">پیام‌ها</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Messages List */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="px-4 py-3 border-b border-gray-200 bg-gray-50">
                <h2 className="font-semibold text-gray-900">لیست پیام‌ها</h2>
                <p className="text-xs text-gray-500 mt-1">
                  {messages.filter(m => !m.read).length} پیام خوانده نشده
                </p>
              </div>
              <div className="divide-y divide-gray-100 max-h-[600px] overflow-y-auto">
                {messages.length === 0 ? (
                  <div className="px-4 py-8 text-center text-gray-500">
                    پیامی وجود ندارد
                  </div>
                ) : (
                  messages.map((message) => (
                    <div
                      key={message.id}
                      onClick={() => handleMessageClick(message)}
                      className={`px-4 py-3 cursor-pointer transition-colors hover:bg-gray-50 ${
                        selectedMessage?.id === message.id ? 'bg-teal-50 border-r-4 border-teal-600' : ''
                      } ${!message.read ? 'bg-blue-50' : ''}`}
                    >
                      <div className="flex items-start gap-3">
                        <div
                          className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                            !message.read ? 'bg-blue-600' : 'bg-transparent'
                          }`}
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <h3 className="text-sm font-semibold text-gray-900 truncate">
                              {message.title}
                            </h3>
                            <span
                              className={`text-xs px-2 py-0.5 rounded-full flex-shrink-0 ${getTypeColor(
                                message.type
                              )}`}
                            >
                              {getTypeLabel(message.type)}
                            </span>
                          </div>
                          <p className="text-xs text-gray-600 line-clamp-2 mb-1">
                            {message.content}
                          </p>
                          <span className="text-xs text-gray-400">
                            {formatDate(message.createdAt)}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* Message Detail */}
          <div className="lg:col-span-2">
            {selectedMessage ? (
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">
                      {selectedMessage.title}
                    </h2>
                    <div className="flex items-center gap-3">
                      <span
                        className={`text-sm px-3 py-1 rounded-full ${getTypeColor(
                          selectedMessage.type
                        )}`}
                      >
                        {getTypeLabel(selectedMessage.type)}
                      </span>
                      <span className="text-sm text-gray-500">
                        {formatDate(selectedMessage.createdAt)}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="prose max-w-none">
                  <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                    {selectedMessage.content}
                  </p>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-2xl shadow-lg p-8 flex items-center justify-center min-h-[400px]">
                <div className="text-center text-gray-500">
                  <svg
                    className="w-16 h-16 mx-auto mb-4 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  <p className="text-lg">یک پیام را انتخاب کنید</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function MessagesPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 py-8 px-4 flex items-center justify-center" dir="rtl">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600 mx-auto mb-4"></div>
          <p className="text-gray-600">در حال بارگذاری...</p>
        </div>
      </div>
    }>
      <MessagesContent />
    </Suspense>
  );
}

