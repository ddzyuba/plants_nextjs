import type { NextPage } from 'next';
import Head from 'next/head';
import ServicesHero from '../components/Services/ServicesHero';
import ServiceList from '../components/ServiceList';
import WhyChooseUs from '../components/WhyChooseUs';
import WorkingProcess from '../components/WorkingProcess';
import Staff from '../components/Staff';

const Services: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Services</title>
        <meta name="description" content="Plants" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ServicesHero />
      <ServiceList />
      <WhyChooseUs />
      <WorkingProcess />
      <Staff />
    </div>
  );
}

export default Services;
