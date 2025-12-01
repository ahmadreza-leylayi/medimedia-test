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
  { 
    id: '16', 
    name: 'دکتر پریسا نوری', 
    specialty: 'متخصص غدد', 
    medicalNumber: '12360', 
    city: 'تهران',
    address: 'تهران، خیابان ولیعصر، پلاک ۲۳۴، طبقه سوم',
    phone: '021-88771122',
    gender: 'female',
    hasActiveAppointment: true
  },
  { 
    id: '17', 
    name: 'دکتر رضا امینی', 
    specialty: 'متخصص ریه', 
    medicalNumber: '12361', 
    city: 'مشهد',
    address: 'مشهد، خیابان احمدآباد، پلاک ۵۶، طبقه اول',
    phone: '051-37894567',
    gender: 'male',
    hasActiveAppointment: false
  },
  { 
    id: '18', 
    name: 'دکتر نازنین صفری', 
    specialty: 'متخصص عفونی', 
    medicalNumber: '12362', 
    city: 'تهران',
    address: 'تهران، میدان ونک، خیابان ملاصدرا، پلاک ۱۲۳، طبقه دوم',
    phone: '021-88770011',
    gender: 'female',
    hasActiveAppointment: true
  },
  { 
    id: '19', 
    name: 'دکتر سعید رضایی', 
    specialty: 'متخصص کلیه', 
    medicalNumber: '12363', 
    city: 'شیراز',
    address: 'شیراز، خیابان زند، پلاک ۴۵۶، طبقه سوم',
    phone: '071-32346789',
    gender: 'male',
    hasActiveAppointment: true
  },
  { 
    id: '20', 
    name: 'دکتر فاطمه زارع', 
    specialty: 'متخصص جراحی عمومی', 
    medicalNumber: '12364', 
    city: 'تهران',
    address: 'تهران، خیابان انقلاب، پلاک ۷۸۹، طبقه اول',
    phone: '021-77664433',
    gender: 'female',
    hasActiveAppointment: true
  },
  { 
    id: '21', 
    name: 'دکتر امیرحسین موسوی', 
    specialty: 'متخصص جراحی قلب', 
    medicalNumber: '12365', 
    city: 'تهران',
    address: 'تهران، خیابان پاسداران، پلاک ۳۴۵، طبقه چهارم',
    phone: '021-88773344',
    gender: 'male',
    hasActiveAppointment: true
  },
  { 
    id: '22', 
    name: 'دکتر مریم کریمی', 
    specialty: 'متخصص بیهوشی', 
    medicalNumber: '12366', 
    city: 'اصفهان',
    address: 'اصفهان، خیابان چهارباغ عباسی، پلاک ۹۰، طبقه دوم',
    phone: '031-34567890',
    gender: 'female',
    hasActiveAppointment: false
  },
  { 
    id: '23', 
    name: 'دکتر علی احمدی', 
    specialty: 'متخصص ارتوپد', 
    medicalNumber: '12367', 
    city: 'تبریز',
    address: 'تبریز، خیابان فردوسی، پلاک ۱۲۳، طبقه اول',
    phone: '041-35557788',
    gender: 'male',
    hasActiveAppointment: true
  },
  { 
    id: '24', 
    name: 'دکتر زهرا محمودی', 
    specialty: 'متخصص جراحی پلاستیک', 
    medicalNumber: '12368', 
    city: 'تهران',
    address: 'تهران، میدان جردن، خیابان فرشته، پلاک ۲۳۴، طبقه سوم',
    phone: '021-88775566',
    gender: 'female',
    hasActiveAppointment: true
  },
  { 
    id: '25', 
    name: 'دکتر محسن رضوی', 
    specialty: 'متخصص جراحی مغز و اعصاب', 
    medicalNumber: '12369', 
    city: 'تهران',
    address: 'تهران، خیابان شریعتی، پلاک ۵۶۷، طبقه دوم',
    phone: '021-88774455',
    gender: 'male',
    hasActiveAppointment: true
  },
  { 
    id: '26', 
    name: 'دکتر سارا حسینی', 
    specialty: 'متخصص جراحی زنان', 
    medicalNumber: '12370', 
    city: 'مشهد',
    address: 'مشهد، خیابان امام رضا، پلاک ۷۸، طبقه اول',
    phone: '051-37895678',
    gender: 'female',
    hasActiveAppointment: true
  },
  { 
    id: '27', 
    name: 'دکتر رضا فتحی', 
    specialty: 'متخصص جراحی اطفال', 
    medicalNumber: '12371', 
    city: 'تهران',
    address: 'تهران، خیابان آزادی، پلاک ۹۰۱، طبقه سوم',
    phone: '021-88772233',
    gender: 'male',
    hasActiveAppointment: false
  },
  { 
    id: '28', 
    name: 'دکتر الهام رستمی', 
    specialty: 'متخصص طب فیزیکی', 
    medicalNumber: '12372', 
    city: 'اصفهان',
    address: 'اصفهان، خیابان طالقانی، پلاک ۴۵، طبقه دوم',
    phone: '031-34568901',
    gender: 'female',
    hasActiveAppointment: true
  },
  { 
    id: '29', 
    name: 'دکتر مهدی نوری', 
    specialty: 'متخصص طب کار', 
    medicalNumber: '12373', 
    city: 'تهران',
    address: 'تهران، خیابان کارگر شمالی، پلاک ۱۲۳، طبقه اول',
    phone: '021-88771100',
    gender: 'male',
    hasActiveAppointment: true
  },
  { 
    id: '30', 
    name: 'دکتر نرگس علوی', 
    specialty: 'متخصص طب سالمندان', 
    medicalNumber: '12374', 
    city: 'شیراز',
    address: 'شیراز، خیابان زند، پلاک ۶۷۸، طبقه دوم',
    phone: '071-32347890',
    gender: 'female',
    hasActiveAppointment: false
  },
  { 
    id: '31', 
    name: 'دکتر احمد صادقی', 
    specialty: 'متخصص طب اورژانس', 
    medicalNumber: '12375', 
    city: 'تهران',
    address: 'تهران، خیابان ولیعصر، پلاک ۳۴۵، طبقه سوم',
    phone: '021-88770099',
    gender: 'male',
    hasActiveAppointment: true
  },
  { 
    id: '32', 
    name: 'دکتر سمیرا رضایی', 
    specialty: 'متخصص طب ورزشی', 
    medicalNumber: '12376', 
    city: 'تهران',
    address: 'تهران، خیابان پاسداران، پلاک ۵۶۷، طبقه اول',
    phone: '021-88779988',
    gender: 'female',
    hasActiveAppointment: true
  },
  { 
    id: '33', 
    name: 'دکتر حسین کاظمی', 
    specialty: 'متخصص طب پیشگیری', 
    medicalNumber: '12377', 
    city: 'مشهد',
    address: 'مشهد، خیابان احمدآباد، پلاک ۲۳۴، طبقه دوم',
    phone: '051-37896789',
    gender: 'male',
    hasActiveAppointment: false
  },
  { 
    id: '34', 
    name: 'دکتر فاطمه موسوی', 
    specialty: 'متخصص طب سوزنی', 
    medicalNumber: '12378', 
    city: 'تهران',
    address: 'تهران، میدان ونک، خیابان ملاصدرا، پلاک ۴۵۶، طبقه اول',
    phone: '021-88778877',
    gender: 'female',
    hasActiveAppointment: true
  },
  { 
    id: '35', 
    name: 'دکتر علی رضوی', 
    specialty: 'متخصص طب سنتی', 
    medicalNumber: '12379', 
    city: 'اصفهان',
    address: 'اصفهان، خیابان چهارباغ عباسی، پلاک ۷۸۹، طبقه سوم',
    phone: '031-34569012',
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
  'متخصص غدد',
  'متخصص ریه',
  'متخصص عفونی',
  'متخصص کلیه',
  'متخصص جراحی عمومی',
  'متخصص جراحی قلب',
  'متخصص بیهوشی',
  'متخصص جراحی پلاستیک',
  'متخصص جراحی مغز و اعصاب',
  'متخصص جراحی زنان',
  'متخصص جراحی اطفال',
  'متخصص طب فیزیکی',
  'متخصص طب کار',
  'متخصص طب سالمندان',
  'متخصص طب اورژانس',
  'متخصص طب ورزشی',
  'متخصص طب پیشگیری',
  'متخصص طب سوزنی',
  'متخصص طب سنتی',
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

