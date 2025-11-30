# پنل داشبورد مدی‌مدیا

یک پنل مدیریت حرفه‌ای و کامل با Next.js 16، TypeScript، Redux Toolkit و Tailwind CSS

> **📚 برای جونیورها**: این پروژه با معماری حرفه‌ای و کامنت‌های کامل نوشته شده است. 
> - 🚀 **شروع سریع**: [QUICK_START.md](./QUICK_START.md)
> - 🏗️ **معماری**: [ARCHITECTURE.md](./ARCHITECTURE.md)
> - 📁 **ساختار**: [PROJECT_STRUCTURE.md](./PROJECT_STRUCTURE.md)

## 🚀 ویژگی‌های اصلی

### ✨ صفحات و قابلیت‌ها

- **📊 داشبورد اصلی**: نمایش آمار، نمودارها و ویجت‌های قابل تنظیم
- **📋 مدیریت کاربران**: جدول داده با pagination، جستجو، فیلتر و مرتب‌سازی
- **➕ افزودن و ویرایش**: فرم‌های کامل با validation
- **🗑️ حذف با تایید**: مودال حذف با پیام تایید
- **🎨 شخصی‌سازی UI**: تغییر تم، رنگ، فونت و Layout
- **📱 Responsive**: سازگار با تمام اندازه صفحه‌نمایش

### 🛠️ تکنولوژی‌ها

- **Next.js 14** (App Router)
- **TypeScript** (Type-safe)
- **Redux Toolkit** (State Management)
- **Tailwind CSS** (Styling)
- **Recharts** (Charts)
- **Persian Fonts** (Qs_Iranyekan)

## 📁 ساختار پروژه

```
src/
├── app/                          # Next.js App Router (صفحات)
│   ├── dashboard/
│   │   └── page.tsx             # صفحه داشبورد
│   ├── home/
│   │   └── page.tsx             # صفحه اصلی سایت
│   ├── layout.tsx               # Root Layout
│   ├── page.tsx                 # صفحه خانگی
│   └── globals.css              # استایل‌های全局
│
├── components/                   # کامپوننت‌های React
│   ├── dashboard/               # کامپوننت‌های داشبورد
│   │   ├── ui/                 # کامپوننت‌های UI پایه (قابل استفاده مجدد)
│   │   │   ├── Card.tsx
│   │   │   ├── Modal.tsx
│   │   │   ├── Table.tsx
│   │   │   ├── Sidebar.tsx
│   │   │   └── DraggablePanel.tsx
│   │   ├── panels/             # پنل‌های داشبورد (بخش‌های اصلی)
│   │   │   ├── AppointmentPanel.tsx
│   │   │   ├── QuickActionsPanel.tsx
│   │   │   ├── StatisticsChartPanel.tsx
│   │   │   ├── SearchPanel.tsx
│   │   │   ├── MenuPanel.tsx
│   │   │   └── AddAppointmentForm.tsx
│   │   ├── pages/              # صفحات کامل داشبورد
│   │   │   ├── DashboardMainPage.tsx
│   │   │   └── EmployeeListPage.tsx
│   │   ├── charts/             # نمودارها
│   │   │   └── StatsChart.tsx
│   │   ├── forms/              # فرم‌ها
│   │   │   └── EmployeeForm.tsx
│   │   ├── DashboardContainer.tsx  # Container اصلی
│   │   └── index.ts            # Export مرکزی
│   ├── home/                    # کامپوننت‌های صفحه اصلی
│   └── layout/                  # Layout components (Header, Footer)
│
├── redux/                       # State Management (Redux Toolkit)
│   ├── slices/                 # Redux Slices
│   │   ├── dashboardSlice.ts  # State مربوط به داشبورد
│   │   └── exampleSlice.ts
│   ├── providers/             # Providers
│   │   └── ReduxProvider.tsx
│   ├── store.ts               # Store Configuration
│   └── hooks.ts               # Typed Hooks
│
├── types/                       # TypeScript Types
│   ├── dashboard.ts           # Types مربوط به داشبورد
│   └── index.ts              # Export مرکزی
│
└── lib/                        # Utility Functions
    └── utils.ts              # Helper Functions
```

**📖 برای جزئیات بیشتر**: [ARCHITECTURE.md](./ARCHITECTURE.md) را مطالعه کنید.

## 🚀 شروع سریع

برای شروع کار، ابتدا [QUICK_START.md](./QUICK_START.md) را مطالعه کنید.

## 🎯 نحوه استفاده

### نصب

```bash
npm install
```

### اجرا

```bash
# Development
npm run dev

# Build
npm run build

# Production
npm start
```

### دسترسی به صفحات

- صفحه اصلی: `http://localhost:3000`
- داشبورد: `http://localhost:3000/dashboard`
- صفحه Home: `http://localhost:3000/home`

## 📖 مستندات

