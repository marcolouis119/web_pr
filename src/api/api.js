// src/api/api.js
const NOMINATIM_API_URL = 'https://nominatim.openstreetmap.org/search';

export const getRoutes = async (emotion) => {
  try {
    let query;

    switch (emotion) {
      case 'happy':
        query = 'парк';
        break;
      case 'calm':
        query = 'лес';
        break;
      case 'angry':
        query = 'стадион';
        break;
      default:
        query = 'парк';
    }

    const response = await fetch(
      `${NOMINATIM_API_URL}?format=json&q=${query}&limit=5`
    );

    if (!response.ok) {
      throw new Error('Ошибка при получении данных от OpenStreetMap');
    }

    const data = await response.json();

    return data.map((item, index) => ({
      id: index + 1,
      name: item.display_name,
      lat: parseFloat(item.lat),
      lng: parseFloat(item.lon),
      distance: Math.random() * 5 + 1,
      difficulty: getRandomDifficulty(),
      emotion: emotion || 'default'
    }));

  } catch (error) {
    console.error('Ошибка при получении данных:', error);
    throw error;
  }
};

function getRandomDifficulty() {
  const difficulties = ['легкий', 'средний', 'сложный'];
  return difficulties[Math.floor(Math.random() * difficulties.length)];
}

export const postUserData = async (data) => {
  try {
    console.log('Отправка данных:', data);
    return { success: true, message: 'Данные успешно сохранены' };
  } catch (error) {
    console.error('Ошибка при отправке данных:', error);
    throw error;
  }
};
