import type { NextPage } from 'next';
import Head from 'next/head';
import HomeHero from '../components/Home/HomeHero';
import ServiceList from '../components/ServiceList';
import LeftImageRightText from '../components/LeftImageRightText';
import WhyChooseUs from '../components/WhyChooseUs';
import WorkingProcess from '../components/WorkingProcess';
import Staff from '../components/Staff';
import Testimonials from '../components/Testimonials';
import Faq from '../components/Faq';

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Plants</title>
        <meta name="description" content="Plants" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <HomeHero />
      <ServiceList />
      <LeftImageRightText />
      <WhyChooseUs />
      <WorkingProcess />
      <Staff />
      <Testimonials />
      <Faq />
    </div>
  );
}

export default Home;