### برای شروع:
- **[QUICK_START.md](./QUICK_START.md)**: راهنمای شروع سریع برای مبتدیان
- **[ARCHITECTURE.md](./ARCHITECTURE.md)**: معماری کامل پروژه (⚠️ مهم!)
- **[PROJECT_STRUCTURE.md](./PROJECT_STRUCTURE.md)**: ساختار کامل فایل‌ها

### برای توسعه:
- **[CONTRIBUTING.md](./CONTRIBUTING.md)**: راهنمای مشارکت در پروژه
- **[src/components/dashboard/README.md](./src/components/dashboard/README.md)**: مستندات کامپوننت‌های داشبورد
- **[src/redux/README.md](./src/redux/README.md)**: مستندات Redux
- **[src/types/README.md](./src/types/README.md)**: مستندات Types

### مستندات قدیمی:
- **[DASHBOARD_DOCS.md](./DASHBOARD_DOCS.md)**: مستندات قدیمی داشبورد

## 🎨 کامپوننت‌های قابل استفاده

### Table Component

```typescript
import { Table } from '@/components/dashboard';

<Table
  data={employees}
  columns={columns}
  selectedRows={selectedRows}
  onSelectRow={handleSelectRow}
  renderCell={renderCell}
/>
```

### Chart Component

```typescript
import { StatsChart } from '@/components/dashboard';

<StatsChart 
  data={chartData} 
  title="آمار و ارقام" 
/>
```

### Modal Component

```typescript
import { DeleteModal } from '@/components/dashboard';

<DeleteModal
  isOpen={isOpen}
  onClose={handleClose}
  onConfirm={handleConfirm}
  title="حذف آیتم"
  message="آیا مطمئن هستید؟"
/>
```

## 🔄 Redux State Management

```typescript
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { addEmployee, deleteEmployee } from '@/redux/slices/dashboardSlice';

// Get state
const { employees } = useAppSelector((state) => state.dashboard);

// Dispatch actions
dispatch(addEmployee(newEmployee));
dispatch(deleteEmployee(employeeId));
```

## 🎨 شخصی‌سازی

داشبورد شامل پنل شخصی‌سازی است که امکان تغییر موارد زیر را فراهم می‌کند:

- **تم رنگی** (روشن/تیره)
- **اندازه فونت** (کوچک/متوسط/بزرگ)
- **رنگ اصلی** (5 رنگ پیش‌فرض)
- **حالت فشرده**
- **نمایش نوار کناری**

## 📱 Responsive Design

- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

## 🌍 RTL Support

تمام کامپوننت‌ها از راست به چپ (RTL) پشتیبانی می‌کنند و با فونت‌های فارسی Qs_Iranyekan طراحی شده‌اند.

## 🔐 TypeScript

تمام کامپوننت‌ها و functions دارای Type annotation کامل هستند.

## 📊 Features List

- ✅ Dashboard با نمودارها
- ✅ جدول داده با Pagination
- ✅ فرم افزودن و ویرایش
- ✅ مودال حذف با تایید
- ✅ فیلتر و جستجو
- ✅ Multi-select
- ✅ شخصی‌سازی UI
- ✅ Sidebar برای ویجت‌ها
- ✅ Redux State Management
- ✅ TypeScript
- ✅ Responsive Design
- ✅ RTL Support
- ✅ Persian Fonts

## 🚀 آینده پروژه

- [ ] Dark Mode کامل
- [ ] Export به Excel/PDF
- [ ] Real-time با WebSocket
- [ ] Drag & Drop ویجت‌ها
- [ ] نقشه (Map)
- [ ] Notification System
- [ ] Permission System (RBAC)
- [ ] PWA Support

## 📝 نمونه کد

### ایجاد صفحه داشبورد

```typescript
'use client';

import { DashboardContainer } from '@/components/dashboard';

export default function DashboardPage() {
  return <DashboardContainer />;
}
```

### استفاده از Redux

```typescript
// تنظیم داده‌ها
dispatch(setEmployees(employeesArray));

// افزودن کاربر
dispatch(addEmployee(newEmployee));

// حذف کاربر
dispatch(deleteEmployee(employeeId));

// باز کردن مودال
dispatch(openModal('add'));
```

## 🤝 مشارکت

برای مشارکت در پروژه:

1. Fork کنید
2. Branch جدید بسازید (`git checkout -b feature/AmazingFeature`)
3. Commit کنید (`git commit -m 'Add some AmazingFeature'`)
4. Push کنید (`git push origin feature/AmazingFeature`)
5. Pull Request باز کنید

## 📄 لایسنس

این پروژه برای مدی‌مدیا ساخته شده است.

## 👨‍💻 توسعه‌دهنده

ساخته شده با ❤️ برای مدی‌مدیا

## 📞 پشتیبانی

برای سوالات و مشکلات، یک Issue در GitHub ایجاد کنید.

---

**نکته**: این یک پروژه حرفه‌ای و production-ready است که تمام best practices را رعایت می‌کند.
