// Модуль для работы с Geolocation API
export function getUserLocation() {
    return new Promise((resolve, reject) => {
        if (!navigator.geolocation) {
            reject(new Error("Geolocation не поддерживается вашим браузером."));
        } else {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    resolve({ latitude, longitude });
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
}

export function initGeolocationButton(buttonId, callback) {
    const button = document.getElementById(buttonId);
    if (!button) return;

    button.addEventListener('click', async (e) => {
        e.preventDefault();
        try {
            const position = await getUserLocation();
            callback(position);
        } catch (error) {
            alert(error.message);
        }
    });
}
