'use strict';

// Модуль отрисовки похожих персонажей
(function () {

  var SHOW_WIZARDS_NUMBER = 4; // count

  var similarWizardTemplate = document.querySelector('#similar-wizard-template');
  var similar = document.querySelector('.setup-similar');
  var similarList = document.querySelector('.setup-similar-list');

  var renderWizardArtifacts = function (wizard) {
    return wizard.artifacts.map(function (it) {
      return it.name;
    }).join('<br>');
  };

  var createElement = function (wizard) {
    var element = similarWizardTemplate.content.cloneNode(true);
    var wizardElement = element.querySelector('.wizard');

    element.querySelector('.setup-similar-label').textContent = wizard.name;
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

    window.popup(wizardElement, function () {
      return renderWizardArtifacts(wizard);
    });

    return element;
  };


  window.render = function (data) {
    var fragment = document.createDocumentFragment();
    similarList.innerHTML = '';

    data.slice(0, SHOW_WIZARDS_NUMBER).forEach(function (wizard) {
      fragment.appendChild(createElement(wizard));
    });

    similarList.appendChild(fragment);
    similar.classList.remove('hidden');
  };

})();
