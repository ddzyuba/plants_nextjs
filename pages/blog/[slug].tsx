import ServiceHero from '../../components/Services/ServiceHero';
import Content from '../../components/Services/Content';
import RecentPosts from '../../components/Blog/RecentPosts';
import styles from '../../styles/Post.module.css';

type StaticProps = {
  params: {
    slug: string;
  }
}

type PostProps = {
  data: {
    data: Post[];
  };
  recentPosts: {
    data: Post[];
  }
}

type Post = {
  id: number;
  attributes: {
    title: string;
    slug: string;
    content: string;
    publishedAt: string;
    image: {
      data: {
        attributes: {
          name: string;
          url: string;
        }
      }
    }
  }
}

const Post = ({ data, recentPosts }: PostProps) => {
  return (
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

  const res2 = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_CMS_URL}/api/posts?populate[0]=image&pagination[pageSize]=10&filters[slug][$notIn]=${params.slug}`)
  const recentPosts = await res2.json();

  return {
    props: {
      data,
      recentPosts
    },
  }
}