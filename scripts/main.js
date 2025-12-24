import { emotions, stats } from './data.js';
import { showModal, hideModal, updateStats, createEmotionCards } from './ui.js';
import { initMap } from './map.js';

// Инициализация приложения
document.addEventListener('DOMContentLoaded', () => {
    // Обновляем статистику
    updateStats(stats);

    // Создаем карточки эмоций
    createEmotionCards(emotions);

    // Инициализируем карту
    initMap();

    // Обработчики событий для кнопок
    document.getElementById('start-walk-btn').addEventListener('click', (e) => {
        e.preventDefault();
        showModal('walk-modal');
    });

    document.getElementById('close-modal').addEventListener('click', () => {
        hideModal('walk-modal');
    });

    document.getElementById('walk-form').addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const mood = formData.get('mood');
        const duration = formData.get('duration');

        alert(`Прогулка начата! Настроение: ${mood}, Продолжительность: ${duration} минут`);
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
        alert('Круто! Тест скоро');
    });
});
