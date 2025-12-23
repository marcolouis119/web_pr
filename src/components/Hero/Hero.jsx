import React, { useState } from 'react';
import Button from '../UI/Button';
import styles from './Hero.module.css';
import Modal from '../Modal/Modal';

const Hero = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [location, setLocation] = useState(null);
    const [error, setError] = useState(null);

    const handleStartWalk = async () => {
        try {
            const position = await getUserLocation();
            setLocation(position);
            setError(null);
            setIsModalOpen(true);
        } catch (err) {
            setError(err.message);
            setIsModalOpen(true);
        }
    };

    const getUserLocation = () => {
        return new Promise((resolve, reject) => {
            if (!navigator.geolocation) {
                reject(new Error("Geolocation не поддерживается вашим браузером."));
            } else {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        resolve({
                            latitude: position.coords.latitude,
                            longitude: position.coords.longitude
                        });
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
                        }
                        reject(new Error(errorMessage));
                    }
                );
            }
        });
    };

    return (
        <section className={styles.hero}>
            <div className={styles.container}>
                <div className={styles.heroContent}>
                    <h1 className={styles.heroTitle}>Ваша идеальная прогулка начинается с нас</h1>
                    <p className={styles.heroSubtitle}>
                        Откройте для себя новые маршруты, основываясь на вашем настроении и местоположении
                    </p>
                    <Button
                        variant="primary"
                        size="large"
                        onClick={handleStartWalk}
                    >
                        <i className="fas fa-map-marker-alt"></i> Начать прогулку с моего местоположения
                    </Button>
                    {error && <div className={styles.geolocationError}>{error}</div>}
                </div>
                <div className={styles.heroImage}>
                    <img src="/images/hero-image.jpg" alt="Геройское изображение" />
                </div>
            </div>

            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title="Начать прогулку"
            >
                <form className={styles.walkForm}>
                    <div className={styles.formGroup}>
                        <label htmlFor="mood">Выберите настроение:</label>
                        <select id="mood" name="mood" required>
                            <option value="">Выберите настроение</option>
                            <option value="angry">Злость</option>
                            <option value="happy">Радость</option>
                            <option value="neutral">Нейтральное</option>
                        </select>
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="duration">Продолжительность (минут):</label>
                        <input type="number" id="duration" name="duration" min="10" max="120" defaultValue="30" required />
                    </div>
                    <div className={styles.formGroup}>
                        <label>Ваше местоположение:</label>
                        <div className={styles.locationInfo}>
                            {location ? `Широта: ${location.latitude.toFixed(4)}, Долгота: ${location.longitude.toFixed(4)}`
                                    : error ? error : "Местоположение не определено"}
                        </div>
                    </div>
                    <Button variant="primary" type="submit">Начать</Button>
                </form>
            </Modal>
        </section>
    );
};

export default Hero;
