'use strict';

// Модуль отрисовки мага в окне настройки персонажа
(function () {

  var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var EYE_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
  var FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

  var setup = document.querySelector('.setup');
  var setupWizardCoat = setup.querySelector('.setup-wizard .wizard-coat');
  var setupWizardEyes = setup.querySelector('.setup-wizard .wizard-eyes');
  var setupWizardFireball = setup.querySelector('.setup-fireball-wrap');

  var currCoatColor = 0;
  var currEyeColor = 0;
  var currFireballColor = 0;

  var wizard = {
    onEyesChange: function () {},
    onCoatChange: function () {}
  };

  var fillElement = function (element, color) {
    element.style.fill = color;
  };

  var changeElementBackground = function (element, color) {
    element.style.backgroundColor = color;
  };

  var changeClothesColor = function (element, color) {
    var classes = element.classList;

    fillElement(element, color);
    if (classes.contains('wizard-coat')) {
      wizard.onCoatChange(color);
    } else if (classes.contains('wizard-eyes')) {
      wizard.onEyesChange(color);
    }
  };


  // Смена цветов экипировки
  window.colorizeElement(setupWizardCoat, currCoatColor, COAT_COLORS, changeClothesColor);
  window.colorizeElement(setupWizardEyes, currEyeColor, EYE_COLORS, changeClothesColor);
  window.colorizeElement(setupWizardFireball, currFireballColor, FIREBALL_COLORS, changeElementBackground);

  window.wizard = wizard;

})();
