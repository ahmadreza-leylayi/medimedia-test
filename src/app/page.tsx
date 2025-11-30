import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 to-blue-100 flex items-center justify-center p-8" dir="rtl">
      <div className="max-w-4xl w-full">
        <div className="bg-white rounded-3xl shadow-2xl p-12">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold text-gray-800 mb-4">
              پنل مدیریت مدی‌مدیا
            </h1>
            <p className="text-xl text-gray-600">
              سیستم مدیریت جامع با قابلیت‌های پیشرفته
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            <div className="p-6 bg-gradient-to-br from-cyan-50 to-cyan-100 rounded-2xl border border-cyan-200">
              <div className="text-4xl mb-4">📊</div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                داشبورد تحلیلی
              </h3>
              <p className="text-gray-600">
                نمایش آمار و اطلاعات به صورت نمودار و گزارش
              </p>
            </div>

            <div className="p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl border border-purple-200">
              <div className="text-4xl mb-4">📋</div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                مدیریت کاربران
              </h3>
              <p className="text-gray-600">
                افزودن، ویرایش، حذف و مدیریت کاربران
              </p>
            </div>

            <div className="p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-2xl border border-green-200">
              <div className="text-4xl mb-4">🎨</div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                شخصی‌سازی UI
              </h3>
              <p className="text-gray-600">
                تغییر تم، رنگ و ظاهر رابط کاربری
              </p>
            </div>

            <div className="p-6 bg-gradient-to-br from-orange-50 to-orange-100 rounded-2xl border border-orange-200">
              <div className="text-4xl mb-4">⚡</div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                سرعت بالا
              </h3>
              <p className="text-gray-600">
                بهینه‌سازی شده با Next.js و TypeScript
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/dashboard"
              className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white rounded-xl font-bold text-lg transition-all transform hover:scale-105 shadow-lg text-center"
            >
              ورود به داشبورد
            </Link>
            <Link
              href="/home"
              className="px-8 py-4 bg-white border-2 border-gray-300 hover:border-cyan-500 text-gray-700 hover:text-cyan-600 rounded-xl font-bold text-lg transition-all text-center"
            >
              صفحه اصلی سایت
            </Link>
          </div>

          <div className="mt-12 pt-8 border-t border-gray-200">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div>
                <div className="text-3xl font-bold text-cyan-600 mb-2">
                  ۵۰+
                </div>
                <div className="text-sm text-gray-600">
                  کامپوننت
                </div>
              </div>
              <div>
                <div className="text-3xl font-bold text-purple-600 mb-2">
                  ۱۰۰%
                </div>
                <div className="text-sm text-gray-600">
                  TypeScript
                </div>
              </div>
              <div>
                <div className="text-3xl font-bold text-green-600 mb-2">
                  RTL
                </div>
                <div className="text-sm text-gray-600">
                  پشتیبانی کامل
                </div>
              </div>
              <div>
                <div className="text-3xl font-bold text-orange-600 mb-2">
                  Redux
                </div>
                <div className="text-sm text-gray-600">
                  State Management
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center">
          <p className="text-gray-600">
            ساخته شده با ❤️ برای پروژه مدی‌مدیا
          </p>
        </div>
      </div>
    </div>
  );
}