// src/components/Header/Header.jsx
import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Header.module.css';

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.leftSection}>
          <NavLink to="/" className={styles.logoLink}>
            <div className={styles.logo}>
              <img src="/images/Logo.png" alt="Логотип проекта" />
            </div>
          </NavLink>
          <nav className={styles.nav}>
            <ul className={styles.navList}>
              <li className={styles.navItem}>
                <NavLink 
                  to="/" 
                  className={({ isActive }) => 
                    `${styles.navLink} ${isActive ? styles.active : ''}`
                  }
                  end
                >
                  Главная
                </NavLink>
              </li>
              <li className={styles.navItem}>
                <NavLink 
                  to="/emotions" 
                  className={({ isActive }) => 
                    `${styles.navLink} ${isActive ? styles.active : ''}`
                  }
                >
                  Узнать настроение
                </NavLink>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;