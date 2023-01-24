import { gql, useQuery } from '@apollo/client';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import styles from '../styles/Brands.module.css';
import 'swiper/css';

type ComponentLayoutBrands = {
  __typename: string;
  brands: {
    data: UploadImage[];
  }
}

type UploadImage = {
  attributes: {
    name: string;
    url: string;
  }
}

const GET_BRANDS = gql`
  query GetBrands {
    homePage {
      data {
        attributes {
          dynamicZone {
            ...on ComponentLayoutBrands {
              brands {
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

const Brands = (): JSX.Element => {
  const { loading, error, data } = useQuery(GET_BRANDS);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  return (
    <div className={styles.brands}>
      <div className='side-padding'>
        <div className={styles.container}>
          {data.homePage.data.attributes.dynamicZone.map((item: ComponentLayoutBrands) => {
            if (item.__typename === 'ComponentLayoutBrands') {
              return (
                <div key='ComponentLayoutBrands' className={styles.list}>
                  <Swiper
                    slidesPerView={2}
                    breakpoints={{
                      400: {
                        slidesPerView: 2
                      },
                      768: {
                        slidesPerView: 3
                      },
                      1000: {
                        slidesPerView: 4
                      },
                      1400: {
                        slidesPerView: 5
                      },
                      1600: {
                        slidesPerView: 6
                      }
                    }}
                  >
                    {item.brands.data.map((el: UploadImage, i: number) => (
                      <SwiperSlide key={i} className={styles.item}>
                        <Image
                          src={`${process.env.NEXT_PUBLIC_STRAPI_CMS_URL}${el.attributes.url}`}
                          alt={el.attributes.name}
                          className={styles.image}
                          width={202}
                          height={100}
                        />
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </div>
              );
            }
          })}
        </div>
      </div>
    </div>
  );
}

export default Brands;