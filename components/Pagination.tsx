import { Dispatch, SetStateAction } from 'react';
import styles from '../styles/Pagination.module.css';

type PaginationProps = {
  pageCount: number;
  pageCurrent: number;
  activePage: number;
  setActivePage: Dispatch<SetStateAction<number>>;
}

const Pagination = ({ pageCount, pageCurrent, activePage, setActivePage }: PaginationProps) => {
  let buttons = [];

  for (let i = 0; i < pageCount; i++) {
    buttons.push(
      <button
        key={i}
        className={`${styles.button} ${pageCurrent === (i + 1) ? styles.buttonActive : ''}`}
        onClick={() => {
          if (activePage !== (i + 1)) {
            setActivePage(i + 1);
          }
        }}
      >
        {i + 1}
      </button>
    );
  }

  return (
    <div className={styles.pagination}>
      <button
        className={`${styles.prev} ${pageCurrent === 1 ? styles.hidden : ''}`}
        onClick={() => {
          setActivePage(activePage - 1);
        }}
      ></button>
      {buttons}
      <button
        className={`${styles.next} ${pageCount === activePage ? styles.hidden : ''}`}
        onClick={() => {
          setActivePage(activePage + 1);
        }}
      ></button>
    </div>
  );
};

export default Pagination;