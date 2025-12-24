// src/pages/MapPage.jsx
import React, { useEffect, useState, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import 'leaflet-routing-machine';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import styles from './MapPage.module.css';
import { useLocation, useParams } from 'react-router-dom';

// Исправляем иконки маркеров
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

// Наши места для разных настроений
const locationsByEmotion = {
  happy: [
    { name: "Летний сад", lat: 59.944909, lng: 30.335550, description: "Красивый парк в центре Петербурга", category: 'happy' },
    { name: "Михайловский сад", lat: 59.939848, lng: 30.332756, description: "Уютный парк с фонтанами", category: 'happy' },
    { name: "Парк 300-летия Санкт-Петербурга", lat: 59.982883, lng: 30.201441, description: "Современный парк с прудами", category: 'happy' },
    { name: "Таврический сад", lat: 59.945436, lng: 30.373136, description: "Исторический парк с прудами", category: 'happy' },
    { name: "ЦПКиО", lat: 59.979326, lng: 30.270000, description: "Центральный парк культуры и отдыха", category: 'happy' }
  ],
  calm: [
    { name: "Ботанический сад", lat: 59.971217, lng: 30.322875, description: "Тихий сад с редкими растениями", category: 'calm' },
    { name: "Парк Сосновка", lat: 60.022310, lng: 30.351073, description: "Спокойный парк на севере города", category: 'calm' },
    { name: "Остров Новая Голландия", lat: 59.929610, lng: 30.287077, description: "Тихий остров в центре города", category: 'calm' },
    { name: "Крестовский остров", lat: 59.971821, lng: 30.259553, description: "Зеленый остров с пляжем", category: 'calm' },
    { name: "Парк Есенина", lat: 59.910379, lng: 30.484814, description: "Уютный парк на Васильевском острове", category: 'calm' }
  ],
  angry: [
    { name: "Каморка", lat: 59.938936, lng: 30.356124, description: "Бар «Каморка» — это место, где вы можете насладиться вкусными коктейлями и настойками, а также необычными закусками, такими как паштет из куриной печени. Интерьер бара выполнен в спокойном и выдержанном стиле, что создает атмосферу уюта и комфорта.", category: 'angry' },
    { name: "Толстый Фраер", lat: 59.934199, lng: 30.328975, description: "Пивной паб, оформленный как подводная лодка. Здесь можно смотреть спортивные события на большом экране и пробовать различные сорта пива, в том числе собственного производства. Особенно гости отмечают фирменное светлое фильтрованное пиво «Жигули» и томатное гозе. В пабе также можно заказать бизнес-ланч.", category: 'angry' },
    { name: "The Hat Bar", lat: 59.938090, lng: 30.346599, description: "The Hat — это джаз-бар от Билли Новикова и совладельца бара «Терминал» Сида Фишера с атмосферой Нью-Йорка первой половины прошлого века и ежедневными джем-сейшенами.", category: 'angry' },
    { name: "O'Hooligans", lat: 59.934874, lng: 30.335219, description: "Бар O'Hooligans — это аутентичный ирландский паб с темными деревянными панелями и уютным полумраком. В заведении три зала, в каждом из которых есть несколько экранов, на которых транслируется футбол.", category: 'angry' },
    { name: "Барслона", lat: 59.9265, lng: 30.3611, description: "Испанский тапас-бар, где можно попробовать тапас, паэлью, сангрию и другие блюда. В меню есть салат с креветками и авокадо, бриошь с тартаром из говядины, фланк-стейк минимальной прожарки, дыню с хамоном, гаспачо из томатов и клубники с гребешками, а также крем-каталан и баскский чизкейк на десерт.", category: 'angry' },
    { name: "Дайкири бар", lat: 59.9410, lng: 30.3241, description: "Коктейльный бар с более чем 400 классическими и авторскими напитками. Здесь работают выпускники заведения, которые стали известными бартендерами и бренд-амбассадорами. Можно заказать выездной бар или коктейльный мастер-класс.", category: 'angry' }
  ],
  default: []
};

// Создаем специальные иконки для разных типов мест
const emotionIcons = {
  happy: L.icon({
    iconUrl: 'https://cdn-icons-png.flaticon.com/512/4727/4727344.png', // Маска
    iconSize: [32, 32],
    iconAnchor: [16, 32]
  }),
  calm: L.icon({
    iconUrl: 'https://cdn-icons-png.flaticon.com/512/4773/4773840.png', // Горы
    iconSize: [32, 32],
    iconAnchor: [16, 32]
  }),
  angry: L.icon({
    iconUrl: 'https://cdn-icons-png.flaticon.com/512/3969/3969804.png', // Горилла
    iconSize: [32, 32],
    iconAnchor: [16, 32]
  }),
  default: L.icon({
    iconUrl: 'https://cdn-icons-png.flaticon.com/512/484/484167.png',
    iconSize: [32, 32],
    iconAnchor: [16, 32]
  })
};

// Описания для разных настроений
const emotionDescriptions = {
  happy: "Радостно насладиться природой",
  calm: "Найти умиротворение",
  angry: "Предлагаем запить ярость лучшими коктейлями города",
  default: "Исследуйте город"
};

const MapPage = () => {
  const [routes, setRoutes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [mapCenter, setMapCenter] = useState([59.9343, 30.3351]);
  const [userPosition, setUserPosition] = useState(null);
  const [selectedRoute, setSelectedRoute] = useState(null);
  const [routingControl, setRoutingControl] = useState(null);
  const [setSelectedMarker] = useState(null);
  const mapRef = useRef(null);

  const location = useLocation();
  const { state } = location;
  const { type } = useParams();

  useEffect(() => {
    const fetchRoutes = async () => {
      try {
        setLoading(true);

        let data = [];
        if (type === 'all') {
          data = [
            ...locationsByEmotion.happy,
            ...locationsByEmotion.calm,
            ...locationsByEmotion.angry,
            ...locationsByEmotion.default
          ];
        } else {
          const emotion = state?.emotion || 'default';
          data = locationsByEmotion[emotion] || locationsByEmotion.default;
        }

        setRoutes(data);
        setMapCenter([59.9343, 30.3351]);

        if (state?.position) {
          setUserPosition([state.position.latitude, state.position.longitude]);
        }

        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchRoutes();
  }, [state, type]);

  // Функция для построения маршрута
  const createRoute = (route) => {
    if (!userPosition || !route) return;

    // Удаляем предыдущий маршрут, если он есть
    if (routingControl) {
      routingControl.remove();
      setRoutingControl(null);
    }

    // Создаем новый маршрут
    const control = L.Routing.control({
      waypoints: [
        L.latLng(userPosition[0], userPosition[1]),
        L.latLng(route.lat, route.lng)
      ],
      routeWhileDragging: true,
      show: false,
      addWaypoints: false,
      draggableWaypoints: false,
      fitSelectedRoutes: false,
      createMarker: function(waypointIndex, waypoint, numberOfWaypoints) {
        if (waypointIndex === 0) {
          return L.marker(waypoint.latLng, {
            icon: L.icon({
              iconUrl: 'https://cdn-icons-png.flaticon.com/512/149/149071.png',
              iconSize: [32, 32],
              iconAnchor: [16, 32]
            })
          });
        }
        return null;
      }
    }).addTo(mapRef.current);

    setRoutingControl(control);
    setSelectedRoute(route);
    setSelectedMarker(null);
  };

  // Очистка маршрута
  const clearRoute = () => {
    if (routingControl) {
      routingControl.remove();
      setRoutingControl(null);
    }
    setSelectedRoute(null);
  };

  // Сохраняем ссылку на карту
  const handleMapReady = (map) => {
    mapRef.current = map;
  };

  // Функция для открытия попапа маркера
  const handleMarkerClick = (route) => {
    setSelectedMarker(route);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Маршруты для прогулок в Санкт-Петербурге</h1>

      {type === 'all' ? (
        <div className={styles.emotionInfo}>
          Показаны все доступные маршруты
        </div>
      ) : state?.emotion ? (
        <div className={styles.emotionInfo}>
          Выбранное настроение: {emotionDescriptions[state.emotion]}
        </div>
      ) : null}

      {userPosition && (
        <div className={styles.userPositionInfo}>
          Ваше местоположение: {userPosition[0].toFixed(4)}, {userPosition[1].toFixed(4)}
        </div>
      )}

      {selectedRoute && (
        <div className={styles.routeInfo}>
          <span>Маршрут построен к: {selectedRoute.name}</span>
          <button onClick={clearRoute} className={styles.clearButton}>
            Очистить маршрут
          </button>
        </div>
      )}

      {loading && <div className={styles.loading}>Загрузка маршрутов...</div>}
      {error && <div className={styles.error}>Ошибка: {error}</div>}

      <div className={styles.mapContainer}>
        <MapContainer
          center={mapCenter}
          zoom={13}
          style={{ height: '100%', width: '100%' }}
          ref={handleMapReady}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />

          {/* Отображаем местоположение пользователя */}
          {userPosition && (
            <Marker
              position={userPosition}
              icon={L.icon({
                iconUrl: 'https://cdn-icons-png.flaticon.com/512/149/149071.png',
                iconSize: [32, 32],
                iconAnchor: [16, 32]
              })}
            >
              <Popup>
                <h3>Ваше местоположение</h3>
                <p>Широта: {userPosition[0].toFixed(4)}</p>
                <p>Долгота: {userPosition[1].toFixed(4)}</p>
              </Popup>
            </Marker>
          )}

          {/* Отображаем маршруты */}
          {routes.map((route) => {
            const icon = emotionIcons[route.category] || emotionIcons.default;

            return (
              <Marker
                key={`${route.name}-${route.lat}-${route.lng}`}
                position={[route.lat, route.lng]}
                icon={icon}
                eventHandlers={{
                  click: () => handleMarkerClick(route)
                }}
              >
                <Popup>
                  <h3>{route.name}</h3>
                  <p>{route.description}</p>
                  {route.category === 'angry' && (
                    <div>
                      <p>Тип: Бар</p>
                    </div>
                  )}
                  {route.category === 'happy' && (
                    <div>
                      <p>Тип: Парк</p>
                      <p>Идеально для: Пикников и прогулок</p>
                    </div>
                  )}
                  {route.category === 'calm' && (
                    <div>
                      <p>Тип: Спокойное место</p>
                      <p>Идеально для: Медитации и релаксации</p>
                    </div>
                  )}
                  <button
                    onClick={() => createRoute(route)}
                    style={{
                      padding: '5px 10px',
                      marginTop: '5px',
                      backgroundColor: '#4CAF50',
                      color: 'white',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer'
                    }}
                  >
                    Проложить маршрут
                  </button>
                </Popup>
              </Marker>
            );
          })}
        </MapContainer>
      </div>
    </div>
  );
};

export default MapPage;