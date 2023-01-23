import { gql, useQuery } from '@apollo/client';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper';
import styles from '../styles/Testimonials.module.css';
import 'swiper/css';

type ComponentLayoutTestimonials = {
  __typename: string;
  titleBlack: string;
  titleGreen: string;
  text: string;
  testimonials: {
    data: Testimonial[];
  }
}

type Testimonial = {
  attributes: {
    name: string;
    job: string;
    content: string;
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

const GET_TESTIMONIALS = gql`
  query Testimonials {
    homePage {
      data {
        attributes {
          dynamicZone {
            ...on ComponentLayoutTestimonials {
              titleBlack
              titleGreen
              text
              testimonials {
                data {
                  attributes {
                    name
                    job
                    content
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
      }
    }
  }
`;

const Testimonials = (): JSX.Element => {
  const { loading, error, data } = useQuery(GET_TESTIMONIALS);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  return (
    <div className={styles.testimonials}>
      <div className='side-padding'>
        <div className='container'>
          {data.homePage.data.attributes.dynamicZone.map((item: ComponentLayoutTestimonials) => {
            if (item.__typename === 'ComponentLayoutTestimonials') {
              return (
                <div key='ComponentLayoutTestimonials'>
                  <h2 className={styles.heading}>
                    <span>{item.titleBlack} </span>
                    <span className={styles.headingGreen}>{item.titleGreen}</span>
                  </h2>
                  <div className={styles.wrapperTop}>
                    <p className={styles.text}>{item.text}</p>
                    <div className={styles.paginationDesktop}>
                      <button className='swiper-button-prev'></button>
                      <button className='swiper-button-next'></button>
                    </div>
                  </div>
                  <div className={styles.list}>
                    <Swiper
                      modules={[Navigation]}
                      spaceBetween={30}
                      slidesPerView={1}
                      navigation={{
                        nextEl: '.swiper-button-next',
                        prevEl: '.swiper-button-prev',
                      }}
                      breakpoints={{
                        768: {
                          slidesPerView: 2
                        }
                      }}
                    >
                      {item.testimonials.data.map((el: Testimonial, i: number) => (
                        <SwiperSlide key={i}>
                          <div className={styles.listItem}>
                            <Image
                              src={`http://localhost:1337${el.attributes.image.data.attributes.url}`}
                              alt={el.attributes.image.data.attributes.name}
                              className={styles.image}
                              width={193}
                              height={276}
                            />
                            <div className={styles.listItemWrapper}>
                              <p className={styles.listItemText}>{el.attributes.content}</p>
                              <p className={styles.listItemName}>{el.attributes.name}</p>
                              <p className={styles.listItemJob}>{el.attributes.job}</p>
                            </div>
                          </div>
                        </SwiperSlide>
                      ))}
                    </Swiper>
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

export default Testimonials;