import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect, Dispatch, SetStateAction } from 'react';
import Pagination from '../Pagination';
import styles from '../../styles/ProjectsList.module.css';

type Project = {
  id: number;
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
}

type ProjectList = {
  data: Project[];
  meta: {
    pagination: {
      pageCount: number;
      page: number;
    }
  }
}

type ProjectsListProps = {
  activeTag: string;
  activePage: number;
  setActivePage: Dispatch<SetStateAction<number>>;
}

const ProjectsList = ({ activeTag, activePage, setActivePage }: ProjectsListProps) => {
  const [data, setData] = useState<null | ProjectList>(null);
  const [isLoading, setLoading] = useState(false);

  let url = '';
  switch (activeTag) {
    case 'all':
      url = `http://localhost:1337/api/projects?populate[0]=image&pagination[pageSize]=4&pagination[page]=${activePage}`;
      break;

    default:
      url = `http://localhost:1337/api/projects?populate[0]=image&pagination[pageSize]=4&pagination[page]=${activePage}&filters[tags][slug][$in]=${activeTag}`;
  }

  useEffect(() => {
    setLoading(true);
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      })
  }, [activeTag, activePage]);

  if (isLoading) return <p>Loading...</p>
  if (!data) return <p>No profile data</p>

  console.log("data", data);

  return (
    <>
      <div className={styles.wrapper}>
        {data.data.map((item: Project) => (
          <div className={styles.item} key={item.id}>
            <Image
              src={`http://localhost:1337${item.attributes.image.data.attributes.url}`}
              alt={item.attributes.image.data.attributes.name}
              width={330}
              height={259}
              className={styles.itemImage}
            />
            <div className={styles.itemWrapper}>
              <Link className={styles.itemTitle} href={`/projects/${item.attributes.slug}`}>{item.attributes.title}</Link>
              <div className={styles.itemText}>{item.attributes.excerpt}</div>
            </div>
          </div>
        ))}
      </div>
      {data.meta.pagination.pageCount > 1 ?
        <Pagination
          pageCount={data.meta.pagination.pageCount}
          pageCurrent={data.meta.pagination.page}
          setActivePage={setActivePage}
          activePage={activePage}
        /> : ''}
    </>
  );
};

export default ProjectsList;