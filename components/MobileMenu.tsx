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

  let css = isMenuOpen ? { 'display': 'block' } : {};
  let css2 = isMenuOpen ? { 'transform': 'translateX(0)' } : {};

  return (
    <div className={styles.mobileNav} style={css}>
      <div className={styles.mobileNavContainer} style={css2}>
        <div className={styles.mobileNavWrapper}>
          <Link href="/">
            <Image src="/logo.png" alt="Plants Logo" width={120} height={55} />
          </Link>
          <button className={styles.mobileClose} onClick={toggleIsMenuOpen} />
        </div>
        <nav>
          <ul className=''>
            {data.headerMenu.data.attributes.HeaderDynamicMenu.map((item: MenuItem) => (
              <li key={item.text} className=''>
                <Link href={item.url}>{item.text}</Link>
              </li>
            ))}
          </ul>
        </nav>
        <Link href="tel:00000000" className=''>Call us</Link>
      </div>
    </div>
  );
}

export default MobileMenu;