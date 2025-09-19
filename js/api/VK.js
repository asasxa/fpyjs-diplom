/**
 * Класс VK
 * Управляет изображениями из VK. С помощью VK API.
 * С помощью этого класса будет выполняться загрузка изображений из vk.
 * Имеет свойства ACCESS_TOKEN и lastCallback
 * */
class VK {

  static ACCESS_TOKEN = '958eb5d439726565e9333aa30e50e0f937ee432e927f0dbd541c541887d919a7c56f95c04217915c32008';
  static lastCallback;

  /**
   * Получает изображения
   * */
  static get(id = '', callback){
    this.lastCallback = callback;
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.id = 'add-script';
    script.src = `https://api.vk.com/method/photos.get?owner_id=${id}&album_id=profile&v=5.131&access_token=${this.ACCESS_TOKEN}&callback=collbackFunc`;
    document.getElementsByTagName("head")[0].appendChild(script);
    window['collbackFunc'] = result => this.processData(result);
  };

  /**
   * Передаётся в запрос VK API для обработки ответа.
   * Является обработчиком ответа от сервера.
   */
  static processData(result){
    document.getElementById('add-script').remove();
    if(result.error) {
      alert(result.error.error_msg);
      return;
    }
    let array = [];
    for(const item of result.response.items) {
      const r = item.sizes.pop();
      array.push(r.url);
    };
    this.lastCallback(array);
    this.lastCallback = () => {};

  }
}
