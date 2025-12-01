/**
 * Mock Data for Doctors
 * داده‌های تستی برای پزشکان
 */

export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  medicalNumber?: string;
  city?: string;
  address?: string;
  phone?: string;
  avatar?: string;
  gender?: 'male' | 'female';
  hasActiveAppointment?: boolean;
}

/**
 * لیست پزشکان نمونه
 */
export const mockDoctors: Doctor[] = [
  { 
    id: '1', 
    name: 'دکتر محمد رضایی', 
    specialty: 'متخصص قلب و عروق', 
    medicalNumber: '12345', 
    city: 'تهران',
    address: 'تهران، خیابان ولیعصر، پلاک ۱۲۳۴، طبقه دوم، واحد ۵',
    phone: '021-88776655',
    gender: 'male',
    hasActiveAppointment: true
  },
  { 
    id: '2', 
    name: 'دکتر فاطمه احمدی', 
    specialty: 'متخصص پوست', 
    medicalNumber: '12346', 
    city: 'تهران',
    address: 'تهران، میدان ونک، خیابان ملاصدرا، پلاک ۵۶۷، طبقه اول',
    phone: '021-88775544',
    gender: 'female',
    hasActiveAppointment: true
  },
  { 
    id: '3', 
    name: 'دکتر علی کریمی', 
    specialty: 'متخصص مغز و اعصاب', 
    medicalNumber: '12347', 
    city: 'اصفهان',
    address: 'اصفهان، خیابان چهارباغ عباسی، پلاک ۸۹۰، طبقه سوم',
    phone: '031-34567890',
    gender: 'male',
    hasActiveAppointment: false
  },
  { 
    id: '4', 
    name: 'دکتر سارا محمدی', 
    specialty: 'متخصص اطفال', 
    medicalNumber: '12348', 
    city: 'تهران',
    address: 'تهران، خیابان انقلاب، پلاک ۱۲۳، طبقه اول',
    phone: '021-77665544',
    gender: 'female',
    hasActiveAppointment: true
  },
  { 
    id: '5', 
    name: 'دکتر حسین نوری', 
    specialty: 'متخصص ارتوپد', 
    medicalNumber: '12349', 
    city: 'مشهد',
    address: 'مشهد، خیابان امام رضا، پلاک ۴۵۶، طبقه دوم',
    phone: '051-37891234',
    gender: 'male',
    hasActiveAppointment: true
  },
  { 
    id: '6', 
    name: 'دکتر مریم احمدزاده', 
    specialty: 'متخصص زنان', 
    medicalNumber: '12350', 
    city: 'تهران',
    address: 'تهران، میدان جردن، خیابان فرشته، پلاک ۷۸، طبقه اول',
    phone: '021-88776633',
    gender: 'female',
    hasActiveAppointment: true
  },
  { 
    id: '7', 
    name: 'دکتر احمد موسوی', 
    specialty: 'متخصص داخلی', 
    medicalNumber: '12351', 
    city: 'شیراز',
    address: 'شیراز، خیابان زند، پلاک ۲۳۴، طبقه دوم',
    phone: '071-32345678',
    gender: 'male',
    hasActiveAppointment: false
  },
  { 
    id: '8', 
    name: 'دکتر زهرا صادقی', 
    specialty: 'متخصص چشم', 
    medicalNumber: '12352', 
    city: 'تهران',
    address: 'تهران، خیابان آزادی، پلاک ۶۷۸، طبقه سوم',
    phone: '021-88775522',
    gender: 'female',
    hasActiveAppointment: true
  },
  { 
    id: '9', 
    name: 'دکتر امیررضا حسینی', 
    specialty: 'متخصص گوارش', 
    medicalNumber: '12353', 
    city: 'تبریز',
    address: 'تبریز، خیابان فردوسی، پلاک ۹۰۱، طبقه اول',
    phone: '041-35556677',
    gender: 'male',
    hasActiveAppointment: false
  },
  { 
    id: '10', 
    name: 'دکتر الهام رستمی', 
    specialty: 'متخصص روانپزشکی', 
    medicalNumber: '12354', 
    city: 'تهران',
    address: 'تهران، خیابان شریعتی، پلاک ۳۴۵، طبقه دوم',
    phone: '021-88774411',
    gender: 'female',
    hasActiveAppointment: true
  },
  { 
    id: '11', 
    name: 'دکتر محسن رضوی', 
    specialty: 'پزشک عمومی', 
    city: 'قم',
    address: 'قم، خیابان ارم، پلاک ۱۲، طبقه اول',
    phone: '025-37778899',
    gender: 'male',
    hasActiveAppointment: false
  },
  { 
    id: '12', 
    name: 'دکتر نرگس علوی', 
    specialty: 'متخصص رادیولوژی', 
    medicalNumber: '12356', 
    city: 'تهران',
    address: 'تهران، خیابان کارگر شمالی، پلاک ۷۸۹، طبقه دوم',
    phone: '021-88773300',
    gender: 'female',
    hasActiveAppointment: true
  },
  { 
    id: '13', 
    name: 'دکتر رضا فتحی', 
    specialty: 'متخصص گوش و حلق و بینی', 
    medicalNumber: '12357', 
    city: 'مشهد',
    address: 'مشهد، خیابان احمدآباد، پلاک ۲۳، طبقه سوم',
    phone: '051-37892345',
    gender: 'male',
    hasActiveAppointment: false
  },
  { 
    id: '14', 
    name: 'دکتر سمیرا رضایی', 
    specialty: 'متخصص خون', 
    medicalNumber: '12358', 
    city: 'تهران',
    address: 'تهران، خیابان پاسداران، پلاک ۴۵۶، طبقه اول',
    phone: '021-88772299',
    gender: 'female',
    hasActiveAppointment: true
  },
  { 
    id: '15', 
    name: 'دکتر مهدی کاظمی', 
    specialty: 'متخصص ارولوژی', 
    medicalNumber: '12359', 
    city: 'اصفهان',
    address: 'اصفهان، خیابان طالقانی، پلاک ۳۴، طبقه دوم',
    phone: '031-34561234',
    gender: 'male',
    hasActiveAppointment: true
  },
];

