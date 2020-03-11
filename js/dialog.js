'use strict';

(function () {

  var setup = document.querySelector('.setup');
  var setupOpen = document.querySelector('.setup-open');
  var setupClose = setup.querySelector('.setup-close');

  var setupCoodrs = {
    x: setup.offsetLeft,
    y: setup.offsetTop
  };

  var onPopupEscPress = function (evt) {
    window.util.isEscEvent(evt, closePopup);
  };

  var opsenPopup = function () {
    setup.classList.remove('hidden');

    setupCoodrs.x = setup.offsetLeft;
    setupCoodrs.y = setup.offsetTop;

    document.addEventListener('keydown', onPopupEscPress);
  };

  var closePopup = function () {
    setup.style.top = setupCoodrs.y + 'px';
    setup.style.left = setupCoodrs.x + 'px';

    setup.classList.add('hidden');
    document.removeEventListener('keydown', onPopupEscPress);
  };

  // Открытие окна настроек по клику
  setupOpen.addEventListener('click', function (evt) {
    evt.preventDefault();
    opsenPopup();
  });

  // Открытие окна настроек по enter
  setupOpen.addEventListener('keydown', function (evt) {
    window.util.isEnterEvent(evt, opsenPopup);
  });

  // Закрытие окна настроек по клику
  setupClose.addEventListener('click', function (evt) {
    evt.preventDefault();
    closePopup();
  });

  // Закрытие окна настроек по entr
  setupClose.addEventListener('keydown', function (evt) {
    window.util.isEnterEvent(evt, closePopup);
  });

  var dialogHandle = setup.querySelector('.upload');

  // Перетаскивание окна
  dialogHandle.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var isMoved = false;

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      isMoved = true;

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

      if (isMoved) {
        var onClickPreventDefault = function (clickEvt) {
          clickEvt.preventDefault();
          dialogHandle.removeEventListener('click', onClickPreventDefault);
        };
        dialogHandle.addEventListener('click', onClickPreventDefault);
      }
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
})();
