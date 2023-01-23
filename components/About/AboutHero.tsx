import { gql, useQuery } from '@apollo/client';
import styles from '../../styles/AboutHero.module.css';

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

const AboutHero = () => {
  const { loading, error, data } = useQuery(GET_ABOUT_HERO);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

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