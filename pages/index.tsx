import type { NextPage } from 'next';
import Head from 'next/head';
import MobileMenu from "../components/MobileMenu";
import HeaderMenu, { getHeaderMenuData } from "../components/HeaderMenu";
import HomeHero, { getHomeHeroData } from '../components/Home/HomeHero';
import ServiceList, { getServiceListData } from '../components/ServiceList';
import LeftImageRightText, { getLeftImageRightTextData } from '../components/LeftImageRightText';
import WhyChooseUs, { getWhyChooseUsData } from '../components/WhyChooseUs';
import WorkingProcess, { getWorkingProcessData } from '../components/WorkingProcess';
import Staff, { getStaffData } from '../components/Staff';
import Testimonials, { getTestimonialsData } from '../components/Testimonials';
import Faq, { getFaqData } from '../components/Faq';
import Brands, { getBrandsData } from '../components/Brands';
import GetQuote, { getQuoteData } from '../components/GetQuote';
import FooterMenu, { getFooterMenuData } from '../components/FooterMenu';

import { HomePageProps } from '../components/types/HomeTypes';

const Home: NextPage<HomePageProps> = ({
  headerMenuData,
  homeHeroData,
  serviceListData,
  leftImageRightTextData,
  whyChooseUsData,
  workingProcessData,
  staffData,
  testimonialsData,
  faqData,
  brandsData,
  quoteData,
  footerMenuData
}) => {
  return (
    <div>
      <Head>
        <title>Plants</title>
        <meta name="description" content="Plants" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <HeaderMenu data={headerMenuData} />
      <HomeHero data={homeHeroData} />
      <ServiceList data={serviceListData} />
      <LeftImageRightText data={leftImageRightTextData} />
      <WhyChooseUs data={whyChooseUsData} />
      <WorkingProcess data={workingProcessData} />
      <Staff data={staffData} />
      <Testimonials data={testimonialsData} />
      <Faq data={faqData} />
      <Brands data={brandsData} />
      <GetQuote data={quoteData} />
      <FooterMenu data={footerMenuData} />
      <MobileMenu data={headerMenuData} />
    </div>
  );
}

export default Home;

export async function getStaticProps() {
  const headerMenuData = await getHeaderMenuData();
  const homeHeroData = await getHomeHeroData();
  const serviceListData = await getServiceListData();
  const leftImageRightTextData = await getLeftImageRightTextData();
  const whyChooseUsData = await getWhyChooseUsData();
  const workingProcessData = await getWorkingProcessData();
  const staffData = await getStaffData();
  const testimonialsData = await getTestimonialsData();
  const faqData = await getFaqData();
  const brandsData = await getBrandsData();
  const quoteData = await getQuoteData();
  const footerMenuData = await getFooterMenuData();

  return {
    props: {
      headerMenuData: headerMenuData,
      homeHeroData: homeHeroData,
      serviceListData: serviceListData,
      leftImageRightTextData: leftImageRightTextData,
      whyChooseUsData: whyChooseUsData,
      workingProcessData: workingProcessData,
      staffData: staffData,
      testimonialsData: testimonialsData,
      faqData: faqData,
      brandsData: brandsData,
      quoteData: quoteData,
      footerMenuData: footerMenuData
    },
    revalidate: 10,
  }
}

