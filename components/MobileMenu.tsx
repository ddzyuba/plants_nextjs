import Image from 'next/image';
import Link from 'next/link';
import { gql, useQuery } from '@apollo/client';
import styles from '../styles/MobileMenu.module.css';

type MenuItem = {
  text: string;
  url: string;
}

type MobileMenuProps = {
  isMenuOpen: boolean;
  toggleIsMenuOpen(): void;
}

const GET_MOBILE_MENU = gql`
  query MobileMenu {
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

const MobileMenu = ({ isMenuOpen, toggleIsMenuOpen }: MobileMenuProps): JSX.Element => {
  const { loading, error, data } = useQuery(GET_MOBILE_MENU);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  return (
    <div className={`${styles.mobileNav} ${isMenuOpen ? styles.mobileNavOpen : ''}`}>
      <div className={styles.mobileNavWrapper}>
        <Link href="/" onClick={toggleIsMenuOpen}>
          <Image src="/logo.png" alt="Plants Logo" width={120} height={55} />
        </Link>
        <button className={styles.mobileClose} onClick={toggleIsMenuOpen} />
      </div>
      <nav>
        <ul className={styles.mobileNavList}>
          {data.headerMenu.data.attributes.HeaderDynamicMenu.map((item: MenuItem) => (
            <li key={item.text} className={styles.mobileNavListItem}>
              <Link
                href={item.url}
                onClick={toggleIsMenuOpen}
              >
                {item.text}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className={styles.ctaWrapper}>
        <a href="tel:00000000" className='cta-btn'>Call us</a>
      </div>
    </div>
  );
}

export default MobileMenu;