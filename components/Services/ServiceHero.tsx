import styles from '../../styles/AboutHero.module.css';

type ServiceHeroProps = {
  title: string;
}

const ServiceHero = ({ title }: ServiceHeroProps) => {
  return (
    <div className={styles.aboutHero}>
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <h1 className={styles.heading}>{title}</h1>
        </div>
      </div>
    </div>
  );
}

export default ServiceHero;