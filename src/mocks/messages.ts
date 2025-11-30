import type { Message } from '@/types/message';

// Sample messages
export const mockMessages: Message[] = [
  {
    id: '1',
    userId: '1', // admin user
    title: 'خوش آمدید',
    content: 'به پنل مدیریت مدی‌مدیا خوش آمدید. از اینجا می‌توانید تمام امکانات را مدیریت کنید.',
    type: 'success',
    read: false,
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
  },
  {
    id: '2',
    userId: '1',
    title: 'به‌روزرسانی سیستم',
    content: 'سیستم در تاریخ ۱۴۰۳/۰۱/۱۵ به‌روزرسانی خواهد شد. لطفا اطلاعات خود را ذخیره کنید.',
    type: 'warning',
    read: false,
    createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(), // 5 hours ago
  },
  {
    id: '3',
    userId: '1',
    title: 'نوبت جدید',
    content: 'یک نوبت جدید برای شما ثبت شده است.',
    type: 'info',
    read: true,
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
  },
];

// Load messages from localStorage or use default
export const getMessages = (userId: string): Message[] => {
  if (typeof window === 'undefined') return mockMessages.filter(m => m.userId === userId);
  
  try {
    const stored = localStorage.getItem(`messages-${userId}`);
    if (stored) {
      return JSON.parse(stored);
    }
    // Save initial messages for this user
    const userMessages = mockMessages.filter(m => m.userId === userId);
    localStorage.setItem(`messages-${userId}`, JSON.stringify(userMessages));
    return userMessages;
  } catch (error) {
    console.error('Error loading messages:', error);
    return mockMessages.filter(m => m.userId === userId);
  }
};

// Add new message
export const addMessage = (message: Message): void => {
  if (typeof window === 'undefined') return;
  
  try {
    const messages = getMessages(message.userId);
    messages.unshift(message);
    localStorage.setItem(`messages-${message.userId}`, JSON.stringify(messages));
  } catch (error) {
    console.error('Error adding message:', error);
  }
};

// Mark message as read
export const markMessageAsRead = (messageId: string, userId: string): void => {
  if (typeof window === 'undefined') return;
  
  try {
    const messages = getMessages(userId);
    const message = messages.find(m => m.id === messageId);
    if (message) {
      message.read = true;
      localStorage.setItem(`messages-${userId}`, JSON.stringify(messages));
    }
  } catch (error) {
    console.error('Error marking message as read:', error);
  }
};

// Get unread count
export const getUnreadCount = (userId: string): number => {
  const messages = getMessages(userId);
  return messages.filter(m => !m.read).length;
};

