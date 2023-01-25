import type { NextPage } from 'next';
import Head from 'next/head';
import MobileMenu from "../components/MobileMenu";
import HeaderMenu, { getHeaderMenuData } from "../components/HeaderMenu";
import ServicesHero, { getServicesHeroData } from '../components/Services/ServicesHero';
import ServiceList, { getServiceListData } from '../components/ServiceList';
import WhyChooseUs, { getWhyChooseUsData } from '../components/WhyChooseUs';
import WorkingProcess, { getWorkingProcessData } from '../components/WorkingProcess';
import Staff, { getStaffData } from '../components/Staff';
import Brands, { getBrandsData } from '../components/Brands';
import GetQuote, { getQuoteData } from '../components/GetQuote';
import FooterMenu, { getFooterMenuData } from '../components/FooterMenu';

import { ServicesPageProps } from '../components/types/ServicesPageTypes';

const Services: NextPage<ServicesPageProps> = ({
  serviceListData,
  whyChooseUsData,
  workingProcessData,
  staffData,
  headerMenuData,
  brandsData,
  quoteData,
  footerMenuData,
  servicesHeroData
}) => {
  return (
    <div>
      <Head>
        <title>Services</title>
        <meta name="description" content="Plants" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <HeaderMenu data={headerMenuData} />
      <ServicesHero data={servicesHeroData} />
      <ServiceList data={serviceListData} />
      <WhyChooseUs data={whyChooseUsData} />
      <WorkingProcess data={workingProcessData} />
      <Staff data={staffData} />
      <Brands data={brandsData} />
      <GetQuote data={quoteData} />
      <FooterMenu data={footerMenuData} />
      <MobileMenu data={headerMenuData} />
    </div>
  );
}

export default Services;

export async function getStaticProps() {
  const serviceListData = await getServiceListData();
  const whyChooseUsData = await getWhyChooseUsData();
  const workingProcessData = await getWorkingProcessData();
  const staffData = await getStaffData();
  const headerMenuData = await getHeaderMenuData();
  const brandsData = await getBrandsData();
  const quoteData = await getQuoteData();
  const footerMenuData = await getFooterMenuData();
  const servicesHeroData = await getServicesHeroData();

  return {
    props: {
      serviceListData: serviceListData,
      whyChooseUsData: whyChooseUsData,
      workingProcessData: workingProcessData,
      staffData: staffData,
      headerMenuData: headerMenuData,
      brandsData: brandsData,
      quoteData: quoteData,
      footerMenuData: footerMenuData,
      servicesHeroData: servicesHeroData
    },
    revalidate: 10,
  }
}
