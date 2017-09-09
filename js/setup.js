'use strict';

// Модуль управления настройками персонажа
(function () {

  // Перетаскивание предметов в окне настроек

  var shopElement = document.querySelector('.setup-artifacts-shop');
  var draggedItem = null;
  var artifactsElement = document.querySelector('.setup-artifacts');
  var artifactsElementCells = artifactsElement.querySelectorAll('.setup-artifacts-cell');

  var showDragCells = function () {
    for (var i = 0; i < artifactsElementCells.length; i++) {
      if (!artifactsElementCells[i].children.length) {
        artifactsElementCells[i].style.outline = '2px dashed red';
      }
    }
  };

  var hideDragCells = function () {
    for (var i = 0; i < artifactsElementCells.length; i++) {
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
