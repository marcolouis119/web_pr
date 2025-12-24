// src/components/EmotionModal/EmotionModal.jsx
import React, { useState } from 'react';
import styles from './EmotionModal.module.css';
import { useNavigate } from 'react-router-dom';

const EmotionModal = ({ isOpen, onClose, emotion }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [position, setPosition] = useState(null);
  const navigate = useNavigate();

  const handleGetLocation = () => {
    setLoading(true);
    setError(null);

    if (!navigator.geolocation) {
      setError("Geolocation не поддерживается вашим браузером.");
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setPosition({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        });
        setLoading(false);
      },
      (error) => {
        let errorMessage = "Невозможно получить ваше местоположение.";
        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = "Пользователь запретил доступ к геолокации.";
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage = "Информация о местоположении недоступна.";
            break;
          case error.TIMEOUT:
            errorMessage = "Время ожидания запроса геолокации истекло.";
            break;
          default:
            console.log('Неизвестная ошибка геолокации:', error.code);
            break;

        }
        setError(errorMessage);
        setLoading(false);
      }
    );
  };

  const handleGoToMap = () => {
    navigate('/map', {
      state: {
        emotion,
        position
      }
    });
  };

  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={e => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={onClose}>×</button>
        <h2 className={styles.title}>Настройте маршрут</h2>
        <p className={styles.message}>
          Ваше настроение "{emotion}" учтено. Теперь вы можете выбрать маршрут на карте.
        </p>

        {!position && (
          <button
            className={styles.locationButton}
            onClick={handleGetLocation}
            disabled={loading}
          >
            {loading ? 'Определение местоположения...' : 'Выбрать мое местоположение'}
          </button>
        )}

        {error && <div className={styles.error}>{error}</div>}

        {position && (
          <div className={styles.locationInfo}>
            Ваше местоположение: {position.latitude.toFixed(4)}, {position.longitude.toFixed(4)}
            <button className={styles.confirmButton} onClick={handleGoToMap}>
              Продолжить на карте
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmotionModal;
