import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import styles from './Map.module.css';

const russianCities = [
    { name: "Москва", coords: [55.7558, 37.6173], users: 125000, routes: 450, donations: 750000 },
    { name: "Санкт-Петербург", coords: [59.9343, 30.3351], users: 98000, routes: 380, donations: 620000 },
    { name: "Новосибирск", coords: [55.0348, 82.9161], users: 72000, routes: 290, donations: 480000 },
    { name: "Екатеринбург", coords: [56.8389, 60.6057], users: 65000, routes: 260, donations: 420000 },
    { name: "Казань", coords: [55.7963, 49.1088], users: 58000, routes: 230, donations: 380000 }
];

const Map = () => {
    // Fix for default marker icons in Leaflet
    useEffect(() => {
        const L = window.L;
        delete L.Icon.Default.prototype._getIconUrl;
        L.Icon.Default.mergeOptions({
            iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
            iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
            shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
        });
    }, []);

    return (
        <section className={styles.mapSection}>
            <div className={styles.container}>
                <h2 className={styles.mapTitle}>Наведите на ваш город, чтобы узнать о нем подробнее</h2>
                <div className={styles.mapContainer}>
                    <MapContainer
                        center={[55.7558, 37.6173]}
                        zoom={4}
                        style={{ height: '500px', width: '100%' }}
                    >
                        <TileLayer
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        />
                        {russianCities.map((city, index) => (
                            <Marker key={index} position={city.coords}>
                                <Popup>
                                    <h3>{city.name}</h3>
                                    <p>Пользователей: {city.users.toLocaleString()}</p>
                                    <p>Маршрутов: {city.routes}</p>
                                    <p>Собрано: {city.donations.toLocaleString()} рублей</p>
                                </Popup>
                            </Marker>
                        ))}
                    </MapContainer>
                </div>
            </div>
        </section>
    );
};

export default Map;
