import { gql, useQuery } from '@apollo/client';
import ReactMarkdown from 'react-markdown'
import styles from '../../styles/Content.module.css';

const GET_CONTENT = gql`
  query AboutPageContent {
    aboutUsPage {
      data {
        attributes {
          content
        }
      }
    }
  }
`;

const Content = (): JSX.Element => {
  const { loading, error, data } = useQuery(GET_CONTENT);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  return (
    <div className={styles.content}>
      <div className='side-padding'>
        <div className='container'>
          <ReactMarkdown>{data.aboutUsPage.data.attributes.content}</ReactMarkdown>
        </div>
      </div>
    </div>
  );
};

export default Content;