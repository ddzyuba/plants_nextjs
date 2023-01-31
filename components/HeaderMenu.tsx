import { useContext } from "react";
import { useRouter } from 'next/router';
import AppContext from "../components/AppContext";
import Image from 'next/image';
import Link from 'next/link';
import { gql } from '@apollo/client';
import styles from '../styles/HeaderMenu.module.css';

import client from '../lib/apolloClient';
import {
  HeaderMenuProps,
  MenuItem
} from '../components/types/HeaderMenuTypes';

const GET_HEADER_MENU = gql`
  query HeaderMenu {
    headerMenu {
      data {
        attributes {
          HeaderDynamicMenu {
            ...on ComponentLayoutLink {
              text
              url
            }
          }
        }
      }
    }
  }
`;

export async function getHeaderMenuData() {
  try {
    const { data } = await client.query({
      query: GET_HEADER_MENU,
    });
    return data;
  } catch (error) {
    return false;
  }
}

const HeaderMenu = ({ data }: HeaderMenuProps): JSX.Element => {
  const value = useContext(AppContext);
  const router = useRouter();

  return (
    <>
      {data ? (
        <div className='side-padding'>
          <div className='container'>
            <div className={styles.wrapper}>
              <Link href="/">
                <Image src="/logo.png" alt="Plants Logo" width={120} height={55} />
              </Link>
              <button className={styles.mobileOpen} onClick={value?.toggleIsMenuOpen}>
                <span className={styles.mobileOpenIcon}></span>
              </button>
              <div className={styles.wrapperInner}>
                <nav>
                  <ul className={styles.list}>
                    {data.headerMenu.data.attributes.HeaderDynamicMenu.map((item: MenuItem) => (
                      <li 
                        key={item.text} 
                        className={`${styles.listItem} ${router.pathname === item.url ? styles.listItemActive : ''}`}
                      >
                        <Link href={item.url}>{item.text}</Link>
                      </li>
                    ))}
                  </ul>
                </nav>
                <Link href="tel:00000000" className={styles.ctaBtn}>Call us</Link>
              </div>
            </div>
          </div>
        </div>
      ) : ''}
    </>
  );
}

export default HeaderMenu;