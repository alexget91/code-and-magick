'use strict';

var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARD_LASTNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYE_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];

var getRandomInt = function (min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
};

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
  var name = WIZARD_NAMES[getRandomInt(0, WIZARD_NAMES.length)];
  var lastname = WIZARD_LASTNAMES[getRandomInt(0, WIZARD_LASTNAMES.length)];
  wizards[i] = {
    name: getRandomInt(0, 2) ? name + ' ' + lastname : lastname + ' ' + name,
    coatColor: COAT_COLORS[getRandomInt(0, COAT_COLORS.length)],
    eyesColor: EYE_COLORS[getRandomInt(0, EYE_COLORS.length)]
  };
}

var userDialog = document.querySelector('.setup');
userDialog.classList.remove('hidden');

var similarListElement = userDialog.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template').content;
var fragment = document.createDocumentFragment();

createWizard(wizards, similarWizardTemplate, fragment);
similarListElement.appendChild(fragment);
userDialog.querySelector('.setup-similar').classList.remove('hidden');
