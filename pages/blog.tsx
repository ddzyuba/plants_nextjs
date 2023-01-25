import type { NextPage } from 'next';
import MobileMenu from "../components/MobileMenu";
import HeaderMenu, { getHeaderMenuData } from "../components/HeaderMenu";
import ServiceHero from '../components/Services/ServiceHero';
import Head from 'next/head';
import BlogList from '../components/Blog/BlogList';
import Brands, { getBrandsData } from '../components/Brands';
import GetQuote, { getQuoteData } from '../components/GetQuote';
import FooterMenu, { getFooterMenuData } from '../components/FooterMenu';

import {
  BlogProps,
  BlogPropsData,
  Post
} from '../components/types/BlogPageTypes';

const Blog: NextPage<BlogProps> = ({
  data,
  headerMenuData,
  brandsData,
  quoteData,
  footerMenuData
}) => {
  return (
    <div>
      <Head>
        <title>Blog</title>
        <meta name="description" content="Plants" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <HeaderMenu data={headerMenuData} />
      <ServiceHero title='Blog' />
      <BlogList data={data} />
      <Brands data={brandsData} />
      <GetQuote data={quoteData} />
      <FooterMenu data={footerMenuData} />
      <MobileMenu data={headerMenuData} />
    </div>
  );
}

export default Blog;

export async function getStaticProps() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_CMS_URL}/api/posts?pagination[pageSize]=4&populate[0]=image`)
  const data = await res.json();

  const headerMenuData = await getHeaderMenuData();
  const brandsData = await getBrandsData();
  const quoteData = await getQuoteData();
  const footerMenuData = await getFooterMenuData();

  return {
    props: {
      data,
      headerMenuData,
      brandsData,
      quoteData,
      footerMenuData
    },
    revalidate: 10,
  }
}
