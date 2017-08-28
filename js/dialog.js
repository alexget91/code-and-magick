'use strict';

// Модуль управления отображением диалогового окна настроек игрока
(function () {

  var setup = document.querySelector('.setup');
  var setupOpen = document.querySelector('.setup-open');
  var setupClose = setup.querySelector('.setup-close');
  var setupSave = setup.querySelector('.setup-submit');

  var openPopup = function () {
    setup.classList.remove('hidden');
    document.addEventListener('keydown', onPopupEscPress);
  };

  var closePopup = function () {
    setup.classList.add('hidden');
    document.removeEventListener('keydown', onPopupEscPress);
  };

  var makeEscAction = function (evt) {
    if (evt.target.classList.contains('setup-user-name')) {
      evt.target.blur();
    } else {
      closePopup();
    }
  };

  var onPopupEscPress = function (evt) {
    window.util.isEscEvent(evt, makeEscAction);
  };


  setupOpen.addEventListener('click', function () {
    openPopup();
  });

  setupOpen.addEventListener('keydown', function (evt) {
    window.util.isEnterEvent(evt, openPopup);
  });

  setupClose.addEventListener('click', function () {
    closePopup();
  });

  setupClose.addEventListener('keydown', function (evt) {
    window.util.isEnterEvent(evt, closePopup);
  });

  setupSave.addEventListener('click', function () {
    closePopup();
  });

  setupSave.addEventListener('keydown', function (evt) {
    window.util.isEnterEvent(evt, closePopup);
  });
})();
