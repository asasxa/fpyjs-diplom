/**
 * Класс BaseModal
 * Используется как базовый класс всплывающего окна
 */
class BaseModal {
  constructor( element ) {
    this.elementSemantic = element;
    this.elementDOM = this.elementSemantic[0];
  }

  /**
   * Открывает всплывающее окно
   */
  open() {
    this.elementSemantic.modal('show');
  }

  /**
   * Закрывает всплывающее окно
   */
  close() {
    this.elementSemantic.modal('hide');
  }
}
