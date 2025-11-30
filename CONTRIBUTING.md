# راهنمای مشارکت در پروژه

این راهنما برای توسعه‌دهندگان، به ویژه جونیورها، نوشته شده است.

## 🚀 شروع کار

### 1. Clone کردن پروژه

```bash
git clone <repository-url>
cd medi-media/home-page
```

### 2. نصب Dependencies

```bash
npm install
```

### 3. اجرای Development Server

```bash
npm run dev
```

## 📋 قوانین کدنویسی

### 1. نام‌گذاری

- **Components**: `PascalCase` → `AppointmentPanel.tsx`
- **Functions**: `camelCase` → `handleAddAppointment`
- **Variables**: `camelCase` → `selectedDate`
- **Constants**: `UPPER_SNAKE_CASE` → `MAX_ITEMS`

### 2. ساختار فایل

هر فایل باید این ترتیب را داشته باشد:

```typescript
// 1. Imports
import React from 'react';
import { useAppSelector } from '@/redux/hooks';

// 2. Types/Interfaces
interface Props {
  // ...
}

// 3. Component
export const MyComponent: React.FC<Props> = ({ ... }) => {
  // 4. Hooks
  // 5. State
  // 6. Effects
  // 7. Handlers
  // 8. Render
  return ( ... );
};
```

### 3. کامنت‌گذاری

```typescript
/**
 * توضیح کلی کامپوننت
 * 
 * این کامپوننت چه کاری انجام می‌دهد
 */
export const MyComponent: React.FC<Props> = ({ ... }) => {
  // توضیح کوتاه برای منطق پیچیده
  const handleAction = () => {
    // ...
  };
};
```

### 4. TypeScript

- همیشه types را تعریف کنید
- از `any` استفاده نکنید
- از `interface` برای object types استفاده کنید

## 🎯 افزودن Feature جدید

### گام‌های کلی:

1. **Types را تعریف کنید** (`src/types/`)
2. **Redux Actions را اضافه کنید** (اگر نیاز باشد)
3. **Component را بسازید** (`src/components/dashboard/`)
4. **Export کنید** (`index.ts`)
5. **تست کنید**

### مثال: افزودن "مدیریت داروخانه"

#### Step 1: Types

```typescript
// src/types/dashboard.ts
export interface Pharmacy {
  id: string;
  name: string;
  address: string;
}
```

#### Step 2: Redux (اگر نیاز باشد)

```typescript
// src/redux/slices/dashboardSlice.ts
interface DashboardState {
  pharmacies: Pharmacy[];
}

reducers: {
  addPharmacy: (state, action: PayloadAction<Pharmacy>) => {
    state.pharmacies.push(action.payload);
  },
}
```

#### Step 3: Component

```typescript
// src/components/dashboard/panels/PharmacyPanel.tsx
export const PharmacyPanel: React.FC = () => {
  const { pharmacies } = useAppSelector((state) => state.dashboard);
  // ...
};
```

#### Step 4: Export

```typescript
// src/components/dashboard/panels/index.ts
export { PharmacyPanel } from './PharmacyPanel';
```

#### Step 5: استفاده

```typescript
// src/components/dashboard/pages/DashboardMainPage.tsx
import { PharmacyPanel } from '@/components/dashboard/panels/PharmacyPanel';
```

## ✅ Checklist قبل از Commit

- [ ] کد TypeScript errors ندارد
- [ ] کامنت‌های لازم اضافه شده
- [ ] RTL رعایت شده
- [ ] Export به index.ts اضافه شده
- [ ] کد قابل خواندن و تمیز است
- [ ] نام‌گذاری صحیح است

## 🐛 گزارش باگ

اگر باگی پیدا کردید:

1. مشکل را به صورت واضح توضیح دهید
2. Steps to reproduce را بنویسید
3. Screenshot اضافه کنید (اگر لازم باشد)
4. Environment (Browser, OS) را ذکر کنید

## 💡 پیشنهادات

برای پیشنهاد feature جدید:

1. توضیح دهید چه مشکلی را حل می‌کند
2. مثال استفاده بزنید
3. اگر ممکن است، mockup یا wireframe اضافه کنید

## 📚 منابع یادگیری

- [React Documentation](https://react.dev)
- [Next.js Documentation](https://nextjs.org/docs)
- [Redux Toolkit Documentation](https://redux-toolkit.js.org)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

---

**یادآوری**: اگر سوالی دارید، از تیم بپرسید. بهتر است بپرسید تا اشتباه کنید!

