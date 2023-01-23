import { gql, useQuery } from '@apollo/client';
import Image from 'next/image';
import styles from '../styles/WorkingProcess.module.css';

type ComponentLayoutWorkingProcess = {
  __typename: string;
  titleBlack: string;
  titleGreen: string;
  text: string;
  process: Process[];
}

type Process = {
  title: string;
  text: string;
  icon1: {
    data: {
      attributes: {
        name: string;
        url: string;
      }
    }
  }
  icon2: {
    data: {
      attributes: {
        name: string;
        url: string;
      }
    }
  }
}

const GET_HOME_WORKING_PROCESS = gql`
  query HomeWorkingProcess {
    homePage {
      data {
        attributes {
          dynamicZone {
            ...on ComponentLayoutWorkingProcess {
              titleBlack
              titleGreen
              text
              process {
                title
                text
                icon1 {
                  data {
                    attributes {
                      name
                      url
                    }
                  }
                }
                icon2 {
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
  }
`;

const WorkingProcess = (): JSX.Element => {
  const { loading, error, data } = useQuery(GET_HOME_WORKING_PROCESS);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  return (
    <div className={styles.wp}>
      <div className='side-padding'>
        <div className='container'>
          {data.homePage.data.attributes.dynamicZone.map((item: ComponentLayoutWorkingProcess) => {
            if (item.__typename === 'ComponentLayoutWorkingProcess') {
              return (
                <div key="ComponentLayoutWorkingProcess">
                  <div className={styles.wrapperTop}>
                    <h2 className={styles.heading}>
                      <span>{item.titleBlack} </span>
                      <span className={styles.headingGreen}>{item.titleGreen}</span>
                    </h2>
                    <p className={styles.text}>{item.text}</p>
                  </div>
                  <div className={styles.list}>
                    {item.process.map((el: Process, i: number) => (
                      <div key={i} className={styles.listItem}>
                        <div className={styles.listItemTop}>
                          <Image
                            src={`http://localhost:1337${el.icon1.data.attributes.url}`}
                            alt={el.icon1.data.attributes.name}
                            className={styles.listItemImg1}
                            width={70}
                            height={70}
                          />
                          <Image
                            src={`http://localhost:1337${el.icon2.data.attributes.url}`}
                            alt={el.icon1.data.attributes.name}
                            className={styles.listItemImg2}
                            width={70}
                            height={70}
                          />
                          <span className={styles.listItemNumber}>{i + 1}</span>
                        </div>
                        <p className={styles.listItemTitle}>{el.title}</p>
                        <p className={styles.listItemText}>{el.text}</p>
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

export default WorkingProcess;