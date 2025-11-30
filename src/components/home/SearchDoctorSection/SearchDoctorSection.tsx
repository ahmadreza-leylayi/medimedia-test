import SearchDoctorForm from './SearchDoctorForm';
import { WhyMedimedia } from './WhyMedimedia';
import SliderBottom from '../sliders/SliderBottom';
import OnlineServiceMobile from './OnlineServiceMobile';
import { RequestService } from './RequestService';

function SearchDoctorSection() {
  return (
    <div className="w-full">
      <SearchDoctorForm />
      <WhyMedimedia />
      <OnlineServiceMobile />
      <SliderBottom />  
      <RequestService />
    </div>
  );
}

export default SearchDoctorSection;