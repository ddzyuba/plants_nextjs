import type { NextPage } from 'next';
import Head from 'next/head';
import AboutHero from '../components/About/AboutHero';
import LeftImageRightText from '../components/About/LeftImageRightText';
import Content from '../components/About/Content';
import Skills from '../components/About/Skills';
import Staff from '../components/Staff';

const About: NextPage = () => {
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
      <Staff />
    </div>
  );
}

export default About;
