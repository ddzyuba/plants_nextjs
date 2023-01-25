import { HeaderMenuData } from './HeaderMenuTypes';
import { ServiceListData } from './ServiceListTypes';
import { LeftImageRightTextData } from './LeftImageRightTextTypes';
import { WhyChooseUsData } from './WhyChooseUsTypes';
import { WorkingProcessData } from './WorkingProcessTypes';
import { StaffData } from './StaffTypes';
import { TestimonialsData } from './TestimonialsTypes';
import { FaqData } from './FaqTypes';
import { BrandsData } from './BrandsTypes';
import { GetQuoteData } from './GetQuoteTypes';
import { FooterMenuData } from './FooterMenuTypes';

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
  headerMenuData: HeaderMenuData;
  homeHeroData: HomeHeroData;
  serviceListData: ServiceListData;
  leftImageRightTextData: LeftImageRightTextData;
  whyChooseUsData: WhyChooseUsData;
  workingProcessData: WorkingProcessData;
  staffData: StaffData;
  testimonialsData: TestimonialsData;
  faqData: FaqData;
  brandsData: BrandsData;
  quoteData: GetQuoteData;
  footerMenuData: FooterMenuData;
}