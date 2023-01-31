import { useContext } from "react";
import AppContext from "../components/AppContext";
import Image from 'next/image';
import Link from 'next/link';
import styles from '../styles/MobileMenu.module.css';

import {
  HeaderMenuProps,
  MenuItem
} from '../components/types/HeaderMenuTypes';

const MobileMenu = ({ data }: HeaderMenuProps): JSX.Element => {
  const value = useContext(AppContext);

  return (
    <>
      {data ? (
        <div className={`${styles.mobileNav} ${value?.isMenuOpen ? styles.mobileNavOpen : ''}`}>
          <div className={styles.mobileNavWrapper}>
            <Link href="/" onClick={value?.toggleIsMenuOpen}>
              <Image src="/logo.png" alt="Plants Logo" width={120} height={55} />
            </Link>
            <button className={styles.mobileClose} onClick={value?.toggleIsMenuOpen} />
          </div>
          <nav>
            <ul className={styles.mobileNavList}>
              {data.headerMenu.data.attributes.HeaderDynamicMenu.map((item: MenuItem) => (
                <li key={item.text} className={styles.mobileNavListItem}>
                  <Link
                    href={item.url}
                    onClick={value?.toggleIsMenuOpen}
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
      ) : ''}
    </>
  );
}

export default MobileMenu;