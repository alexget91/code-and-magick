'use strict';

var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARD_LASTNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYE_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
var FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;


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

var onPopupEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    if (evt.target.classList.contains('setup-user-name')) {
      evt.target.blur();
    } else {
      closePopup();
    }
  }
};

var openPopup = function () {
  setup.classList.remove('hidden');
  document.addEventListener('keydown', onPopupEscPress);
};

var closePopup = function () {
  setup.classList.add('hidden');
  document.removeEventListener('keydown', onPopupEscPress);
};

// Получает следующий элемент массива
var getNextItem = function (counter, arr) {
  if (++counter >= arr.length) {
    counter = 0;
  }
  return counter;
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

var setup = document.querySelector('.setup');
var setupOpen = document.querySelector('.setup-open');
var setupClose = setup.querySelector('.setup-close');
var setupSave = setup.querySelector('.setup-submit');
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


setupOpen.addEventListener('click', function () {
  openPopup();
});

setupOpen.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    openPopup();
  }
});

setupClose.addEventListener('click', function () {
  closePopup();
});

setupClose.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    closePopup();
  }
});

setupSave.addEventListener('click', function () {
  closePopup();
});

setupSave.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    closePopup();
  }
});

setupWizardCoat.addEventListener('click', function (evt) {
  currCoatColor = getNextItem(currCoatColor, COAT_COLORS);
  evt.target.style.fill = COAT_COLORS[currCoatColor];
});

setupWizardEyes.addEventListener('click', function (evt) {
  currEyeColor = getNextItem(currEyeColor, EYE_COLORS);
  evt.target.style.fill = EYE_COLORS[currEyeColor];
});

setupWizardFireball.addEventListener('click', function (evt) {
  currFireballColor = getNextItem(currFireballColor, FIREBALL_COLORS);
  evt.target.style.backgroundColor = FIREBALL_COLORS[currFireballColor];
});
