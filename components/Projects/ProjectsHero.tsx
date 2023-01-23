import { gql, useQuery } from '@apollo/client';
import styles from '../../styles/AboutHero.module.css';

const GET_PROJECTS_HERO = gql`
  query GetProjectsPage {
    projectsPage {
      data {
        attributes {
          title
          heroImage {
            data {
              attributes {
                name
                url
              }
            }
          }
        }
      }
    }
  }
`;

const ProjectsHero = () => {
  const { loading, error, data } = useQuery(GET_PROJECTS_HERO);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  return (
    <div className={styles.aboutHero}>
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <h1 className={styles.heading}>{data.projectsPage.data.attributes.title}</h1>
        </div>
      </div>
    </div>
  );
}

export default ProjectsHero;