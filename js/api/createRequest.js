/**
 * Основная функция для совершения запросов по Yandex API.
 * */
const createRequest = (options = {}) => {
    const xhr = new XMLHttpRequest();
    try {
        xhr.open(options.method, options.url + '?' + new URLSearchParams(options.data).toString());
        xhr.responseType = 'json';
        xhr.setRequestHeader('Authorization', options.headers);
        xhr.send();
        xhr.onreadystatechange = () => {
            if (xhr.readyState === xhr.DONE) {
                    options.callback(xhr);
            };
        };
    } catch (e) {
        console.log(e);
    };
};
