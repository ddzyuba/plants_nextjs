import type { NextPage } from 'next';
import ServiceHero from '../components/Services/ServiceHero';
import Head from 'next/head';
import BlogList from '../components/Blog/BlogList';

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

const Blog: NextPage<BlogProps> = ({ data }) => {
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

export default Blog;

export async function getStaticProps() {
  const res = await fetch(`http://localhost:1337/api/posts?pagination[pageSize]=4&populate[0]=image`)
  const data = await res.json();

  return {
    props: {
      data,
    },
  }
}
