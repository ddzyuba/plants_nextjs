import Image from 'next/image';
import { useQuery } from '@apollo/client';
import styles from '../styles/PageHero.module.css';
import type { DocumentNode } from 'graphql/language/ast';

interface PageHeroProps {
  graphqlQuery: DocumentNode
}

const PageHero = ({ graphqlQuery }: PageHeroProps): JSX.Element => {
  const { loading, error, data } = useQuery(graphqlQuery);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  return (
    <section className={styles.pageHero}>
      PageHero
    </section>
  );
}

export default PageHero;