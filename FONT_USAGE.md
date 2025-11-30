# راهنمای استفاده از فونت‌ها در پروژه

## 📝 نحوه استفاده از فونت‌ها

### 1️⃣ استفاده پیش‌فرض (بدون نیاز به تغییر)

فونت **BYekan** (فونت محلی) به صورت پیش‌فرض برای کل پروژه تنظیم شده است. تمام متن‌ها به صورت خودکار از این فونت استفاده می‌کنند.

```tsx
// هیچ کاری لازم نیست - فونت به صورت خودکار اعمال می‌شود
<div>این متن با فونت BYekan نمایش داده می‌شود</div>
```

### 2️⃣ استفاده از کلاس‌های Tailwind

می‌توانید از کلاس `font-sans` استفاده کنید (که به فونت BYekan اشاره می‌کند):

```tsx
<div className="font-sans">متن با فونت BYekan</div>
```

### 3️⃣ استفاده از وزن‌های مختلف فونت

فونت BYekan دو وزن دارد:
- **عادی (400)**: `font-normal`
- **ضخیم (700)**: `font-bold`

```tsx
<div className="font-normal">متن عادی</div>
<div className="font-bold">متن ضخیم</div>
```

> **نکته**: سایر وزن‌ها (thin, light, medium, etc.) نیز کار می‌کنند اما به صورت خودکار به نزدیک‌ترین وزن موجود (normal یا bold) تبدیل می‌شوند.

### 4️⃣ استفاده از CSS Variable مستقیم

اگر نیاز به استفاده مستقیم از CSS Variable دارید:

```tsx
<div style={{ fontFamily: 'var(--font-yekan)' }}>
  متن با فونت BYekan
</div>
```

یا در CSS:

```css
.my-custom-class {
  font-family: var(--font-yekan);
}
```

## 🔧 افزودن فونت جدید

اگر می‌خواهید فونت جدیدی اضافه کنید:

### روش 1: استفاده از فونت محلی (پیشنهادی)

1. فایل فونت را در `public/font/` قرار دهید (مثلاً `MyCustomFont.ttf`)

2. در `src/app/globals.css` با `@font-face` تعریف کنید:

```css
@font-face {
  font-family: 'MyCustomFont';
  src: url('/font/MyCustomFont.ttf') format('truetype');
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}

/* برای وزن‌های مختلف */
@font-face {
  font-family: 'MyCustomFont';
  src: url('/font/MyCustomFont-bold.ttf') format('truetype');
  font-weight: 700;
  font-style: normal;
  font-display: swap;
}
```

3. در `:root` متغیر CSS تعریف کنید:

```css
:root {
  --font-custom: 'MyCustomFont', 'Tahoma', 'Arial', sans-serif;
}
```

4. در `@theme inline` اضافه کنید (اختیاری):

```css
@theme inline {
  --font-sans: var(--font-custom);
}
```

### روش 2: از Google Fonts

1. فونت را در `src/app/layout.tsx` import کنید:

```tsx
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});
```

2. متغیر را به `html` اضافه کنید:

```tsx
<html lang="fa" dir="rtl" className={inter.variable}>
```

3. در `globals.css` استفاده کنید:

```css
:root {
  --font-custom: var(--font-inter);
}
```

## 📚 مثال‌های کاربردی

### مثال 1: استفاده در کامپوننت

```tsx
export function MyComponent() {
  return (
    <div className="font-sans font-bold text-2xl">
      عنوان با فونت BYekan و وزن ضخیم
    </div>
  );
}
```

### مثال 2: استفاده شرطی

```tsx
export function ConditionalFont({ isBold }: { isBold: boolean }) {
  return (
    <p className={`font-sans ${isBold ? 'font-bold' : 'font-normal'}`}>
      متن شرطی
    </p>
  );
}
```

### مثال 3: استفاده با سایر استایل‌ها

```tsx
<div className="font-sans font-semibold text-lg text-gray-900 leading-relaxed">
  متن با فونت، وزن، اندازه و رنگ سفارشی
</div>
```

## ⚙️ تنظیمات فعلی

- **فونت پیش‌فرض**: BYekan
- **منبع**: فونت محلی از `public/font/`
- **فایل‌های فونت**:
  - `BYekan.ttf` (وزن عادی - 400)
  - `BYekan-bold.ttf` (وزن ضخیم - 700)
- **CSS Variable**: `--font-yekan`
- **مسیر فایل‌ها**: `/font/BYekan.ttf` و `/font/BYekan-bold.ttf`

## 🎯 نکات مهم

1. ✅ فونت BYekan به صورت خودکار برای کل پروژه اعمال می‌شود
2. ✅ فونت‌های محلی از پوشه `public/font/` لود می‌شوند
3. ✅ از `font-display: swap` برای بهبود تجربه کاربری استفاده می‌شود
4. ✅ فایل‌های فونت باید در پوشه `public/font/` قرار گیرند
5. ✅ برای فونت‌های TTF از `format('truetype')` استفاده می‌شود
6. ✅ برای فونت‌های WOFF2 از `format('woff2')` استفاده کنید

