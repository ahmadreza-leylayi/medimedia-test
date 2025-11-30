'use client';

import { use } from 'react';
import { mockDoctors } from '@/mocks/doctors';
import Link from 'next/link';
import Image from 'next/image';

interface DoctorPageProps {
  params: Promise<{ id: string }>;
}

export default function DoctorPage({ params }: DoctorPageProps) {
  const { id } = use(params);
  const doctor = mockDoctors.find(d => d.id === id);

  if (!doctor) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4" dir="rtl">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">پزشک یافت نشد</h1>
          <Link 
            href="/doctors/search" 
            className="text-teal-600 hover:text-teal-700 underline"
          >
            بازگشت به جستجو
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4" dir="rtl">
      <div className="container mx-auto max-w-4xl">
        <Link 
          href="/" 
          className="text-teal-600 hover:text-teal-700 mb-6 inline-block"
        >
          ← بازگشت به صفحه اصلی
        </Link>

        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="flex flex-col md:flex-row gap-6 mb-6">
            <div className="shrink-0">
              <div className="w-32 h-32 bg-teal-100 rounded-full flex items-center justify-center text-4xl font-bold text-teal-600">
                {doctor.name.charAt(doctor.name.indexOf(' ') + 1)}
              </div>
            </div>
            
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{doctor.name}</h1>
              <p className="text-xl text-gray-600 mb-4">{doctor.specialty}</p>
              
              <div className="space-y-2">
                {doctor.medicalNumber && (
                  <div className="text-gray-700">
                    <span className="font-medium">شماره نظام پزشکی:</span> {doctor.medicalNumber}
                  </div>
                )}
                {doctor.city && (
                  <div className="text-gray-700">
                    <span className="font-medium">شهر:</span> {doctor.city}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* اطلاعات تماس */}
          <div className="border-t border-gray-200 pt-6 mt-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">اطلاعات تماس</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* شماره تماس */}
              {doctor.phone && (
                <div className="bg-gray-50 rounded-xl p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 bg-teal-100 rounded-lg flex items-center justify-center">
                      <svg className="w-6 h-6 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <h3 className="font-semibold text-gray-900">شماره تماس</h3>
                  </div>
                  <a 
                    href={`tel:${doctor.phone}`}
                    className="text-lg text-teal-600 hover:text-teal-700 font-medium block mt-2"
                  >
                    {doctor.phone}
                  </a>
                </div>
              )}

              {/* آدرس */}
              {doctor.address && (
                <div className="bg-gray-50 rounded-xl p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 bg-teal-100 rounded-lg flex items-center justify-center">
                      <svg className="w-6 h-6 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <h3 className="font-semibold text-gray-900">آدرس مطب</h3>
                  </div>
                  <p className="text-gray-700 leading-relaxed mt-2">{doctor.address}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

