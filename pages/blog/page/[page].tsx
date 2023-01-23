import ServiceHero from '../../../components/Services/ServiceHero';
import Head from 'next/head';
import BlogList from '../../../components/Blog/BlogList';

type BlogProps = {
  data: BlogPropsData;
}

type BlogPropsData = {
  data: Post[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    }
  }
}

type Post = {
  attributes: {
    title: string;
    slug: string;
    excerpt: string;
    image: {
      data: {
        attributes: {
          name: string;
          url: string;
        }
      }
    }
  }
  id: number;
}

type StaticProps = {
  params: {
    page: string;
  }
}

const BlogPage = ({ data }: BlogProps) => {
  return (
    <div>
      <Head>
        <title>Blog</title>
        <meta name="description" content="Plants" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ServiceHero title='Blog' />
      <BlogList data={data} />
    </div>
  );
}

export default BlogPage;

// This function gets called at build time
export async function getStaticPaths() {
  // Call an external API endpoint to get posts
  const res = await fetch('http://localhost:1337/api/posts?pagination[pageSize]=4&populate[0]=image');
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
  const res = await fetch(`http://localhost:1337/api/posts?pagination[pageSize]=4&pagination[page]=${params.page}&populate[0]=image`)
  const data = await res.json();

  return {
    props: {
      data,
    },
  }
}