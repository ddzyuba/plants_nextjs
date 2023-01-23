import ReactMarkdown from 'react-markdown'
import styles from '../../styles/Content.module.css';

type ContentProps = {
  content: string;
}

const Content = ({ content }: ContentProps): JSX.Element => {
  return (
    <div className={styles.content}>
      <div className='side-padding'>
        <div className='container'>
          <ReactMarkdown>{content}</ReactMarkdown>
        </div>
      </div>
    </div>
  );
};

export default Content;