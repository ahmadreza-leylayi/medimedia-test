# TypeScript Types

این پوشه شامل تمام TypeScript types و interfaces است.

## 📁 ساختار

```
types/
├── dashboard.ts    # Types مربوط به داشبورد
└── index.ts        # Export مرکزی
```

## 📖 Types موجود

### Employee
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

### Appointment
```typescript
interface Appointment {
  id: string;
  name: string;
  time: string;
  status: 'active' | 'pending' | 'inactive' | 'completed' | 'cancelled';
  date: string; // YYYY-MM-DD
}
```

### ChartData
```typescript
interface ChartData {
  name: string;
  value: number;
  color: string;
}
```

## 🔧 استفاده

```typescript
import type { Employee, Appointment } from '@/types/dashboard';

const employee: Employee = { ... };
const appointment: Appointment = { ... };
```

## 📝 افزودن Type جدید

```typescript
// در dashboard.ts
export interface MyNewType {
  id: string;
  name: string;
  // ...
}

// در index.ts
export type { MyNewType } from './dashboard';
```

