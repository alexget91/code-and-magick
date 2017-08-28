'use strict';

// Модуль управления натройками персонажа
(function () {

  var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
  var WIZARD_LASTNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
  var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var EYE_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
  var FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];


  var renderWizard = function (template, wizard) {

    var wizardElement = template.cloneNode(true);

    wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

    return wizardElement;
  };

  var createWizard = function (data, template, fragment) {
    for (var i = 0; i < data.length; i++) {
      fragment.appendChild(renderWizard(template, data[i]));
    }
  };


  var wizards = [];
  for (var i = 0; i < 4; i++) {
    var name = WIZARD_NAMES[window.util.getRandomInt(0, WIZARD_NAMES.length)];
    var lastname = WIZARD_LASTNAMES[window.util.getRandomInt(0, WIZARD_LASTNAMES.length)];
    wizards[i] = {
      name: window.util.getRandomInt(0, 2) ? name + ' ' + lastname : lastname + ' ' + name,
      coatColor: COAT_COLORS[window.util.getRandomInt(0, COAT_COLORS.length)],
      eyesColor: EYE_COLORS[window.util.getRandomInt(0, EYE_COLORS.length)]
    };
  }


  var setup = document.querySelector('.setup');
  var setupWizardCoat = setup.querySelector('.setup-wizard .wizard-coat');
  var setupWizardEyes = setup.querySelector('.setup-wizard .wizard-eyes');
  var setupWizardFireball = setup.querySelector('.setup-fireball-wrap');

  var currCoatColor = 0;
  var currEyeColor = 0;
  var currFireballColor = 0;

  var similarListElement = setup.querySelector('.setup-similar-list');
  var similarWizardTemplate = document.querySelector('#similar-wizard-template').content;
  var fragment = document.createDocumentFragment();

  createWizard(wizards, similarWizardTemplate, fragment);
  similarListElement.appendChild(fragment);
  setup.querySelector('.setup-similar').classList.remove('hidden');


  window.colorize(setupWizardCoat, currCoatColor, COAT_COLORS, function (color) {
    setupWizardCoat.style.fill = color;
  });

  window.colorize(setupWizardEyes, currEyeColor, EYE_COLORS, function (color) {
    setupWizardEyes.style.fill = color;
  });

  window.colorize(setupWizardFireball, currFireballColor, FIREBALL_COLORS, function (color) {
    setupWizardFireball.style.backgroundColor = color;
  });
})();
