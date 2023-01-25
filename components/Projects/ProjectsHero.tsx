import { gql } from '@apollo/client';
import client from '../../lib/apolloClient';
import styles from '../../styles/AboutHero.module.css';
import { ProjectsHeroProps } from '../../components/types/ProjectsPageTypes';

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

export async function getProjectsHeroData() {
  const { data } = await client.query({
    query: GET_PROJECTS_HERO,
  });

  return data;
}

const ProjectsHero = ({ data }: ProjectsHeroProps) => {
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