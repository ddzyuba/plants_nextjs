import { gql } from '@apollo/client';
import Image from 'next/image';
import client from '../../lib/apolloClient';
import styles from '../../styles/LeftImageRightText.module.css';

import {
  LeftImageRightTextProps,
  SmallDetail
} from '../../components/types/AboutPageTypes';

const GET_LEFT_IMAGE_RIGHT_TEXT = gql`
  query AboutPageLeftImageRightText {
    aboutUsPage {
      data {
        attributes {
          leftImageRightText {
            heading
            titleGreen
            titleBlack
            text
            image {
              data {
                attributes {
                  name
                  url
                }
              }
            }
            smallDetails {
              text
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
  try {
    const { data } = await client.query({
      query: GET_LEFT_IMAGE_RIGHT_TEXT,
    });
    return data;
  } catch (error) {
    return false;
  }
}

const LeftImageRightText = ({ data }: LeftImageRightTextProps): JSX.Element => {
  return (
    <>
      {data ? (
        <div className={styles.lirt}>
          <div className='side-padding'>
            <div className='container'>
              <div className={styles.wrapper}>
                <div className={styles.col1}>
                  <Image
                    src={`${process.env.NEXT_PUBLIC_STRAPI_CMS_URL}${data.aboutUsPage.data.attributes.leftImageRightText.image.data.attributes.url}`}
                    alt={data.aboutUsPage.data.attributes.leftImageRightText.image.data.attributes.name}
                    className={styles.col1Img}
                    fill
                  />
                </div>
                <div className={styles.col2}>
                  <div className={styles.col2Wrapper}>
                    <h2 className={styles.heading}>
                      <span className={styles.headingGreen}>{data.aboutUsPage.data.attributes.leftImageRightText.titleGreen} </span>
                      <span>{data.aboutUsPage.data.attributes.leftImageRightText.titleBlack}</span>
                    </h2>
                    <p className={styles.text}>{data.aboutUsPage.data.attributes.leftImageRightText.text}</p>
                    <div className={styles.detailsList}>
                      {data.aboutUsPage.data.attributes.leftImageRightText.smallDetails.map((el: SmallDetail) => (
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
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : ''}
    </>
  );
}

export default LeftImageRightText;