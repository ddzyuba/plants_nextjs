import { gql } from '@apollo/client';
import Image from 'next/image';
import styles from '../styles/WorkingProcess.module.css';

import client from '../lib/apolloClient';

import {
  WorkingProcessProps,
  ComponentLayoutWorkingProcess,
  Process
} from '../components/types/WorkingProcessTypes';

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

export async function getWorkingProcessData() {
  try {
    const { data } = await client.query({
      query: GET_HOME_WORKING_PROCESS,
    });
    return data;
  } catch (error) {
    return false;
  }
}

const WorkingProcess = ({ data }: WorkingProcessProps): JSX.Element => {
  return (
    <div className={styles.wp}>
      <div className='side-padding'>
        <div className='container'>
          {data ? data.homePage.data.attributes.dynamicZone.map((item: ComponentLayoutWorkingProcess) => {
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
                            src={`${process.env.NEXT_PUBLIC_STRAPI_CMS_URL}${el.icon1.data.attributes.url}`}
                            alt={el.icon1.data.attributes.name}
                            className={styles.listItemImg1}
                            width={70}
                            height={70}
                          />
                          <Image
                            src={`${process.env.NEXT_PUBLIC_STRAPI_CMS_URL}${el.icon2.data.attributes.url}`}
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
          }) : ''}
        </div>
      </div>
    </div>
  );
}

export default WorkingProcess;