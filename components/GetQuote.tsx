import { gql } from '@apollo/client';
import Link from 'next/link';
import styles from '../styles/GetQuote.module.css';
import client from '../lib/apolloClient';

import {
  GetQuoteProps,
  ComponentLayoutGetQuote
} from '../components/types/GetQuoteTypes';

const GET_QUOTE = gql`
  query GetQuote {
    homePage {
      data {
        attributes {
          dynamicZone {
            ...on ComponentLayoutGetQuote {
              titleBlack
              titleGreen
              button {
                text
                url
              }
            }
          }
        }
      }
    }
  }
`;

export async function getQuoteData() {
  const { data } = await client.query({
    query: GET_QUOTE,
  });

  return data;
}

const GetQuote = ({ data }: GetQuoteProps): JSX.Element => {
  return (
    <div className={styles.getQuote}>
      {data.homePage.data.attributes.dynamicZone.map((item: ComponentLayoutGetQuote) => {
        if (item.__typename === 'ComponentLayoutGetQuote') {
          return (
            <div className='side-padding' key='ComponentLayoutGetQuote'>
              <div className={styles.container}>
                <h2 className={styles.heading}>
                  <span>{item.titleBlack} </span>
                  <span className={styles.headingGreen}>{item.titleGreen}</span>
                </h2>
                <div className={styles.btnWraper}>
                  <Link href={item.button.url} className='cta-btn'>{item.button.text}</Link>
                </div>
              </div>
            </div>
          );
        }
      })}
    </div>
  );
}

export default GetQuote;