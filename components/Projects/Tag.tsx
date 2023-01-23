import { Dispatch, SetStateAction } from 'react';
import styles from '../../styles/ProjectsSection.module.css';

type Tag = {
  attributes: {
    slug: string;
    title: string;
  }
}

type TagProps = {
  el: Tag;
  i: number;
  changeTag(tagSlug: string): void;
  key?: string;
  activeTag: string;
  setActivePage: Dispatch<SetStateAction<number>>;
}

const Tag = ({ el, i, changeTag, activeTag, setActivePage }: TagProps) => {
  return (
    <button
      className={`${styles.tag} ${activeTag === el.attributes.slug ? styles.tagActive : ''}`}
      onClick={() => {
        changeTag(el.attributes.slug);
        setActivePage(1);
      }}
    >{el.attributes.title}</button>
  );
}

export default Tag;