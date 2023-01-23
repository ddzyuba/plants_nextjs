import { useState } from 'react';
import { gql, useQuery } from '@apollo/client';
import TagButton from './Tag';
import ProjectsList from './ProjectsList';
import styles from '../../styles/ProjectsSection.module.css';

type Tag = {
  attributes: {
    slug: string;
    title: string;
  }
}

const GET_TAGS = gql`
  query GetTags {
    tags {
      data {
        attributes {
          slug
          title
        }
      }
    }
  }
`;

const Tags = () => {
  const [tag, setTag] = useState('all');
  const [activePage, setActivePage] = useState<number>(1);

  const changeTag = (newTag: string) => {
    setTag(newTag);
  };

  const { loading, error, data } = useQuery(GET_TAGS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  return (
    <>
      <div className={styles.tags}>
        <TagButton
          changeTag={changeTag}
          i={0}
          el={{ attributes: { slug: 'all', title: 'View All' } }}
          activeTag={tag}
          setActivePage={setActivePage}
        />
        {data.tags.data.map((item: Tag, i: number) => (
          <TagButton
            key={item.attributes.slug}
            changeTag={changeTag}
            el={item}
            i={i + 1}
            activeTag={tag}
            setActivePage={setActivePage}
          />
        ))}
      </div>
      <ProjectsList
        activeTag={tag}
        activePage={activePage}
        setActivePage={setActivePage}
      />
    </>
  );
};

export default Tags;