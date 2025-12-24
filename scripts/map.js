// Данные городов России с координатами
export const russianCities = [
    { name: "Москва", coords: [55.7558, 37.6173], users: 125000, routes: 450, donations: 750000 },
    { name: "Санкт-Петербург", coords: [59.9343, 30.3351], users: 98000, routes: 380, donations: 620000 },
    { name: "Новосибирск", coords: [55.0348, 82.9161], users: 72000, routes: 290, donations: 480000 },
    { name: "Екатеринбург", coords: [56.8389, 60.6057], users: 65000, routes: 260, donations: 420000 },
    { name: "Казань", coords: [55.7963, 49.1088], users: 58000, routes: 230, donations: 380000 },
    { name: "Нижний Новгород", coords: [56.3269, 44.0075], users: 55000, routes: 220, donations: 360000 },
    { name: "Челябинск", coords: [55.1625, 61.4611], users: 52000, routes: 210, donations: 340000 },
    { name: "Омск", coords: [54.9924, 73.3686], users: 50000, routes: 200, donations: 320000 },
    { name: "Самара", coords: [53.1959, 50.1002], users: 48000, routes: 190, donations: 300000 },
    { name: "Ростов-на-Дону", coords: [47.2221, 39.7203], users: 46000, routes: 180, donations: 280000 }
];

export function initInteractiveMap() {
    // Создаем карту
    const map = L.map('interactive-map').setView([55.7558, 37.6173], 4);

    // Добавляем слой OpenStreetMap
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // Добавляем маркеры городов
    russianCities.forEach(city => {
        const marker = L.marker(city.coords).addTo(map);

        // Добавляем всплывающее окно с информацией о городе
        marker.bindPopup(`
            <h3>${city.name}</h3>
            <p>Пользователей: ${city.users.toLocaleString()}</p>
            <p>Маршрутов: ${city.routes}</p>
            <p>Собрано: ${city.donations.toLocaleString()} рублей</p>
        `);

        // Добавляем обработчик событий для наведения
        marker.on('mouseover', function() {
            this.openPopup();
        });

        marker.on('mouseout', function() {
            this.closePopup();
        });
    });

    // Добавляем управление масштабом
    L.control.scale().addTo(map);
}
