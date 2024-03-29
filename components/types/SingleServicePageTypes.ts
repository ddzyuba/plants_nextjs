import { WorkingProcessData } from './WorkingProcessTypes';
import { HeaderMenuData } from './HeaderMenuTypes';
import { BrandsData } from './BrandsTypes';
import { GetQuoteData } from './GetQuoteTypes';
import { FooterMenuData } from './FooterMenuTypes';

export type ServiceProps = {
  data: {
    data: ServicePropsData[];
  };
  workingProcessData: WorkingProcessData;
  headerMenuData: HeaderMenuData;
  brandsData: BrandsData;
  quoteData: GetQuoteData;
  footerMenuData: FooterMenuData;
}

export type ServicePropsData = {
  id: number;
  attributes: {
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
  }
}

export type StaticProps = {
  params: {
    slug: string;
  }
}