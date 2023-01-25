import { gql } from '@apollo/client';
import ReactMarkdown from 'react-markdown';
import client from '../../lib/apolloClient';
import styles from '../../styles/Content.module.css';

import { ContentProps } from '../../components/types/AboutPageTypes';

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

export async function getContentData() {
  const { data } = await client.query({
    query: GET_CONTENT,
  });

  return data;
}

const Content = ({ data }: ContentProps): JSX.Element => {
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