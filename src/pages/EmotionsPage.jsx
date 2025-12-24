import React, { useState } from 'react';
import styles from './EmotionsPage.module.css';
import EmotionModal from '../components/EmotionModal/EmotionModal';

const emotions = [
  {
    id: 'happy',
    title: 'Радость',
    description: 'Вы чувствуете себя счастливым и хотите поделиться своей радостью с миром',
    image: '/images/happy-emotion.jpg',
    colors: ['#FFD700', '#FF8C00', '#FF69B4']
  },
  {
    id: 'calm',
    title: 'Спокойствие',
    description: 'Вы ищете умиротворения и хотите насладиться тишиной',
    image: '/images/neutral-emotion.jpg',
    colors: ['#87CEEB', '#98FB98', '#AFEEEE']
  },
  {
    id: 'angry',
    title: 'Злость',
    description: 'Не знаете куда деть ярость?',
    image: '/images/angry-emotion.jpg',
    colors: ['#FF4500', '#DC143C', '#8B0000']
  }
];

const EmotionsPage = () => {
  const [selectedEmotion, setSelectedEmotion] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleEmotionSelect = (emotionId) => {
    setSelectedEmotion(emotionId);
    setShowModal(true);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Выберите ваше настроение</h1>
      <div className={styles.emotionsGrid}>
        {emotions.map(emotion => (
          <div
            key={emotion.id}
            className={styles.emotionCard}
            onClick={() => handleEmotionSelect(emotion.id)}
          >
            <img src={emotion.image} alt={emotion.title} className={styles.emotionImage} />
            <h2 className={styles.emotionTitle}>{emotion.title}</h2>
            <p className={styles.emotionDescription}>{emotion.description}</p>
            <div className={styles.colors}>
              {emotion.colors.map((color, index) => (
                <div key={index} className={styles.color} style={{ backgroundColor: color }}></div>
              ))}
            </div>
            <button className={styles.selectButton}>Выбрать</button>
          </div>
        ))}
      </div>

      <EmotionModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        emotion={selectedEmotion}
      />
    </div>
  );
};

export default EmotionsPage;
