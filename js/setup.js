'use strict';

(function () {
  var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
  var WIZARD_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
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

  var userNameInput = setup.querySelector('.setup-user-name');

  var setupWizard = document.querySelector('.setup-wizard');
  var wizardCoat = setupWizard.querySelector('.wizard-coat');
  var wizardEyes = setupWizard.querySelector('.wizard-eyes');
  var setupFireballWrap = setup.querySelector('.setup-fireball-wrap');
  var inputCoatColor = setup.querySelector('input[name="coat-color"]');
  var inputEyesColor = setup.querySelector('input[name="eyes-color"]');
  var inputFireballColor = setupFireballWrap.querySelector('input[name="fireball-color"]');

  var similarWizards;
  var similarListElemet = document.querySelector('.setup-similar-list');
  var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

  // Функция получения случайного элемента из массива
  var getRandom = function (arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  };

  // Функция описания свойств нескольких магов
  var createSimilarWizards = function (quantity) {
    var wizardsArr = [];
    for (var i = 0; i < quantity; i++) {
      var wizard = {
        name: getRandom(WIZARD_NAMES) + ' ' + getRandom(WIZARD_SURNAMES),
        eyesColor: getRandom(EYES_COLORS),
        coatColor: getRandom(COAT_COLORS)
      };

      wizardsArr[i] = wizard;
    }
    return wizardsArr;
  };

  // Функция рендера одного мага
  var renderSimilarWizard = function (wizard) {
    var wizardElement = similarWizardTemplate.cloneNode(true);

    wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;

    return wizardElement;
  };

  // Функция отрисовки всех похожих магов
  var getWizardElements = function (wizardsObjcts) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < wizardsObjcts.length; i++) {
      fragment.appendChild(renderSimilarWizard(wizardsObjcts[i]));
    }
    return fragment;
  };

  // Получаем 4 похожих персонажа
  similarWizards = createSimilarWizards(4);

  // Отрисовка похожих персонажей
  similarListElemet.appendChild(getWizardElements(similarWizards));

  document.querySelector('.setup-similar').classList.remove('hidden');

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

  window.colorize(wizardCoat, COAT_COLORS, inputCoatColor);
  window.colorize(wizardEyes, EYES_COLORS, inputEyesColor);
  window.colorize(setupFireballWrap, FIREBALL_COLORS, inputFireballColor);

})();
