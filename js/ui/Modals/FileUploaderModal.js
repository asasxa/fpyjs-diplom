/**
 * Класс FileUploaderModal
 * Используется как всплывающее окно для загрузки изображений
 */
class FileUploaderModal extends BaseModal {
  constructor( element ) {
    super( element );
    this.content = this.elementDOM.querySelector('.content');
    this.registerEvents();
  }

  /**
   * Добавляет следующие обработчики событий:
   * 1. Клик по крестику на всплывающем окне, закрывает его
   * 2. Клик по кнопке "Закрыть" на всплывающем окне, закрывает его
   * 3. Клик по кнопке "Отправить все файлы" на всплывающем окне, вызывает метод sendAllImages
   * 4. Клик по кнопке загрузке по контроллерам изображения:
   * убирает ошибку, если клик был по полю вода
   * отправляет одно изображение, если клик был по кнопке отправки
   */
  registerEvents(){
    const closeIcon = this.elementDOM.querySelector('.icon');
    const closeBtn = this.elementDOM.querySelector('.close');
    const sendBtn = this.elementDOM.querySelector('.send-all');
    [closeBtn, closeIcon].forEach(element => {
      element.addEventListener('click', () => App.getModal('fileUploader').close());
    });
    sendBtn.addEventListener('click', () => {
      App.getModal('fileUploader').sendAllImages()
    });

    this.content.addEventListener('click', (e) => {
      if (e.target.tagName.toLowerCase() === 'input') {
        e.target.closest('.input').classList.remove('error');
      };
      if (e.target.classList.contains('upload')) {
        this.sendImage(e.target.closest('.image-preview-container'));
      };
    });

  }

  /**
   * Отображает все полученные изображения в теле всплывающего окна
   */
  showImages(images) {
    const reversedImages = images.reverse();
    let stringHTML = '';
    reversedImages.forEach((image) => {
      stringHTML += this.getImageHTML(image);
    });
    this.content.innerHTML = stringHTML;
  }

  /**
   * Формирует HTML разметку с изображением, полем ввода для имени файла и кнопкной загрузки
   */
  getImageHTML(item) {
    return `<div class="image-preview-container">
               <img src='${item.src}' />
               <div class="ui action input">
                  <input type="text" placeholder="Путь к файлу">
                  <button class="ui button"><i class="upload icon"></i></button>
               </div>
          </div>`
  }

  /**
   * Отправляет все изображения в облако
   */
  sendAllImages() {
    this.content.querySelectorAll('.image-preview-container').
      forEach((item) => {
        this.sendImage(item);
      });
  }

  /**
   * Валидирует изображение и отправляет его на сервер
   */
  sendImage(imageContainer) {
    const input = imageContainer.querySelector('input');
    const validatedInput = input.value.trim();
    if (!input.value.trim()) {
      input.closest('.input').classList.add('error');
      return;
    };
    input.closest('.input').classList.add('disabled');
    const url = input.closest('.image-preview-container').querySelector('img').src;
    Yandex.uploadFile(validatedInput, url, (result) => {
      if (result.status === 202) {
        imageContainer.remove();
      }
      if(this.content.querySelectorAll('.image-preview-container').length === 0) {
        App.getModal('fileUploader').close();
      };
    });
  }
}
