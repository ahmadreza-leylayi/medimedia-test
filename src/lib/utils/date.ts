/**
 * Date and Time Utility Functions
 * توابع کمکی برای کار با تاریخ و زمان
 */

/**
 * Normalize time input - convert any format to Persian format (HH:MM)
 * تبدیل هر فرمت زمانی به فرمت فارسی استاندارد
 */
export const normalizeTime = (timeStr: string): string => {
  // Remove spaces
  let cleaned = timeStr.trim().replace(/\s/g, '');
  
  // Convert Persian/Arabic digits to English
  const persianToEnglish: Record<string, string> = {
    '۰': '0', '۱': '1', '۲': '2', '۳': '3', '۴': '4',
    '۵': '5', '۶': '6', '۷': '7', '۸': '8', '۹': '9',
    '٠': '0', '١': '1', '٢': '2', '٣': '3', '٤': '4',
    '٥': '5', '٦': '6', '٧': '7', '٨': '8', '٩': '9',
  };
  
  cleaned = cleaned.split('').map(char => persianToEnglish[char] || char).join('');
  
  // Extract numbers
  const numbers = cleaned.match(/\d+/g);
  if (!numbers || numbers.length === 0) return '';
  
  let hour = parseInt(numbers[0]) || 0;
  let minute = numbers.length > 1 ? parseInt(numbers[1]) : 0;
  
  // Validate range
  if (hour < 0 || hour > 23) return '';
  if (minute < 0 || minute > 59) return '';
  
  // Convert back to Persian digits
  const englishToPersian: Record<string, string> = {
    '0': '۰', '1': '۱', '2': '۲', '3': '۳', '4': '۴',
    '5': '۵', '6': '۶', '7': '۷', '8': '۸', '9': '۹',
  };
  
  const hourStr = hour.toString().padStart(2, '0');
  const minuteStr = minute.toString().padStart(2, '0');
  
  return hourStr.split('').map(d => englishToPersian[d] || d).join('') + 
         ':' + 
         minuteStr.split('').map(d => englishToPersian[d] || d).join('');
};

/**
 * Validate time format
 * بررسی صحت فرمت زمان
 */
export const validateTime = (timeStr: string): boolean => {
  if (!timeStr.trim()) return false;
  const normalized = normalizeTime(timeStr);
  return normalized.includes(':') && normalized.length >= 5;
};

/**
 * Convert Persian time to 24-hour format for comparison
 * تبدیل زمان فارسی به دقیقه برای مقایسه
 */
export const parsePersianTime = (timeStr: string): number => {
  // Convert Persian digits to English for calculation
  const persianToEnglish: Record<string, string> = {
    '۰': '0', '۱': '1', '۲': '2', '۳': '3', '۴': '4',
    '۵': '5', '۶': '6', '۷': '7', '۸': '8', '۹': '9',
  };
  const englishTime = timeStr.split('').map(char => persianToEnglish[char] || char).join('');
  const [hour, minute] = englishTime.split(':').map(Number);
  return (hour || 0) * 60 + (minute || 0);
};

/**
 * Get current time in minutes
 * دریافت زمان فعلی به دقیقه
 */
export const getCurrentTimeInMinutes = (): number => {
  const now = new Date();
  return now.getHours() * 60 + now.getMinutes();
};

/**
 * Check if appointment time has passed
 * بررسی اینکه آیا زمان نوبت گذشته است
 */
export const isTimePassed = (appointmentTime: string): boolean => {
  const appointmentMinutes = parsePersianTime(appointmentTime);
  const currentMinutes = getCurrentTimeInMinutes();
  return appointmentMinutes < currentMinutes;
};

/**
 * Format date for display (full date with weekday)
 * فرمت تاریخ برای نمایش (تاریخ کامل با روز هفته)
 */
export const formatSelectedDate = (date: Date): string => {
  return new Intl.DateTimeFormat('fa-IR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'long',
  }).format(date);
};

/**
 * Format month and year for display
 * فرمت ماه و سال برای نمایش
 */
export const formatMonthYear = (date: Date): string => {
  return new Intl.DateTimeFormat('fa-IR', {
    year: 'numeric',
    month: 'long',
  }).format(date);
};

/**
 * Format time for display
 * فرمت زمان برای نمایش
 */
export const formatTime = (date: Date): string => {
  return new Intl.DateTimeFormat('fa-IR', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  }).format(date);
};

/**
 * Check if date is in the past
 * بررسی اینکه آیا تاریخ در گذشته است
 */
export const isDateInPast = (date: Date): boolean => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const compareDate = new Date(date);
  compareDate.setHours(0, 0, 0, 0);
  return compareDate < today;
};

/**
 * Check if date is in the future
 * بررسی اینکه آیا تاریخ در آینده است
 */
export const isDateInFuture = (date: Date): boolean => {
  const today = new Date();
  today.setHours(23, 59, 59, 999);
  const compareDate = new Date(date);
  compareDate.setHours(0, 0, 0, 0);
  return compareDate > today;
};

/**
 * Check if date is today
 * بررسی اینکه آیا تاریخ امروز است
 */
export const isToday = (date: Date): boolean => {
  return date.toDateString() === new Date().toDateString();
};

/**
 * Get date string in YYYY-MM-DD format
 * دریافت رشته تاریخ به فرمت YYYY-MM-DD
 */
export const getDateString = (date: Date): string => {
  return date.toISOString().split('T')[0];
};

