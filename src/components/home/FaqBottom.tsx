import React from 'react';
import Image from 'next/image';

interface FaqItem {
  question: string;
  answer: string[];
}

const faqItems: FaqItem[] = [
  {
    question: 'چرا نوبت دهی پزشکی به صورت آنلاین اهمیت دارد؟',
    answer: [
"امکان رزرو نوبت پزشکی در هر مکان و در هر ساعت از شبانه روز امکان مقایسه دقیق پزشکان توسط بیماران امکان انتخاب و ارتباط با بیش از 300 هزار پزشک در ایران امکان ثبت خوداظهاری و شرح حال نویسی دقیق بیمار کاهش هزینه های درمان بیماران کاهش ازدحام و جلوگیری از شیوع بیماری افزایش سرعت انتقال اطلاعات پزشکی بیمار برای درمان سریعتر آن سهولت پیگیری نتیجه درمان توسط بیمار جلوگیری از اتلاف وقت و دریافت سریعتر نوبت"
    ],
  },
  {
    question: 'مزایای دریافت نوبت دهی پزشکی در سایت مدی مدیا (برای بیماران)',
    answer: [
"امکان ارتباط با بیش از 300 هزار پزشک در سراسر ایران خود اظهاری بیمار قبل از مراجعه به مطب و کلینیک کاهش هزینه ها محافظت از پرونده پزشکی تسهیل در اجرای نظام ارجاع ارائه بهترین خدمات با کمترین نگرانی و کاهش تبعات فشارهای روانی بیمار و همراهان ارسال پیامک، جهت یادآوری نوبت و نسخه ها توسط سامانه مدی مدیا دسترسی به مشخصات مراکز درمانی از قبیل (شماره تلفن مراکز درمانی، آدرس دقیق،موقعیت های مکانی و…) دسترسی به مسئولیت های اجتماعی (مقالات) پزشکان به صورت نامحدود و رایگان فهرست کلی و جامع از پزشکان متخصص آپلود مدارک پزشکی هنگام نوبت دهی آنلاین"
    ],
  },
];

export default function FaqBottom() {
  return (
    <div className="w-full  py-8 md:py-12">
      <div className="container mx-auto px-4 md:px-6 lg:px-[9%]">
        <div className="flex flex-col gap-6 md:gap-8">
          {faqItems.map((item, index) => (
            <div key={index} className="w-full flex flex-col gap-4 md:gap-6">
              {/* Question */}
              <div className="flex items-center gap-2 w-full min-w-0 px-4 md:px-6">
                <Image src="/faq-bottom/icon.png" alt="faq" width={20} height={16} />
                <h2 className="text-lg md:text-[18px] font-bold text-[#1B1B1B] flex-1 min-w-0 wrap-break-word">
                  {item.question}
                </h2>
              </div>

              {/* Answer section inside the card */}
              <div className="w-full bg-white rounded-2xl shadow-sm overflow-hidden">
                <div className="p-4 md:p-6 w-full">
                  <div className="w-full text-sm md:text-[14px] text-[#7B7B7B] leading-relaxed space-y-2 md:space-y-3">
                    {item.answer.map((answerItem, answerIndex) => (
                      <p key={answerIndex} className="w-full wrap-break-word">{answerItem}</p>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

