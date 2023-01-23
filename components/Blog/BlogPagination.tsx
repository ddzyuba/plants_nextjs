import Link from 'next/link';
import styles from '../../styles/BlogPagination.module.css';

type PaginationProps = {
  pageCount: number;
  pageCurrent: number;
}

const BlogPagination = ({ pageCount, pageCurrent }: PaginationProps) => {
  let buttons = [];

  for (let i = 0; i < pageCount; i++) {
    buttons.push(
      <Link
        href={`/blog/page/${i + 1}`}
        key={i}
        className={`${styles.button} ${pageCurrent === (i + 1) ? styles.buttonActive : ''}`}
      >
        {i + 1}
      </Link>
    );
  }

  return (
    <div className={styles.pagination}>
      {pageCurrent === 1 ? '' :
        <Link
          href={`/blog/page/${pageCurrent - 1}`}
          className={`${styles.prev}`}
        ></Link>}
      {buttons}
      {pageCurrent === pageCount ? '' :
        <Link
          href={`/blog/page/${pageCurrent + 1}`}
          className={`${styles.next}`}
        ></Link>
      }
    </div>
  );
};

export default BlogPagination;