import { StaffData } from './StaffTypes';
import { HeaderMenuData } from './HeaderMenuTypes';
import { BrandsData } from './BrandsTypes';
import { GetQuoteData } from './GetQuoteTypes';
import { FooterMenuData } from './FooterMenuTypes';

export type AboutHeroProps = {
  data: AboutHeroData;
}

export type AboutHeroData = {
  aboutUsPage: {
    data: {
      attributes: {
        title: string;
      }
    }
  }
}

export type LeftImageRightTextProps = {
  data: LeftImageRightTextData;
}

export type LeftImageRightTextData = {
  aboutUsPage: {
    data: {
      attributes: {
        leftImageRightText: {
          titleGreen: string;
          titleBlack: string;
          text: string;
          smallDetails: SmallDetail[];
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

export type SmallDetail = {
  text: string;
  image: {
    data: {
      attributes: UploadFile;
    }
  }
}

export type UploadFile = {
  name: string;
  url: string;
}

export type ContentProps = {
  data: ContentData;
}

export type ContentData = {
  aboutUsPage: {
    data: {
      attributes: {
        content: string;
      }
    }
  }
}

export type Skill = {
  skillName: string;
  skillPercentage: number;
}

export type SkillProps = {
  data: SkillData;
}

export type SkillData = {
  aboutUsPage: {
    data: {
      attributes: {
        skills: {
          heading: string;
          text: string;
          skillDetails: Skill[];
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

export type AboutPageProps = {
  aboutHeroData: AboutHeroData;
  staffData: StaffData;
  headerMenuData: HeaderMenuData;
  brandsData: BrandsData;
  quoteData: GetQuoteData;
  footerMenuData: FooterMenuData;
  leftImageRightTextData: LeftImageRightTextData;
  contentData: ContentData;
  skillsData: SkillData;
}