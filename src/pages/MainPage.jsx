import React from 'react';
import { Link } from 'react-router-dom';
import styles from './MainPage.module.css';

const MainPage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.title}>Ваша идеальная прогулка начинается с нас</h1>
        <p className={styles.subtitle}>
          Откройте для себя новые маршруты, основываясь на вашем настроении и местоположении
        </p>
        <Link to="/emotions" className={`${styles.btn} ${styles.primary}`}>
          Узнать настроение
        </Link>
      </div>
      <div className={styles.imageContainer}>
        <img src="/images/hero-image.jpg" alt="Человек на прогулке" className={styles.image} />
      </div>
    </div>
  );
};

export default MainPage;
