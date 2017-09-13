'use strict';

// Переключение цвета экипировки в настройках персонажа
(function () {

  window.colorizeElement = function (element, currColor, allColors, onColorChange) {
    currColor = window.util.getNextItem(currColor, allColors);
    onColorChange(element, allColors[currColor]);
    return currColor;
  };

})();
