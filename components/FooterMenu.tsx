import Link from 'next/link';
import { gql } from '@apollo/client';
import styles from '../styles/FooterMenu.module.css';
import client from '../lib/apolloClient';

import {
  FooterMenuProps,
  MenuItem
} from '../components/types/FooterMenuTypes';

const GET_FOOTER_MENU = gql`
  query FooterMenu {
    footerMenu {
        data {
          attributes {
            FooterMenuDynamicZone {
              ...on ComponentMenuColumnText {
                heading
                text
              }
              ...on ComponentMenuColumnLinks {
                heading
                links {
                  text
                  url
                }
              }
            }
            copyright
            copyrightLinks {
              text
              url
            }
          }
        }
      }
    }
`;

export async function getFooterMenuData() {
  try {
    const { data } = await client.query({
      query: GET_FOOTER_MENU,
    });
    return data;
  } catch (error) {
    return false;
  }
}

const FooterMenu = ({ data }: FooterMenuProps): JSX.Element => {
  return (
    <>
      {data ? (
        <div className={styles.footerMenu}>
          <div className='side-padding'>
            <div className='container'>
              <div className={styles.footerMenuWrapperTop}>
                <div className={styles.wrapper}>
                  <div className={styles.col1}>
                    <h3 className={styles.menuHeading}>{data.footerMenu.data.attributes.FooterMenuDynamicZone[0].heading}</h3>
                    <div
                      className={styles.text}
                      dangerouslySetInnerHTML={{ __html: data.footerMenu.data.attributes.FooterMenuDynamicZone[0].text.replace(/\n/g, "<br />") }}></div>
                  </div>
                  <div className={styles.col2}>
                    <h3 className={styles.menuHeading}>{data.footerMenu.data.attributes.FooterMenuDynamicZone[1].heading}</h3>
                    <ul className={styles.footerMenuLinks}>
                      {data.footerMenu.data.attributes.FooterMenuDynamicZone[1].links.map((item: MenuItem, i: number) => (
                        <li key={i} className={styles.footerMenuLink}>
                          <Link href={item.url}>{item.text}</Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className={styles.col3}>
                    <h3 className={styles.menuHeading}>{data.footerMenu.data.attributes.FooterMenuDynamicZone[2].heading}</h3>
                    <ul className={styles.footerMenuLinks}>
                      {data.footerMenu.data.attributes.FooterMenuDynamicZone[2].links.map((item: MenuItem, i: number) => (
                        <li key={i} className={styles.footerMenuLink}>
                          <Link href={item.url}>{item.text}</Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              <div className={styles.footerMenuWrapperBottom}>
                <div className={styles.copyright}>
                  {data.footerMenu.data.attributes.copyright}
                </div>
                <ul className={styles.copyrightMenu}>
                  {data.footerMenu.data.attributes.copyrightLinks.map((item: MenuItem, i: number) => (
                    <li key={i} className={styles.copyrightLink}>
                      <Link href={item.url}>{item.text}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      ) : ''}
    </>
  );
}

export default FooterMenu;