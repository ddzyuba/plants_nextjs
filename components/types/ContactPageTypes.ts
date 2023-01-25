import { HeaderMenuData } from './HeaderMenuTypes';
import { BrandsData } from './BrandsTypes';
import { GetQuoteData } from './GetQuoteTypes';
import { FooterMenuData } from './FooterMenuTypes';

export type ContactPageProps = {
  headerMenuData: HeaderMenuData;
  brandsData: BrandsData;
  quoteData: GetQuoteData;
  footerMenuData: FooterMenuData;
}

export type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
};