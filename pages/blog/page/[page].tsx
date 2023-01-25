import ServiceHero from '../../../components/Services/ServiceHero';
import Head from 'next/head';
import MobileMenu from "../../../components/MobileMenu";
import HeaderMenu, { getHeaderMenuData } from "../../../components/HeaderMenu";
import BlogList from '../../../components/Blog/BlogList';
import Brands, { getBrandsData } from '../../../components/Brands';
import GetQuote, { getQuoteData } from '../../../components/GetQuote';
import FooterMenu, { getFooterMenuData } from '../../../components/FooterMenu';

import {
  BlogProps,
  BlogPropsData,
  Post
} from '../../../components/types/BlogPageTypes';

type StaticProps = {
  params: {
    page: string;
  }
}

const BlogPage = ({
  data,
  headerMenuData,
  brandsData,
  quoteData,
  footerMenuData
}: BlogProps) => {
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

export default BlogPage;

// This function gets called at build time
export async function getStaticPaths() {
  // Call an external API endpoint to get posts
  const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_CMS_URL}/api/posts?pagination[pageSize]=4&populate[0]=image`);
  const posts = await res.json();

  // Get the paths we want to pre-render based on posts
  let paths = [];
  for (let i = 0; i < posts.meta.pagination.pageCount; i++) {
    let val = i + 1;
    paths.push({
      params: { page: val.toString() },
    });
  }

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: false }
}

export async function getStaticProps({ params }: StaticProps) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_CMS_URL}/api/posts?pagination[pageSize]=4&pagination[page]=${params.page}&populate[0]=image`)
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
  }
}