import { HeroColor } from "@/components/home/hero-section/heroColor";
import HeroSection from "@/components/home/hero-section/HeroSection";
import SearchDoctorSection from "@/components/home/SearchDoctorSection/SearchDoctorSection";
import SliderTop from "@/components/home/sliders/SliderTop";
import NewsSlider from "@/components/home/sliders/NewsSlider";
import BlogsSlider from "@/components/home/sliders/BlogsSlider";
import HealthNews from "@/components/home/HealthNews";
import { DrugSend } from "@/components/home/SearchDoctorSection/banner/DrugSend";
import { DrugInquiry } from "@/components/home/SearchDoctorSection/banner/DrugInquiry";
import Faq from "@/components/home/Faq";
import LicenseSlider from "@/components/home/sliders/license-slider/LicenseSlider";
import FaqBottom from "@/components/home/FaqBottom";
export default function HomePage() {
  return (
    <div className="relative overflow-x-hidden w-full">
      <HeroColor />
      <HeroSection />
      <SliderTop />

      {/* Shared Container for SearchDoctorSection to HealthNews */}
      <div className="relative overflow-x-hidden">
        <div className="flex flex-col lg:flex-row items-start gap-0 lg:gap-6">
          {/* Main Content with Shared Container */}
          <div className="flex-1 w-full min-w-0">
            <div className="container mx-auto px-4 md:px-6 lg:px-[9%]">
              <SearchDoctorSection />
              <NewsSlider />
              <BlogsSlider />
              <HealthNews />
              <Faq />
            </div>
          </div>
          
          {/* Banners - Outside container, hidden on mobile/tablet */}
          <div className="hidden lg:flex w-[280px] lg:sticky lg:top-24 h-fit flex-col gap-4 md:gap-6 items-start justify-start pl-8 pr-8 shrink-0">
            <DrugSend />
            <DrugInquiry />
          </div>
        </div>
      </div>
      <LicenseSlider />
      <FaqBottom />
    </div>
  )
}
