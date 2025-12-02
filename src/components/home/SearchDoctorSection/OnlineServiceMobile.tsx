import Image from "next/image";
const services = [

  {
    id: 1,
    topText: 'درخواست نسخه آزمایش چکاپ',
    bottomText: 'ثبت نسخه الکترونیکی ( درخواست آزمایش چکاپ )',
    icon: '/online-service-mobile/azmayesh.png',
  },
  {
    id: 2,
    topText: 'مشاوره و ویزیت ( متخصص / عمومی )',
    bottomText: 'مشاوره و ویزیت ( ۳۰ تخصص )',
    icon: '/online-service-mobile/visit.png',
  },
]
export default function OnlineServiceMobile() {
  return (
    <div className="flex flex-col gap-4 md:hidden">
        {services.map((service)=>{
            return (
                <div className="flex items-center gap-2 w-[90%] mx-auto justify-center  bg-[#FCFCFC] shadow-md rounded-3xl p-2 m-2" key={service.id}>
                    <Image src={service.icon} alt={service.topText} width={24} height={24} className="w-7 h-7 lg:w-9 lg:h-9 rounded-lg" />
                    <div className="flex flex-col gap-0.5 lg:gap-1 min-w-0">
                        <span className="text-sm lg:text-base font-bold  text-gray-900 whitespace-nowrap">{service.topText}</span>
                        <span className="text-[10px] lg:text-xs font-normal  text-[#7B7B7B] whitespace-nowrap">{service.bottomText}</span>
                    </div>
                </div>
            );
        })}
    </div>
  );
}
