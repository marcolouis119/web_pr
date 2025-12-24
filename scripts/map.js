import { cities } from './data.js';
import { showCityTooltip, hideCityTooltip } from './ui.js';

export function initMap() {
    const mapImg = document.getElementById('map-img');
    if (!mapImg) return;

    // Простая реализация интерактивной карты
    mapImg.addEventListener('mousemove', (e) => {
        const rect = mapImg.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        // Простой пример: показываем информацию о городе при наведении
        // В реальном приложении вам нужно будет использовать координаты городов
        const city = getCityAtPosition(x, y);
        if (city) {
            showCityTooltip(e.clientX, e.clientY, city);
        } else {
            hideCityTooltip();
        }
    });

    mapImg.addEventListener('mouseleave', hideCityTooltip);
}

function getCityAtPosition(x, y) {


    // Пример: возвращаем случайный город для демонстрации
    if (x > 100 && x < 500 && y > 100 && y < 400) {
        return cities[Math.floor(Math.random() * cities.length)];
    }
    return null;
}
