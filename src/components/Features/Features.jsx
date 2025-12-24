import React from 'react';
import styles from './Features.module.css';

const Features = () => {
    const stats = [
        { value: '2,245,341', label: 'Пользователей', icon: 'fa-user' },
        { value: '46,328', label: 'Содружеств', icon: 'fa-heart' },
        { value: '828,867', label: 'Вариантов маршрутов', icon: 'fa-route' },
        { value: '1,926,436', label: 'Рублей собрано', icon: 'fa-coins' }
    ];

    return (
        <section className={styles.features}>
            <div className={styles.container}>
                <div className={styles.featuresContent}>
                    <h2 className={styles.featuresTitle}>
                        Сложные алгоритмы, современные технологии и ваше <span className={styles.highlight}>умиротворение</span>
                    </h2>
                </div>
                <div className={styles.featuresStats}>
                    {stats.map((stat, index) => (
                        <div key={index} className={styles.statItem}>
                            <div className={styles.statIcon}>
                                <i className={`fas ${stat.icon}`}></i>
                            </div>
                            <div className={styles.statValue}>{stat.value}</div>
                            <div className={styles.statLabel}>{stat.label}</div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Features;
