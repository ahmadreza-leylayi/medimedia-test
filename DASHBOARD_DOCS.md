# پنل داشبورد - مستندات

## ساختار پروژه

```
src/
├── types/
│   └── dashboard.ts              # تایپ‌های TypeScript برای داشبورد
├── redux/
│   ├── slices/
│   │   └── dashboardSlice.ts     # Redux slice برای مدیریت state
│   └── store.ts                  # Redux store
├── components/
│   └── dashboard/
│       ├── ui/                   # کامپوننت‌های UI اصلی
│       │   ├── Modal.tsx         # مودال و مودال حذف
│       │   ├── Card.tsx          # کارت‌ها و کارت‌های آماری
│       │   ├── Table.tsx         # جدول و صفحه‌بندی
│       │   └── Sidebar.tsx       # نوار کناری
│       ├── charts/               # نمودارها
│       │   └── StatsChart.tsx    # نمودار آماری
│       ├── forms/                # فرم‌ها
│       │   └── EmployeeForm.tsx  # فرم افزودن/ویرایش کاربر
│       ├── panels/               # پنل‌ها
│       │   └── WidgetPanel.tsx   # پنل ویجت‌ها و شخصی‌سازی
│       ├── pages/                # صفحات داشبورد
│       │   ├── DashboardMainPage.tsx  # صفحه اصلی داشبورد
│       │   └── EmployeeListPage.tsx   # صفحه لیست کاربران
│       ├── DashboardContainer.tsx     # کانتینر اصلی
│       └── index.ts              # Export همه کامپوننت‌ها
└── app/
    └── dashboard/
        └── page.tsx              # صفحه داشبورد در Next.js

```

## قابلیت‌های پیاده‌سازی شده

### 1. صفحه لیست کاربران (Employee List)
- **جدول داده با ستون‌های قابل تنظیم**
- **صفحه‌بندی (Pagination)** با قابلیت تغییر تعداد آیتم‌ها
- **انتخاب چند آیتم** (Multi-select)
- **فیلتر** بر اساس وضعیت، شهر، نوع و ...
- **عملیات CRUD** (ایجاد، خواندن، ویرایش، حذف)
- **جستجو** و **مرتب‌سازی**

### 2. صفحه اصلی داشبورد (Dashboard Main)
- **نمودار آماری** (Bar Chart) با استفاده از Recharts
- **کارت‌های آماری** با رنگ‌های متنوع
- **لیست وظایف** (Task List) با قابلیت علامت‌گذاری
- **نمایش تاریخ و ساعت شمسی**
- **ویجت‌های قابل تنظیم**

### 3. سیستم مودال
- **مودال حذف** با پیام تایید
- **پشتیبانی از Backdrop blur**
- **انیمیشن‌های smooth**

### 4. نوار کناری (Sidebar)
- **فرم افزودن کاربر جدید**
- **فرم ویرایش کاربر**
- **لیست ویجت‌ها**
- **پنل شخصی‌سازی UI**

### 5. شخصی‌سازی UI
- **انتخاب تم** (روشن/تیره)
- **تغییر اندازه فونت** (کوچک/متوسط/بزرگ)
- **انتخاب رنگ اصلی**
- **حالت فشرده**
- **نمایش/مخفی کردن نوار کناری**

### 6. مدیریت State با Redux
- **dashboardSlice** برای مدیریت تمام state‌های داشبورد
- **Actions** برای عملیات CRUD
- **Selectors** برای دسترسی به state
- **Type-safe** با TypeScript

## نحوه استفاده

### 1. استفاده از صفحه داشبورد

```typescript
import { DashboardContainer } from '@/components/dashboard';

export default function DashboardPage() {
  return <DashboardContainer />;
}
```

### 2. استفاده از کامپوننت‌های جداگانه

