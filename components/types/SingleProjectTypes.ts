import { HeaderMenuData } from './HeaderMenuTypes';
import { BrandsData } from './BrandsTypes';
import { GetQuoteData } from './GetQuoteTypes';
import { FooterMenuData } from './FooterMenuTypes';

export type ProjectProps = {
  data: {
    data: ProjectPropsData[];
  };
  relatedProjects: {
    data: ProjectPropsData[];
  };
  headerMenuData: HeaderMenuData;
  brandsData: BrandsData;
  quoteData: GetQuoteData;
  footerMenuData: FooterMenuData;
}

export type ProjectPropsData = {
  id: number;
  attributes: {
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    client: string;
    location: string;
    start_date: string;
    end_date: string;
    price: number;
    tags: {
      data: TagData[];
    }
    image: {
      data: {
        attributes: {
          name: string;
          url: string;
        }
      }
    }
  }
}

export type TagData = {
  attributes: {
    slug: string;
  }
}

export type StaticProps = {
  params: {
    slug: string;
  }
}