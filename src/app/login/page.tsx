'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAppDispatch } from '@/redux/hooks';
import { login, setLoading } from '@/redux/slices/authSlice';
import { validateLogin } from '@/mocks/users';
import { addMessage } from '@/mocks/messages';
import Link from 'next/link';
import Image from 'next/image';
import { EyeIcon } from '@/components/ui/EyeIcon';

export default function LoginPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);
    dispatch(setLoading(true));

    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));

      const user = validateLogin(username, password);
      
      if (user) {
        // Remove password from user object before storing
        const { password: _, ...userWithoutPassword } = user;
        dispatch(login(userWithoutPassword));
        
        // Add welcome message
        addMessage({
          id: Date.now().toString(),
          userId: user.id,
          title: 'خوش آمدید',
          content: `سلام ${user.firstName} ${user.lastName}! به پنل مدیریت مدی‌مدیا خوش آمدید. از اینجا می‌توانید تمام امکانات را مدیریت کنید.`,
          type: 'success',
          read: false,
          createdAt: new Date().toISOString(),
        });
        
        dispatch(setLoading(false));
        router.push('/dashboard');
      } else {
        setError('نام کاربری یا رمز عبور اشتباه است');
        dispatch(setLoading(false));
      }
    } catch (err) {
      setError('خطایی رخ داد. لطفا دوباره تلاش کنید.');
      dispatch(setLoading(false));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-blue-50 flex items-center justify-center px-4 py-8" dir="rtl">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/logo/logo.svg"
              alt="Medimedia"
              width={141}
              height={65}
              className="h-16 w-auto"
              priority
            />
          </Link>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2 text-center">ورود به حساب کاربری</h1>
          <p className="text-gray-600 text-center mb-8">لطفا اطلاعات خود را وارد کنید</p>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Username */}
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
                نام کاربری
              </label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="admin"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-all"
                dir="ltr"
              />
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                رمز عبور
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="admin123"
                  required
                  className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-all"
                  dir="ltr"
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                  <EyeIcon isOpen={showPassword} onClick={() => setShowPassword(!showPassword)} />
                </div>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl">
                {error}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-teal-600 to-blue-600 text-white py-3 rounded-xl font-semibold hover:from-teal-700 hover:to-blue-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
            >
              {isSubmitting ? 'در حال ورود...' : 'ورود'}
            </button>
          </form>

          {/* Register Link */}
          <div className="mt-6 text-center">
            <p className="text-gray-600">
              حساب کاربری ندارید؟{' '}
              <Link href="/register" className="text-teal-600 hover:text-teal-700 font-semibold">
                ثبت نام کنید
              </Link>
            </p>
          </div>
        </div>

        {/* Sample Credentials Info */}
        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-xl p-4 text-center">
          <p className="text-sm text-blue-800">
            <strong>نمونه:</strong> نام کاربری: <code className="bg-blue-100 px-2 py-1 rounded">admin</code> | رمز عبور: <code className="bg-blue-100 px-2 py-1 rounded">admin123</code>
          </p>
        </div>
      </div>
    </div>
  );
}

