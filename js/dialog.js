'use strict';

// Модуль управления отображением диалогового окна настроек игрока
(function () {

  var setup = document.querySelector('.setup');
  var setupOpen = document.querySelector('.setup-open');
  var setupClose = setup.querySelector('.setup-close');
  var setupHandle = setup.querySelector('.setup-user .upload');
  var setupForm = setup.querySelector('.setup-wizard-form');

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

  setup.querySelector('.setup-user .upload input[name="avatar"]').classList.add('hidden'); // временно, чтобы не мешал


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
    window.backend.save(new FormData(setupForm), onSaveSuccess, window.backend.onLoadError);
    evt.preventDefault();
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
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

})();
