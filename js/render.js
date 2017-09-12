'use strict';

// Модуль отрисовки похожих персонажей
(function () {

  var similarWizardTemplate = document.querySelector('#similar-wizard-template').content;
  var similar = document.querySelector('.setup-similar');
  var similarList = document.querySelector('.setup-similar-list');

  var renderWizardArtifacts = function (wizard) {
    return wizard.artifacts.map(function (it) {
      return it.name;
    }).join('<br>');
  };

  var renderWizard = function (wizard) {
    var element = similarWizardTemplate.cloneNode(true);
    var wizardElement = element.querySelector('.wizard');

    element.querySelector('.setup-similar-label').textContent = wizard.name;
    element.querySelector('.wizard-coat').style.fill = wizard.colorCoat;
    element.querySelector('.wizard-eyes').style.fill = wizard.colorEyes;

    window.popup(wizardElement, function () {
      return renderWizardArtifacts(wizard);
    });

    return element;
  };


  window.render = function (data) {
    var fragment = document.createDocumentFragment();
    var takeNumber = data.length > 4 ? 4 : data.length;

    similarList.innerHTML = '';
    for (var i = 0; i < takeNumber; i++) {
      fragment.appendChild(renderWizard(data[i]));
    }

    similarList.appendChild(fragment);
    similar.classList.remove('hidden');
  };

})();
