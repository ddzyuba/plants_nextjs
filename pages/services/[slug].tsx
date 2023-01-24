import ServiceHero from '../../components/Services/ServiceHero';
import Content from '../../components/Services/Content';
import WorkingProcess, { getWorkingProcessData } from '../../components/WorkingProcess';
import styles from '../../styles/Service.module.css';

import {
  ServiceProps,
  ServicePropsData,
  StaticProps
} from '../../components/types/SingleServicePageTypes';

const Service = ({ data, workingProcessData }: ServiceProps) => {
  return (
    <div>
      <ServiceHero title={data.data[0].attributes.title} />
      <div className={styles.serviceContainer}>
        <Content content={data.data[0].attributes.content} />
      </div>
      <WorkingProcess data={workingProcessData} />
    </div>
  );
}

export default Service;

// This function gets called at build time
export async function getStaticPaths() {
  // Call an external API endpoint to get posts
  const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_CMS_URL}/api/services`);
  const services = await res.json();

  // Get the paths we want to pre-render based on posts
  const paths = services.data.map((services: ServicePropsData) => ({
    params: { slug: services.attributes.slug },
  }))

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: false }
}

export async function getStaticProps({ params }: StaticProps) {

  const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_CMS_URL}/api/services?filters[slug][$eq]=${params.slug}`)
  const data = await res.json();

  const workingProcessData = await getWorkingProcessData();

  return {
    props: {
      data: data,
      workingProcessData: workingProcessData,
    },
  }
}