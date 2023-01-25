import { gql } from '@apollo/client';
import client from '../../lib/apolloClient';
import styles from '../../styles/AboutHero.module.css';

import { AboutHeroProps } from '../../components/types/AboutPageTypes';

const GET_ABOUT_HERO = gql`
  query AboutPageHero {
    aboutUsPage {
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

export async function getAboutHeroData() {
  const { data } = await client.query({
    query: GET_ABOUT_HERO,
  });

  return data;
}

const AboutHero = ({ data }: AboutHeroProps) => {
  return (
    <div className={styles.aboutHero}>
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <h1 className={styles.heading}>{data.aboutUsPage.data.attributes.title}</h1>
        </div>
      </div>
    </div>
  );
}

export default AboutHero;