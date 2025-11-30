# Redux State Management

این پوشه شامل تمام state management با Redux Toolkit است.

## 📁 ساختار

```
redux/
├── store.ts              # Store Configuration
├── hooks.ts              # Typed Hooks
├── providers/
│   └── ReduxProvider.tsx # Provider Component
└── slices/
    └── dashboardSlice.ts # Dashboard State
```

## 🎯 نحوه استفاده

### 1. استفاده از Hooks

```typescript
import { useAppDispatch, useAppSelector } from '@/redux/hooks';

// در Component
const dispatch = useAppDispatch();
const { employees } = useAppSelector((state) => state.dashboard);
```

### 2. Dispatch Actions

```typescript
import { addEmployee, deleteEmployee } from '@/redux/slices/dashboardSlice';

// افزودن
dispatch(addEmployee(newEmployee));

// حذف
dispatch(deleteEmployee(id));
```

## 📊 State Structure

```typescript
{
  dashboard: {
    employees: Employee[];      // لیست کاربران
    tasks: Task[];               // لیست وظایف
    filters: FilterOptions;      // فیلترها
    pagination: PaginationInfo;  // Pagination
    selectedEmployees: string[]; // انتخاب شده‌ها
    modalOpen: { ... };          // وضعیت مودال‌ها
    // ...
  }
}
```

## 💾 LocalStorage

- **employees**: در `dashboard-employees` ذخیره می‌شود
- **tasks**: در `dashboard-tasks` ذخیره می‌شود
- **appointments**: در `dashboard-appointments` ذخیره می‌شود

همه به صورت خودکار sync می‌شوند.

## 🔄 Actions موجود

### Employees
- `setEmployees(employees)`
- `addEmployee(employee)`
- `updateEmployee(employee)`
- `deleteEmployee(id)`
- `deleteSelectedEmployees()`

### Selection
- `toggleEmployeeSelection(id)`
- `selectAllEmployees()`
- `deselectAllEmployees()`

### Filters
- `setFilters(filters)`

### Pagination
- `setCurrentPage(page)`
- `setItemsPerPage(count)`

### Modals
- `openModal(type)`
- `closeModal(type)`

## 📝 افزودن Action جدید

```typescript
// در dashboardSlice.ts
reducers: {
  myNewAction: (state, action: PayloadAction<MyType>) => {
    state.myData = action.payload;
  },
}

// Export
export const { myNewAction } = dashboardSlice.actions;

// استفاده
dispatch(myNewAction(data));
```