```typescript
import { 
  Table, 
  Pagination, 
  Card, 
  Modal,
  StatsChart 
} from '@/components/dashboard';

// استفاده از جدول
<Table
  data={employees}
  columns={columns}
  selectedRows={selectedRows}
  onSelectRow={handleSelectRow}
  renderCell={renderCell}
/>

// استفاده از نمودار
<StatsChart data={chartData} title="آمار و ارقام" />
```

### 3. استفاده از Redux Actions

```typescript
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import {
  setEmployees,
  addEmployee,
  updateEmployee,
  deleteEmployee,
  openModal,
} from '@/redux/slices/dashboardSlice';

const dispatch = useAppDispatch();
const { employees, selectedEmployees } = useAppSelector((state) => state.dashboard);

// افزودن کاربر جدید
dispatch(addEmployee(newEmployee));

// حذف کاربر
dispatch(deleteEmployee(employeeId));

// باز کردن مودال
dispatch(openModal('add'));
```

## تایپ‌های TypeScript

### Employee Type
```typescript
interface Employee {
  id: string;
  name: string;
  phoneNumber: string;
  phoneNumber2?: string;
  position: string;
  city: string;
  province: string;
  status: 'active' | 'inactive' | 'pending';
  joinDate: string;
  avatar?: string;
}
```

### Task Type
```typescript
interface Task {
  id: string;
  title: string;
  category: 'medical' | 'pharmacy' | 'hospital' | 'insurance' | 'management';
  completed: boolean;
  priority: 'high' | 'medium' | 'low';
}
```

## ویژگی‌های UI/UX

1. **طراحی Responsive** - سازگار با تمام اندازه صفحه‌نمایش
2. **فونت‌های فارسی** - استفاده از Qs_Iranyekan با وزن‌های مختلف
3. **انیمیشن‌های Smooth** - با استفاده از Tailwind transitions
4. **Accessibility** - پشتیبانی از keyboard navigation
5. **Dark Mode Ready** - آماده برای پیاده‌سازی حالت تاریک
6. **RTL Support** - پشتیبانی کامل از راست به چپ

## Dependencies

- **Next.js 14+** - فریمورک React
- **Redux Toolkit** - مدیریت state
- **Recharts** - نمودارهای آماری
- **Tailwind CSS** - استایل‌دهی
- **TypeScript** - Type safety

## دستورات

```bash
# نصب dependencies
npm install

# اجرای development server
npm run dev

# ساخت production build
npm run build

# اجرای production server
npm start
```

## نکات مهم

1. **State Management**: تمام state‌های داشبورد در Redux مدیریت می‌شوند
2. **Component Organization**: کامپوننت‌ها به صورت منطقی در پوشه‌های جداگانه سازماندهی شده‌اند
3. **Type Safety**: تمام کامپوننت‌ها و functions دارای type annotation هستند
4. **Reusability**: کامپوننت‌ها به صورت reusable طراحی شده‌اند
5. **Performance**: استفاده از useMemo و useCallback برای بهینه‌سازی

## توسعه آینده

- [ ] اضافه کردن Export به Excel/PDF
- [ ] پیاده‌سازی Real-time updates با WebSocket
- [ ] اضافه کردن Charts بیشتر (Pie, Line, Area)
- [ ] پیاده‌سازی Drag & Drop برای ویجت‌ها
- [ ] اضافه کردن نقشه (Map) برای نمایش موقعیت جغرافیایی
- [ ] پیاده‌سازی کامل Dark Mode
- [ ] اضافه کردن Notifications System
- [ ] پیاده‌سازی Permission System (RBAC)

## ارتباط با Backend

برای ارتباط با Backend، می‌توانید از API routes در Next.js استفاده کنید:

```typescript
// app/api/employees/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
  const employees = await fetchEmployeesFromDB();
  return NextResponse.json(employees);
}

export async function POST(request: Request) {
  const employee = await request.json();
  const newEmployee = await createEmployeeInDB(employee);
  return NextResponse.json(newEmployee);
}
```

## پشتیبانی

برای هرگونه سوال یا مشکل، لطفاً یک issue در repository ایجاد کنید.

