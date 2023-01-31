import { gql } from '@apollo/client';
import Image from 'next/image';
import client from '../../lib/apolloClient';
import styles from '../../styles/Skills.module.css';

import {
  SkillProps,
  Skill
} from '../../components/types/AboutPageTypes';

const GET_SKILLS = gql`
  query AboutPageSkills {
    aboutUsPage {
      data {
        attributes {
          skills {
            heading
            text
            skillDetails {
              skillName
              skillPercentage
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
`;

export async function getSkillsData() {
  try {
    const { data } = await client.query({
      query: GET_SKILLS,
    });
    return data;
  } catch (error) {
    return false;
  }
}

const Skills = ({ data }: SkillProps): JSX.Element => {
  return (
    <>
      {data ? (
        <div className={styles.skills}>
          <div className='side-padding'>
            <div className='container'>
              <div className={styles.wrapper}>
                <div className={styles.col1}>
                  <div className={styles.col1Wrapper}>
                    <h2 className={styles.heading}>{data.aboutUsPage.data.attributes.skills.heading}</h2>
                    <p className={styles.text}>{data.aboutUsPage.data.attributes.skills.text}</p>
                    <div className={styles.skillItems}>
                      {data.aboutUsPage.data.attributes.skills.skillDetails.map((item: Skill) => (
                        <div key={item.skillPercentage} className={styles.skillItemWrapper}>
                          <div className={styles.skillItemTextWrapper} style={{ width: `${item.skillPercentage}%` }}>
                            <div className={styles.skillItemText}>{item.skillName}</div>
                            <div className={styles.skillPercentageText}>{`${item.skillPercentage}%`}</div>
                          </div>
                          <div className={styles.skillPercantageWrapper}>
                            <div className={styles.skillPercantage} style={{ width: `${item.skillPercentage}%` }}></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className={styles.col2}>
                  <div className={styles.col2Wrapper}>
                    <Image
                      width={601}
                      height={741}
                      src={`${process.env.NEXT_PUBLIC_STRAPI_CMS_URL}${data.aboutUsPage.data.attributes.skills.image.data.attributes.url}`}
                      alt={data.aboutUsPage.data.attributes.skills.image.data.attributes.name}
                      className={styles.image}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : ''}
    </>
  );
};

export default Skills;