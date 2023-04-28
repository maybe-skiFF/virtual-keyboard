import keyboardData from "./data/keyboardData.js";


class Keyboard {
  constructor() {
    this.lang = localStorage.getItem('keyboardLang') || 'en';
    this.capitalisation = 'small';
    this.capslock = false;
  }

  createButtons() {
    const element = document.createDocumentFragment();
    const keyCode = Object.keys(keyboardData);
    keyCode.forEach((key) => {
      const button = document.createElement('div');
      button.textContent = keyboardData[key].key[this.capitalisation][this.lang];
      button.classList.add('keyboard-btn');
      button.dataset.code = key;
      element.appendChild(button);
    });

    return element;
  }

  render() {
    const container = document.createElement('div');
    container.classList.add('container');
    const textarea = document.createElement('textarea');
    textarea.classList.add('textarea');
    container.appendChild(textarea);
    const keyboard = document.createElement('div');
    keyboard.classList.add('keyboard');
    container.appendChild(keyboard);
    keyboard.appendChild(this.createButtons());
    document.body.appendChild(container);
  }











}

export default Keyboard;