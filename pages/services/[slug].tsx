import MobileMenu from "../../components/MobileMenu";
import HeaderMenu, { getHeaderMenuData } from "../../components/HeaderMenu";
import ServiceHero from '../../components/Services/ServiceHero';
import Content from '../../components/Services/Content';
import WorkingProcess, { getWorkingProcessData } from '../../components/WorkingProcess';
import Brands, { getBrandsData } from '../../components/Brands';
import GetQuote, { getQuoteData } from '../../components/GetQuote';
import FooterMenu, { getFooterMenuData } from '../../components/FooterMenu';
import styles from '../../styles/Service.module.css';

import {
  ServiceProps,
  ServicePropsData,
  StaticProps
} from '../../components/types/SingleServicePageTypes';

const Service = ({
  data,
  workingProcessData,
  headerMenuData,
  brandsData,
  quoteData,
  footerMenuData
}: ServiceProps) => {
  return (
    <div>
      <HeaderMenu data={headerMenuData} />
      {data ? (
        <>
          <ServiceHero title={data.data[0].attributes.title} />
          <div className={styles.serviceContainer}>
            <Content content={data.data[0].attributes.content} />
          </div>
        </>
      ) : ''}
      <WorkingProcess data={workingProcessData} />
      <Brands data={brandsData} />
      <GetQuote data={quoteData} />
      <FooterMenu data={footerMenuData} />
      <MobileMenu data={headerMenuData} />
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

  let serviceData;
  if (data.data) {
    serviceData = data;
  } else {
    serviceData = false;
  }

  const workingProcessData = await getWorkingProcessData();
  const headerMenuData = await getHeaderMenuData();
  const brandsData = await getBrandsData();
  const quoteData = await getQuoteData();
  const footerMenuData = await getFooterMenuData();

  return {
    props: {
      data: serviceData,
      workingProcessData: workingProcessData,
      headerMenuData: headerMenuData,
      brandsData: brandsData,
      quoteData: quoteData,
      footerMenuData: footerMenuData
    },
    revalidate: 10,
  }
}