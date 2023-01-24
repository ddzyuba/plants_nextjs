import { gql, useQuery } from '@apollo/client';
import Image from 'next/image';
import Link from 'next/link';
import styles from '../styles/Staff.module.css';

type ComponentLayoutStaff = {
  __typename: string;
  titleBlack: string;
  titleGreen: string;
  text: string;
  button: {
    text: string;
    url: string;
  }
  employees: {
    data: Employee[];
  }
}

type Employee = {
  attributes: {
    name: string;
    job: string;
    facebook: string;
    twitter: string;
    linkedin: string;
    image: {
      data: {
        attributes: {
          name: string;
          url: string;
        }
      }
    }
  }
}

const GET_STAFF = gql`
  query Staff {
    homePage {
      data {
        attributes {
          dynamicZone {
            ...on ComponentLayoutStaff {
              titleBlack
              titleGreen
              text
              button {
                text
                url
              }
              employees {
                data {
                  attributes {
                    name
                    job
                    image {
                      data {
                        attributes {
                          name
                          url
                        }
                      }
                    }
                    facebook
                    twitter
                    linkedin
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

const Staff = (): JSX.Element => {
  const { loading, error, data } = useQuery(GET_STAFF);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  return (
    <div className={styles.staff}>
      <div className='side-padding'>
        <div className='container'>
          {data.homePage.data.attributes.dynamicZone.map((item: ComponentLayoutStaff) => {
            if (item.__typename === 'ComponentLayoutStaff') {
              return (
                <div key="ComponentLayoutStaff">
                  <h2 className={styles.heading}>
                    <span>{item.titleBlack} </span>
                    <span className={styles.headingGreen}>{item.titleGreen}</span>
                  </h2>
                  <div className={styles.wrapperTop}>
                    <p className={styles.text}>{item.text}</p>
                    <Link href={item.button.url} className={styles.ctaButton}>{item.button.text}</Link>
                  </div>
                  <div className={styles.people}>
                    {item.employees.data.map((el: Employee, i: number) => (
                      <div key={i} className={styles.person}>
                        <Image
                          src={`${process.env.NEXT_PUBLIC_STRAPI_CMS_URL}${el.attributes.image.data.attributes.url}`}
                          alt={el.attributes.image.data.attributes.name}
                          className={styles.image}
                          fill
                        />
                        <div className={styles.personInfo}>
                          <div className={styles.personInfoWrapper}>
                            <div className={styles.personInfoWrapperInner}>
                              <p className={styles.personName}>{el.attributes.name}</p>
                              <p className={styles.personJob}>{el.attributes.job}</p>
                              <div className={styles.links}>
                                <Link href={el.attributes.facebook} target="_blank">
                                  <Image
                                    src="/facebook.svg"
                                    alt="Facebook icon"
                                    width={30}
                                    height={30}
                                  />
                                </Link>
                                <Link href={el.attributes.twitter} target="_blank">
                                  <Image
                                    src="/twitter.svg"
                                    alt="Twitter icon"
                                    width={30}
                                    height={30}
                                  />
                                </Link>
                                <Link href={el.attributes.linkedin} target="_blank">
                                  <Image
                                    src="/linkedin.svg"
                                    alt="Linkedin icon"
                                    width={30}
                                    height={30}
                                  />
                                </Link>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
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

export default Staff;