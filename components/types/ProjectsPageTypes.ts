import { HeaderMenuData } from './HeaderMenuTypes';
import { BrandsData } from './BrandsTypes';
import { GetQuoteData } from './GetQuoteTypes';
import { FooterMenuData } from './FooterMenuTypes';

export type ProjectsHeroProps = {
  data: ProjectsHeroData;
}

export type ProjectsHeroData = {
  projectsPage: {
    data: {
      attributes: {
        title: string;
      }
    }
  }
}

export type ProjectsBannerProps = {
  data: ProjectsBannerData;
}

type ProjectsBannerData = {
  projectsPage: {
    data: {
      attributes: {
        Banner: {
          headingBlack: string;
          headingGreen: string;
          button: {
            text: string;
            url: string;
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
    }
  }
}

export type ProjectsPageProps = {
  headerMenuData: HeaderMenuData;
  brandsData: BrandsData;
  quoteData: GetQuoteData;
  footerMenuData: FooterMenuData;
  projectsHeroData: ProjectsHeroData;
  projectsBannerData: ProjectsBannerData;
}