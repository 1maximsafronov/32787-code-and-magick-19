'use strict';
(function () {
  var wizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

  var similarList = document.querySelector('.setup-similar-list');
  var similar = document.querySelector('.setup-similar');

  // Функция рендера одного мага
  var createWizard = function (wizard) {
    var wizardElement = wizardTemplate.cloneNode(true);

    wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.colorEyes;
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.colorCoat;

    return wizardElement;
  };

  // Функция отрисовки всех похожих магов
  var renderWizards = function (wizardsObjcts) {
    var counter = 4;
    var fragment = document.createDocumentFragment();
    similarList.innerHTML = '';
    if (wizardsObjcts.length < 4) {
      counter = wizardsObjcts.length;
    }
    for (var i = 0; i < counter; i++) {
      fragment.appendChild(createWizard(wizardsObjcts[i]));
    }
    // Отрисовка похожих персонажей
    similarList.appendChild(fragment);
    similar.classList.remove('hidden');
  };

  window.render = {
    renderWizards: renderWizards
  };
})();
