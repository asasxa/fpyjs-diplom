/**
 * Класс SearchBlock
 * Используется для взаимодействием со строкой ввода и поиска изображений
 * */
class SearchBlock {
  constructor( element ) {
    this.searchBlock = element;
    this.registerEvents();
  }

  /**
   * Выполняет подписку на кнопки "Заменить" и "Добавить"
   * Клик по кнопкам выполняет запрос на получение изображений и отрисовывает их,
   * только клик по кнопке "Заменить" перед отрисовкой очищает все отрисованные ранее изображения
   */
  registerEvents(){
    this.searchBlock.addEventListener("click", (e) => {
      const inputData = this.searchBlock.querySelector('input').value.trim();
      if (!inputData){
        return;
      };
      if (e.target.classList.contains("replace")) {
        App.imageViewer.clear();
      };
      VK.get(inputData, App.imageViewer.drawImages.bind(App.imageViewer));
    });
  }

}
