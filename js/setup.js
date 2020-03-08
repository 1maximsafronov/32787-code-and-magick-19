'use strict';

(function () {
  var COAT_COLORS = [
    'rgb(101, 137, 164)',
    'rgb(241, 43, 107)',
    'rgb(146, 100, 161)',
    'rgb(56, 159, 117)',
    'rgb(215, 210, 55)',
    'rgb(0, 0, 0)'
  ];
  var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
  var FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

  var MIN_NAME_LENGTH = 2;

  var setup = document.querySelector('.setup');
  var form = setup.querySelector('.setup-wizard-form');
  var userNameInput = setup.querySelector('.setup-user-name');

  var setupWizard = setup.querySelector('.setup-wizard');
  var wizardCoat = setupWizard.querySelector('.wizard-coat');
  var wizardEyes = setupWizard.querySelector('.wizard-eyes');
  var setupFireballWrap = setup.querySelector('.setup-fireball-wrap');
  var inputcolorCoat = setup.querySelector('input[name="coat-color"]');
  var inputcolorEyes = setup.querySelector('input[name="eyes-color"]');
  var inputFireballColor = setupFireballWrap.querySelector('input[name="fireball-color"]');


  var similarListElemet = setup.querySelector('.setup-similar-list');
  var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

  // Функция рендера одного мага
  var renderWizard = function (wizard) {
    var wizardElement = similarWizardTemplate.cloneNode(true);

    wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.colorEyes;
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.colorCoat;

    return wizardElement;
  };

  // Функция отрисовки всех похожих магов
  var renderSimilarWizards = function (wizardsObjcts) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < 4; i++) {
      fragment.appendChild(renderWizard(wizardsObjcts[i]));
    }
    // Отрисовка похожих персонажей
    similarListElemet.appendChild(fragment);
    setup.querySelector('.setup-similar').classList.remove('hidden');
  };

  // // Получаем 4 случайных волшебников и выводим
  // var similarWizards = window.randomwizards.get(4, EYES_COLORS, COAT_COLORS);
  // renderSimilarWizards(similarWizards);


  var onLoad = function (wizards) {
    renderSimilarWizards(wizards);
  };

  var onError = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';

    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  //
  // Функция отрисовки магов полученных с сервера
  window.backend.load(onLoad, onError);

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

  window.colorize(wizardCoat, COAT_COLORS, inputcolorCoat);
  window.colorize(wizardEyes, EYES_COLORS, inputcolorEyes);
  window.colorize(setupFireballWrap, FIREBALL_COLORS, inputFireballColor);

  var onFormSubmit = function () {
    setup.classList.add('hidden');
  };
  form.addEventListener('submit', function (evt) {
    window.backend.save(new FormData(form), onFormSubmit, onError);
    evt.preventDefault();
  });

})();
