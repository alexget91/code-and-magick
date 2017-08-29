'use strict';

// Модуль управления настройками персонажа
(function () {

  var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
  var WIZARD_LASTNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
  var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var EYE_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
  var FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];


  var fillElement = function (element, color) {
    element.style.fill = color;
  };

  var changeElementBackground = function (element, color) {
    element.style.backgroundColor = color;
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

  // Смена цветов экипировки
  window.colorizeElement(setupWizardCoat, currCoatColor, COAT_COLORS, fillElement);
  window.colorizeElement(setupWizardEyes, currEyeColor, EYE_COLORS, fillElement);
  window.colorizeElement(setupWizardFireball, currFireballColor, FIREBALL_COLORS, changeElementBackground);


  // Перетаскивание предметов в окне настроек

  var shopElement = document.querySelector('.setup-artifacts-shop');
  var draggedItem = null;
  var artifactsElement = document.querySelector('.setup-artifacts');
  var artifactsElementCells = artifactsElement.querySelectorAll('.setup-artifacts-cell');

  var showDragCells = function () {
    for (i = 0; i < artifactsElementCells.length; i++) {
      if (!artifactsElementCells[i].children.length) {
        artifactsElementCells[i].style.outline = '2px dashed red';
      }
    }
  };

  var hideDragCells = function () {
    for (i = 0; i < artifactsElementCells.length; i++) {
      artifactsElementCells[i].style.outline = '';
    }
  };

  var checkDragCell = function (evt, action) {
    var cell = evt.target.classList.contains('setup-artifacts-cell') ? evt.target : evt.target.parentElement;
    if (!cell.children.length) {
      action(cell);
    }
  };

  var onSetupItemDragStart = function (evt, cloneNode) {
    if (evt.target.tagName.toLowerCase() === 'img') {
      draggedItem = cloneNode ? evt.target.cloneNode(true) : evt.target;
      evt.dataTransfer.setData('text/plain', evt.target.alt);
      showDragCells();
    }
  };

  shopElement.addEventListener('dragstart', function (evt) {
    onSetupItemDragStart(evt, true);
  });

  shopElement.addEventListener('dragend', function () {
    hideDragCells();
  });

  artifactsElement.addEventListener('dragstart', function (evt) {
    onSetupItemDragStart(evt);
  });

  artifactsElement.addEventListener('dragend', function () {
    hideDragCells();
  });

  artifactsElement.addEventListener('dragover', function (evt) {
    evt.preventDefault();
    return false;
  });

  artifactsElement.addEventListener('drop', function (evt) {
    checkDragCell(evt, function (cell) {
      cell.appendChild(draggedItem);
    });
    evt.target.style.backgroundColor = '';
    evt.preventDefault();
  });

  artifactsElement.addEventListener('dragenter', function (evt) {
    checkDragCell(evt, function (cell) {
      cell.style.backgroundColor = 'yellow';
    });
    evt.preventDefault();
  });

  artifactsElement.addEventListener('dragleave', function (evt) {
    evt.target.style.backgroundColor = '';
    evt.preventDefault();
  });

})();
