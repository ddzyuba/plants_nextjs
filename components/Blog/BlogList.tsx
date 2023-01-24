import Image from 'next/image';
import Link from 'next/link';
import BlogPagination from './BlogPagination';
import styles from '../../styles/BlogList.module.css';

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

const BlogList = ({ data }: BlogProps) => {
  return (
    <div className={styles.blogList}>
      <div className='side-padding'>
        <div className='container'>
          <h2 className={styles.heading}>
            <span>Our Latest </span>
            <span className={styles.headingGreen}>Blog Posts</span>
          </h2>
          <div className={styles.wrapper}>
            {data.data.map((item) => (
              <div className={styles.item} key={item.id}>
                <Image
                  src={`${process.env.NEXT_PUBLIC_STRAPI_CMS_URL}${item.attributes.image.data.attributes.url}`}
                  alt={item.attributes.image.data.attributes.name}
                  width={330}
                  height={259}
                  className={styles.itemImage}
                />
                <div className={styles.itemWrapper}>
                  <Link className={styles.itemTitle} href={`/blog/${item.attributes.slug}`}>{item.attributes.title}</Link>
                  <div className={styles.itemText}>{item.attributes.excerpt}</div>
                </div>
              </div>
            ))}
          </div>
          <BlogPagination
            pageCount={data.meta.pagination.pageCount}
            pageCurrent={data.meta.pagination.page}
          />
        </div>
      </div>
    </div>
  );
};

export default BlogList;