import type { NextPage } from 'next';
import Head from 'next/head';
import ServicesHero from '../components/Services/ServicesHero';
import ServiceList, { getServiceListData } from '../components/ServiceList';
import WhyChooseUs, { getWhyChooseUsData } from '../components/WhyChooseUs';
import WorkingProcess, { getWorkingProcessData } from '../components/WorkingProcess';
import Staff, { getStaffData } from '../components/Staff';

import { ServicesPageProps } from '../components/types/ServicesPageTypes';

const Services: NextPage<ServicesPageProps> = ({
  serviceListData,
  whyChooseUsData,
  workingProcessData,
  staffData
}) => {
  return (
    <div>
      <Head>
        <title>Services</title>
        <meta name="description" content="Plants" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ServicesHero />
      <ServiceList data={serviceListData} />
      <WhyChooseUs data={whyChooseUsData} />
      <WorkingProcess data={workingProcessData} />
      <Staff data={staffData} />
    </div>
  );
}

export default Services;

export async function getStaticProps() {
  const serviceListData = await getServiceListData();
  const whyChooseUsData = await getWhyChooseUsData();
  const workingProcessData = await getWorkingProcessData();
  const staffData = await getStaffData();

  return {
    props: {
      serviceListData: serviceListData,
      whyChooseUsData: whyChooseUsData,
      workingProcessData: workingProcessData,
      staffData: staffData,
    },
    revalidate: 10,
  }
}
