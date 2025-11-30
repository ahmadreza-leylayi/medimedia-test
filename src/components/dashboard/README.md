# Dashboard Components

این پوشه شامل تمام کامپوننت‌های مربوط به داشبورد است.

## 📁 ساختار

```
dashboard/
├── ui/                    # کامپوننت‌های UI پایه
├── panels/               # پنل‌های داشبورد
├── pages/                # صفحات کامل
├── charts/              # نمودارها
├── forms/               # فرم‌ها
└── DashboardContainer.tsx  # Container اصلی
```

## 🎯 نحوه استفاده

### Import کردن کامپوننت‌ها

```typescript
// از index.ts (توصیه می‌شود)
import { Card, Modal, Table } from '@/components/dashboard';

// یا مستقیم
import { Card } from '@/components/dashboard/ui/Card';
```

## 📖 کامپوننت‌های موجود

### UI Components (`ui/`)

کامپوننت‌های پایه که در همه جا قابل استفاده هستند:

- **Card**: کارت با shadow و rounded corners
- **Modal**: مودال با backdrop
- **Table**: جدول با pagination
- **Sidebar**: سایدبار از راست یا چپ
- **DraggablePanel**: پنل قابل drag & drop

### Panel Components (`panels/`)

بخش‌های اصلی داشبورد:

- **AppointmentPanel**: مدیریت نوبت‌ها
- **QuickActionsPanel**: عملیات سریع (جستجو + منو)
- **StatisticsChartPanel**: نمودار آمار
- **SearchPanel**: جستجوی پزشک
- **MenuPanel**: منوی اصلی
- **AddAppointmentForm**: فرم افزودن نوبت

### Page Components (`pages/`)

صفحات کامل:

- **DashboardMainPage**: صفحه اصلی داشبورد
- **EmployeeListPage**: صفحه لیست کاربران

## 🔧 مثال استفاده

### استفاده از Panel

```typescript
import { AppointmentPanel } from '@/components/dashboard/panels/AppointmentPanel';

<AppointmentPanel
  currentTime={currentTime}
  appointments={appointments}
  onAddAppointmentClick={handleAdd}
/>
```

### استفاده از UI Component

```typescript
import { Card } from '@/components/dashboard/ui';

<Card>
  <h2>عنوان</h2>
  <p>محتوا</p>
</Card>
```

## 📝 نکات

- همه کامپوننت‌ها TypeScript هستند
- از RTL پشتیبانی می‌کنند
- با Redux یکپارچه هستند
- Responsive هستند

