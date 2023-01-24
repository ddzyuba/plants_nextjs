import { ServiceListData } from './ServiceListTypes';
import { LeftImageRightTextData } from './LeftImageRightTextTypes';
import { WhyChooseUsData } from './WhyChooseUsTypes';
import { WorkingProcessData } from './WorkingProcessTypes';
import { StaffData } from './StaffTypes';
import { TestimonialsData } from './TestimonialsTypes';
import { FaqData } from './FaqTypes';

export type HomeHeroProps = {
  data: HomeHeroData;
}

export type HomeHeroData = {
  homePage: {
    data: {
      attributes: {
        heroHome: {
          image: {
            data: {
              attributes: {
                name: string;
                url: string;
              }
            }
          }
          smallText: string;
          titleBlack: string;
          titleGreen: string;
          text: string;
          button: {
            text: string;
            url: string;
          }
        }
      }
    }
  }
}

export type HomePageProps = {
  homeHeroData: HomeHeroData;
  serviceListData: ServiceListData;
  leftImageRightTextData: LeftImageRightTextData;
  whyChooseUsData: WhyChooseUsData;
  workingProcessData: WorkingProcessData;
  staffData: StaffData;
  testimonialsData: TestimonialsData;
  faqData: FaqData;
}