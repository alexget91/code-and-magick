'use strict';

// Модуль управления отображением диалогового окна настроек игрока
(function () {

  var setup = document.querySelector('.setup');
  var setupOpen = document.querySelector('.setup-open');
  var setupClose = setup.querySelector('.setup-close');
  var setupHandle = setup.querySelector('.setup-user .upload');
  var setupForm = setup.querySelector('.setup-wizard-form');
  var setupAvatar = setup.querySelector('.setup-user .upload input[name="avatar"]');

  var openPopup = function () {
    setup.classList.remove('hidden');
    document.addEventListener('keydown', onPopupEscPress);
  };

  var closePopup = function () {
    setup.classList.add('hidden');
    setup.style.top = '';
    setup.style.left = '';
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

  var onSaveSuccess = function () {
    closePopup();
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

  setupForm.addEventListener('submit', function (evt) {
    evt.preventDefault();

    window.backend.save(new FormData(setupForm), onSaveSuccess, window.backend.onLoadError);

    var wizardCopy = document.querySelector('svg').cloneNode(true);
    var wizardElement = document.querySelector('.setup-wizard');

    wizardCopy.querySelector('#wizard-coat').style.fill = wizardElement.querySelector('.wizard-coat').style.fill;
    wizardCopy.querySelector('#wizard-eyes').style.fill = wizardElement.querySelector('.wizard-eyes').style.fill;

    var wizardBase64Right = window.svg2base64(wizardCopy); // работает только в Chrome

    // Чтобы развернуть мага, его надо подвинуть на его ширину, а затем отразить
    wizardCopy.querySelector('#wizard').setAttribute('transform', 'translate(62, 0) scale(-1, 1)');
    var wizardBase64Left = window.svg2base64(wizardCopy);

    window.restartGame(wizardBase64Right, wizardBase64Left);
  });

  // Перетаскивание окна настроек
  setupHandle.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      setup.style.top = (setup.offsetTop - shift.y) + 'px';
      setup.style.left = (setup.offsetLeft - shift.x) + 'px';

      setupAvatar.classList.add('hidden');
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      setupAvatar.classList.remove('hidden');

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

})();
