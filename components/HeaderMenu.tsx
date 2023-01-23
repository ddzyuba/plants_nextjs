import Image from 'next/image';
import Link from 'next/link';
import { gql, useQuery } from '@apollo/client';
import styles from '../styles/HeaderMenu.module.css';

type MenuItem = {
  text: string;
  url: string;
}

type HeaderMenuProps = {
  toggleIsMenuOpen(): void;
}

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

const HeaderMenu = ({ toggleIsMenuOpen }: HeaderMenuProps): JSX.Element => {
  const { loading, error, data } = useQuery(GET_HEADER_MENU);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  return (
    <div className='side-padding'>
      <div className='container'>
        <div className={styles.wrapper}>
          <Link href="/">
            <Image src="/logo.png" alt="Plants Logo" width={120} height={55} />
          </Link>
          <button className={styles.mobileOpen} onClick={toggleIsMenuOpen}>
            <span className={styles.mobileOpenIcon}></span>
          </button>
          <div className={styles.wrapperInner}>
            <nav>
              <ul className={styles.list}>
                {data.headerMenu.data.attributes.HeaderDynamicMenu.map((item: MenuItem) => (
                  <li key={item.text} className={styles.listItem}>
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
  );
}

export default HeaderMenu;