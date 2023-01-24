import { gql, useQuery } from '@apollo/client';
import Image from 'next/image';
import styles from '../../styles/ProjectsBanner.module.css';

const GET_BANNER = gql`
  query GetProjectsPage {
    projectsPage {
      data {
        attributes {
          Banner {
            headingBlack
            headingGreen
            button {
              text
              url
            }
            image {
              data {
                attributes {
                  name
                  url
                }
              }
            }
          }
        }
      }
    }
  }
`;

const ProjectsBanner = () => {
  const { loading, error, data } = useQuery(GET_BANNER);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  return (
    <div className={styles.banner}>
      <div className={styles.col1}>
        <div className={styles.col1Wrapper}>
          <h2 className={styles.heading}>
            <span>{data.projectsPage.data.attributes.Banner.headingBlack} </span>
            <span className={styles.headingGreen}>{data.projectsPage.data.attributes.Banner.headingGreen}</span>
          </h2>
          <div className={styles.ctaWrapper}>
            <a
              className='cta-btn'
              href={data.projectsPage.data.attributes.Banner.button.url}
            >
              {data.projectsPage.data.attributes.Banner.button.text}
            </a>
          </div>
        </div>
      </div>
      <div className={styles.col2}>
        <Image
          src={`${process.env.NEXT_PUBLIC_STRAPI_CMS_URL}${data.projectsPage.data.attributes.Banner.image.data.attributes.url}`}
          alt={data.projectsPage.data.attributes.Banner.image.data.attributes.name}
          className={styles.image}
          width={962}
          height={431}
        />
      </div>
    </div>
  );
};

export default ProjectsBanner;
