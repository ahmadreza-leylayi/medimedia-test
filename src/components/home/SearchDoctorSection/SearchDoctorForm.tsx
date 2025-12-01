'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { searchDoctors, searchDoctorsAdvanced, specialties, cities, type Doctor } from '@/mocks/doctors';

function SearchDoctorForm() {
  const router = useRouter();
  const [activeFilter, setActiveFilter] = useState<'medical' | 'location' | 'identity'>('identity');
  const [doctorFilter, setDoctorFilter] = useState<'all' | 'active'>('all');
  const [doctorName, setDoctorName] = useState('');
  const [specialty, setSpecialty] = useState('');
  const [medicalNumber, setMedicalNumber] = useState('');
  const [gender, setGender] = useState('');
  const [city, setCity] = useState('');

  // States for autocomplete
  const [isNameFocused, setIsNameFocused] = useState(false);
  const [isMedicalNumberFocused, setIsMedicalNumberFocused] = useState(false);
  const [nameResults, setNameResults] = useState<Doctor[]>([]);
  const [medicalNumberResults, setMedicalNumberResults] = useState<Doctor[]>([]);
  const [selectedNameIndex, setSelectedNameIndex] = useState(-1);
  const [selectedMedicalIndex, setSelectedMedicalIndex] = useState(-1);
  
  // States for filter results
  const [filterResults, setFilterResults] = useState<Doctor[]>([]);
  const [showFilterResults, setShowFilterResults] = useState(false);
  const [selectedFilterIndex, setSelectedFilterIndex] = useState(-1);

  // Refs
  const nameContainerRef = useRef<HTMLDivElement>(null);
  const nameInputRef = useRef<HTMLInputElement>(null);
  const medicalContainerRef = useRef<HTMLDivElement>(null);
  const medicalInputRef = useRef<HTMLInputElement>(null);
  const filterResultsRef = useRef<HTMLDivElement>(null);

  // جستجوی پزشکان بر اساس نام
  useEffect(() => {
    if (doctorName.trim() && isNameFocused) {
      const results = searchDoctors(doctorName);
      setNameResults(results);
      setSelectedNameIndex(-1);
    } else {
      setNameResults([]);
      setSelectedNameIndex(-1);
    }
  }, [doctorName, isNameFocused]);

  // جستجوی پزشکان بر اساس شماره نظام پزشکی
  useEffect(() => {
    if (medicalNumber.trim() && isMedicalNumberFocused) {
      const results = searchDoctors(medicalNumber);
      setMedicalNumberResults(results);
      setSelectedMedicalIndex(-1);
    } else {
      setMedicalNumberResults([]);
      setSelectedMedicalIndex(-1);
    }
  }, [medicalNumber, isMedicalNumberFocused]);

  // محاسبه نتایج فیلترها (بدون نمایش خودکار)
  useEffect(() => {
    let hasFilters = false;
    let hasTextInputs = false;
    
    if (activeFilter === 'identity') {
      hasFilters = !!(gender || specialty || doctorFilter === 'active');
      hasTextInputs = !!(doctorName.trim() || medicalNumber.trim());
    } else if (activeFilter === 'location') {
      hasFilters = !!(city.trim() || doctorFilter === 'active');
      hasTextInputs = false;
    } else if (activeFilter === 'medical') {
      hasFilters = !!(specialty || doctorFilter === 'active');
      hasTextInputs = false;
    }
    
    // وقتی فیلترها تغییر می‌کنند، لیست را ببند
    setShowFilterResults(false);
    
    if (hasFilters && !hasTextInputs) {
      const filters: any = {
        hasActiveAppointment: doctorFilter === 'active' ? true : undefined,
      };
      
      if (activeFilter === 'identity') {
        filters.gender = gender as 'male' | 'female' | undefined;
        filters.specialty = specialty || undefined;
      } else if (activeFilter === 'location') {
        filters.city = city.trim() || undefined;
      } else if (activeFilter === 'medical') {
        filters.specialty = specialty || undefined;
      }
      
      const results = searchDoctorsAdvanced(filters);
      setFilterResults(results);
    } else {
      setFilterResults([]);
    }
  }, [activeFilter, gender, specialty, doctorFilter, doctorName, medicalNumber, city]);

  // Handle keyboard navigation for name input
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isNameFocused || nameResults.length === 0) return;

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedNameIndex(prev => (prev < nameResults.length - 1 ? prev + 1 : prev));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedNameIndex(prev => (prev > 0 ? prev - 1 : -1));
      } else if (e.key === 'Enter' && selectedNameIndex >= 0) {
        e.preventDefault();
        handleSelectDoctor(nameResults[selectedNameIndex]);
      } else if (e.key === 'Escape') {
        setDoctorName('');
        setNameResults([]);
        nameInputRef.current?.blur();
      }
    };

    if (isNameFocused) {
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }
  }, [isNameFocused, nameResults, selectedNameIndex]);

  // Handle keyboard navigation for medical number input
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isMedicalNumberFocused || medicalNumberResults.length === 0) return;

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedMedicalIndex(prev => (prev < medicalNumberResults.length - 1 ? prev + 1 : prev));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedMedicalIndex(prev => (prev > 0 ? prev - 1 : -1));
      } else if (e.key === 'Enter' && selectedMedicalIndex >= 0) {
        e.preventDefault();
        handleSelectDoctor(medicalNumberResults[selectedMedicalIndex]);
      } else if (e.key === 'Escape') {
        setMedicalNumber('');
        setMedicalNumberResults([]);
        medicalInputRef.current?.blur();
      }
    };

    if (isMedicalNumberFocused) {
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }
  }, [isMedicalNumberFocused, medicalNumberResults, selectedMedicalIndex]);


  // Handle keyboard navigation for filter results
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!showFilterResults || filterResults.length === 0) return;

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedFilterIndex(prev => (prev < filterResults.length - 1 ? prev + 1 : prev));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedFilterIndex(prev => (prev > 0 ? prev - 1 : -1));
      } else if (e.key === 'Enter' && selectedFilterIndex >= 0) {
        e.preventDefault();
        handleSelectDoctor(filterResults[selectedFilterIndex]);
      } else if (e.key === 'Escape') {
        setShowFilterResults(false);
      }
    };

    if (showFilterResults) {
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }
  }, [showFilterResults, filterResults, selectedFilterIndex]);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (nameContainerRef.current && !nameContainerRef.current.contains(event.target as Node)) {
        setIsNameFocused(false);
        setNameResults([]);
      }
      if (medicalContainerRef.current && !medicalContainerRef.current.contains(event.target as Node)) {
        setIsMedicalNumberFocused(false);
        setMedicalNumberResults([]);
      }
      if (filterResultsRef.current && !filterResultsRef.current.contains(event.target as Node)) {
        setShowFilterResults(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelectDoctor = (doctor: Doctor) => {
    if (isNameFocused) {
      setDoctorName(doctor.name);
      setNameResults([]);
      setIsNameFocused(false);
    } else if (isMedicalNumberFocused) {
      setMedicalNumber(doctor.medicalNumber || '');
      setMedicalNumberResults([]);
      setIsMedicalNumberFocused(false);
    }
    router.push(`/doctors/${doctor.id}`);
  };

  const handleSearch = () => {
    // If there's a text input, search by it
    if (activeFilter === 'identity' && doctorName.trim()) {
      const results = searchDoctors(doctorName);
      if (results.length > 0 && selectedNameIndex >= 0 && nameResults[selectedNameIndex]) {
        router.push(`/doctors/${nameResults[selectedNameIndex].id}`);
      } else {
        router.push(`/doctors/search?q=${encodeURIComponent(doctorName.trim())}`);
      }
      return;
    }

    if (activeFilter === 'identity' && medicalNumber.trim()) {
      const results = searchDoctors(medicalNumber);
      if (results.length > 0 && selectedMedicalIndex >= 0 && medicalNumberResults[selectedMedicalIndex]) {
        router.push(`/doctors/${medicalNumberResults[selectedMedicalIndex].id}`);
      } else {
        router.push(`/doctors/search?q=${encodeURIComponent(medicalNumber.trim())}`);
      }
      return;
    }

    // If only filters are selected, show results
    let hasFilters = false;
    if (activeFilter === 'identity') {
      hasFilters = !!(gender || specialty || doctorFilter === 'active');
    } else if (activeFilter === 'location') {
      hasFilters = !!(city.trim() || doctorFilter === 'active');
    } else if (activeFilter === 'medical') {
      hasFilters = !!(specialty || doctorFilter === 'active');
    }
    
    if (hasFilters) {
      setShowFilterResults(true);
    }
  };

  const showNameDropdown = isNameFocused && nameResults.length > 0 && doctorName.trim();
  const showMedicalDropdown = isMedicalNumberFocused && medicalNumberResults.length > 0 && medicalNumber.trim();

  return (
    <div className="w-full py-12 bg-white rounded-3xl relative">
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

            {/* Form Fields - Conditional based on activeFilter */}
            <div className="bg-white rounded-lg-md p-4 w-full">
              {activeFilter === 'identity' && (
                <>
                  {/* First Row */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 ">
                    <div className="relative" ref={nameContainerRef}>
                      <input
                        ref={nameInputRef}
                        type="text"
                        value={doctorName}
                        onChange={(e) => setDoctorName(e.target.value)}
                        onFocus={() => setIsNameFocused(true)}
                        placeholder="نام پزشک"
                        className="w-full px-4 py-2 bg-[#F1F1F1] rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#1B1B1B] focus:border-transparent md:text-[12px] md:placeholder:text-[12px]"
                      />
                      
                      {/* Name Dropdown Results */}
                      {showNameDropdown && (
                        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-lg border border-gray-200 z-50 max-h-96 overflow-y-auto">
                          {nameResults.map((doctor, index) => (
                            <button
                              key={doctor.id}
                              type="button"
                              onClick={() => handleSelectDoctor(doctor)}
                              onMouseEnter={() => setSelectedNameIndex(index)}
                              className={`w-full text-right px-4 py-3 hover:bg-teal-50 transition-colors border-b border-gray-100 last:border-b-0 ${
                                selectedNameIndex === index ? ' bg-teal-50' : ''
                              }`}
                            >
                              <div className="flex items-start justify-between gap-2">
                                <div className="flex-1 min-w-0">
                                  <div className="font-medium text-gray-900 text-sm">{doctor.name}</div>
                                  <div className="text-xs text-gray-500 mt-1">{doctor.specialty}</div>
                                  {doctor.city && (
                                    <div className="text-xs text-gray-400 mt-0.5">{doctor.city}</div>
                                  )}
                                </div>
                                {doctor.medicalNumber && (
                                  <div className="text-xs text-gray-400 shrink-0">
                                    شماره نظام: {doctor.medicalNumber}
                                  </div>
                                )}
                              </div>
                            </button>
                          ))}
                        </div>
                      )}
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
                    <div className="relative" ref={medicalContainerRef}>
                      <input
                        ref={medicalInputRef}
                        type="text"
                        value={medicalNumber}
                        onChange={(e) => setMedicalNumber(e.target.value)}
                        onFocus={() => setIsMedicalNumberFocused(true)}
                        placeholder="شماره نظام پزشکی"
                        className="w-full px-4 py-2 border border-[#F1F1F1] rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#1B1B1B] focus:border-transparent bg-gray-100 md:text-[12px] md:placeholder:text-[12px]"
                      />
                      
                      {/* Medical Number Dropdown Results */}
                      {showMedicalDropdown && (
                        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-lg border border-gray-200 z-50 max-h-96 overflow-y-auto">
                          {medicalNumberResults.map((doctor, index) => (
                            <button
                              key={doctor.id}
                              type="button"
                              onClick={() => handleSelectDoctor(doctor)}
                              onMouseEnter={() => setSelectedMedicalIndex(index)}
                              className={`w-full text-right px-4 py-3 hover:bg-teal-50 transition-colors border-b border-gray-100 last:border-b-0 ${
                                selectedMedicalIndex === index ? ' bg-teal-50' : ''
                              }`}
                            >
                              <div className="flex items-start justify-between gap-2">
                                <div className="flex-1 min-w-0">
                                  <div className="font-medium text-gray-900 text-sm">{doctor.name}</div>
                                  <div className="text-xs text-gray-500 mt-1">{doctor.specialty}</div>
                                  {doctor.city && (
                                    <div className="text-xs text-gray-400 mt-0.5">{doctor.city}</div>
                                  )}
                                </div>
                                {doctor.medicalNumber && (
                                  <div className="text-xs text-gray-400 shrink-0">
                                    شماره نظام: {doctor.medicalNumber}
                                  </div>
                                )}
                              </div>
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </>
              )}

              {activeFilter === 'location' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div className="relative">
                    <select
                      value={city || ''}
                      onChange={(e) => {
                        const value = e.target.value;
                        if (value) {
                          setCity(value);
                        } else {
                          setCity('');
                        }
                      }}
                      className="w-full px-4 py-2.5 rounded-2xl border border-[#F1F1F1] text-[#7B7B7B] focus:outline-none focus:ring-2 focus:ring-[#1B1B1B] focus:border-transparent appearance-none bg-gray-100 cursor-pointer text-sm md:text-[12px]"
                    >
                      <option value="" disabled>انتخاب شهر</option>
                      {cities.map((cityName) => (
                        <option key={cityName} value={cityName}>{cityName}</option>
                      ))}
                    </select>
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
                      <svg className="w-4 h-4 md:w-4 md:h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                  <div></div>
                </div>
              )}

              {activeFilter === 'medical' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
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
                      {specialties.map((spec) => (
                        <option key={spec} value={spec}>{spec}</option>
                      ))}
                    </select>
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
                      <svg className="w-4 h-4 md:w-4 md:h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                  <div></div>
                </div>
              )}

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

                <button 
                  onClick={handleSearch}
                  className="flex text-nowrap items-center justify-center gap-1 md:gap-2 bg-gradient-to-b from-[#E04A3C] to-[#ED6A5E] text-white px-3 md:px-4 lg:px-4  py-2 md:py-3 rounded-3xl font-medium hover:from-[#D03A2C] hover:to-[#DD5A4E] transition-colors w-full md:w-auto md:shrink-0 cursor-pointer"
                >
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

      {/* Filter Results Toast/List */}
      {showFilterResults && filterResults.length > 0 && (
        <div 
          ref={filterResultsRef}
          className="fixed inset-0 bg-black bg-opacity-50 z-[100] flex items-center justify-center p-4"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setShowFilterResults(false);
            }
          }}
        >
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-hidden flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <h3 className="text-lg font-bold text-gray-900">
                نتایج جستجو ({filterResults.length})
              </h3>
              <button
                onClick={() => setShowFilterResults(false)}
                className="text-gray-500 hover:text-gray-700 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Results List */}
            <div className="overflow-y-auto flex-1">
              {filterResults.map((doctor, index) => (
                <button
                  key={doctor.id}
                  type="button"
                  onClick={() => {
                    handleSelectDoctor(doctor);
                    setShowFilterResults(false);
                  }}
                  onMouseEnter={() => setSelectedFilterIndex(index)}
                  className={`w-full text-right px-4 py-3 hover:bg-teal-50 transition-colors border-b border-gray-100 last:border-b-0 ${
                    selectedFilterIndex === index ? ' bg-teal-50' : ''
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-gray-900 text-sm">{doctor.name}</div>
                      <div className="text-xs text-gray-500 mt-1">{doctor.specialty}</div>
                      {doctor.city && (
                        <div className="text-xs text-gray-400 mt-0.5">شهر: {doctor.city}</div>
                      )}
                    </div>
                    {doctor.medicalNumber && (
                      <div className="text-xs text-gray-400 shrink-0">
                        شماره نظام: {doctor.medicalNumber}
                      </div>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default SearchDoctorForm;
