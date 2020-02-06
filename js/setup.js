'use strict';

var ESC_KEY = 'Escape';
var ENTER_KEY = 'Enter';

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
var setupOpen = document.querySelector('.setup-open');
var setupClose = setup.querySelector('.setup-close');
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
    wizard = null;
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

var onPopupEscPress = function (evt) {
  if (evt.key === ESC_KEY) {
    evt.preventDefault();
    closePopup();
  }
};

var opsenPopup = function () {
  setup.classList.remove('hidden');
  document.addEventListener('keydown', onPopupEscPress);
};

var closePopup = function () {
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
  if (evt.key === ENTER_KEY) {
    opsenPopup();
  }
});

// Закрытие окна настроек по клику
setupClose.addEventListener('click', function (evt) {
  evt.preventDefault();
  closePopup();
});

// Закрытие окна настроек по entr
setupClose.addEventListener('keydown', function (evt) {
  if (evt.key === ENTER_KEY) {
    closePopup();
  }
});

// Валидация поля имени
userNameInput.addEventListener('invalid', function () {
  if (userNameInput.validity.tooShort) {
    userNameInput.setCustomValidity('Имя должно состоять минимум из 2-х символов');
  } else if (userNameInput.validity.tooLong) {
    userNameInput.setCustomValidity('Имя не должно привышать 25-ти символов');
  } else if (userNameInput.validity.valueMissing) {
    userNameInput.setCustomValidity('Обязательное поле');
  } else {
    userNameInput.setCustomValidity('');
  }
});

userNameInput.addEventListener('input', function (evt) {
  var target = evt.target;
  if (target.value.length < MIN_NAME_LENGTH) {
    target.setCustomValidity('Имя должно состоять минимум из ' + MIN_NAME_LENGTH + '-x символов');
  } else {
    target.setCustomValidity('');
  }
});

// Изменение цвета плаща волшебника
wizardCoat.addEventListener('click', function () {
  var wizardCoatColor = getRandom(COAT_COLORS);
  wizardCoat.style.fill = wizardCoatColor;
  inputCoatColor.value = wizardCoatColor;
});

// Изменение цвета глаз волшебника
wizardEyes.addEventListener('click', function () {
  var wizardEyesColor = getRandom(EYES_COLORS);
  wizardEyes.style.fill = wizardEyesColor;
  inputEyesColor.value = wizardEyesColor;
});

// Изменение цвета фаербола
setupFireballWrap.addEventListener('click', function () {
  var fireballColor = getRandom(FIREBALL_COLORS);
  setupFireballWrap.style.backgroundColor = fireballColor;
  inputFireballColor.value = fireballColor;
});
