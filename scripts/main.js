import { emotions, stats } from './data.js';
import { showModal, hideModal, updateStats, createEmotionCards } from './ui.js';
import { initInteractiveMap } from './map.js';
import { initGeolocationButton } from './geolocation.js';

// Инициализация приложения
document.addEventListener('DOMContentLoaded', () => {
    // Обновляем статистику
    updateStats(stats);

    // Создаем карточки эмоций
    createEmotionCards(emotions);

    // Инициализируем интерактивную карту
    initInteractiveMap();

    // Инициализируем кнопку геолокации
    initGeolocationButton('start-walk-btn', (position) => {
        showModal('walk-modal');
        document.getElementById('walk-form').dataset.latitude = position.latitude;
        document.getElementById('walk-form').dataset.longitude = position.longitude;
        document.getElementById('location-info').textContent =
            `Широта: ${position.latitude.toFixed(4)}, Долгота: ${position.longitude.toFixed(4)}`;
    });

    document.getElementById('walk-form').addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const mood = formData.get('mood');
        const duration = formData.get('duration');
        const latitude = e.target.dataset.latitude;
        const longitude = e.target.dataset.longitude;

        if (latitude && longitude) {
            alert(`Прогулка начата! Настроение: ${mood}, Продолжительность: ${duration} минут, Ваше местоположение: ${latitude}, ${longitude}`);
        } else {
            alert(`Прогулка начата! Настроение: ${mood}, Продолжительность: ${duration} минут`);
        }

        hideModal('walk-modal');
    });

    // Обработчик для карточек эмоций
    document.getElementById('emotion-cards').addEventListener('click', (e) => {
        const emotionBtn = e.target.closest('a[data-emotion]');
        if (emotionBtn) {
            const emotionId = emotionBtn.getAttribute('data-emotion');
            alert(`Вы выбрали эмоцию: ${emotionId}`);
        }
    });

    // Обработчик для теста эмоций
    document.getElementById('emotion-test-link').addEventListener('click', (e) => {
        e.preventDefault();
        alert('Хорошо! Тест эмоций будет доступен в следующей версии!');
    });
});
