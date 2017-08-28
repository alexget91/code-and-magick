'use strict';

// Модуль выбора цвета экипировки в настройках персонажа
(function () {

  window.colorize = function (element, currColor, allColors, onColorChange) {
    element.addEventListener('click', function () {
      currColor = window.util.getNextItem(currColor, allColors);
      onColorChange(allColors[currColor]);
    });
  };
})();
