'use strict';

// Логика работы в волшебником
(function () {

  var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var EYE_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
  var FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

  var fillElement = function (element, color) {
    element.style.fill = color;
  };

  var changeElementBackground = function (element, color) {
    element.style.backgroundColor = color;
  };

  var Wizard = function (data) {
    this.name = data.name;
    this.coatColor = data.colorCoat;
    this.eyesColor = data.colorEyes;
    this.fireballColor = data.colorFireball;
    this.artifacts = data.artifacts;
  };

  Wizard.prototype = {
    currCoatIndex: 0,
    currEyeIndex: 0,
    currFireballIndex: 0,
    setName: function (name) {
      if (!name) {
        throw new Error('Имя не задано');
      }
      if (name.length > 30) {
        throw new Error('Недопустимое значение имени мага: ' + name);
      }
      this.name = name;
      this.onChange(this);
      return name;
    },
    changeCoatColor: function (coatElement) {
      this.currCoatIndex = window.colorizeElement(coatElement, this.currCoatIndex, COAT_COLORS, fillElement);
      this.coatColor = COAT_COLORS[this.currCoatIndex];
      this.onChange(this);
    },
    changeEyesColor: function (eyesElement) {
      this.currEyeIndex = window.colorizeElement(eyesElement, this.currEyeIndex, EYE_COLORS, fillElement);
      this.eyesColor = EYE_COLORS[this.currEyeIndex];
      this.onChange(this);
    },
    changeFireballColor: function (fireballElement) {
      this.currFireballIndex = window.colorizeElement(fireballElement, this.currFireballIndex, FIREBALL_COLORS, changeElementBackground);
      this.fireballColor = FIREBALL_COLORS[this.currFireballIndex];
      this.onChange(this);
    },
    onChange: function (wizard) {
      return wizard;
    }
  };

  window.Wizard = Wizard;

})();
