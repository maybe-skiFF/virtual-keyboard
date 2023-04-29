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
      button.classList.add(`keyboard-btn-width-${keyboardData[key].width}`);
      button.dataset.code = key;
      element.appendChild(button);
    });

    return element;
  }

  shiftedButton() {
    this.capitalisation = this.capitalisation === 'small' ? 'shifted' : 'small';
  }

  reRenderButtons() {
    const buttons = document.querySelectorAll('.keyboard-btn');
    for (let i = 0; i < buttons.length; i++) {
      buttons[i].textContent = keyboardData[buttons[i].dataset.code].key[this.capitalisation][this.lang];
    }
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
    const shiftKeys = document.querySelectorAll('[data-code*="Shift');
    const capslockKey = document.querySelectorAll('[data-code="CapsLock"');

    document.addEventListener('keydown', (event) => {
      if (keyboardData[event.code]) {
        event.preventDefault();
        if (event.code === 'ShiftLeft' || event.code === 'ShiftRight') {
          if (!Array.from(shiftKeys).some((elem) => elem.classList.contains('keyboard-btn-active'))) {
            this.shiftedButton();
          }

          this.reRenderButtons();
        }

        document.querySelector(`[data-code="${event.code}"]`).classList.add('keyboard-btn-active');


      }
    })



    document.addEventListener('keyup', (event) => {
      if (keyboardData[event.code]) {
        event.preventDefault();
        document.querySelector(`[data-code="${event.code}"]`).classList.remove('keyboard-btn-active');

        if (event.code === 'ShiftLeft' || event.code === 'ShiftRight') {
          this.shiftedButton();
          this.reRenderButtons();
        }
      }
    })








  }











}

export default Keyboard;