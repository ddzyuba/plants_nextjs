import type { NextPage } from 'next';
import Head from 'next/head';
import MobileMenu from "../components/MobileMenu";
import HeaderMenu, { getHeaderMenuData } from "../components/HeaderMenu";
import AboutHero, { getAboutHeroData } from '../components/About/AboutHero';
import LeftImageRightText, { getLeftImageRightTextData } from '../components/About/LeftImageRightText';
import Content, { getContentData } from '../components/About/Content';
import Skills, { getSkillsData } from '../components/About/Skills';
import Staff, { getStaffData } from '../components/Staff';
import Brands, { getBrandsData } from '../components/Brands';
import GetQuote, { getQuoteData } from '../components/GetQuote';
import FooterMenu, { getFooterMenuData } from '../components/FooterMenu';

import { AboutPageProps } from '../components/types/AboutPageTypes';

const About: NextPage<AboutPageProps> = ({
  aboutHeroData,
  staffData,
  headerMenuData,
  brandsData,
  quoteData,
  footerMenuData,
  leftImageRightTextData,
  contentData,
  skillsData
}) => {
  return (
    <div>
      <Head>
        <title>About Us</title>
        <meta name="description" content="Plants" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <HeaderMenu data={headerMenuData} />
      <AboutHero data={aboutHeroData} />
      <LeftImageRightText data={leftImageRightTextData} />
      <Content data={contentData} />
      <Skills data={skillsData} />
      <Staff data={staffData} />
      <Brands data={brandsData} />
      <GetQuote data={quoteData} />
      <FooterMenu data={footerMenuData} />
      <MobileMenu data={headerMenuData} />
    </div>
  );
}

export default About;

export async function getStaticProps() {
  const staffData = await getStaffData();
  const headerMenuData = await getHeaderMenuData();
  const brandsData = await getBrandsData();
  const quoteData = await getQuoteData();
  const footerMenuData = await getFooterMenuData();
  const aboutHeroData = await getAboutHeroData();
  const leftImageRightTextData = await getLeftImageRightTextData();
  const contentData = await getContentData();
  const skillsData = await getSkillsData();

  return {
    props: {
      aboutHeroData: aboutHeroData,
      staffData: staffData,
      headerMenuData: headerMenuData,
      brandsData: brandsData,
      quoteData: quoteData,
      footerMenuData: footerMenuData,
      leftImageRightTextData: leftImageRightTextData,
      contentData: contentData,
      skillsData: skillsData
    },
    revalidate: 10,
  }
} 
