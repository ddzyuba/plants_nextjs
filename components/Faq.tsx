import { useState } from 'react';
import { gql, useQuery } from '@apollo/client';
import Image from 'next/image';
import styles from '../styles/Faq.module.css';

type ComponentLayoutFaq = {
  __typename: string;
  titleBlack: string;
  titleGreen: string;
  text: string;
  image: {
    data: {
      attributes: {
        name: string;
        url: string;
      }
    }
  }
  faqItems: FaqItem[];
}

type FaqItem = {
  question: string;
  answer: string;
}

type FaqListItemProps = {
  el: FaqItem;
  i: number;
}

const GET_FAQ = gql`
  query Faq {
    homePage {
      data {
        attributes {
          dynamicZone {
            ...on ComponentLayoutFaq {
              titleBlack
              titleGreen
              text
              image {
                data {
                  attributes {
                    name
                    url
                  }
                }
              }
              faqItems {
                question
                answer
              }
            }
          }
        }
      }
    }
  }
`;

const FaqListItem = ({ el, i }: FaqListItemProps): JSX.Element => {
  let isOpenValue;
  if (i === 0) {
    isOpenValue = true;
  } else {
    isOpenValue = false;
  }
  const [isOpen, setIsOpen] = useState(isOpenValue);
  const toggleSetIsOpen = (isOpen: boolean): void => {
    setIsOpen(!isOpen);
  }

  return (
    <div className={`${styles.faqItem} ${isOpen ? styles.faqItemActive : ''}`}>
      <button
        className={styles.questionWrapper}
        onClick={() => {
          toggleSetIsOpen(isOpen);
        }
        }
      >
        <div className={styles.question}>{`${i + 1}. ${el.question}`}</div>
      </button>
      <div className={styles.answer}>{el.answer}</div>
    </div>
  );
};

const Faq = (): JSX.Element => {
  const { loading, error, data } = useQuery(GET_FAQ);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  return (
    <div className={styles.faq}>
      <div className='side-padding'>
        <div className='container'>
          {data.homePage.data.attributes.dynamicZone.map((item: ComponentLayoutFaq) => {
            if (item.__typename === 'ComponentLayoutFaq') {
              return (
                <div key='ComponentLayoutFaq'>
                  <h2 className={styles.heading}>
                    <span>{item.titleBlack} </span>
                    <span className={styles.headingGreen}>{item.titleGreen}</span>
                  </h2>
                  <div className={styles.wrapper}>
                    <div className={styles.col1}>
                      <p className={styles.text}>{item.text}</p>
                      <div className={styles.faqList}>
                        {item.faqItems.map((el: FaqItem, i: number) => (
                          <FaqListItem
                            key={i}
                            i={i}
                            el={el}
                          />
                        ))}
                      </div>
                    </div>
                    <div className={styles.col2}>
                      <div className={styles.col2Wrapper}>
                        <Image
                          src={`http://localhost:1337${item.image.data.attributes.url}`}
                          alt={item.image.data.attributes.name}
                          className={styles.image}
                          width={507}
                          height={679}
                        />
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

export default Faq;