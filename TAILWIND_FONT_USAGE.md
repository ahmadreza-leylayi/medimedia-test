# راهنمای استفاده از فونت در Tailwind CSS

## 📝 تعریف دستی فونت در Tailwind

فونت **BYekan** به صورت دستی در Tailwind تعریف شده است. در فایل `src/app/globals.css` در بخش `@theme inline` تنظیمات فونت را می‌بینید.

## 🎯 نحوه استفاده

### 1️⃣ استفاده از کلاس پیش‌فرض `font-sans`

```tsx
<div className="font-sans">
  این متن با فونت BYekan نمایش داده می‌شود
</div>
```

### 2️⃣ استفاده از کلاس سفارشی `font-yekan`

```tsx
<div className="font-yekan">
  این متن با فونت BYekan نمایش داده می‌شود
</div>
```

### 3️⃣ استفاده با وزن‌های مختلف

```tsx
<div className="font-sans font-normal">متن عادی (400)</div>
<div className="font-sans font-bold">متن ضخیم (700)</div>
```

### 4️⃣ ترکیب با سایر کلاس‌های Tailwind

```tsx
<div className="font-sans font-bold text-2xl text-gray-900">
  عنوان با فونت BYekan، وزن ضخیم، اندازه بزرگ و رنگ خاکستری
</div>
```

## 🔧 تنظیمات در `globals.css`

### بخش `@theme inline`:

```css
@theme inline {
  /* Font Families - تعریف دستی فونت‌ها در Tailwind */
  --font-family-sans: var(--font-yekan);
  --font-family-mono: var(--font-geist-mono);
  
  /* Font Family Aliases */
  --font-sans: var(--font-yekan);
  --font-mono: var(--font-geist-mono);
  
  /* Font Weights */
  --font-weight-normal: 400;
  --font-weight-bold: 700;
}
```

### بخش `@layer utilities`:

```css
@layer utilities {
  /* Font Utilities - کلاس‌های سفارشی */
  .font-yekan {
    font-family: var(--font-yekan);
  }
}
```

## 📚 مثال‌های کاربردی

### مثال 1: عنوان صفحه

```tsx
<h1 className="font-sans font-bold text-4xl text-gray-900">
  عنوان اصلی
</h1>
```

### مثال 2: متن بدنه

```tsx
<p className="font-sans font-normal text-base text-gray-700">
  این یک متن معمولی است که با فونت BYekan نمایش داده می‌شود.
</p>
```

### مثال 3: دکمه

```tsx
<button className="font-sans font-semibold text-lg px-4 py-2 bg-blue-500 text-white rounded">
  کلیک کنید
</button>
```

### مثال 4: استفاده شرطی

```tsx
<div className={`font-sans ${isBold ? 'font-bold' : 'font-normal'}`}>
  متن شرطی
</div>
```

### مثال 5: استفاده در کامپوننت

```tsx
export function MyComponent() {
  return (
    <div className="font-sans">
      <h2 className="font-bold text-2xl mb-4">عنوان</h2>
      <p className="font-normal text-base">متن بدنه</p>
    </div>
  );
}
```

## 🎨 کلاس‌های Tailwind برای فونت

### Font Family:
- `font-sans` → فونت BYekan (پیش‌فرض)
- `font-yekan` → فونت BYekan (سفارشی)
- `font-mono` → فونت monospace

### Font Weight:
- `font-normal` → وزن 400 (عادی)
- `font-bold` → وزن 700 (ضخیم)

### Font Size:
- `text-xs` → 0.75rem
- `text-sm` → 0.875rem
- `text-base` → 1rem
- `text-lg` → 1.125rem
- `text-xl` → 1.25rem
- `text-2xl` → 1.5rem
- `text-3xl` → 1.875rem
- `text-4xl` → 2.25rem
- و غیره...

## ⚙️ افزودن فونت جدید در Tailwind

اگر می‌خواهید فونت جدیدی اضافه کنید:

### 1. فونت را در `@font-face` تعریف کنید:

```css
@font-face {
  font-family: 'MyCustomFont';
  src: url('/font/MyCustomFont.ttf') format('truetype');
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}
```

### 2. متغیر CSS تعریف کنید:

```css
:root {
  --font-custom: 'MyCustomFont', sans-serif;
}
```

### 3. در `@theme inline` اضافه کنید:

```css
@theme inline {
  --font-family-custom: var(--font-custom);
  --font-custom: var(--font-custom);
}
```

### 4. Utility Class اضافه کنید (اختیاری):

```css
@layer utilities {
  .font-custom {
    font-family: var(--font-custom);
  }
}
```

### 5. استفاده کنید:

```tsx
<div className="font-custom">متن با فونت جدید</div>
```

## 🎯 نکات مهم

1. ✅ فونت `font-sans` به صورت پیش‌فرض فونت BYekan است
2. ✅ می‌توانید از کلاس `font-yekan` برای استفاده مستقیم استفاده کنید
3. ✅ وزن‌های `font-normal` (400) و `font-bold` (700) در دسترس هستند
4. ✅ تمام کلاس‌های Tailwind برای فونت (size, weight, etc.) کار می‌کنند
5. ✅ فونت به صورت خودکار برای کل پروژه اعمال می‌شود

## 📖 منابع بیشتر

- [Tailwind CSS Typography](https://tailwindcss.com/docs/font-family)
- [Tailwind CSS Font Weight](https://tailwindcss.com/docs/font-weight)
- [Tailwind CSS Font Size](https://tailwindcss.com/docs/font-size)

