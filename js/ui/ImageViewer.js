/**
 * Класс ImageViewer
 * Используется для взаимодействием блоком изображений
 * */
class ImageViewer {
  constructor( element ) {
    this.element = element;
    this.previewImage = document.querySelector('.image');
    this.imageBlock = document.querySelector('.images-list').querySelector('.grid');
    this.selectBtn = document.querySelector('.select-all');
    this.sendBtn = document.querySelector('.send');
    this.registerEvents();
  }

  /**
   * Добавляет следующие обработчики событий:
   * 1. Клик по изображению меняет класс активности у изображения
   * 2. Двойной клик по изображению отображает изображаения в блоке предпросмотра
   * 3. Клик по кнопке выделения всех изображений проверяет у всех ли изображений есть класс активности?
   * Добавляет или удаляет класс активности у всех изображений
   * 4. Клик по кнопке "Посмотреть загруженные файлы" открывает всплывающее окно просмотра загруженных файлов
   * 5. Клик по кнопке "Отправить на диск" открывает всплывающее окно для загрузки файлов
   */
  registerEvents(){
    this.imageBlock.addEventListener("dblclick", (e) => {
      if (e.target.tagName.toLowerCase() === "img"){
        this.previewImage.src = e.target.src;
      };
    });

    this.imageBlock.addEventListener("click", (e) => {
      if (e.target.tagName.toLowerCase() === "img"){
        e.target.classList.toggle('selected');
      };
      this.checkButtonText();
    });

    this.selectBtn.addEventListener("click", () => {
      const images = this.imageBlock.querySelectorAll('img');
      const numberSelectedImages = Array.from(images).filter(image => image.classList.contains('selected')).length;
      if (numberSelectedImages > 0) {
        for (const image of images) {
          image.classList.remove('selected');
        };
      } else {
        for (const image of images) {
          image.classList.add('selected');
        };
      };
      this.checkButtonText();
    });

    this.sendBtn.addEventListener("click", () => {
      const modal = App.getModal('fileUploader');
      const images = this.imageBlock.querySelectorAll('img');
      const selectedImages = Array.from(images).filter(image => image.classList.contains('selected'));
      modal.open();
      modal.showImages(selectedImages);

    });

    document.querySelector('.show-uploaded-files').addEventListener('click', () => {
      const modal = App.getModal('filePreviewer');
      modal.innerHTML = '<i class="asterisk loading icon massive"></i>'
      modal.open();
      Yandex.getUploadedFiles(((res) => {
        modal.showImages(res.response.items);
      }));
    });
  }

  /**
   * Очищает отрисованные изображения
   */
  clear() {
    for (const child of this.imageBlock.querySelectorAll('.image-wrapper')) {
      child.remove();
    };
  }

  /**
   * Отрисовывает изображения.
  */
  drawImages(images) {
    if (images.length === 0) {
      document.querySelector('.select-all').classList.add('disabled');
      return;
    };
    document.querySelector('.select-all').classList.remove('disabled');

    for (const image of images){
      const verificatedSrc = document.createElement('img');
      verificatedSrc.src = image;
      verificatedSrc.onload = () => {
        const img = `<div class='four wide column ui medium image-wrapper'>
                      <img src='${image}' />
                  </div>`;
        this.imageBlock.insertAdjacentHTML('afterbegin', img);
      };
    };
  }

  /**
   * Контроллирует кнопки выделения всех изображений и отправки изображений на диск
   */
  checkButtonText(){
    const images = this.imageBlock.querySelectorAll('img');
    const numberSelectedImages = Array.from(images).filter(image => image.classList.contains('selected')).length;
    if (numberSelectedImages === images.length) {
      this.selectBtn.textContent = "Снять выделение";
    } else {
      this.selectBtn.textContent = "Выбрать всё";
    };
    if (numberSelectedImages > 0) {
      this.sendBtn.classList.remove('disabled');
    } else {
      this.sendBtn.classList.add('disabled');
    };
  };
}
