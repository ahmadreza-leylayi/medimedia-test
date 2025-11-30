/**
 * Dashboard Constants
 * ثابت‌های مربوط به داشبورد
 */

/**
 * Patient names for mock data
 * نام‌های بیماران برای داده‌های تستی
 */
export const PATIENT_NAMES = [
  'پروین مجدی',
  'علی احمدی',
  'فاطمه رضایی',
  'محمد کریمی',
  'زهرا حسینی',
  'حسین محمدی',
  'مریم علیزاده',
  'رضا نوری',
] as const;

/**
 * Available appointment times
 * زمان‌های موجود برای نوبت‌دهی
 */
export const APPOINTMENT_TIMES = [
  '۰۸:۰۰',
  '۰۹:۳۰',
  '۱۱:۰۰',
  '۱۳:۳۰',
  '۱۵:۰۰',
  '۱۶:۳۰',
  '۱۸:۰۰',
  '۱۹:۳۰',
] as const;

/**
 * Appointment statuses
 * وضعیت‌های نوبت
 */
export const APPOINTMENT_STATUSES = [
  'active',
  'pending',
  'inactive',
  'completed',
  'cancelled',
] as const;

/**
 * Panel IDs for customization
 * شناسه‌های پنل‌ها برای شخصی‌سازی
 */
export const PANEL_IDS = {
  APPOINTMENTS: 'appointments',
  QUICK_ACTIONS: 'quickActions',
  STATISTICS: 'statistics',
} as const;

/**
 * Default panel order
 * ترتیب پیش‌فرض پنل‌ها
 */
export const DEFAULT_PANEL_ORDER = [
  PANEL_IDS.APPOINTMENTS,
  PANEL_IDS.QUICK_ACTIONS,
  PANEL_IDS.STATISTICS,
] as const;

/**
 * Chart periods
 * دوره‌های نمودار
 */
export const CHART_PERIODS = ['day', 'week', 'month', 'year'] as const;

/**
 * Chart period labels (Persian)
 * برچسب‌های دوره نمودار (فارسی)
 */
export const CHART_PERIOD_LABELS: Record<string, string> = {
  day: 'روز',
  week: 'هفته',
  month: 'ماه',
  year: 'سال',
} as const;

