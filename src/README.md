# Source Code Structure

این پوشه شامل تمام کدهای منبع پروژه است.

## 📁 ساختار کلی

```
src/
├── app/              # Next.js App Router (صفحات و Routes)
├── components/      # کامپوننت‌های React
├── redux/           # State Management (Redux Toolkit)
├── types/           # TypeScript Types و Interfaces
└── lib/             # Utility Functions (در حال توسعه)
```

## 🎯 هر پوشه چه کاری انجام می‌دهد؟

### `/app` - صفحات Next.js

این پوشه توسط **Next.js App Router** استفاده می‌شود. هر فایل `page.tsx` یک route است.

**مثال**:
- `app/dashboard/page.tsx` → `/dashboard`
- `app/home/page.tsx` → `/home`

**نکته**: `layout.tsx` در root، Redux Provider را wrap می‌کند.

---

### `/components` - کامپوننت‌های React

تمام کامپوننت‌های React در اینجا قرار دارند.

**ساختار**:
- `dashboard/`: کامپوننت‌های داشبورد
- `home/`: کامپوننت‌های صفحه اصلی
- `layout/`: Header, Footer, Navigation
- `ui/`: کامپوننت‌های UI پایه

**برای جزئیات بیشتر**: [components/dashboard/README.md](./components/dashboard/README.md)

---

### `/redux` - State Management

State management با Redux Toolkit.

**ساختار**:
- `slices/`: Redux Slices (هر slice یک بخش از state)
- `store.ts`: Store Configuration
- `hooks.ts`: Typed Hooks

**برای جزئیات بیشتر**: [redux/README.md](./redux/README.md)

---

### `/types` - TypeScript Types

تمام TypeScript types و interfaces.

**ساختار**:
- `dashboard.ts`: Types مربوط به داشبورد
- `index.ts`: Export مرکزی

**برای جزئیات بیشتر**: [types/README.md](./types/README.md)

---

## 🔍 نحوه پیدا کردن فایل‌ها

### می‌خواهید یک کامپوننت پیدا کنید؟

1. **UI Component**: `components/dashboard/ui/`
2. **Panel**: `components/dashboard/panels/`
3. **Page**: `components/dashboard/pages/`
4. **Chart**: `components/dashboard/charts/`
5. **Form**: `components/dashboard/forms/`

### می‌خواهید یک Type پیدا کنید؟

→ `types/dashboard.ts`

### می‌خواهید Redux State را ببینید؟

→ `redux/slices/dashboardSlice.ts`

### می‌خواهید یک Route اضافه کنید؟

→ `app/[folder]/page.tsx`

---

## 📝 قوانین

1. **نام‌گذاری**: PascalCase برای components، camelCase برای functions
2. **ساختار**: هر component در پوشه مناسب خودش
3. **Export**: از `index.ts` برای export مرکزی استفاده کنید
4. **Types**: همه types در `types/` تعریف شوند
5. **RTL**: همه کامپوننت‌ها RTL را پشتیبانی کنند

---

## 🚀 شروع کار

1. **مبتدی**: [QUICK_START.md](../../QUICK_START.md) را بخوانید
2. **معماری**: [ARCHITECTURE.md](../../ARCHITECTURE.md) را مطالعه کنید
3. **مشارکت**: [CONTRIBUTING.md](../../CONTRIBUTING.md) را ببینید

---

**نکته**: اگر سوالی دارید، از مستندات استفاده کنید یا از تیم بپرسید.

