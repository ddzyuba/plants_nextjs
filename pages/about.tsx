import type { NextPage } from 'next';
import Head from 'next/head';
import AboutHero from '../components/About/AboutHero';
import LeftImageRightText from '../components/About/LeftImageRightText';
import Content from '../components/About/Content';
import Skills from '../components/About/Skills';
import Staff, { getStaffData } from '../components/Staff';

import { AboutPageProps } from '../components/types/AboutPageTypes';

const About: NextPage<AboutPageProps> = ({ staffData }) => {
  return (
    <div>
      <Head>
        <title>About Us</title>
        <meta name="description" content="Plants" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AboutHero />
      <LeftImageRightText />
      <Content />
      <Skills />
      <Staff data={staffData} />
    </div>
  );
}

export default About;

export async function getStaticProps() {
  const staffData = await getStaffData();

  return {
    props: {
      staffData: staffData,
    }
  }
} 
