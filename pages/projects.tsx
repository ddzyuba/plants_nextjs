import type { NextPage } from 'next';
import Head from 'next/head';
import MobileMenu from "../components/MobileMenu";
import HeaderMenu, { getHeaderMenuData } from "../components/HeaderMenu";
import ProjectsHero, { getProjectsHeroData } from '../components/Projects/ProjectsHero';
import ProjectsSection from '../components/Projects/ProjectsSection';
import ProjectsBanner, { getProjectsBannerData } from '../components/Projects/ProjectsBanner';
import Brands, { getBrandsData } from '../components/Brands';
import GetQuote, { getQuoteData } from '../components/GetQuote';
import FooterMenu, { getFooterMenuData } from '../components/FooterMenu';
import { ProjectsPageProps } from '../components/types/ProjectsPageTypes';

const Projects: NextPage<ProjectsPageProps> = ({
  headerMenuData,
  brandsData,
  quoteData,
  footerMenuData,
  projectsHeroData,
  projectsBannerData
}) => {
  return (
    <div>
      <Head>
        <title>Projects</title>
        <meta name="description" content="Plants" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <HeaderMenu data={headerMenuData} />
      <ProjectsHero data={projectsHeroData} />
      <ProjectsSection />
      <ProjectsBanner data={projectsBannerData} />
      <Brands data={brandsData} />
      <GetQuote data={quoteData} />
      <FooterMenu data={footerMenuData} />
      <MobileMenu data={headerMenuData} />
    </div>
  );
}

export default Projects;

export async function getStaticProps() {
  const headerMenuData = await getHeaderMenuData();
  const brandsData = await getBrandsData();
  const quoteData = await getQuoteData();
  const footerMenuData = await getFooterMenuData();
  const projectsHeroData = await getProjectsHeroData();
  const projectsBannerData = await getProjectsBannerData();

  return {
    props: {
      headerMenuData: headerMenuData,
      brandsData: brandsData,
      quoteData: quoteData,
      footerMenuData: footerMenuData,
      projectsHeroData: projectsHeroData,
      projectsBannerData: projectsBannerData
    },
    revalidate: 10,
  }
}