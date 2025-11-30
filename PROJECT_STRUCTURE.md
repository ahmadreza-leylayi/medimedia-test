# ساختار کامل پروژه

این سند ساختار کامل و دقیق پروژه را نشان می‌دهد.

## 📂 ساختار فایل‌ها

```
medi-media/home-page/
│
├── 📄 README.md                    # راهنمای کلی پروژه
├── 📄 ARCHITECTURE.md              # معماری کامل پروژه
├── 📄 CONTRIBUTING.md              # راهنمای مشارکت
├── 📄 QUICK_START.md               # راهنمای شروع سریع
├── 📄 PROJECT_STRUCTURE.md         # این فایل
│
├── 📁 public/                      # فایل‌های استاتیک
│   ├── dashboard/                 # تصاویر داشبورد
│   │   ├── box.png
│   │   └── cartable.svg
│   └── ...
│
├── 📁 src/                         # کدهای منبع
│   │
│   ├── 📁 app/                     # Next.js App Router
│   │   ├── layout.tsx              # Root Layout (Redux Provider)
│   │   ├── page.tsx                # صفحه اصلی (/)
│   │   ├── globals.css             # استایل‌های全局
│   │   ├── 📁 dashboard/
│   │   │   └── page.tsx           # صفحه داشبورد (/dashboard)
│   │   └── 📁 home/
│   │       └── page.tsx           # صفحه Home (/home)
│   │
│   ├── 📁 components/              # کامپوننت‌های React
│   │   │
│   │   ├── 📁 dashboard/          # کامپوننت‌های داشبورد
│   │   │   ├── DashboardContainer.tsx  # Container اصلی
│   │   │   ├── index.ts           # Export مرکزی
│   │   │   ├── README.md          # مستندات داشبورد
│   │   │   │
│   │   │   ├── 📁 ui/             # کامپوننت‌های UI پایه
│   │   │   │   ├── Card.tsx
│   │   │   │   ├── Modal.tsx
│   │   │   │   ├── Table.tsx
│   │   │   │   ├── Sidebar.tsx
│   │   │   │   ├── DraggablePanel.tsx
│   │   │   │   └── index.ts
│   │   │   │
│   │   │   ├── 📁 panels/         # پنل‌های داشبورد
│   │   │   │   ├── AppointmentPanel.tsx
│   │   │   │   ├── QuickActionsPanel.tsx
│   │   │   │   ├── StatisticsChartPanel.tsx
│   │   │   │   ├── SearchPanel.tsx
│   │   │   │   ├── MenuPanel.tsx
│   │   │   │   ├── AddAppointmentForm.tsx
│   │   │   │   ├── WidgetPanel.tsx
│   │   │   │   ├── index.ts
│   │   │   │   └── README.md
│   │   │   │
│   │   │   ├── 📁 pages/          # صفحات کامل
│   │   │   │   ├── DashboardMainPage.tsx
│   │   │   │   ├── EmployeeListPage.tsx
│   │   │   │   └── index.ts
│   │   │   │
│   │   │   ├── 📁 charts/         # نمودارها
│   │   │   │   ├── StatsChart.tsx
│   │   │   │   └── index.ts
│   │   │   │
│   │   │   └── 📁 forms/          # فرم‌ها
│   │   │       ├── EmployeeForm.tsx
│   │   │       └── index.ts
│   │   │
│   │   ├── 📁 home/               # کامپوننت‌های صفحه اصلی
│   │   │   ├── Faq.tsx
│   │   │   ├── HealthNews.tsx
│   │   │   ├── 📁 hero-section/
│   │   │   ├── 📁 SearchDoctorSection/
│   │   │   └── 📁 sliders/
│   │   │
│   │   ├── 📁 layout/             # Layout Components
│   │   │   ├── Header.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── NavigationMenu.tsx
│   │   │   └── ...
│   │   │
│   │   └── 📁 ui/                 # کامپوننت‌های UI عمومی
│   │       └── Button.tsx
│   │
│   ├── 📁 redux/                   # State Management
│   │   ├── store.ts               # Store Configuration
│   │   ├── hooks.ts               # Typed Hooks
│   │   ├── README.md              # مستندات Redux
│   │   ├── 📁 providers/
│   │   │   └── ReduxProvider.tsx
│   │   └── 📁 slices/
│   │       ├── dashboardSlice.ts  # State داشبورد
│   │       └── exampleSlice.ts
│   │
│   ├── 📁 types/                  # TypeScript Types
│   │   ├── dashboard.ts          # Types داشبورد
│   │   ├── index.ts              # Export مرکزی
│   │   └── README.md             # مستندات Types
│   │
│   └── 📁 lib/                    # Utility Functions
│       └── README.md             # (در حال توسعه)
│
├── 📁 node_modules/               # Dependencies
│
├── 📄 package.json                # Dependencies و Scripts
├── 📄 tsconfig.json               # TypeScript Config
├── 📄 tailwind.config.ts          # Tailwind Config
├── 📄 next.config.js              # Next.js Config
└── 📄 .gitignore                  # Git Ignore
```

## 🎯 نقش هر بخش

### `/public`
فایل‌های استاتیک که مستقیماً قابل دسترسی هستند:
- تصاویر
- فونت‌ها
- فایل‌های دیگر

### `/src/app`
صفحات Next.js (App Router):
- هر `page.tsx` یک route است
- `layout.tsx` برای layout مشترک

### `/src/components`
کامپوننت‌های React:
- **dashboard/**: کامپوننت‌های داشبورد
- **home/**: کامپوننت‌های صفحه اصلی
- **layout/**: Header, Footer
- **ui/**: کامپوننت‌های UI پایه

### `/src/redux`
State Management:
- **slices/**: Redux Slices
- **store.ts**: Store Configuration
- **hooks.ts**: Typed Hooks

### `/src/types`
TypeScript Types:
- همه interfaces و types

## 📊 جریان داده

```
User Action
    ↓
Component (UI)
    ↓
dispatch(action)
    ↓
Redux Slice
    ↓
State Update
    ↓
Component Re-render
    ↓
LocalStorage Sync (Middleware)
```

## 🔗 وابستگی‌ها

```
app/
  └── components/
      └── redux/
          └── types/
```

**یعنی**:
- `app` از `components` استفاده می‌کند
- `components` از `redux` و `types` استفاده می‌کند
- `redux` از `types` استفاده می‌کند

## 📝 فایل‌های مهم

### برای شروع:
1. `README.md` - راهنمای کلی
2. `QUICK_START.md` - شروع سریع
3. `ARCHITECTURE.md` - معماری

### برای توسعه:
1. `CONTRIBUTING.md` - راهنمای مشارکت
2. `src/components/dashboard/README.md` - مستندات کامپوننت‌ها
3. `src/redux/README.md` - مستندات Redux

---

**نکته**: این ساختار برای سهولت درک و نگهداری طراحی شده است.

