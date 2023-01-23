import type { NextPage } from 'next';
import Head from 'next/head';
import ProjectsHero from '../components/Projects/ProjectsHero';
import ProjectsSection from '../components/Projects/ProjectsSection';
import ProjectsBanner from '../components/Projects/ProjectsBanner';

const Projects: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Projects</title>
        <meta name="description" content="Plants" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ProjectsHero />
      <ProjectsSection />
      <ProjectsBanner />
    </div>
  );
}

export default Projects;