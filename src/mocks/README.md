# Mock Data

این پوشه شامل داده‌های تستی و mock generators است.

## 📝 فایل‌های موجود

### `appointments.ts`
تولید نوبت‌های تستی برای چند روز (قبل و بعد از امروز).

```typescript
import { generateMockAppointments } from '@/mocks';

const appointments = generateMockAppointments();
```

### `chart.ts`
تولید داده‌های تستی نمودار بر اساس دوره (روز، هفته، ماه، سال).

```typescript
import { getMockAppointmentData } from '@/mocks';

const chartData = getMockAppointmentData('month');
```

### `employees.ts`
تولید داده‌های تستی کارمندان.

```typescript
import { generateMockEmployees } from '@/mocks';

const employees = generateMockEmployees();
```

### `tasks.ts`
تولید داده‌های تستی وظایف.

```typescript
import { generateMockTasks } from '@/mocks';

const tasks = generateMockTasks();
```

## 🔧 افزودن Mock جدید

هنگام افزودن mock جدید:
1. فایل را در این پوشه ایجاد کنید
2. آن را در `index.ts` export کنید
3. مستندات را در این فایل به‌روزرسانی کنید

## 📌 نکات

- Mock data فقط برای development و testing استفاده می‌شود
- در production، این داده‌ها باید از API دریافت شوند
- داده‌ها باید واقع‌گرایانه باشند

