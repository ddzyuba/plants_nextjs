import { useState } from 'react';
import HeaderMenu from "./HeaderMenu";
import MobileMenu from "./MobileMenu";
import Brands from '../components/Brands';
import GetQuote from '../components/GetQuote';
import FooterMenu from '../components/FooterMenu';

type Props = {
  children: JSX.Element
};

export default function Layout({ children }: Props) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleIsMenuOpen = () => {
    setIsMenuOpen(prev => !prev);
  };

  return (
    <>
      <HeaderMenu toggleIsMenuOpen={toggleIsMenuOpen} />
      <main>{children}</main>
      <Brands />
      <GetQuote />
      <FooterMenu />
      <MobileMenu
        isMenuOpen={isMenuOpen}
        toggleIsMenuOpen={toggleIsMenuOpen}
      />
    </>
  )
}