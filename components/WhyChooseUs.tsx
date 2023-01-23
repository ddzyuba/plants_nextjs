import { gql, useQuery } from '@apollo/client';
import Image from 'next/image';
import Link from 'next/link';
import styles from '../styles/WhyChooseUs.module.css';

type ComponentLayoutWhyChooseUs = {
  __typename: string;
  heading: string;
  text: string;
  button: {
    text: string;
    url: string;
  }
  textList: TextItem[];
  image: {
    data: {
      attributes: {
        name: string;
        url: string;
      }
    }
  }
}

type TextItem = {
  text: string;
}

const GET_HOME_WHY_CHOOSE_US = gql`
  query HomeWhyChooseUs {
    homePage {
      data {
        attributes {
          dynamicZone {
            ...on ComponentLayoutWhyChooseUs {
              heading
              text
              textList {
                text
              }
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
  }
`;

const WhyChooseUs = (): JSX.Element => {
  const { loading, error, data } = useQuery(GET_HOME_WHY_CHOOSE_US);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  return (
    <div className={styles.wcu}>
      <div className='side-padding'>
        <div className='container'>
          {data.homePage.data.attributes.dynamicZone.map((item: ComponentLayoutWhyChooseUs) => {
            if (item.__typename === 'ComponentLayoutWhyChooseUs') {
              return (
                <div key="ComponentLayoutWhyChooseUs" className={styles.wrapper}>
                  <div className={styles.col2}>
                    <div className={styles.col2Wrapper}>
                      <Image
                        src={`http://localhost:1337${item.image.data.attributes.url}`}
                        alt={item.image.data.attributes.name}
                        className={styles.col2Img}
                        fill
                      />
                    </div>
                  </div>
                  <div className={styles.col1}>
                    <div className={styles.col1Wrapper}>
                      <h2 className={styles.heading}>{item.heading}</h2>
                      <p className={styles.text}>{item.text}</p>
                      <div className={styles.list}>
                        {item.textList.map((el: TextItem, i: number) => (
                          <div key={i} className={styles.listItem}>
                            <p className={styles.listItemText}>
                              <Image
                                src="/tick.png"
                                alt='Tick icon'
                                width={30}
                                height={30}
                                className={styles.listItemIcon}
                              />
                              {el.text}
                            </p>
                          </div>
                        ))}
                      </div>
                      <div className={styles.btnWrapper}>
                        <Link href={item.button.url} className="cta-btn">{item.button.text}</Link>
                      </div>
                    </div>
                  </div>
                </div>
              );
            }
          })}
        </div>
      </div>
    </div>
  );
}

export default WhyChooseUs;