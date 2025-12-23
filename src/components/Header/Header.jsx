import React from 'react';
import Button from '../UI/Button';
import styles from './Header.module.css';

const Header = () => {
    return (
        <header className={styles.header}>
            <div className={styles.container}>
                <div className={styles.logo}>
                    <img src="/images/logo.jpg" alt="Логотип проекта" />
                </div>
                <nav className={styles.nav}>
                    <ul className={styles.navList}>
                        <li className={styles.navItem}><a href="#" className={styles.navLink}>Главная</a></li>
                        <li className={styles.navItem}><a href="#" className={styles.navLink}>Узнать настроение</a></li>
                        <li className={styles.navItem}><a href="#" className={styles.navLink}>О проекте</a></li>
                        <li className={styles.navItem}><a href="#" className={styles.navLink}>Все маршруты</a></li>
                        <li className={styles.navItem}><a href="#" className={styles.navLink}>Поддержать нас</a></li>
                        <li className={styles.navItem}><a href="#" className={styles.navLink}>FAQ</a></li>
                    </ul>
                </nav>
                <div className={styles.authButtons}>
                    <Button variant="outline">Регистрация</Button>
                    <Button variant="primary">Войти</Button>
                </div>
            </div>
        </header>
    );
};

export default Header;
