'use strict';

(function () {

  var MIN_NAME_LENGTH = 2;

  var setup = document.querySelector('.setup');
  var form = setup.querySelector('.setup-wizard-form');
  var userNameInput = setup.querySelector('.setup-user-name');

  // Валидация поля имени
  userNameInput.addEventListener('invalid', function () {
    var errorMessage = '';
    if (userNameInput.validity.tooShort) {
      errorMessage = 'Имя должно состоять минимум из 2-х символов';
    } else if (userNameInput.validity.tooLong) {
      errorMessage = 'Имя не должно привышать 25-ти символов';
    } else if (userNameInput.validity.valueMissing) {
      errorMessage = 'Обязательное поле';
    }
    userNameInput.setCustomValidity(errorMessage);
  });

  userNameInput.addEventListener('input', function (evt) {
    var target = evt.target;
    if (target.value.length < MIN_NAME_LENGTH) {
      target.setCustomValidity('Имя должно состоять минимум из ' + MIN_NAME_LENGTH + '-x символов');
    } else {
      target.setCustomValidity('');
    }
  });

  var onFormSuccess = function () {
    setup.classList.add('hidden');
  };

  var onFormError = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';

    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  form.addEventListener('submit', function (evt) {
    window.backend.save(new FormData(form), onFormSuccess, onFormError);
    evt.preventDefault();
  });

})();
