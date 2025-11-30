/**
 * Dashboard Components - Export مرکزی
 * 
 * این فایل تمام کامپوننت‌های داشبورد را export می‌کند.
 * برای استفاده راحت‌تر، همه کامپوننت‌ها از اینجا import می‌شوند.
 * 
 * @example
 * ```typescript
 * import { Card, Modal, Table } from '@/components/dashboard';
 * ```
 */

// Container (اصلی)
export { DashboardContainer } from './DashboardContainer';

// UI Components (قابل استفاده مجدد)
export * from './ui';

// Chart Components
export * from './charts';

// Panel Components (بخش‌های اصلی داشبورد)
export * from './panels';

// Page Components (صفحات کامل)
export * from './pages';

// Forms
export * from './forms';
