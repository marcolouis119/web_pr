// Функции для работы с интерфейсом
export function showModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'flex';
    }
}

export function hideModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'none';
    }
}

export function updateStats(stats) {
    document.getElementById('users-count').textContent = stats.users.toLocaleString();
    document.getElementById('communities-count').textContent = stats.communities.toLocaleString();
    document.getElementById('routes-count').textContent = stats.routes.toLocaleString();
    document.getElementById('donations-count').textContent = stats.donations.toLocaleString();
}

export function createEmotionCards(emotions) {
    const container = document.getElementById('emotion-cards');
    if (!container) return;

    container.innerHTML = '';

    emotions.forEach(emotion => {
        const card = document.createElement('div');
        card.className = 'emotion-card';

        card.innerHTML = `
            <div class="emotion-image">
                <img src="${emotion.image}" alt="${emotion.title}">
            </div>
            <h3 class="emotion-card-title">${emotion.title}</h3>
            <div class="emotion-colors">
                ${emotion.colors.map(color => `<div class="color-option" style="background-color: ${color};"></div>`).join('')}
            </div>
            <a href="#" class="btn btn-dark" data-emotion="${emotion.id}">Выбрать</a>
        `;

        container.appendChild(card);
    });
}

export function showCityTooltip(x, y, city) {
    const tooltip = document.getElementById('city-tooltip');
    if (!tooltip) return;

    tooltip.innerHTML = `
        <h3>${city.name}</h3>
        <p>Пользователей: ${city.users.toLocaleString()}</p>
        <p>Маршрутов: ${city.routes}</p>
        <p>Собрано: ${city.donations.toLocaleString()} рублей</p>
    `;

    tooltip.style.display = 'block';
    tooltip.style.left = `${x + 20}px`;
    tooltip.style.top = `${y + 20}px`;
}

export function hideCityTooltip() {
    const tooltip = document.getElementById('city-tooltip');
    if (tooltip) {
        tooltip.style.display = 'none';
    }
}
