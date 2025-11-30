# معماری پروژه Medimedia Dashboard

این سند معماری کامل پروژه را برای توسعه‌دهندگان، به ویژه جونیورها، توضیح می‌دهد.

## 📋 فهرست مطالب

1. [ساختار کلی پروژه](#ساختار-کلی-پروژه)
2. [ساختار پوشه‌ها](#ساختار-پوشه‌ها)
3. [جریان داده (Data Flow)](#جریان-داده)
4. [کامپوننت‌ها](#کامپوننت‌ها)
5. [State Management](#state-management)
6. [Best Practices](#best-practices)
7. [نحوه افزودن Feature جدید](#نحوه-افزودن-feature-جدید)

---

## 🏗️ ساختار کلی پروژه

```
medi-media/
├── public/                    # فایل‌های استاتیک (تصاویر، فونت‌ها)
│   └── dashboard/            # تصاویر مخصوص داشبورد
├── src/
│   ├── app/                  # Next.js App Router (صفحات)
│   ├── components/          # کامپوننت‌های React
│   ├── redux/               # State Management (Redux Toolkit)
│   ├── types/               # TypeScript Types
│   ├── lib/                 # Utility Functions
│   └── hooks/               # Custom React Hooks
├── README.md                # راهنمای کلی پروژه
└── ARCHITECTURE.md          # این فایل
```

---

## 📁 ساختار پوشه‌ها

### 1. `/src/app` - صفحات Next.js

```
app/
├── layout.tsx              # Root Layout (Redux Provider)
├── page.tsx                # صفحه اصلی
├── dashboard/
│   └── page.tsx           # صفحه داشبورد
└── home/
    └── page.tsx           # صفحه Home
```

**نکته**: این پوشه توسط Next.js App Router استفاده می‌شود. هر فایل `page.tsx` یک route است.

---

### 2. `/src/components` - کامپوننت‌های React

```
components/
├── dashboard/              # کامپوننت‌های داشبورد
│   ├── ui/                # کامپوننت‌های UI پایه (قابل استفاده مجدد)
│   │   ├── Card.tsx
│   │   ├── Modal.tsx
│   │   ├── Table.tsx
│   │   ├── Sidebar.tsx
│   │   └── DraggablePanel.tsx
│   ├── charts/           # کامپوننت‌های نمودار
│   │   └── StatsChart.tsx
│   ├── panels/           # پنل‌های داشبورد (بخش‌های اصلی)
│   │   ├── AppointmentPanel.tsx      # پنل نوبت‌دهی
│   │   ├── QuickActionsPanel.tsx      # پنل عملیات سریع
│   │   ├── StatisticsChartPanel.tsx   # پنل نمودار آمار
│   │   ├── SearchPanel.tsx            # پنل جستجو
│   │   ├── MenuPanel.tsx              # پنل منو
│   │   └── AddAppointmentForm.tsx     # فرم افزودن نوبت
│   ├── pages/            # صفحات کامل داشبورد
│   │   ├── DashboardMainPage.tsx      # صفحه اصلی داشبورد
│   │   └── EmployeeListPage.tsx       # صفحه لیست کاربران
│   ├── forms/            # فرم‌ها
│   │   └── EmployeeForm.tsx
│   ├── DashboardContainer.tsx  # Container اصلی (Redux Connection)
│   └── index.ts          # Export مرکزی
├── home/                  # کامپوننت‌های صفحه اصلی
└── layout/                # کامپوننت‌های Layout (Header, Footer)
```

**قوانین:**
- **ui/**: کامپوننت‌های پایه که در همه جا قابل استفاده هستند
- **panels/**: بخش‌های اصلی داشبورد که هر کدام یک وظیفه خاص دارند
- **pages/**: صفحات کامل که از panels و ui استفاده می‌کنند
- **forms/**: فرم‌های ورود داده

---

### 3. `/src/redux` - State Management

```
redux/
├── store.ts              # Redux Store Configuration
├── hooks.ts              # Typed Hooks (useAppDispatch, useAppSelector)
├── providers/
│   └── ReduxProvider.tsx # Redux Provider Component
└── slices/
    ├── dashboardSlice.ts # State مربوط به داشبورد
    └── exampleSlice.ts   # مثال (می‌تواند حذف شود)
```

**نکته**: هر slice یک بخش از state را مدیریت می‌کند.

---

### 4. `/src/types` - TypeScript Types

```
types/
├── dashboard.ts          # Types مربوط به داشبورد
└── index.ts              # Export مرکزی
```

**نکته**: همه types در اینجا تعریف می‌شوند تا قابل استفاده مجدد باشند.

---

## 🔄 جریان داده (Data Flow)

### 1. State Management با Redux

```
User Action → Component → dispatch(action) → Redux Slice → State Update → Component Re-render
```

**مثال:**
```typescript
// 1. کاربر روی دکمه "حذف" کلیک می‌کند
// 2. Component تابع handleDelete را صدا می‌زند
// 3. dispatch(deleteEmployee(id)) اجرا می‌شود
// 4. Redux Slice state را به‌روزرسانی می‌کند
// 5. Component به صورت خودکار re-render می‌شود
```

### 2. LocalStorage Sync

```
State Change → Redux Middleware → localStorage.setItem() → Persist Data
```

**مثال:**
```typescript
// هر بار که employees تغییر می‌کند:
// 1. Redux Middleware متوجه می‌شود
// 2. localStorage را به‌روزرسانی می‌کند
// 3. در بارگذاری بعدی، از localStorage خوانده می‌شود
```

---

## 🧩 کامپوننت‌ها

### ساختار یک کامپوننت

```typescript
'use client'; // برای استفاده از hooks و event handlers

import React, { useState } from 'react';
import { useAppSelector } from '@/redux/hooks';

// 1. تعریف Props Interface
interface MyComponentProps {
  title: string;
  onAction: () => void;
}

// 2. تعریف Component
export const MyComponent: React.FC<MyComponentProps> = ({ title, onAction }) => {
  // 3. State (اگر نیاز باشد)
  const [count, setCount] = useState(0);
  
  // 4. Redux State (اگر نیاز باشد)
  const { data } = useAppSelector((state) => state.dashboard);
  
  // 5. Handlers
  const handleClick = () => {
    setCount(count + 1);
    onAction();
  };
  
  // 6. Render
  return (
    <div>
      <h1>{title}</h1>
      <button onClick={handleClick}>Count: {count}</button>
    </div>
  );
};
```

### انواع کامپوننت‌ها

#### 1. **UI Components** (`components/dashboard/ui/`)
- کامپوننت‌های پایه و قابل استفاده مجدد
- مثال: `Card`, `Modal`, `Table`, `Sidebar`
- **ویژگی**: بدون وابستگی به business logic

#### 2. **Panel Components** (`components/dashboard/panels/`)
- بخش‌های اصلی داشبورد
- مثال: `AppointmentPanel`, `StatisticsChartPanel`
- **ویژگی**: یک وظیفه خاص را انجام می‌دهند

#### 3. **Page Components** (`components/dashboard/pages/`)
- صفحات کامل
- مثال: `DashboardMainPage`, `EmployeeListPage`
- **ویژگی**: از panels و ui استفاده می‌کنند

#### 4. **Container Components** (`components/dashboard/`)
- اتصال به Redux
- مثال: `DashboardContainer`
- **ویژگی**: State management و business logic

---

## 🗄️ State Management

### Redux Slice Structure

```typescript
// redux/slices/dashboardSlice.ts

interface DashboardState {
  employees: Employee[];      // لیست کاربران
  tasks: Task[];             // لیست وظایف
  filters: FilterOptions;     // فیلترها
  pagination: PaginationInfo; // اطلاعات pagination
  // ...
}

// Actions
- setEmployees()      // تنظیم لیست کاربران
- addEmployee()      // افزودن کاربر
- updateEmployee()   // ویرایش کاربر
- deleteEmployee()    // حذف کاربر
- setFilters()       // تنظیم فیلترها
```

### استفاده در Component

```typescript
// 1. Import hooks
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { addEmployee, deleteEmployee } from '@/redux/slices/dashboardSlice';

// 2. در Component
const dispatch = useAppDispatch();
const { employees } = useAppSelector((state) => state.dashboard);

// 3. استفاده
dispatch(addEmployee(newEmployee));
dispatch(deleteEmployee(id));
```

---

## ✅ Best Practices

### 1. نام‌گذاری

- **Components**: PascalCase (`AppointmentPanel.tsx`)
- **Files**: PascalCase برای components، camelCase برای utilities
- **Functions**: camelCase (`handleAddAppointment`)
- **Constants**: UPPER_SNAKE_CASE (`MAX_ITEMS`)

### 2. ساختار فایل

```typescript
// 1. Imports (React, Next, Third-party, Local)
import React from 'react';
import { useAppSelector } from '@/redux/hooks';
import { Card } from '@/components/dashboard/ui';

// 2. Types/Interfaces
interface Props { ... }

// 3. Component
export const MyComponent: React.FC<Props> = ({ ... }) => {
  // 4. Hooks
  // 5. State
  // 6. Effects
  // 7. Handlers
  // 8. Render
};
```

### 3. کامنت‌گذاری

```typescript
/**
 * کامپوننت پنل نوبت‌دهی
 * 
 * این کامپوننت شامل:
 * - نمایش تاریخ و زمان
 * - لیست نوبت‌ها
 * - افزودن نوبت جدید
 */
export const AppointmentPanel: React.FC<Props> = ({ ... }) => {
  // ...
};
```

### 4. Separation of Concerns

- **UI Logic**: در Component
- **Business Logic**: در Redux Slice یا Custom Hooks
- **Data Fetching**: در Redux Thunks (آینده)
- **Utilities**: در `/src/lib`

---

## 🚀 نحوه افزودن Feature جدید

### مثال: افزودن "مدیریت داروخانه"

#### 1. ایجاد Types

```typescript
// src/types/dashboard.ts
export interface Pharmacy {
  id: string;
  name: string;
  address: string;
  phone: string;
}
```

#### 2. ایجاد Redux Slice (یا اضافه به slice موجود)

```typescript
// src/redux/slices/dashboardSlice.ts
interface DashboardState {
  // ...
  pharmacies: Pharmacy[];
}

reducers: {
  addPharmacy: (state, action: PayloadAction<Pharmacy>) => {
    state.pharmacies.push(action.payload);
  },
  // ...
}
```

#### 3. ایجاد Component

```typescript
// src/components/dashboard/panels/PharmacyPanel.tsx
export const PharmacyPanel: React.FC = () => {
  const { pharmacies } = useAppSelector((state) => state.dashboard);
  // ...
};
```

#### 4. اضافه کردن به Page

```typescript
// src/components/dashboard/pages/DashboardMainPage.tsx
import { PharmacyPanel } from '@/components/dashboard/panels/PharmacyPanel';

// در render:
<PharmacyPanel />
```

---

## 📚 منابع یادگیری

### برای جونیورها:

1. **React**: [React Docs](https://react.dev)
2. **Next.js**: [Next.js Docs](https://nextjs.org/docs)
3. **Redux Toolkit**: [Redux Toolkit Docs](https://redux-toolkit.js.org)
4. **TypeScript**: [TypeScript Handbook](https://www.typescriptlang.org/docs/)

### مفاهیم کلیدی:

- **Component Lifecycle**: useEffect, useState
- **State Management**: Redux Toolkit
- **Type Safety**: TypeScript Interfaces
- **RTL Support**: dir="rtl", text-right
- **Responsive Design**: Tailwind CSS breakpoints

---

## 🔍 نکات مهم

### 1. RTL (Right-to-Left)
- همه صفحات باید `dir="rtl"` داشته باشند
- از `text-right` برای متن فارسی استفاده کنید
- آیکون‌ها و borderها باید معکوس شوند

### 2. Fonts
- استفاده از `Qs_Iranyekan` برای متن عادی
- استفاده از `Qs_Iranyekan-bold` برای متن bold
- اعداد فارسی: از `Intl.NumberFormat('fa-IR')` استفاده کنید

### 3. LocalStorage
- همه لیست‌ها به صورت خودکار در localStorage ذخیره می‌شوند
- در mount، از localStorage خوانده می‌شوند

### 4. Error Handling
- همیشه try-catch برای localStorage استفاده کنید
- برای API calls (آینده)، error handling اضافه کنید

---

## 📝 چک‌لیست برای جونیورها

قبل از شروع کار روی یک feature:

- [ ] ساختار پوشه‌ها را فهمیدم
- [ ] Redux flow را فهمیدم
- [ ] Component structure را فهمیدم
- [ ] Types را تعریف کردم
- [ ] Component را در پوشه مناسب قرار دادم
- [ ] Export را به index.ts اضافه کردم
- [ ] کامنت‌های لازم را اضافه کردم
- [ ] RTL را رعایت کردم
- [ ] TypeScript errors را بررسی کردم

---

**نکته نهایی**: اگر سوالی دارید، از کامنت‌گذاری و مستندات استفاده کنید. کدها به گونه‌ای نوشته شده‌اند که خودشان را توضیح دهند.
