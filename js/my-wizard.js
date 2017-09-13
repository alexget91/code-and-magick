'use strict';

// Отрисовка мага в окне настройки персонажа
(function () {

  var setup = document.querySelector('.setup');
  var setupWizardCoat = setup.querySelector('.setup-wizard .wizard-coat');
  var setupWizardEyes = setup.querySelector('.setup-wizard .wizard-eyes');
  var setupWizardFireball = setup.querySelector('.setup-fireball-wrap');
  var wizardName = setup.querySelector('.setup-user-name');


  var wizard = new window.Wizard({name: wizardName.value});

  setupWizardCoat.addEventListener('click', function () {
    wizard.changeCoatColor(setupWizardCoat);
  });

  setupWizardEyes.addEventListener('click', function () {
    wizard.changeEyesColor(setupWizardEyes);
  });

  setupWizardFireball.addEventListener('click', function () {
    wizard.changeFireballColor(setupWizardFireball);
  });

  window.myWizard = wizard;

})();
