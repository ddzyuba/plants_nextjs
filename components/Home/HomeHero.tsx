import Image from 'next/image';
import { gql, useQuery } from '@apollo/client';
import styles from '../../styles/HomeHero.module.css';
import Link from 'next/link';

const GET_HOME_HERO = gql`
  query HomeHero {
    homePage {
      data {
        attributes {
          title
          heroHome {
            smallText
            titleBlack
            titleGreen
            text
            button {
              text
              url
            }
            image {
              data {
                attributes {
                  url
                  name
                }
              }
            }
          }
        }
      }
    }
  }
`;

const HomeHero = (): JSX.Element => {
  const { loading, error, data } = useQuery(GET_HOME_HERO);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  return (
    <section className={styles.HomeHero}>
      <div className={styles.col2}>
        <Image
          src={`http://localhost:1337${data.homePage.data.attributes.heroHome.image.data.attributes.url}`}
          alt={data.homePage.data.attributes.heroHome.image.data.attributes.name}
          className={styles.imgLg}
          fill
        />
      </div>
      <div className={styles.col1}>
        <div className={styles.col1Wrapper}>
          <div className={styles.col1WrapperInner}>
            <p className={styles.smallText}>
              <Image
                src='/home-hero-small-icon.svg'
                alt={'icon'}
                className={styles.smallImg}
                width={24}
                height={24}
              />
              {data.homePage.data.attributes.heroHome.smallText}
            </p>
            <h1 className={styles.heading}>
              <span>{data.homePage.data.attributes.heroHome.titleBlack} </span>
              <span className={styles.headingGreen}>{data.homePage.data.attributes.heroHome.titleGreen}</span>
            </h1>
            <p className={styles.heroText}>{data.homePage.data.attributes.heroHome.text}</p>
            <div className={styles.buttonWrapper}>
              <Link
                href={data.homePage.data.attributes.heroHome.button.url}
                className="cta-btn"
              >{data.homePage.data.attributes.heroHome.button.text}</Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HomeHero;