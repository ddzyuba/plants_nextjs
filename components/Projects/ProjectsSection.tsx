import { gql, useQuery } from '@apollo/client';
import Tags from './Tags';
import styles from '../../styles/ProjectsSection.module.css';

const GET_PROJECTS_SECTION = gql`
  query GetProjectsSection {
    projectsPage {
      data {
        attributes {
          List {
            headingGreen
            headingBlack
            text
          }
        }
      }
    }
  }
`;

const ProjectsSection = () => {
  const { loading, error, data } = useQuery(GET_PROJECTS_SECTION);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  return (
    <div className={styles.projectsSection}>
      <div className='side-padding'>
        <div className='container'>
          <div className={styles.wrapperTop}>
            <h2 className={styles.heading}>
              <span className={styles.headingGreen}>{data.projectsPage.data.attributes.List.headingGreen} </span>
              <span>{data.projectsPage.data.attributes.List.headingBlack}</span>
            </h2>
            <div className={styles.text}>{data.projectsPage.data.attributes.List.text}</div>
          </div>
          <Tags />
        </div>
      </div>
    </div>
  );
};

export default ProjectsSection;