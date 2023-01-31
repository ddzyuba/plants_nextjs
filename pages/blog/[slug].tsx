import MobileMenu from "../../components/MobileMenu";
import HeaderMenu, { getHeaderMenuData } from "../../components/HeaderMenu";
import ServiceHero from '../../components/Services/ServiceHero';
import Content from '../../components/Services/Content';
import RecentPosts from '../../components/Blog/RecentPosts';
import Brands, { getBrandsData } from '../../components/Brands';
import GetQuote, { getQuoteData } from '../../components/GetQuote';
import FooterMenu, { getFooterMenuData } from '../../components/FooterMenu';
import styles from '../../styles/Post.module.css';

import {
  StaticProps,
  PostProps,
  Post
} from '../../components/types/BlogPostTypes';

const Post = ({
  data,
  recentPosts,
  headerMenuData,
  brandsData,
  quoteData,
  footerMenuData
}: PostProps) => {
  return (
    <>
      <HeaderMenu data={headerMenuData} />
      {data ? (
        <>
          <ServiceHero title={data.data[0].attributes.title} />
          <div className='side-padding'>
            <div className='container'>
              <div className={styles.container}>
                <div className={styles.col1}>
                  <Content content={data.data[0].attributes.content} />
                </div>
                <div className={styles.col2}>
                  <div className={styles.info}>
                    <h4 className={styles.infoHeading}>Recent Posts</h4>
                    <RecentPosts recentPosts={recentPosts} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : ''}
      <Brands data={brandsData} />
      <GetQuote data={quoteData} />
      <FooterMenu data={footerMenuData} />
      <MobileMenu data={headerMenuData} />
    </>
  );
};

export default Post;

// This function gets called at build time
export async function getStaticPaths() {
  // Call an external API endpoint to get posts
  const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_CMS_URL}/api/posts`);
  const posts = await res.json();

  // Get the paths we want to pre-render based on posts
  const paths = posts.data.map((post: Post) => ({
    params: { slug: post.attributes.slug },
  }))

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: false }
}

export async function getStaticProps({ params }: StaticProps) {

  const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_CMS_URL}/api/posts?filters[slug][$eq]=${params.slug}`)
  const data = await res.json();

  let blogPostData;
  if (data.data) {
    blogPostData = data;
  } else {
    blogPostData = false;
  }

  const res2 = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_CMS_URL}/api/posts?populate[0]=image&pagination[pageSize]=10&filters[slug][$notIn]=${params.slug}`)
  const recentPosts = await res2.json();

  let recentPostsData;
  if (recentPosts.data) {
    recentPostsData = recentPosts;
  } else {
    recentPostsData = false;
  }

  const headerMenuData = await getHeaderMenuData();
  const brandsData = await getBrandsData();
  const quoteData = await getQuoteData();
  const footerMenuData = await getFooterMenuData();

  return {
    props: {
      data: blogPostData,
      recentPosts: recentPostsData,
      headerMenuData,
      brandsData,
      quoteData,
      footerMenuData
    },
  }
}