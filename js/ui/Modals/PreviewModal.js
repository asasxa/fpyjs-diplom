/**
 * Класс PreviewModal
 * Используется как обозреватель загруженный файлов в облако
 */
class PreviewModal extends BaseModal{
  constructor( element ) {
    super( element );
    this.elementSemantic = element;
    this.elementDOM = this.elementSemantic[0];
    this.content = this.elementDOM.querySelector('.content');
    this.registerEvents();
  }

  /**
   * Добавляет следующие обработчики событий:
   * 1. Клик по крестику на всплывающем окне, закрывает его
   * 2. Клик по контроллерам изображения:
   * Отправляет запрос на удаление изображения, если клик был на кнопке delete
   * Скачивает изображение, если клик был на кнопке download
   */
  registerEvents() {
    this.elementDOM.addEventListener('click', (e) => {
      if (e.target.classList.contains('x')) {
        App.getModal('filePreviewer').close();
      }
    })
    this.content.addEventListener('click', (e) => {
      if (e.target.classList.contains('delete')) {
        e.target.querySelector('i').classList.add('icon', 'spinner', 'loading');
        e.target.classList.add('disabled');
        Yandex.removeFile(e.target.dataset.path, (res) => {
          if (res.status === 204) {
            e.target.closest('.image-preview-container').remove();
          };
        });
      };
      if (e.target.classList.contains('download')) {
        Yandex.downloadFileByUrl(e.target.dataset.file)
      };
    });
  }


  /**
   * Отрисовывает изображения в блоке всплывающего окна
   */
  showImages(data) {
    let stringHTML = '';
    const reversedImages = data.reverse();
    reversedImages.forEach(element => {
      stringHTML += this.getImageInfo(element)
    });
    this.content.innerHTML = stringHTML;
  }

  /**
   * Форматирует дату в формате 2021-12-30T20:40:02+00:00(строка)
   * в формат «30 декабря 2021 г. в 23:40» (учитывая временной пояс)
   * */
  formatDate(date) {
    const datenew = new Date(date);
    const hours = String(datenew.getHours()).padStart(2, "0");
    const minutes = String(datenew.getMinutes()).padStart(2, "0");
    const day = datenew.getDate();
    const monthIndex = datenew.getMonth();
    const year = datenew.getFullYear();
    const months = ["Января", "Февраля", "Марта", "Апреля", "Мая", "Июня", "Июля", "Августа", "Сентября", "Октября", "Ноября", "Декабря"];
    const monthName = months[monthIndex];
    const formattedDate = `${day} ${monthName} ${year} в ${hours}:${minutes}`;
    return formattedDate;
  }

  /**
   * Возвращает разметку из изображения, таблицы с описанием данных изображения и кнопок контроллеров (удаления и скачивания)
   */
  getImageInfo(item) {
    const src = item.sizes[0].url;
    const name = item.name;
    const date = this.formatDate(item.created);
    const size = (Number(item.size)/1024).toFixed(2);
    const path = item.path.split(':')[1];
    const file = item.file;
    return `<div class="image-preview-container">
              <img src='${src}' />
              <table class="ui celled table">
              <thead>
                <tr><th>Имя</th><th>Создано</th><th>Размер</th></tr>
              </thead>
              <tbody>
                <tr><td>${name}</td><td>${date}</td><td>${size}Кб</td></tr>
              </tbody>
              </table>
              <div class="buttons-wrapper">
                <button class="ui labeled icon red basic button delete" data-path='${path}'>
                  Удалить
                  <i class="trash icon"></i>
                </button>
                <button class="ui labeled icon violet basic button download" data-file='${file}'>
                  Скачать
                  <i class="download icon"></i>
                </button>
              </div>
            </div>`
  }
}
