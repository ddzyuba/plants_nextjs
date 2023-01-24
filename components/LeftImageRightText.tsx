import { gql } from '@apollo/client';
import Image from 'next/image';
import Link from 'next/link';
import styles from '../styles/LeftImageRightText.module.css';

import client from '../lib/apolloClient';

import {
  LeftImageRightTextDataProps,
  ComponentLayoutLeftImageRightText,
  SmallDetail,
  UploadFile
} from '../components/types/LeftImageRightTextTypes';

const GET_LEFT_IMAGE_RIGHT_TEXT = gql`
  query HomeLeftImageRightText {
    homePage {
      data {
        attributes {
          dynamicZone {
            ...on ComponentLayoutLeftImageRightText {
              heading
              titleGreen
              titleBlack
              text
              smallDetails {
                text
                image {
                  data {
                    attributes {
                      url
                      name
                    }
                  }
                }
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

export async function getLeftImageRightTextData() {
  const { data } = await client.query({
    query: GET_LEFT_IMAGE_RIGHT_TEXT,
  });

  return data;
}

const LeftImageRightText = ({ data }: LeftImageRightTextDataProps): JSX.Element => {
  return (
    <div className={styles.lirt}>
      <div className='side-padding'>
        <div className='container'>
          {data.homePage.data.attributes.dynamicZone.map((item: ComponentLayoutLeftImageRightText) => {
            if (item.__typename === 'ComponentLayoutLeftImageRightText') {
              return (
                <div key={'ComponentLayoutLeftImageRightText'}>
                  <div className={styles.wrapper}>
                    <div className={styles.col1}>
                      <Image
                        src={`${process.env.NEXT_PUBLIC_STRAPI_CMS_URL}${item.image.data.attributes.url}`}
                        alt={item.image.data.attributes.name}
                        className={styles.col1Img}
                        fill
                      />
                    </div>
                    <div className={styles.col2}>
                      <div className={styles.col2Wrapper}>
                        <h2 className={styles.heading}>
                          <span className={styles.headingGreen}>{item.titleGreen} </span>
                          <span>{item.titleBlack}</span>
                        </h2>
                        <p className={styles.text}>{item.text}</p>
                        <div className={styles.detailsList}>
                          {item.smallDetails.map((el: SmallDetail) => (
                            <div key={el.text} className={styles.detailItem}>
                              <Image
                                src={`${process.env.NEXT_PUBLIC_STRAPI_CMS_URL}${el.image.data.attributes.url}`}
                                alt={el.image.data.attributes.name}
                                width={67}
                                height={67}
                              />
                              <p className={styles.detailItemText}>{el.text}</p>
                            </div>
                          ))}
                        </div>
                        <div className={styles.btnWrapper}>
                          <Link
                            className='cta-btn'
                            href={item.button.url}
                          >
                            {item.button.text}
                          </Link>
                        </div>
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

export default LeftImageRightText;