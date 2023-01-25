import { gql } from '@apollo/client';
import client from '../../lib/apolloClient';
import styles from '../../styles/AboutHero.module.css';

import { ServicesHeroProps } from '../../components/types/ServicesPageTypes';

const GET_SERVICES_HERO = gql`
  query ServicesPageHero {
    servicesPage {
      data {
        attributes {
          title
          heroImage {
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
`;

export async function getServicesHeroData() {
  const { data } = await client.query({
    query: GET_SERVICES_HERO,
  });

  return data;
}

const ServicesHero = ({ data }: ServicesHeroProps) => {
  return (
    <div className={styles.aboutHero}>
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <h1 className={styles.heading}>{data.servicesPage.data.attributes.title}</h1>
        </div>
      </div>
    </div>
  );
}

export default ServicesHero;