import { ServiceListData } from './ServiceListTypes';
import { WhyChooseUsData } from './WhyChooseUsTypes';
import { WorkingProcessData } from './WorkingProcessTypes';
import { StaffData } from './StaffTypes';
import { HeaderMenuData } from './HeaderMenuTypes';
import { BrandsData } from './BrandsTypes';
import { GetQuoteData } from './GetQuoteTypes';
import { FooterMenuData } from './FooterMenuTypes';

export type ServicesHeroProps = {
  data: ServicesHeroData;
}

export type ServicesHeroData = {
  servicesPage: {
    data: {
      attributes: {
        title: string;
      }
    }
  }
}

export type ServicesPageProps = {
  serviceListData: ServiceListData;
  whyChooseUsData: WhyChooseUsData;
  workingProcessData: WorkingProcessData;
  staffData: StaffData;
  headerMenuData: HeaderMenuData;
  brandsData: BrandsData;
  quoteData: GetQuoteData;
  footerMenuData: FooterMenuData;
  servicesHeroData: ServicesHeroData;
}