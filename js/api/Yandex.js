/**
 * Класс Yandex
 * Используется для управления облаком.
 * Имеет свойство HOST
 * */
class Yandex {
  static HOST = 'https://cloud-api.yandex.net/v1/disk';

  /**
   * Метод формирования и сохранения токена для Yandex API
   */
  static getToken(){
    let token = localStorage.getItem('yandex_token');
    if (token === null || !token) {
      localStorage.setItem('yandex_token', prompt('Укажите Яндекс-токен'));
    };
    return `OAuth ${localStorage.getItem('yandex_token')}`;
  }

  /**
   * Метод загрузки файла в облако
   */
  static uploadFile(path, url, callback){
    const optionsUploadFile = {
      method: 'POST',
      headers: this.getToken(),
      url: this.HOST + '/resources/upload/',
      data: {path:path, url: url},
      callback: callback,
    };
    createRequest(optionsUploadFile)
  }

  /**
   * Метод удаления файла из облака
   */
  static removeFile(path, callback){
    const options = {
      method: 'DELETE',
      headers: this.getToken(),
      url: this.HOST + '/resources',
      data: {path:path},
      callback: callback,
    }
    createRequest(options)
  }

  /**
   * Метод получения всех загруженных файлов в облаке
   */
  static getUploadedFiles(callback){
    const options = {
      method: 'GET',
      headers: this.getToken(),
      url: this.HOST + '/resources/files/',
      data: {media_type:'image'},
      callback: callback,
    }
    createRequest(options);
  }

  /**
   * Метод скачивания файлов
   */
  static downloadFileByUrl(url){
    // const res = await fetch (url);
    // const blob = await res.blob();
    // const hrefurl =  window.URL.createObjectURL(blob);
    const a = document.createElement ('a');
    a.download = '';
    a.href = url;
    a.click();
  }
}
