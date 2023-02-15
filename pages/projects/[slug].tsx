import MobileMenu from "../../components/MobileMenu";
import HeaderMenu, { getHeaderMenuData } from "../../components/HeaderMenu";
import ServiceHero from '../../components/Services/ServiceHero';
import Content from '../../components/Services/Content';
import RelatedProjects from '../../components/Projects/RelatedProjects';
import Brands, { getBrandsData } from '../../components/Brands';
import GetQuote, { getQuoteData } from '../../components/GetQuote';
import FooterMenu, { getFooterMenuData } from '../../components/FooterMenu';
import styles from '../../styles/Project.module.css';

import {
  ProjectProps,
  ProjectPropsData,
  StaticProps
} from '../../components/types/SingleProjectTypes';

const Project = ({
  data,
  relatedProjects,
  headerMenuData,
  brandsData,
  quoteData,
  footerMenuData
}: ProjectProps) => {

  return (
    <>
      <HeaderMenu data={headerMenuData} />
      {data ? (
        <>
          <ServiceHero title={data.data[0].attributes.title} />
          <div className='side-padding'>
            <div className='container'>
              <div className={styles.container}>
                <div className={styles.col1}>
                  <Content content={data.data[0].attributes.content} />
                </div>
                <div className={styles.col2}>
                  <div className={styles.info}>
                    <h4 className={styles.infoHeading}>Project information</h4>
                    <div className={styles.infoExcerpt}>{data.data[0].attributes.excerpt}</div>
                    <div className={styles.infoItem}>
                      <h5 className={styles.infoItemHeading}>Client</h5>
                      <div className={styles.infoItemText}>{data.data[0].attributes.client}</div>
                    </div>
                    <div className={styles.infoItem}>
                      <h5 className={styles.infoItemHeading}>Location</h5>
                      <div className={styles.infoItemText}>{data.data[0].attributes.location}</div>
                    </div>
                    <div className={styles.infoItem}>
                      <h5 className={styles.infoItemHeading}>Construction Date</h5>
                      <div className={styles.infoItemText}>{data.data[0].attributes.start_date}</div>
                    </div>
                    <div className={styles.infoItem}>
                      <h5 className={styles.infoItemHeading}>Completion Date</h5>
                      <div className={styles.infoItemText}>{data.data[0].attributes.end_date}</div>
                    </div>
                    <div className={styles.infoItem}>
                      <h5 className={styles.infoItemHeading}>Price</h5>
                      <div className={styles.infoItemText}>{`${data.data[0].attributes.price}$`}</div>
                    </div>
                  </div>
                </div>
              </div>
              <RelatedProjects relatedProjects={relatedProjects} />
            </div>
          </div>
        </>
      ) : ''}
      <Brands data={brandsData} />
      <GetQuote data={quoteData} />
      <FooterMenu data={footerMenuData} />
      <MobileMenu data={headerMenuData} />
    </>
  );
}

export default Project;

// This function gets called at build time
export async function getStaticPaths() {
  // Call an external API endpoint to get posts
  const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_CMS_URL}/api/projects`);
  const services = await res.json();

  // Get the paths we want to pre-render based on posts
  const paths = services.data.map((project: ProjectPropsData) => ({
    params: { slug: project.attributes.slug },
  }))

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: false }
}

export async function getStaticProps({ params }: StaticProps) {

  const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_CMS_URL}/api/projects?filters[slug][$eq]=${params.slug}&populate[0]=tags`)
  const data = await res.json();

  let projectData;
  if (data.data) {
    projectData = data;
  } else {
    projectData = false;
  }

  const res2 = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_CMS_URL}/api/projects?populate[0]=image&pagination[pageSize]=4&filters[tags][slug][$in]=${data.data[0].attributes.tags.data[0].attributes.slug}&filters[slug][$notIn]=${params.slug}`)
  const relatedProjects = await res2.json();

  let relatedProjectsData;
  if (relatedProjects.data) {
    relatedProjectsData = relatedProjects;
  } else {
    relatedProjectsData = false;
  }

  const headerMenuData = await getHeaderMenuData();
  const brandsData = await getBrandsData();
  const quoteData = await getQuoteData();
  const footerMenuData = await getFooterMenuData();

  return {
    props: {
      data: projectData,
      relatedProjects: relatedProjectsData,
      headerMenuData,
      brandsData,
      quoteData,
      footerMenuData
    },
    revalidate: 10,
  }
}