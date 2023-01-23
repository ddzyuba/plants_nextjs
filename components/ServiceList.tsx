import { gql, useQuery } from '@apollo/client';
import Image from 'next/image';
import Link from 'next/link';
import styles from '../styles/ServiceList.module.css';

type ComponentLayoutServices = {
  __typename: string;
  titleBlack: string;
  titleGreen: string;
  text: string;
  services: { data: ComponentLayoutServicesData[] }
}

type ComponentLayoutServicesData = {
  attributes: ComponentLayoutServicesAttributes;
}

type ComponentLayoutServicesAttributes = {
  excerpt: string;
  slug: string;
  title: string;
  icon1: {
    data: {
      attributes: UploadFile
    }
  }
  icon2: {
    data: {
      attributes: UploadFile
    }
  }
}

type UploadFile = {
  name: string;
  url: string;
}

const GET_SERVICES_LIST = gql`
  query ServiceList {
    homePage {
      data {
        attributes {
          dynamicZone {
            ...on ComponentLayoutServices {
              titleBlack
              titleGreen
              text
              services {
                data {
                  attributes {
                    title
                    excerpt
                    slug
                    icon1 {
                      data {
                        attributes {
                          url
                          name
                        }
                      }
                    }
                    icon2 {
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
        }
      }
    }
  }
`;

const ServiceList = (): JSX.Element => {
  const { loading, error, data } = useQuery(GET_SERVICES_LIST);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  return (
    <section className={styles.serviceList}>
      <div className='side-padding'>
        <div className='container'>
          {data.homePage.data.attributes.dynamicZone.map((item: ComponentLayoutServices) => {
            if (item.__typename === 'ComponentLayoutServices') {
              return (
                <div key='ComponentLayoutServices'>
                  <div className={styles.wrapperTop}>
                    <h2 className={styles.heading}>
                      <span>{item.titleBlack} </span>
                      <span className={styles.headingGreen}>{item.titleGreen}</span>
                    </h2>
                    <p className={styles.text}>{item.text}</p>
                  </div>
                  <div className={styles.listWrapper}>
                    {item.services.data.map((el: ComponentLayoutServicesData) => {
                      return (
                        <Link
                          href={`services/${el.attributes.slug}`}
                          key={el.attributes.slug}
                          className={styles.listItem}
                        >
                          <div className={styles.listItemWrapper}>
                            <div className={styles.col1}>
                              <Image
                                src={`http://localhost:1337${el.attributes.icon1.data.attributes.url}`}
                                alt={el.attributes.icon1.data.attributes.name}
                                className={styles.itemImg1}
                                width={70}
                                height={70}
                              />
                              <Image
                                src={`http://localhost:1337${el.attributes.icon2.data.attributes.url}`}
                                alt={el.attributes.icon1.data.attributes.name}
                                className={styles.itemImg2}
                                width={70}
                                height={70}
                              />
                            </div>
                            <div className={styles.col2}>
                              <p className={styles.itemTitle}>{el.attributes.title}</p>
                              <p className={styles.itemText}>{el.attributes.excerpt}</p>
                            </div>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              );
            }
          })}
        </div>
      </div>
    </section>
  );
}

export default ServiceList;