/**
 * جستجوی پزشک بر اساس نام یا تخصص
 */
export function searchDoctors(query: string): Doctor[] {
  if (!query.trim()) return [];
  
  const lowerQuery = query.toLowerCase().trim();
  return mockDoctors.filter(doctor => 
    doctor.name.toLowerCase().includes(lowerQuery) ||
    doctor.specialty.toLowerCase().includes(lowerQuery) ||
    doctor.medicalNumber?.includes(lowerQuery) ||
    doctor.city?.toLowerCase().includes(lowerQuery) ||
    doctor.address?.toLowerCase().includes(lowerQuery) ||
    doctor.phone?.includes(lowerQuery)
  ).slice(0, 8); // محدود کردن به 8 نتیجه اول
}

/**
 * Interface for advanced search filters
 */
export interface AdvancedSearchFilters {
  name?: string;
  medicalNumber?: string;
  gender?: 'male' | 'female';
  specialty?: 'general' | 'specialist' | string; // 'general' for عمومی, 'specialist' for متخصص, or specific specialty name
  hasActiveAppointment?: boolean;
  city?: string;
}

/**
 * جستجوی پیشرفته پزشک بر اساس فیلترها
 */
export function searchDoctorsAdvanced(filters: AdvancedSearchFilters): Doctor[] {
  let results = [...mockDoctors];

  // فیلتر بر اساس نام
  if (filters.name?.trim()) {
    const nameQuery = filters.name.toLowerCase().trim();
    results = results.filter(doctor => 
      doctor.name.toLowerCase().includes(nameQuery)
    );
  }

  // فیلتر بر اساس شماره نظام پزشکی
  if (filters.medicalNumber?.trim()) {
    const medicalQuery = filters.medicalNumber.trim();
    results = results.filter(doctor => 
      doctor.medicalNumber?.includes(medicalQuery)
    );
  }

  // فیلتر بر اساس جنسیت
  if (filters.gender) {
    results = results.filter(doctor => doctor.gender === filters.gender);
  }

  // فیلتر بر اساس تخصص
  if (filters.specialty) {
    if (filters.specialty === 'general') {
      // پزشک عمومی
      results = results.filter(doctor => 
        doctor.specialty === 'پزشک عمومی'
      );
    } else if (filters.specialty === 'specialist') {
      // همه متخصص‌ها (غیر از عمومی)
      results = results.filter(doctor => 
        doctor.specialty !== 'پزشک عمومی' && doctor.specialty.includes('متخصص')
      );
    } else {
      // تخصص خاص
      results = results.filter(doctor => 
        doctor.specialty.toLowerCase().includes(filters.specialty!.toLowerCase())
      );
    }
  }

  // فیلتر بر اساس نوبت دهی فعال
  if (filters.hasActiveAppointment !== undefined) {
    results = results.filter(doctor => 
      doctor.hasActiveAppointment === filters.hasActiveAppointment
    );
  }

  // فیلتر بر اساس شهر
  if (filters.city?.trim()) {
    const cityQuery = filters.city.toLowerCase().trim();
    results = results.filter(doctor => 
      doctor.city?.toLowerCase().includes(cityQuery)
    );
  }

  return results;
}

/**
 * لیست تخصص‌های موجود
 */
export const specialties = [
  'پزشک عمومی',
  'متخصص قلب و عروق',
  'متخصص پوست',
  'متخصص مغز و اعصاب',
  'متخصص اطفال',
  'متخصص ارتوپد',
  'متخصص زنان',
  'متخصص داخلی',
  'متخصص چشم',
  'متخصص گوارش',
  'متخصص روانپزشکی',
  'متخصص رادیولوژی',
  'متخصص گوش و حلق و بینی',
  'متخصص خون',
  'متخصص ارولوژی',
];

/**
 * لیست شهرهای موجود (استخراج شده از mockDoctors)
 */
export const cities = Array.from(
  new Set(
    mockDoctors
      .map(doctor => doctor.city)
      .filter((city): city is string => !!city)
  )
).sort();

