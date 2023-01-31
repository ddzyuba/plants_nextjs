import Image from 'next/image';
import Link from 'next/link';
import styles from '../../styles/RelatedProjects.module.css';

type RelatedProjectsProps = {
  relatedProjects: {
    data: ProjectPropsData[];
  }
}

type ProjectPropsData = {
  id: number;
  attributes: {
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    client: string;
    location: string;
    start_date: string;
    end_date: string;
    price: number;
    tags: {
      data: TagData[];
    }
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

type TagData = {
  attributes: {
    slug: string;
  }
}

const RelatedProjects = ({ relatedProjects }: RelatedProjectsProps) => {
  return (
    <>
      {relatedProjects ? (
        <div className={styles.relatedProjects}>
          <h3 className={styles.heading}>Related Projects</h3>
          <div className={styles.wrapper}>
            {relatedProjects.data.map((item: Project) => (
              <div className={styles.item} key={item.id}>
                <Image
                  src={`${process.env.NEXT_PUBLIC_STRAPI_CMS_URL}${item.attributes.image.data.attributes.url}`}
                  alt={item.attributes.image.data.attributes.name}
                  width={330}
                  height={259}
                  className={styles.itemImage}
                />
                <div className={styles.itemWrapper}>
                  <Link
                    className={styles.itemTitle}
                    href={`/projects/${item.attributes.slug}`}
                  >
                    {item.attributes.title}
                  </Link>
                  <div className={styles.itemText}>{item.attributes.excerpt}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : ''}
    </>
  );
}

export default RelatedProjects;