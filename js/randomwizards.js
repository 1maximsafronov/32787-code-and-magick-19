'use strict';

(function () {
  var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
  var WIZARD_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];

  // Функция получения случайного элемента из массива
  var getRandom = function (arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  };

  // Функция описания свойств нескольких магов
  var createSimilarWizards = function (quantity, EYES_COLORS, COAT_COLORS) {
    var wizardsArr = [];
    for (var i = 0; i < quantity; i++) {
      var wizard = {
        name: getRandom(WIZARD_NAMES) + ' ' + getRandom(WIZARD_SURNAMES),
        colorEyes: getRandom(EYES_COLORS),
        colorCoat: getRandom(COAT_COLORS)
      };

      wizardsArr[i] = wizard;
    }
    return wizardsArr;
  };

  window.randomwizards = {
    get: createSimilarWizards,
  };
})();
