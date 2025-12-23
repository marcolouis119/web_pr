import React from 'react';
import Button from '../UI/Button';
import styles from './Emotions.module.css';

const emotions = [
    {
        id: 'angry',
        title: 'Не знаете куда деть ярость?',
        image: '/images/angry-emotion.jpg',
        colors: ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57']
    },
    {
        id: 'neutral',
        title: 'Сегодня был просто хороший день?',
        image: '/images/happy-emotion.jpg',
        colors: ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57']
    },
    {
        id: 'happy',
        title: 'Все просто чудо и я хочу больше',
        image: '/images/neutral-emotion.jpg',
        colors: ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57']
    }
];

const Emotions = () => {
    const handleEmotionSelect = (emotionId) => {
        alert(`Вы выбрали эмоцию: ${emotionId}`);
    };

    return (
        <section className={styles.emotionSection}>
            <div className={styles.container}>
                <h2 className={styles.emotionTitle}>Настройтесь на нужную эмоцию</h2>
                <div className={styles.emotionCards}>
                    {emotions.map(emotion => (
                        <div key={emotion.id} className={styles.emotionCard}>
                            <div className={styles.emotionImage}>
                                <img src={emotion.image} alt={emotion.title} />
                            </div>
                            <h3 className={styles.emotionCardTitle}>{emotion.title}</h3>
                            <div className={styles.emotionColors}>
                                {emotion.colors.map((color, index) => (
                                    <div
                                        key={index}
                                        className={styles.colorOption}
                                        style={{ backgroundColor: color }}
                                    ></div>
                                ))}
                            </div>
                            <Button
                                variant="dark"
                                onClick={() => handleEmotionSelect(emotion.id)}
                            >
                                Выбрать
                            </Button>
                        </div>
                    ))}
                </div>
                <p className={styles.emotionFooter}>
                    Можно пройти <a href="#" className={styles.link}>тест</a>
                </p>
            </div>
        </section>
    );
};

export default Emotions;
