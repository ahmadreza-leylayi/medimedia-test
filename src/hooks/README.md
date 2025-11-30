# Custom Hooks

این پوشه شامل هوک‌های سفارشی React است که منطق قابل استفاده مجدد را کپسوله می‌کنند.

## 📝 هوک‌های موجود

### `useLocalStorage`
هوک برای مدیریت state در localStorage با همگام‌سازی خودکار.

```typescript
import { useLocalStorage } from '@/hooks';

const [value, setValue] = useLocalStorage<string>('key', 'default');
```

### `useAppointments`
هوک برای مدیریت نوبت‌ها با ذخیره‌سازی خودکار در localStorage.

```typescript
import { useAppointments } from '@/hooks';

const { 
  appointments, 
  addAppointment, 
  updateAppointment, 
  deleteAppointment,
  updateAppointmentStatus 
} = useAppointments();
```

### `useDateTime`
هوک برای مدیریت نمایش تاریخ و زمان فعلی.

```typescript
import { useDateTime } from '@/hooks';

const { currentTime, currentDate } = useDateTime(selectedDate);
```

## 🔧 افزودن هوک جدید

هنگام افزودن هوک جدید:
1. فایل را در این پوشه ایجاد کنید
2. آن را در `index.ts` export کنید
3. مستندات را در این فایل به‌روزرسانی کنید

