import { Banner } from './Banner';

export function DrugSend() {
  return (
    <Banner
      icon="/banner/drug-send.png"
      title="ارسال دارو با سفیر مدی‌مدیا"
description='ثبت درخواست دارو و خدمات / تجویز مجدد، دارو و خدمات درخواستی شما پس از مشاوره و تایید پزشک برای شما تجویز خواهد شد'      image="/banner/drug-send.png"
      imageAlt="ارسال دارو"
      searchPlaceholder="جستجوی دارو یا خدمت"
      exampleText="مثال سونو، سی تی، نام کمپانی، کد خدمت..."
      searchIcon="/banner/service-search-icon.png"
      buttonIcon="/banner/search.png"
    />
  );
}

