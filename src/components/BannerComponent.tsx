import React from 'react';
import styles from './BannerComponent.module.css';

type BannerProps = {
  title: string;
  description?: string;
};

const BannerComponent: React.FC<BannerProps> = ({ title, description }) => {
  return (
    <div className={styles.banner}>
      <h1 className={styles.title}>{title}</h1>
      {description && <p className={styles.description}>{description}</p>}
    </div>
  );
};

export default BannerComponent


