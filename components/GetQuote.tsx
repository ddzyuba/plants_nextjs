import { gql, useQuery } from '@apollo/client';
import Link from 'next/link';
import styles from '../styles/GetQuote.module.css';

type ComponentLayoutGetQuote = {
  __typename: string;
  titleBlack: string;
  titleGreen: string;
  button: {
    text: string;
    url: string;
  }
}

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

const GetQuote = (): JSX.Element => {
  const { loading, error, data } = useQuery(GET_QUOTE);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

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