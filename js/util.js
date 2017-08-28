'use strict';

// Модуль вспомогательных функций
(function () {

  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;


  window.util = {
    getRandomInt: function (min, max) {
      return Math.floor(Math.random() * (max - min)) + min;
    },
    // Получает следующий элемент массива (циклически)
    getNextItem: function (counter, arr) {
      if (++counter >= arr.length) {
        counter = 0;
      }
      return counter;
    },
    isEscEvent: function (evt, action) {
      if (evt.keyCode === ESC_KEYCODE) {
        action(evt);
      }
    },
    isEnterEvent: function (evt, action) {
      if (evt.keyCode === ENTER_KEYCODE) {
        action(evt);
      }
    }
  };
})();
