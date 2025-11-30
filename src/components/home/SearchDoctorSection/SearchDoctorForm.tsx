'use client';

import React, { useState } from 'react';
import Image from 'next/image';

function SearchDoctorForm() {
  const [activeFilter, setActiveFilter] = useState<'medical' | 'location' | 'identity'>('identity');
  const [doctorFilter, setDoctorFilter] = useState<'all' | 'active'>('all');
  const [doctorName, setDoctorName] = useState('');
  const [specialty, setSpecialty] = useState('');
  const [medicalNumber, setMedicalNumber] = useState('');
  const [gender, setGender] = useState('');

  return (
    <div className="w-full py-12 bg-white rounded-3xl">
      <div className="w-full">
        {/* Header */}
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 text-center mb-8 px-4">
          مشاهده صفحه شخصی پزشکان، نوبت دهی و مشاوره پزشکی
        </h2>

        <div className="flex flex-col lg:flex-row gap-6 lg:gap-4 xl:gap-8 justify-center items-center px-4 md:px-6">
          {/* Right Side - Doctor Image */}
          <div className="hidden lg:block shrink-0 lg:w-1/3 xl:w-2/5">
            <div className="relative">
              <Image
                src="/search-doctor-section/doctor.png"
                alt="Doctor"
                width={500}
                height={600}
                className="w-full h-auto object-contain"
                priority
              />
            </div>
          </div>
          {/* Left Side - Form */}
          <div className="flex-1 w-full lg:w-auto lg:min-w-0">
            {/* Filter Tabs - Segmented Control */}
            <div className="flex bg-gray-200 rounded-3xl p-1 mb-6">
              <button
                onClick={() => setActiveFilter('identity')}
                className={`flex items-center justify-center gap-2 flex-1 px-2 py-2 rounded-full font-medium transition-colors ${activeFilter === 'identity'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'bg-transparent text-gray-600'
                  }`}
              >
                <Image
                  src="/search-doctor-section/icons/Identity.png"
                  alt="Identity"
                  width={20}
                  height={20}
                  className="w-5 h-5"
                />
                <span className='text-sm cursor-pointer'>هویتی</span>
              </button>
              <button
                onClick={() => setActiveFilter('location')}
                className={`flex items-center justify-center gap-2 flex-1 px-4 py-2 rounded-full font-medium transition-colors ${activeFilter === 'location'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'bg-transparent text-gray-600'
                  }`}
              >
                <Image
                  src="/search-doctor-section/icons/location.png"
                  alt="Location"
                  width={20}
                  height={20}
                  className="w-5 h-5"
                />
                <span className='text-sm cursor-pointer'>مکانی</span>
              </button>
              <button
                onClick={() => setActiveFilter('medical')}
                className={`flex items-center justify-center gap-2 flex-1 px-4 py-2 rounded-full font-medium transition-colors ${activeFilter === 'medical'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'bg-transparent text-gray-600'
                  }`}
              >
                <Image
                  src="/search-doctor-section/icons/medicine.png"
                  alt="Medical"
                  width={20}
                  height={20}
                  className="w-5 h-5"
                />
                <span className='text-sm cursor-pointer'>پزشکی</span>
              </button>
            </div>

            {/* Form Fields - Two Rows */}
            <div className="bg-white rounded-lg-md p-4 w-full">
              {/* First Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 ">
                <div>

                  <input
                    type="text"
                    value={doctorName}
                    onChange={(e) => setDoctorName(e.target.value)}
                    placeholder="نام پزشک"
                    className="w-full px-4 py-2 bg-[#F1F1F1] rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#1B1B1B] focus:border-transparent md:text-[12px] md:placeholder:text-[12px] "
                  />
                </div>

                <div className="relative">
                  <select
                    value={specialty || ''}
                    onChange={(e) => {
                      const value = e.target.value;
                      if (value) {
                        setSpecialty(value);
                      } else {
                        setSpecialty('');
                      }
                    }}
                    className="w-full px-4 py-2.5 rounded-2xl border border-[#F1F1F1] text-[#7B7B7B] focus:outline-none focus:ring-2 focus:ring-[#1B1B1B] focus:border-transparent appearance-none bg-gray-100 cursor-pointer text-sm md:text-[12px]"
                  >
                    <option value="" disabled>انتخاب تخصص</option>
                    <option value="general">عمومی</option>
                    <option value="specialist">متخصص</option>
                  </select>
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
                    <svg className="w-4 h-4 md:w-4 md:h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Second Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="relative">
                  <select
                    value={gender || ''}
                    onChange={(e) => {
                      const value = e.target.value;
                      if (value) {
                        setGender(value);
                      } else {
                        setGender('');
                      }
                    }}
                    className="w-full px-4 py-2.5  text-[#7B7B7B] border border-[#F1F1F1] rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#1B1B1B] focus:border-transparent appearance-none bg-gray-100 cursor-pointer text-sm md:text-[12px]"
                  >
                    <option value="" disabled>جنسیت</option>
                    <option value="male">مرد</option>
                    <option value="female">زن</option>
                  </select>
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
                    <svg className="w-4 h-4 md:w-4 md:h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
                <div>
                  <input
                    type="text"
                    value={medicalNumber}
                    onChange={(e) => setMedicalNumber(e.target.value)}
                    placeholder="شماره نظام پزشکی"
                    className="w-full px-4 py-2 border border-[#F1F1F1] rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#1B1B1B] focus:border-transparent bg-gray-100 md:text-[12px] md:placeholder:text-[12px]"
                  />
                </div>


              </div>

              {/* Action Buttons - Single Row */}
              <div className="flex flex-col md:flex-row w-full items-stretch md:items-center gap-2 md:gap-2 lg:gap-1 pt-4 md:justify-between min-w-0">

                {/* Segmented Control */}
                <div className="flex bg-gray-200 rounded-3xl p-1 w-full md:w-auto md:shrink-0 gap-1 ">
                <button
                    onClick={() => setDoctorFilter('all')}
                    className={`flex items-center justify-center gap-1.5 md:gap-2 px-2 md:px-3 lg:px-4 py-2 rounded-3xl flex-1 md:flex-none md:w-auto font-medium cursor-pointer transition-colors min-w-0 ${doctorFilter === 'all'
                      ? 'bg-white text-gray-900 shadow-sm'
                      : 'bg-transparent text-gray-600'
                      }`}
                  >
                    <Image
                      src="/search-doctor-section/icons/medicine.png"
                      alt="All Doctors"
                      width={20}
                      height={20}
                      className="w-4 h-4 md:w-5 md:h-5 shrink-0"
                    />
                    <span className="text-xs md:text-sm whitespace-nowrap truncate">همه پزشکان</span>
                  </button>

                  <button
                    onClick={() => setDoctorFilter('active')}
                    className={`flex items-center justify-center gap-1.5 md:gap-2 px-2 md:px-3 lg:px-4 py-2 rounded-3xl flex-1 md:flex-none md:w-auto font-medium cursor-pointer transition-colors min-w-0 ${doctorFilter === 'active'
                      ? 'bg-white text-gray-900 shadow-sm'
                      : 'bg-transparent text-gray-600'
                      }`}
                  >
                    <Image
                      src="/search-doctor-section/icons/clock.png"
                      alt="Active Appointment"
                      width={20}
                      height={20}
                      className="w-4 h-4 md:w-5 md:h-5 shrink-0"
                    />
                    <span className="text-xs md:text-sm whitespace-nowrap truncate">با نوبت دهی فعال</span>
                  </button>

             
                </div>

                <button className="flex text-nowrap items-center justify-center gap-1 md:gap-2 bg-gradient-to-b from-[#E04A3C] to-[#ED6A5E] text-white px-3 md:px-4 lg:px-4  py-2 md:py-3 rounded-3xl font-medium hover:bg-red-700 transition-colors w-full md:w-auto md:shrink-0 cursor-pointer">
                  <Image
                    src="/search-doctor-section/icons/search-start.png"
                    alt="Search"
                    width={20}
                    height={20}
                    className="w-4 h-4 md:w-4 md:h-4 shrink-0"
                  />
                  <span className="whitespace-nowrap text-xs md:text-sm lg:text-md">شروع جستجو</span>
                </button>
              </div>
            </div>
          </div>


        </div>
      </div>
    </div>
  );
}

export default SearchDoctorForm;

