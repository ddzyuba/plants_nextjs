import Image from 'next/image';
import Link from 'next/link';
import styles from '../../styles/RecentPosts.module.css';

type Props = {
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

const RecentPosts = ({ recentPosts }: Props) => {
  return (
    <div className={styles.container}>
      {recentPosts.data.map((post: Post) => (
        <div key={post.id} className={styles.item}>
          <Image
            className={styles.image}
            width={106}
            height={75}
            src={`${process.env.NEXT_PUBLIC_STRAPI_CMS_URL}${post.attributes.image.data.attributes.url}`}
            alt={post.attributes.image.data.attributes.name}
          />
          <div className={styles.itemWrapper}>
            <Link
              className={styles.title}
              href={`/blog/${post.attributes.slug}`}
            >
              {post.attributes.title}
            </Link>
            <div className={styles.date}>{timeConverter(Date.parse(post.attributes.publishedAt))}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RecentPosts;

function timeConverter(UNIX_timestamp: number): string {
  var a = new Date(UNIX_timestamp);
  var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  var year = a.getFullYear();
  var month = months[a.getMonth()];
  var date = a.getDate();
  var time = date + ' ' + month + ' ' + year;
  return time;
}