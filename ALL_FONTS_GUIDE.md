# راهنمای کامل استفاده از فونت‌ها

## 📚 فونت‌های موجود در پروژه

### 1️⃣ BYekan
- **فایل‌ها**: `BYekan.ttf`, `BYekan-bold.ttf`
- **وزن‌های موجود**: 400 (normal), 700 (bold)

### 2️⃣ Qs_Iranyekan
- **فایل‌ها**: 
  - `Qs_Iranyekan-thin.ttf` (100)
  - `Qs_Iranyekan-light.ttf` (300)
  - `Qs_Iranyekan.ttf` (400 - normal)
  - `Qs_Iranyekan-medium.ttf` (500)
  - `Qs_Iranyekan-bold.ttf` (700)
  - `Qs_Iranyekan-extrabold.ttf` (800)
  - `Qs_Iranyekan-black.ttf` (900)
  - `Qs_Iranyekan-extrablack.ttf` (950)

## 🎯 نحوه استفاده

### استفاده از BYekan

#### روش 1: با کلاس Tailwind
```tsx
<div className="font-yekan font-normal">متن عادی با BYekan</div>
<div className="font-yekan font-bold">متن ضخیم با BYekan</div>
```

#### روش 2: با CSS Variable
```tsx
<div style={{ fontFamily: 'var(--font-yekan)' }}>
  متن با BYekan
</div>
```

#### روش 3: با کلاس پیش‌فرض (font-sans)
```tsx
<div className="font-sans font-bold">
  متن با BYekan (پیش‌فرض)
</div>
```

### استفاده از Qs_Iranyekan

#### روش 1: با کلاس Tailwind
```tsx
<div className="font-iranyekan font-thin">متن نازک (100)</div>
<div className="font-iranyekan font-light">متن سبک (300)</div>
<div className="font-iranyekan font-normal">متن عادی (400)</div>
<div className="font-iranyekan font-medium">متن متوسط (500)</div>
<div className="font-iranyekan font-bold">متن ضخیم (700)</div>
<div className="font-iranyekan font-extrabold">متن خیلی ضخیم (800)</div>
<div className="font-iranyekan font-black">متن سیاه (900)</div>
```

#### روش 2: با CSS Variable
```tsx
<div style={{ fontFamily: 'var(--font-iranyekan)', fontWeight: 500 }}>
  متن با Qs_Iranyekan و وزن medium
</div>
```

#### روش 3: ترکیب با وزن‌های Tailwind
```tsx
<div className="font-iranyekan font-medium text-xl">
  عنوان با فونت Qs_Iranyekan و وزن medium
</div>
```

## 📖 مثال‌های کاربردی

### مثال 1: عنوان صفحه با BYekan
```tsx
<h1 className="font-yekan font-bold text-4xl text-gray-900">
  عنوان اصلی
</h1>
```

### مثال 2: متن بدنه با Qs_Iranyekan
```tsx
<p className="font-iranyekan font-normal text-base text-gray-700">
  این یک متن معمولی است که با فونت Qs_Iranyekan نمایش داده می‌شود.
</p>
```

### مثال 3: دکمه با فونت سفارشی
```tsx
<button className="font-iranyekan font-semibold text-lg px-4 py-2 bg-blue-500 text-white rounded">
  کلیک کنید
</button>
```

### مثال 4: استفاده شرطی
```tsx
<div className={`${useIranyekan ? 'font-iranyekan' : 'font-yekan'} font-bold`}>
  متن شرطی
</div>
```

### مثال 5: ترکیب فونت‌ها در یک کامپوننت
```tsx
export function MyComponent() {
  return (
    <div>
      <h1 className="font-yekan font-bold text-3xl mb-4">
        عنوان با BYekan
      </h1>
      <p className="font-iranyekan font-normal text-base mb-2">
        متن بدنه با Qs_Iranyekan
      </p>
      <p className="font-iranyekan font-light text-sm text-gray-500">
        متن فرعی با Qs_Iranyekan و وزن light
      </p>
    </div>
  );
}
```

## 🎨 کلاس‌های Tailwind موجود

### Font Family:
- `font-sans` → BYekan (پیش‌فرض)
- `font-yekan` → BYekan
- `font-iranyekan` → Qs_Iranyekan
- `font-mono` → Monospace

### Font Weight (برای Qs_Iranyekan):
- `font-thin` → 100
- `font-light` → 300
- `font-normal` → 400
- `font-medium` → 500
- `font-bold` → 700
- `font-extrabold` → 800
- `font-black` → 900

### Font Weight (برای BYekan):
- `font-normal` → 400
- `font-bold` → 700

## 🔧 CSS Variables موجود

```css
--font-yekan: 'BYekan', 'Tahoma', 'Arial', sans-serif;
--font-iranyekan: 'Qs_Iranyekan', 'Tahoma', 'Arial', sans-serif;
```

## 📋 جدول کامل فونت‌ها و وزن‌ها

| فونت | کلاس Tailwind | وزن‌های موجود | CSS Variable |
|------|---------------|---------------|--------------|
| BYekan | `font-yekan` | 400, 700 | `--font-yekan` |
| Qs_Iranyekan | `font-iranyekan` | 100, 300, 400, 500, 700, 800, 900, 950 | `--font-iranyekan` |

## 💡 نکات مهم

1. ✅ فونت پیش‌فرض پروژه: **BYekan** (از طریق `font-sans`)
2. ✅ برای استفاده از وزن‌های مختلف Qs_Iranyekan، از کلاس‌های `font-thin`, `font-light`, `font-medium`, `font-extrabold`, `font-black` استفاده کنید
3. ✅ BYekan فقط دو وزن دارد: `font-normal` و `font-bold`
4. ✅ تمام فونت‌ها از پوشه `public/font/` لود می‌شوند
5. ✅ از `font-display: swap` برای بهبود تجربه کاربری استفاده می‌شود

## 🚀 مثال کامل

```tsx
export function ExamplePage() {
  return (
    <div className="p-8">
      {/* عنوان با BYekan */}
      <h1 className="font-yekan font-bold text-4xl mb-6">
        عنوان اصلی
      </h1>
      
      {/* زیرعنوان با Qs_Iranyekan */}
      <h2 className="font-iranyekan font-semibold text-2xl mb-4">
        زیرعنوان
      </h2>
      
      {/* متن بدنه با Qs_Iranyekan */}
      <p className="font-iranyekan font-normal text-base mb-4">
        این یک متن معمولی است که با فونت Qs_Iranyekan نمایش داده می‌شود.
      </p>
      
      {/* متن فرعی با وزن light */}
      <p className="font-iranyekan font-light text-sm text-gray-500 mb-4">
        این یک متن فرعی است با وزن light.
      </p>
      
      {/* دکمه با BYekan */}
      <button className="font-yekan font-bold px-6 py-3 bg-blue-500 text-white rounded-lg">
        دکمه با BYekan
      </button>
    </div>
  );
}
```

## 📝 خلاصه

- **BYekan**: برای استفاده ساده با دو وزن (normal, bold)
- **Qs_Iranyekan**: برای استفاده پیشرفته با 8 وزن مختلف
- استفاده از کلاس‌های Tailwind: `font-yekan` یا `font-iranyekan`
- ترکیب با وزن‌ها: `font-normal`, `font-bold`, `font-medium`, etc.

